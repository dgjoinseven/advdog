namespace morn
{
	export class UIEvent extends egret.Event
	{
		/**移动组件*/
		public static MOVE: string = "move";
		/**更新完毕*/
		public static RENDER_COMPLETED: string = "renderCompleted";
		/**显示鼠标提示*/
		public static SHOW_TIP: string = "showTip";
		/**隐藏鼠标提示*/
		public static HIDE_TIP: string = "hideTip";
		//-----------------Image-----------------
		/**图片加载完毕*/
		public static IMAGE_LOADED: string = "imageLoaded";
		//-----------------TextArea-----------------
		/**滚动*/
		public static SCROLL: string = "scroll";
		//-----------------FrameClip-----------------
		/**帧跳动*/
		public static FRAME_CHANGED: string = "frameChanged";
		//-----------------List-----------------
		/**项渲染*/
		public static ITEM_RENDER: string = "listRender";
		// /**布局文件解析完成 */
		// public static LayoutComplete: string = "LayoutComplete";

		private _data: any;
		public constructor(type: string, data: any, bubbles: boolean = false, cancelable: boolean = false)
		{
			super(type, bubbles, cancelable, data);
			this._data = data;
		}

		/**事件数据*/
		public get data(): any
		{
			return this._data;
		}

		public set data(value: any)
		{
			this._data = value;
		}

		public clone(): egret.Event
		{
			return new UIEvent(this.type, this._data, this.bubbles, this.cancelable);
		}
	}
}