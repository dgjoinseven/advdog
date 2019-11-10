namespace morn
{
	export class Tab extends Group
	{
		/**横向的*/
		public static HORIZENTAL: string = "horizontal";
		/**纵向的*/
		public static VERTICAL: string = "vertical";
		/**等级限制的回调函数 */
		protected _requires: asf.CallBack[];
		/**等级不足是否隐藏按钮 */
		public isHidelevelLimit: boolean = false;

		public constructor()
		{
			super();
			this._direction = Tab.HORIZENTAL;
		}

		/**预初始化，在此可以修改属性默认值*/
		protected preinitialize(): void
		{
			this._requires = [];
			this.touchChildren = this.touchEnabled = true;
		}

		protected createItem(skin: string, label: string): egret.DisplayObject
		{
			var r: Button = new Button();
			r.skin = skin;
			r.label = label;
			return r;
		}

		/**
		 * 设置等级限制 
		 * @param v
		 * 
		 */
		public addRequire(index: number, fcn: asf.CallBack): void
		{
			this._requires[index] = fcn;
			var button: Button = this._items[index] as Button;
			if (!fcn)
			{
				button.visible = true;

			}
			else if (fcn.execute())
			{
				button.visible = true;

			}
			else
			{
				button.visible = false;
			}

		}

		delItemById(index: number): void
		{
			this.delItem(this._items[index]);
		}



		/**
		 * 设置标签栏的名字
		 */
		public btnNames(names: string[]): void
		{
			for (var i: number = 0; i < this._items.length; i++)
			{
				var button: Button = this._items[i] as Button;
				if (button && i < names.length)
				{
					button.label = names[i];
				}
			}
		}

		/**
		 * 更新限制 
		 * 
		 */
		public updateRequire(): void
		{
			if (!this._items) return;

			var visibleIndex: number = -1;
			for (var i: number = 0, n: number = this._items.length; i < n; i++)
			{
				var btn: Button = this._items[i] as Button;
				if (btn.visible)
				{
					visibleIndex++;
					this.changeBtnX(btn, visibleIndex);
				}

			}
		}

		private changeBtnX(btn: Button, index: number): void
		{
			btn.x = (btn.width + this.space) * index;

		}

		protected changeLabels(): void
		{
			if (this._items)
			{
				var left: number = 0
				for (var i: number = 0, n: number = this._items.length; i < n; i++)
				{
					var btn: Button = this._items[i] as Button;
					if (this._skin)
						btn.skin = this._skin;
					if (this._labelColors)
						btn.labelColors = this._labelColors;
					if (this._labelStroke)
						btn.labelStroke = this._labelStroke;
					if (this._labelSize)
						btn.labelSize = this._labelSize;
					if (this._labelBold)
						btn.labelBold = this._labelBold;
					if (this._labelMargin)
					{
						btn.labelMargin = this._labelMargin;
						btn.labelMargin2 = this._labelMargin2;
					}

					if (this._direction == Tab.HORIZENTAL)
					{
						btn.y = 0;
						btn.x = left;
						left += btn.width + this._space;
					} else
					{
						btn.x = 0;
						btn.y = left;
						left += btn.height + this._space;
					}
				}
			}
		}

		public destroy(): void
		{
			this._requires = null;
			super.destroy();
		}
	}
}