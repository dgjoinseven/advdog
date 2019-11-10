namespace morn
{
	/**垂直滚动条*/
	export class VScrollBar extends ScrollBar
	{
		public constructor()
		{
			super();
		}

		protected initialize(): void
		{
			super.initialize();
			this._slider.direction = ScrollBar.VERTICAL;
		}
	}
}