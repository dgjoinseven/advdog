namespace asf
{
	export class Tick
	{
		private shape: egret.Shape = new egret.Shape();
		private pool: TimerHandler[] = [];
		private currTimer: number;
		private timerArr: TimerHandler[] = [];
		private keyArr: number[] = [];
		private count: number = 0;
		private maxIndex: number = 0;//当前最大id值
		private index: number = 0;
		public constructor()
		{

			// var fps: number;
			// if (asf.App.stage.frameRate == 60)
			// {
			// 	fps = 16;
			// }
			// else
			// {
			// 	fps = 33;
			// }

			// var thisObj: any = this;
			// window.setInterval(function (): void
			// {
			// 	thisObj.onEnterFrame();
			// }, fps)
			asf.IntervalMgr.getInstance().push(this.onEnterFrame, this);
			this.currTimer = egret.getTimer();
		}

		private onEnterFrame(e: egret.Event): void
		{
			this.currTimer = egret.getTimer();
			var len: number = this.timerArr.length;

			//分帧处理
			var start: number = 0;
			var end: number = len;
			// if (len >= 1000)
			// {
			// 	start = Math.floor(len / 2) * this.index;
			// 	end = Math.floor(len / 2) * (this.index + 1);
			// 	if (len % 2 == 1)
			// 	{
			// 		end++;
			// 	}
			// 	this.index++;
			// 	if (this.index >= 2)
			// 	{
			// 		this.index = 0;
			// 	}
			// }
			// else
			// {
			// 	this.index = 0;
			// }

			var self: Tick = this;
			var handler: TimerHandler;
			var timerArr = self.timerArr;
			var t: number = self.currTimer;
			for (var i: number = start; i < end; i++)
			{
				handler = timerArr[i];
				if (!handler || handler.isPause)
				{
					continue;
				}

				if (t >= handler.exeTime)
				{
					var method: Function = handler.method;
					var args: any[] = handler.args;

					handler.exeTime += handler.delay;
					method.apply(handler.thisObj, args);
				}
			}
		}

		/**
		 * 创建1个计时器
		 */
		private create(delay: number, method: Function, thisObj: any, args: any[] = null, key: number = undefined): number
		{
			if (key)
			{
				//先删除相同函数的计时
				this.clearTimer(key);
			}

			//如果执行时间小于1，直接执行
			if (delay < 1)
			{
				method.apply(thisObj, args)
				return -1;
			}

			var handler: TimerHandler = this.pool.length > 0 ? this.pool.shift() : new TimerHandler();
			handler.userFrame = false;
			handler.repeat = true;
			handler.delay = delay;
			handler.method = method;
			handler.thisObj = thisObj;
			handler.args = args;
			handler.exeTime = delay + this.currTimer;

			return this.addHandler(handler);
		}

		/**定时重复执行
		 * @param	delay  延迟时间(单位毫秒)
		 * @param	method 结束时的回调方法
		 * @param	args   回调参数
		 * @param	cover  是否覆盖(true:同方法多次计时，后者覆盖前者。false:同方法多次计时，不相互覆盖)
		 * @return  cover=true时返回回调函数本身，cover=false时，返回唯一ID，均用来作为clearTimer的参数*/
		public doLoop(delay: number, method: Function, thisObj: any, args: any[] = null, key: number = undefined): any
		{
			return this.create(delay, method, thisObj, args, key);
		}

		/**
		 * 增加计时器处理方法
		 */
		private addHandler(handler: TimerHandler): number
		{
			this.count++;//数量增加
			var key: number = this.maxIndex++;//计时器的ID增加
			handler.key = key;
			this.timerArr.push(handler);
			this.keyArr.push(key);
			return key;
		}

		/**清理定时器
		 * @param 唯一ID，均用来作为clearTimer的参数
		 */
		public clearTimer(key: number): void
		{
			var index: number = this.keyArr.indexOf(key);
			if (index != -1)
			{
				this.count--;
				this.keyArr.splice(index, 1);
				this.timerArr.splice(index, 1);
			}
		}
	}
}