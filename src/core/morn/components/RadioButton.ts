namespace morn
{
	/**单选框按钮*/
	export class RadioButton extends Button
	{
		protected _value: any;
		public constructor()
		{
			super()
		}

		protected preinitialize(): void
		{
			super.preinitialize();
			this._toggle = false;
			this._autoSize = false;
		}

		protected initialize(): void
		{
			super.initialize();
			this._btnLabel.autoSize = "left";
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		}

		protected changeLabelSize(): void
		{
			this.exeCallLater(this.changeClips, this);
			this._btnLabel.x = this._bitmap.width + this._labelMargin[0];
			this._btnLabel.y = (this._bitmap.height - this._btnLabel.height) * 0.5 + this._labelMargin[1];

			this._contentWidth = this._btnLabel.x + this._btnLabel.width;
			// this._contentHeight = this._bitmap.height;
		}

		public commitMeasure(): void
		{
			this.exeCallLater(this.changeLabelSize, this);
		}

		protected onClick(e: Event): void
		{
			this.selected = true;
		}

		/**组件关联的可选用户定义值*/
		public get value(): any
		{
			return this._value != null ? this._value : this.label;
		}

		public set value(obj: any)
		{
			this._value = obj;
		}

		public destroy(): void
		{
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
			if (this._value)
			{
				this._value = null;
			}
			super.destroy();
		}
	}
}