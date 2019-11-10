namespace morn
{
	/**水平滚动条*/
	export class HSlider extends Slider
	{
		public constructor()
		{
			super();
		}

		protected preinitialize(): void
		{
			super.preinitialize();
			this.direction = Slider.HORIZONTAL;
		}
	}
}