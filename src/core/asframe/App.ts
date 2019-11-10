namespace asf
{
	export class App
	{
		/**全局stage引用*/
		public static stage: egret.Stage;
		/**时钟管理器*/
		public static timer: TimerManager;
		/**渲染管理器*/
		public static render: RenderManager;
		/**全新的时钟管理器*/
  		public static timeMgr: TimeMgr;
		/**心跳*/
		public static tick: Tick;
		public constructor()
		{
		}

		public static init(main: egret.DisplayObjectContainer): void
		{
			this.stage = main.stage;
			App.timer = new TimerManager();
			App.render = new RenderManager();
			App.tick = new Tick();
			App.timeMgr = new TimeMgr();
		}
	}
}