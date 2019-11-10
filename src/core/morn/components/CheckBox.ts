namespace morn
{
	/**按钮类，可以是单态，两态和三态，默认三态(up,over,down)*/
	export class CheckBox extends Button
	{
		public constructor()
		{
			super();
		}

		protected preinitialize(): void
		{
			super.preinitialize();
			this._toggle = true;
			this._autoSize = false;
			this.ansTime = 0;
		}

		protected initialize(): void
		{
			super.initialize();
			this._btnLabel.autoSize = "left";
		}

		protected changeLabelSize(): void
		{
			this.exeCallLater(this.changeClips, this);
			this._btnLabel.x = this._bitmap.width + this._labelMargin[0] + 2;
			this._btnLabel.y = (this._bitmap.height - this._btnLabel.height) * 0.5 + this._labelMargin[1];
		}

		public commitMeasure(): void
		{
			this.exeCallLater(this.changeLabelSize, this);
		}

		public set dataSource(value: any)
		{
			this._dataSource = value;
			if (value instanceof Boolean)
			{
				this.selected = value as boolean;
			}
			else if (value instanceof String)
			{
				this.selected = value == "true";
			}
			else
			{
				// super.dataSource = value;
				egret.superSetter(CheckBox, this, "dataSource", value)
			}
		}
	}
}