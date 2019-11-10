namespace asf
{
	/**
	 * 船新的计时器，不能用function做key，只能用id,提高性能
	 * 会逐渐过度
	 */
	export class TimeMgr
	{
		/** 离开焦点的时间，暂时写在这里的而已，实际是要写正心跳机制那里，每次执行time都会重置为0 **/
		lifecycleTime: number;
		//	private _shape: egret.Shape = new egret.Shape();
		private _pool: TimerVo[] = [];
		private _keyMap: HashMap<number, TimerVo>;
		//	private _currTimer: number;
		//	private _currFrame: number = 0;
		private _count: number = 0;
		private _maxIndex: number = 0;//当前最大id值
		//	private _isForEachLoop: boolean = false;
		/**待删除的计时器 */
		private _waitDelHandlerArr: TimerVo[] = [];
		private _initial: boolean;
		public constructor()
		{
			this._keyMap = new HashMap<number, TimerVo>();
			this.start();
			//	this._currTimer = egret.getTimer();
		}

		public start(): void
		{
			asf.IntervalMgr.getInstance().push(this.onEnterFrame, this);
			this._initial = true;
		}

		/**
		 * 停止所有timer心跳
		 */
		stop(): void
		{
			asf.IntervalMgr.getInstance().remove(this.onEnterFrame, this);
			console.log("请不要随意停止timer");
		}

		public clear(): void
		{
			this._initial = false;
			// egret.Tween.doneAllTweens();
			asf.IntervalMgr.getInstance().clear();
			this.toClearTimer();
			this._keyMap.clear();
			this._count = 0;
		}

		private onEnterFrame(timestamp: number  /*e: egret.Event*/): void
		{			
			this.lifecycleTime = 0;
			var self: TimeMgr = this;
			var handler: TimerVo;


			//	this._currFrame++;
			//this._currTimer = egret.getTimer();


			//原来的老做法
			//不能使用values，因为这个他内部会循环一遍，等于一次心跳，需要做两重循环了。
			// var arr: TimerVo[] = this._keyMap.values();
			// var len: number = arr.length;
			//for (var i: number = 0; i < len; i++)


			//新做法，直接遍历object对象
			var container: any = this._keyMap.getContainer();
			for (let key in container)
			{
				handler = container[key];
				if (!handler || handler.isPause || handler.isDel)
				{
					continue;
				}

				var t: number = handler.userFrame ? IntervalMgr.curFrame : timestamp;
				if (t >= handler.exeTime)
				{
					var method: Function = handler.method;
					var args: any[] = handler.args;
					if (handler.repeat)
					{
						var isOne: boolean = true;//判断是否补帧用的
						while (t >= handler.exeTime && handler.repeat)
						{
							handler.exeTime += handler.delay;
							if (handler.isFillFrame || isOne)
							{
								//无补帧功能就只执行1次
								method.apply(handler.thisObj, args);
								if (!isOne)
								{
									//	console.log("补帧了");
								}
							}
							isOne = false
						}


						// //暂时不用补帧
						// method.apply(handler.thisObj, args);
					}
					else
					{
						self.clearTimer(handler.key);
						method.apply(handler.thisObj, args)
					}
				}
			}
			//处理待删除列表
			this.toClearTimer();
		}

		/**
		 * 创建1个计时器
		 */
		private create(useFrame: boolean, repeat: boolean, delay: number, method: Function, thisObj: any, args: any[] = null, isFillFrame: boolean = false): number
		{
			// var key: any;
			// if (timeVo)
			// {
			// 	//先删除相同函数的计时
			// 	this.clearTimerTimerVo(timeVo);
			// }

			//如果执行时间小于1，直接执行
			if (delay < 1)
			{
				method.apply(thisObj, args)
				return 0;
			}

			var handler: TimerVo = this._pool.length > 0 ? this._pool.shift() : new TimerVo();
			handler.userFrame = useFrame;
			handler.repeat = repeat;
			handler.delay = delay;
			handler.method = method;
			handler.thisObj = thisObj;
			handler.args = args;
			handler.isFillFrame = isFillFrame;
			handler.exeTime = delay + (useFrame ? IntervalMgr.curFrame : IntervalMgr.curTime);
			var key: number = this.addHandler(handler);
			handler.key = key;
			return key;
		}

		/**
		 * 增加计时器处理方法
		 */
		private addHandler(handler: TimerVo): number
		{
			if (!this._initial)
				return;	
			this._count++;//数量增加
			var key: number = ++this._maxIndex;
			this._keyMap.put(key, handler);//每一个计时器都绑定1个新的唯一的计时器ID
			return key;//计时器的ID增加
		}

		/**定时执行一次 
		 * 用的时候一定要把上一个key给去掉
		 * @param	delay  延迟时间(单位毫秒)
		 * @param	method 结束时的回调方法
		 * @param	args   回调参数
		 * @param	lastKey   上一个重复方法实例key，如果没有则可以传0
		 * @return 返回唯一ID，均用来作为clearTimer的参数*/
		public doOnce(delay: number, method: Function, thisObj: any, lastKey: number, args: any[] = null): number
		{
			if (lastKey)
				this.clearTimer(lastKey);
			return this.create(false, false, delay, method, thisObj, args);
		}

		/**定时重复执行
		 * 用的时候一定要把上一个key给去掉
		 * @param	delay  延迟时间(单位毫秒)
		 * @param	method 结束时的回调方法
		 * @param	args   回调参数
		 * @param	lastKey   上一个重复方法实例key，如果没有则可以传0
		 * @return 返回唯一ID，均用来作为clearTimer的参数*/
		public doLoop(delay: number, method: Function, thisObj: any, lastKey: number, args: any[] = null, isFillFrame: boolean = false): number
		{
			if (lastKey)
				this.clearTimer(lastKey);
			return this.create(false, true, delay, method, thisObj, args, isFillFrame);
		}

		/**定时执行一次(基于帧率)
		 * 用的时候一定要把上一个key给去掉
		 * @param	delay  延迟时间(单位毫秒)
		 * @param	method 结束时的回调方法
		 * @param	args   回调参数
		 * @param	lastKey   上一个重复方法实例key，如果没有则可以传0
		 * @return 返回唯一ID，均用来作为clearTimer的参数*/
		public doFrameOnce(delay: number, method: Function, thisObj: any, lastKey: number, args: any[] = null): number
		{
			if (lastKey)
				this.clearTimer(lastKey);
			return this.create(true, false, delay, method, thisObj, args);
		}

		/**定时重复执行(基于帧率)
		 * 用的时候一定要把上一个key给去掉
		 * @param	delay  延迟时间(单位毫秒)
		 * @param	method 结束时的回调方法
		 * @param	args   回调参数
		 * @param	lastKey   上一个重复方法实例key，如果没有则可以传0
		 * @return  timeVo*/
		public doFrameLoop(delay: number, method: Function, thisObj: any, lastKey: number, args: any[] = null, isFillFrame: boolean = false): number
		{
			if (lastKey)
				this.clearTimer(lastKey);
			return this.create(true, true, delay, method, thisObj, args, isFillFrame);
		}

		/**定时器执行数量*/
		public get count(): number
		{
			return this._count;
		}

		/**清理定时器
		 * @param 唯一ID，均用来作为clearTimer的参数
		 */
		public clearTimer(key: number): void
		{
			var handler: TimerVo = this.getHandler(key);
			if (handler && !handler.isDel)
			{
				//标记以删除
				handler.isDel = true;
				this._waitDelHandlerArr.push(handler);//添加到待删除列表
			}
		}

		// private clearTimerTimerVo(timerVo: TimerVo): void
		// {
		// 	var handler: TimerVo = timerVo;
		// 	if (handler && handler.key != -1 && !handler.isDel)
		// 	{
		// 		//标记以删除
		// 		handler.isDel = true;

		// 		if (handler.thisObj instanceof game.MoveAction)
		// 		{
		// 			if (!handler.thisObj.clearState)
		// 			{
		// 				throw new Error("clearState为false");
		// 			}
		// 		}
		// 		this._waitDelHandlerArr.push(handler);//添加到待删除列表
		// 	}
		// }

		/**删除待删除列表的计时器 */
		public toClearTimer(): void
		{
			var len: number = this._waitDelHandlerArr.length;
			var handler: TimerVo;
			for (var i: number = 0; i < len; i++)
			{
				handler = this._waitDelHandlerArr[i];

				//删除key
				this._keyMap.remove(handler.key);
				handler.clear();//重置属性
				this._pool.push(handler);//回收对象池
				this._count--;//数量-1
			}

			this._waitDelHandlerArr.length = 0;
		}

		/**
		 *  获取TimerVo
		 */
		public getHandler(key: number): TimerVo
		{
			var handler: TimerVo = this._keyMap.get(key);
			return handler
		}

		/**
		 *暂停定时器
		 */
		public pauseTimer(key: number): void
		{
			var handler: TimerVo = this._keyMap.get(key);
			handler.isPause = true;
		}

		/**
		 *恢复定时器 
		 */
		public resumeTimer(key: number): void
		{
			var handler: TimerVo = this._keyMap.get(key);
			handler.isPause = false;
		}
	}

	/**定时处理器*/
	export class TimerVo
	{
		/**执行间隔*/
		public delay: number;
		/**是否重复执行*/
		public repeat: boolean;
		/**是否用帧率*/
		public userFrame: boolean;
		/**执行时间*/
		public exeTime: number;
		/**处理方法*/
		public method: Function;
		/**参数*/
		public args: any[];
		/**是否暂停*/
		public isPause: boolean;
		/**目标this*/
		public thisObj: any;
		/**唯一ID */
		public key: number = -1;
		/**是否补帧操作 */
		public isFillFrame: boolean = false;
		/**是否已经删除 */
		public isDel: boolean = false;

		/**清理*/
		public clear(): void
		{
			this.key = -1;
			this.method = null;
			this.thisObj = null;
			this.args = null;
			this.isPause = false;
			this.isDel = false;
		}
	}
}