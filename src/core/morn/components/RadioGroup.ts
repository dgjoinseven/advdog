namespace morn
{
	/**单选按钮组，默认selectedIndex=-1*/
	export class RadioGroup extends Group
	{
		/**横向的*/
		public static HORIZENTAL: string = "horizontal";
		/**纵向的*/
		public static VERTICAL: string = "vertical";

		public constructor()
		{
			super();
			this._direction = RadioGroup.HORIZENTAL;
		}

		protected createItem(skin: string, label: string): egret.DisplayObject
		{
			var r: RadioButton = new RadioButton();
			r.skin = skin;
			r.ansTime = 0;
			r.label = label;
			return r;
		}

		protected changeLabels(): void
		{
			if (this._items)
			{
				var left: number = 0
				for (var i: number = 0, n: number = this._items.length; i < n; i++)
				{
					var tempItem: any = this._items[i];
					var radio: RadioButton = tempItem as RadioButton;
					if (this._skin)
						radio.skin = this._skin;
					if (this._labelColors)
						radio.labelColors = this._labelColors;
					if (this._labelStroke)
						radio.labelStroke = this._labelStroke;
					if (this._labelSize)
						radio.labelSize = this._labelSize;
					if (this._labelBold)
						radio.labelBold = this._labelBold;
					if (this._labelMargin)
						radio.labelMargin = this._labelMargin;
					if (this._direction == RadioGroup.HORIZENTAL)
					{
						radio.y = 0;
						radio.x = left;
						left += radio.width + this._space;
					} else
					{
						radio.x = 0;
						radio.y = left;
						left += radio.height + this._space;
					}
				}
			}
		}

		/**被选择单选按钮的值*/
		public get selectedValue(): Object
		{
			var tempItem: any = this._items[this._selectedIndex];
			return this._selectedIndex > -1 && this._selectedIndex < this._items.length ? (tempItem as RadioButton).value : null;
		}

		public set selectedValue(value: Object)
		{
			if (this._items)
			{
				for (var i: number = 0, n: number = this._items.length; i < n; i++)
				{
					var tempItem: any = this._items[i];
					var item: RadioButton = tempItem as RadioButton;
					if (item.value == value)
					{
						this.selectedIndex = i;
						break;
					}
				}
			}
		}

		/**按索引获取每个按钮 */
		public getRadioBtn(index: number): RadioButton
		{
			return this.getChildAt(index) as RadioButton;
		}
	}
}