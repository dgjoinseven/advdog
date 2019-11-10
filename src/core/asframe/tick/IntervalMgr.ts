namespace asf
{
	/**
	 * JS的window心跳，部分浏览器可能用不了
	 * liwenlong
	 */
	export class IntervalMgr
	{
		fps: number;
		funs: Function[];
		thisObjs: any[];
		timer: number;
		isFocus: boolean = true;

		public static curFrame: number = 0;
		public static curTime: number = 0;

		public constructor()
		{
			this.funs = [];
			this.thisObjs = [];
			//fix
			// if (asf.App.stage.frameRate == 60)
			// {
			// 	this.fps = 16;
			// }
			// else
			// {
			// 	this.fps = 33;
			// }

			this.fps = 16;    //tick以每秒60帧刷新
			IntervalMgr.curTime = egret.getTimer();

			//fix
			//asf.App.stage.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
			egret.startTick(this.tickframe, this)
		}


		private tickframe(timeStamp: number): boolean
		{
			let delta = timeStamp - IntervalMgr.curTime;
			IntervalMgr.curTime = timeStamp;
			IntervalMgr.curFrame++;

			this.onEnterFrame(timeStamp);
			return false;  //不进行立即重绘
		}

		private onEnterFrame(timeStamp: number): void
		{
			//var curtime = egret.getTimer();

			var len: number = this.funs.length;
			for (var i: number = 0; i < len; i++)
			{
				//有可能执行去掉了自己导致数组长度缩短
				if (this.funs[i])
					this.funs[i].call(this.thisObjs[i], [timeStamp]);
			}
		}

		/**
		 * 失去焦点，使用js心跳
		 */
		lifecycle(): void
		{
			this.isFocus = false;
			var thisObj = this;

			// var len: number = this.funs.length;
			// for (var i: number = 0; i < len; i++)
			// {
			// 	asf.App.stage.removeEventListener(egret.Event.ENTER_FRAME, this.funs[i], this.thisObjs[i]);
			// }

			//	asf.App.stage.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);

			egret.stopTick(this.tickframe, this);

			window.clearInterval(this.timer);
			this.timer = window.setInterval(function (): void
			{
				//thisObj.onEnterFrame();
				thisObj.tickframe(egret.getTimer());
				egret.ticker.update()
			}, this.fps)
		}

		/**
		 * 回复焦点，用回白鹭的心跳
		 */
		lifecycleResume(): void
		{
			this.isFocus = true;
			window.clearInterval(this.timer);
			//var len: number = this.funs.length;
			// for (var i: number = 0; i < len; i++)
			// {
			// 	asf.App.stage.addEventListener(egret.Event.ENTER_FRAME, this.funs[i], this.thisObjs[i]);
			// }

			egret.startTick(this.tickframe, this);
			//asf.App.stage.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
		}

		/**
		 * 添加需要用这个心跳响应的方法
		 */
		push(callback: Function, thisObj: any): void
		{
			this.funs.push(callback);
			this.thisObjs.push(thisObj);
			//	asf.App.stage.addEventListener(egret.Event.ENTER_FRAME, callback, thisObj);
		}

		remove(callback: Function, thisObj: any): void
		{
			var index: number = this.funs.indexOf(callback)
			if (index != -1) this.funs.splice(index, 1);
			index = this.thisObjs.indexOf(thisObj)
			if (index != -1) this.thisObjs.splice(index, 1);
			//	asf.App.stage.removeEventListener(egret.Event.ENTER_FRAME, callback, thisObj);
		}

		clear(): void
		{
			var len: number = this.funs.length;
			for (var i: number = 0; i < len; i++)
			{
				this.funs[i].call(this.thisObjs[i], [IntervalMgr.curTime]);
			}
			this.funs = [];
			this.thisObjs = [];
		}

		private static instance: IntervalMgr;
		static getInstance(): IntervalMgr
		{
			if (this.instance == null)
			{
				this.instance = new IntervalMgr();
			}
			return this.instance;
		}
	}
}