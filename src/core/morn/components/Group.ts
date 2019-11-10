namespace morn
{
	/**集合，Tab和RadioGroup的基类*/
	export class Group extends Box
	{
		protected _items: ISelect[];
		protected _space: number = 0;
		protected _selectHandler: asf.CallBack;
		protected _selectedIndex: number = -1;
		protected _skin: string;
		protected _labels: string;

		protected _labelColors: string;
		protected _labelStroke: string;
		protected _labelSize: number;
		protected _labelBold: boolean;
		protected _labelMargin: string;
		protected _direction: string;

		/**2,3态时用到的 */
		protected _labelMargin2: string;

		public constructor()
		{
			super();
		}

		protected preinitialize(): void
		{
			this.touchChildren = true;
			this._items = [];
		}


		/**增加项，返回索引id
		 *  autoLayOut 是否自动布局，如果为true，会根据direction和space属性计算item的位置*/
		public addItem(item: ISelect, autoLayOut: boolean = true): number
		{
			var tempItem: any = item;
			var display: egret.DisplayObject = tempItem as egret.DisplayObject;
			var index: number = this._items.length;
			display.name = "item" + index;
			this.addChild(display);
			this.initItems();

			if (autoLayOut && index > 0)
			{
				tempItem = this._items[index - 1];
				var preItem: egret.DisplayObject = tempItem as egret.DisplayObject;
				if (this._direction == "horizontal")
				{
					display.x = preItem.x + preItem.width + this._space;
				} else
				{
					display.y = preItem.y + preItem.height + this._space;
				}
			}
			return index;
		}

		/**删除项
		 * autoLayOut 是否自动布局，如果为true，会根据direction和space属性计算item的位置*/
		public delItem(item: ISelect, autoLayOut: boolean = true): void
		{
			var index: number = this._items.indexOf(item);
			if (index != -1)
			{
				var tempItem: any = item;
				var display: egret.DisplayObject = tempItem as egret.DisplayObject;
				this.removeChild(display);
				for (var i: number = index + 1, n: number = this._items.length; i < n; i++)
				{
					var tempItem: any = this._items[i];
					var child: egret.DisplayObject = tempItem as egret.DisplayObject;
					child.name = "item" + (i - 1);
					if (autoLayOut)
					{
						if (this._direction == "horizontal")
						{
							child.x -= display.width + this._space;
						} else
						{
							child.y -= display.height + this._space;
						}
					}
				}
				this.initItems();
				if (this._selectedIndex > -1)
				{
					this.selectedIndex = this._selectedIndex < this._items.length ? this._selectedIndex : (this._selectedIndex - 1);
				}
			}
		}

		/**初始化*/
		public initItems(autoLayOut: boolean = false): void
		{
			// for (var t in this._items)
			// {
			// 	this._items[t].destroy();
			// }

			this._items = [];

			for (var i: number = 0; i < Number.MAX_VALUE; i++)
			{
				var tempItem: any = this.getChildByName("item" + i);
				var display: egret.DisplayObject = tempItem as egret.DisplayObject;
				var item: ISelect = tempItem as ISelect;
				if (item == null)
				{
					break;
				}
				this._items.push(item);

				if (autoLayOut && i > 0)
				{
					tempItem = this._items[i - 1];
					var preItem: egret.DisplayObject = tempItem as egret.DisplayObject;
					if (this._direction == "horizontal")
					{
						display.x = preItem.x + preItem.width + this._space;
					}
					else
					{
						display.y = preItem.y + preItem.height + this._space;
					}
				}

				item.setSelected(i == this._selectedIndex);
				item.setClickHandler(this.itemClick, this, i);
			}
		}

		protected itemClick(index: number): void
		{
			this.selectedIndex = index;
		}

		/**所选按钮的索引，默认为-1*/
		public get selectedIndex(): number
		{
			return this._selectedIndex;
		}

		public set selectedIndex(value: number)
		{
			// if (this._selectedIndex != value)
			// {
			if (0 == this._items.length)
			{
				this._selectedIndex = -1;
			}
			this.setSelect(this._selectedIndex, false);
			this._selectedIndex = value;
			this.setSelect(this._selectedIndex, true);
			this.sendEvent(egret.Event.CHANGE);
			//兼容老版本
			// sendEvent(Event.SELECT);
			if (this._selectHandler != null)
			{
				this._selectHandler.execute(this._selectedIndex)
				// this._selectHandler.executeWith([_selectedIndex]);
			}
			// }
		}

		protected setSelect(index: number, selected: boolean): void
		{
			if (this._items && index > -1 && index < this._items.length)
			{
				this._items[index].setSelected(selected);// = selected;
			}
		}

		/**选择被改变时执行的处理器(默认返回参数index:int)*/
		public get selectHandler(): asf.CallBack
		{
			return this._selectHandler;
		}

		public set selectHandler(value: asf.CallBack)
		{
			this._selectHandler = value;
		}

		/**皮肤*/
		public get skin(): string
		{
			return this._skin;
		}

		public set skin(value: string)
		{
			if (this._skin != value)
			{
				this._skin = value;
				this.callLater(this.changeLabels, this);
			}
		}

		/**标签集合*/
		public get labels(): string
		{
			return this._labels;
		}

		public set labels(value: string)
		{
			if (this._labels != value)
			{
				this._labels = value;
				this.removeAllChild();
				this.callLater(this.changeLabels, this);
				if (Boolean(this._labels))
				{
					var a: string[] = this._labels.split(",");
					for (var i: number = 0, n: number = a.length; i < n; i++)
					{
						var item: egret.DisplayObject = this.createItem(this._skin, a[i]);
						item.name = "item" + i;
						this.addChild(item);
					}
				}
				this.initItems(true);
			}
		}

		protected createItem(skin: String, label: String): egret.DisplayObject
		{
			return null;
		}

		/**按钮标签颜色(格式:upColor,overColor,downColor,disableColor)*/
		public get labelColors(): string
		{
			return this._labelColors;
		}

		public set labelColors(value: string)
		{
			if (this._labelColors != value)
			{
				this._labelColors = value;
				this.callLater(this.changeLabels, this);
			}
		}

		/**按钮标签描边(格式:color,alpha,blurX,blurY,strength,quality)*/
		public get labelStroke(): string
		{
			return this._labelStroke;
		}

		public set labelStroke(value: string)
		{
			if (this._labelStroke != value)
			{
				this._labelStroke = value;
				this.callLater(this.changeLabels, this);
			}
		}

		/**按钮标签大小*/
		public get labelSize(): number
		{
			return this._labelSize;
		}

		public set labelSize(value: number)
		{
			if (this._labelSize != value)
			{
				this._labelSize = value;
				this.callLater(this.changeLabels, this);
			}
		}

		/**按钮标签粗细*/
		public get labelBold(): boolean
		{
			return this._labelBold;
		}

		public set labelBold(value: boolean)
		{
			if (this._labelBold != value)
			{
				this._labelBold = value;
				this.callLater(this.changeLabels, this);
			}
		}

		/**按钮标签边距(格式:左边距,上边距,右边距,下边距)*/
		public get labelMargin(): string
		{
			return this._labelMargin;
		}

		public set labelMargin(value: string)
		{
			if (this._labelMargin != value)
			{
				this._labelMargin = value;
				this.callLater(this.changeLabels, this);
			}
		}

		public set labelMargin2(value: string)
		{
			this._labelMargin2 = value;
		}

		/**布局方向*/
		public get direction(): string
		{
			return this._direction;
		}

		public set direction(value: string)
		{
			this._direction = value;
			this.callLater(this.changeLabels, this);
		}

		/**间隔*/
		public get space(): number
		{
			return this._space;
		}

		public set space(value: number)
		{
			this._space = value;
			this.callLater(this.changeLabels, this);
		}

		protected changeLabels(): void
		{
		}

		public commitMeasure(): void
		{
			this.exeCallLater(this.changeLabels, this);
		}

		/**按钮集合*/
		public get items(): ISelect[]
		{
			return this._items;
		}

		/**选择项*/
		public get selection(): ISelect
		{
			return this._selectedIndex > -1 && this._selectedIndex < this._items.length ? this._items[this._selectedIndex] : null;
		}

		public set selection(value: ISelect)
		{
			this.selectedIndex = this._items.indexOf(value);
		}

		public set dataSource(value: any)
		{
			this._dataSource = value;
			if (value instanceof Number || value instanceof String)
			{
				this.selectedIndex = Number(value);
			}
			else if (value instanceof Array)
			{
				this.labels = (value as String[]).join(",");
			}
			else
			{
				egret.superSetter(Group, this, "dataSource", value)
				// super.dataSource = value;
			}
		}

		public destroy(): void
		{
			this.removeLater(this.changeLabels, this);

			this._selectHandler = null;

			if (this._skin != null)
				this._skin = null;
			if (this._labels != null)
				this._labels = null;
			if (this._labelColors != null)
				this._labelColors = null;
			if (this._labelStroke != null)
				this._labelStroke = null;
			if (this._labelBold != null)
				this._labelBold = null;
			if (this._labelMargin != null)
				this._labelMargin = null;
			if (this._direction != null)
				this._direction = null;

			for (var i in this._items)
			{
				this._items[i].destroy();
			}
			this._items = null;

			super.destroy();
		}
	}
}