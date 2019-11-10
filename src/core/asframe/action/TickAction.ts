namespace asf
{
	/***
	 * 表演代理者，支持aciton的队列、并发、同名排斥模式
	 */
	export class TickAction extends BasicAction
	{
		private timerId: number = -1;

		public constructor()
		{
			super();
		}

		public start(actor: IActor): void
		{
			super.start(actor);
			// App.timer.clearTimer(this.timer);
			this.timerId = App.timer.doFrameLoop(1, this.tick, this, null, this.timerId);
			// egret.startTick(this.tick, this);
		}

		public destroy(o: any = null): void
		{
			// egret.stopTick(this.tick, this);
			// App.timer.clearTimer(this.tick, this);
			App.timer.clearTimer(this.timerId);

			if (this.isDestory)
				return;

			super.destroy(o);
		}

		public tick(): boolean
		{
			return false;
		}
	}
}