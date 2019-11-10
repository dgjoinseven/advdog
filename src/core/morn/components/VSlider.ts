namespace morn
{
	/**垂直滚动条*/
	export class VSlider extends Slider
	{
		public constructor()
		{
			super();
		}

		protected preinitialize(): void
		{
			super.preinitialize();
			this.direction = Slider.VERTICAL;
		}
	}
}