namespace morn
{
	export class ViewStack extends Box
	{
		protected _items: egret.DisplayObject[]
		protected _setIndexHandler: asf.CallBack;
		protected _selectedIndex: number = -1;
		public constructor()
		{
			super();
		}

		/**预初始化，在此可以修改属性默认值*/
		protected preinitialize(): void
		{
			super.preinitialize();
			// this._setIndexHandler = new asf.CallBack(this.setIndex, this)
		}

		/**批量设置视图*/
		public setItems(views: egret.DisplayObject[]): void
		{
			this.removeAllChild();
			var index: number = 0;
			for (var i: number = 0, n: number = views.length; i < n; i++)
			{
				var item: egret.DisplayObject = views[i];
				if (item)
				{
					item.name = "item" + index;
					this.addChild(item);
					index++;
				}
			}
			this.initItems();
		}

		/**增加视图*/
		public addItem(view: egret.DisplayObject): void
		{
			view.name = "item" + this._items.length;
			this.addChild(view);
			this.initItems();
		}

		/**初始化视图*/
		public initItems(): void
		{
			this._items = [];
			for (var i: number = 0; i < Number.MAX_VALUE; i++)
			{
				var item: egret.DisplayObject = this.getChildByName("item" + i);
				if (item == null)
				{
					break;
				}
				this._items.push(item);
				item.visible = (i == this._selectedIndex);
			}
		}

		/**当前视图索引*/
		public get selectedIndex(): number
		{
			return this._selectedIndex;
		}

		public set selectedIndex(value: number)
		{
			// if (this._selectedIndex != value)
			// {
			//this.setSelect(this._selectedIndex, false);
			this._selectedIndex = value;
			this.setSelect(this._selectedIndex);

			if (this._setIndexHandler)
			{
				this._setIndexHandler.execute(this._selectedIndex);
			}
			// }
		}

		protected setSelect(index: number): void
		{
			if (this._items)
			{
				for (var item of this._items)
				{
					if (item == this._items[index])
						item.visible = true;
					else
						item.visible = false;
				}

			}
		}

		/**选择项*/
		public get selection(): egret.DisplayObject
		{
			return this._selectedIndex > -1 && this._selectedIndex < this._items.length ? this._items[this._selectedIndex] : null;
		}

		public set selection(value: egret.DisplayObject)
		{
			this.selectedIndex = this._items.indexOf(value);
		}

		/**索引设置处理器(默认接收参数index:int)*/
		public get setIndexHandler(): asf.CallBack
		{
			return this._setIndexHandler;
		}

		public set setIndexHandler(value: asf.CallBack)
		{
			this._setIndexHandler = value;
		}

		protected setIndex(index: number): void
		{
			this.selectedIndex = index;
		}

		/**视图集合*/
		public get items(): egret.DisplayObject[]
		{
			return this._items;
		}

		public set dataSource(value: any)
		{
			this._dataSource = value;
			if (value instanceof Number || value instanceof String)
			{
				this.selectedIndex = Number(value);
			}
			else
			{
				egret.superSetter(ViewStack, this, "dataSource", value)
			}
		}

		public destroy(): void
		{
			this._items.length = 0;
			this._items = null;
			if (this._setIndexHandler != null)
			{
				// this._setIndexHandler.destroy();
				this._setIndexHandler = null;
			}
			super.destroy();
		}
	}
}