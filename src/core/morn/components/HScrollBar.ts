namespace morn
{
	/**水平滚动条*/
	export class HScrollBar extends ScrollBar
	{
		public constructor()
		{
			super();
		}

		protected initialize(): void
		{
			super.initialize();
			this._slider.direction = ScrollBar.HORIZONTAL;
		}
	}
}