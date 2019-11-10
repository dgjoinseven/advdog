namespace morn
{
	/**链接按钮*/
	export class LinkButton extends Button
	{
		public constructor()
		{
			super();
		}

		protected preinitialize(): void
		{
			super.preinitialize();
			// this._labelColors = Styles.linkLabelColors;
			// this._autoSize = false;
		}

		protected initialize(): void
		{
			super.initialize();
			this._btnLabel.underline = true;
			this._btnLabel.autoSize = "left";
		}

		protected changeLabelSize(): void
		{
		}
	}
}