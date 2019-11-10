namespace asf
{
	export class TimerManager
	{
		/** 离开焦点的时间，暂时写在这里的而已，实际是要写正心跳机制那里，每次执行time都会重置为0 **/
		lifecycleTime: number;
		private _shape: egret.Shape = new egret.Shape();
		private _pool: TimerHandler[] = [];
		// private _handlerMap: Dictionary<any, Dictionary<any, TimerHandler[]>>;
		private _keyMap: Dictionary<number, TimerHandler>;
		private _currTimer: number;
		private _currFrame: number = 0;
		private _count: number = 0;
		private _maxIndex: number = 0;//当前最大id值
		private _isForEachLoop: boolean = false;
		// private _waitHandlerArr:

		public constructor()
		{
			// this._handlerMap = new Dictionary<any, Dictionary<any, TimerHandler[]>>();
			this._keyMap = new Dictionary<number, TimerHandler>();
			// this._shape.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
			// this._shape.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
			egret.startTick(this.onEnterFrame, this);
			this._currTimer = egret.getTimer();
		}

		start(): void
		{
			// this._shape.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
			egret.startTick(this.onEnterFrame, this);
		}


		/**
		 * 停止所有timer心跳
		 */
		stop(): void
		{
			// this._shape.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
			egret.stopTick(this.onEnterFrame, this);
			console.log("请不要随意停止timer");
		}

		// private onEnterFrame(e: egret.Event): void
		private onEnterFrame(timeStamp: number): boolean
		{
			this.lifecycleTime = 0;
			// console.info("timer的心跳:" + asf.App.timer.lifecycleTime);
			// console.info("timer的this.lifecycleTime:" + this.lifecycleTime);
			this._currFrame++;
			this._currTimer = egret.getTimer();

			var arr: TimerHandler[] = this._keyMap.values(false)//keys();
			var len: number = arr.length;


			// console.info("定时器数量:" + len);

			var self: TimerManager = this;
			var handler: TimerHandler;
			for (var i: number = 0; i < len; i++)
			{
				// self._isForEachLoop = true;
				// var key: number = arr[i];

				handler = arr[i];//this._keyMap.get(key);
				if (!handler || handler.isPause)
				{
					continue;
				}

				var t: number = handler.userFrame ? self._currFrame : self._currTimer;
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
							// try
							// {
							if (handler.isFillFrame || isOne)
							{
								//无补帧功能就只执行1次
								method.apply(handler.thisObj, args);
								if (!isOne)
								{
									console.info("补帧了");
								}
							}
							// }
							// catch (error)
							// {
							// 	console.error(error);
							// 	alert(error.message + "\n" + error.stack);
							// 	this.clearTimer(handler.key);
							// }
							isOne = false
						}
					}
					else
					{
						self.clearTimer(handler.key);
						// try
						// {
						method.apply(handler.thisObj, args)
						// }
						// catch (error)
						// {
						// 	console.error(error);
						// 	alert(error.message + "\n" + error.stack);
						// }
					}
				}

				// this._isForEachLoop = false;
			}
			// this._keyMap.forKeyValue(this.updateTimerHandler, this);
			return false;
		}

		private updateTimerHandler(key: any): void
		{
			this._isForEachLoop = true;

			var handler: TimerHandler = this._keyMap.get(key);
			if (handler.isPause)
			{
				return;
			}

			var t: number = handler.userFrame ? this._currFrame : this._currTimer;
			if (t >= handler.exeTime)
			{
				var method: Function = handler.method;
				var args: any[] = handler.args;
				if (handler.repeat)
				{
					var isOne: boolean = true;//判断是否补帧用的
					while (t >= handler.exeTime && this._keyMap.hasKey(key) && handler.repeat)
					{
						handler.exeTime += handler.delay;
						try
						{
							if (handler.isFillFrame || isOne)
							{
								//无补帧功能就只执行1次
								method.apply(handler.thisObj, args);
								if (!isOne)
								{
									console.log("补帧了");
								}
							}
						}
						catch (error)
						{
							console.error(error);
							alert(error.message + "\n" + error.stack);
							this.clearTimer(key);
						}
						isOne = false
					}
				}
				else
				{
					this.clearTimer(key);
					try
					{
						method.apply(handler.thisObj, args)
					}
					catch (error)
					{
						console.error(error);
						alert(error.message + "\n" + error.stack);
					}
				}
			}

			this._isForEachLoop = false;
		}

		/**
		 * 创建1个计时器
		 */
		private create(useFrame: boolean, repeat: boolean, delay: number, method: Function, thisObj: any, args: any[] = null, cover: number = -1, isFillFrame: boolean = false): number
		{
			// var key: any;
			if (cover != -1)
			{
				//先删除相同函数的计时
				this.clearTimer(cover);
			}

			//如果执行时间小于1，直接执行
			if (delay < 1)
			{
				// method.execute(args);//.apply(null, args)
				method.apply(thisObj, args)
				return -1;
			}
			// key = this._index++;
			var handler: TimerHandler = this._pool.length > 0 ? this._pool.shift() : new TimerHandler();
			handler.userFrame = useFrame;
			handler.repeat = repeat;
			handler.delay = delay;
			handler.method = method;
			handler.thisObj = thisObj;
			handler.args = args;
			handler.isFillFrame = isFillFrame;
			handler.exeTime = delay + (useFrame ? this._currFrame : this._currTimer);
			// this._handlers.put(key, handler);
			// this._count++;
			var key: number = this.addHandler(handler);
			handler.key = key;
			return key;
		}

		/**
		 * 增加计时器处理方法
		 */
		private addHandler(handler: TimerHandler): number
		{
			this._count++;//数量增加
			var key: number = this._maxIndex++;
			this._keyMap.put(key, handler);//每一个计时器都绑定1个新的唯一的计时器ID
			return key;//计时器的ID增加
		}

		/**定时执行一次
		 * @param	delay  延迟时间(单位毫秒)
		 * @param	method 结束时的回调方法
		 * @param	args   回调参数
		 * @param	cover  是否覆盖(-1:不覆盖。其他值:覆盖)
		 * @return  cover=true时返回回调函数本身，cover=false时，返回唯一ID，均用来作为clearTimer的参数*/
		public doOnce(delay: number, method: Function, thisObj: any, args: any[] = null, cover: number = -1): number
		{
			return this.create(false, false, delay, method, thisObj, args, cover);
		}

		/**定时重复执行
		 * @param	delay  延迟时间(单位毫秒)
		 * @param	method 结束时的回调方法
		 * @param	args   回调参数
		 * @param	cover  是否覆盖(-1:不覆盖。其他值:覆盖)
		 * @return  cover=true时返回回调函数本身，cover=false时，返回唯一ID，均用来作为clearTimer的参数*/
		public doLoop(delay: number, method: Function, thisObj: any, args: any[] = null, cover: number = -1, isFillFrame: boolean = false): number
		{
			return this.create(false, true, delay, method, thisObj, args, cover, isFillFrame);
		}

		/**定时执行一次(基于帧率)
		 * @param	delay  延迟时间(单位为帧)
		 * @param	method 结束时的回调方法
		 * @param	args   回调参数
		 * @param	cover  是否覆盖(-1:不覆盖。其他值:覆盖)
		 * @return  cover=true时返回回调函数本身，cover=false时，返回唯一ID，均用来作为clearTimer的参数*/
		public doFrameOnce(delay: number, method: Function, thisObj: any, args: any[] = null, cover: number = -1): number
		{
			return this.create(true, false, delay, method, thisObj, args, cover);
		}

		/**定时重复执行(基于帧率)
		 * @param	delay  延迟时间(单位为帧)
		 * @param	method 结束时的回调方法
		 * @param	args   回调参数
		 * @param	cover  是否覆盖(true:同方法多次计时，后者覆盖前者。false:同方法多次计时，不相互覆盖)
		 * @return  cover=true时返回回调函数本身，否则返回唯一ID，均用来作为clearTimer的参数*/
		public doFrameLoop(delay: number, method: Function, thisObj: any, args: any[] = null, cover: number = -1, isFillFrame: boolean = false): number
		{
			return this.create(true, true, delay, method, thisObj, args, cover, isFillFrame);
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
			var handler: TimerHandler = this.getHandler(key)

			if (handler != null)
			{
				// this._handlerMap.remove(key);
				this._keyMap.remove(handler.key);
				handler.clear();
				this._pool.push(handler);
				this._count--;
			}

		}

		public toClearTimer(key: number | Function, thisObj?: any): void
		{

		}

		/**
		 *  获取TimerHandler
		 */
		public getHandler(key: number): TimerHandler
		{
			var handler: TimerHandler = this._keyMap.get(key);


			return handler
		}

		/**
		 *暂停定时器
		 * 
		 */
		public pauseTimer(key: number): void
		{
			var handlers: TimerHandler = this.getHandler(key);
			handlers.isPause = true;
		}

		/**
		 *恢复定时器  
		 * 
		 */
		public resumeTimer(key: number): void
		{
			var handlers: TimerHandler = this.getHandler(key);
			handlers.isPause = false;
		}
	}

	/**定时处理器*/
	export class TimerHandler
	{
		public constructor()
		{
		}
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
		public key: number;
		/**是否补帧操作 */
		public isFillFrame: boolean = false;

		/**清理*/
		public clear(): void
		{
			this.method = null;
			this.args = null;
			this.isPause = false;
		}
	}
}

