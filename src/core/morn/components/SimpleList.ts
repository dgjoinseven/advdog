namespace morn
{
	/**简单列表，这个列表不能进行动态添加，是固定摆的，只是具备list特性*/
	export class SimpleList extends Box
	{
		protected _infoArr: any[] = [];
		protected _itemArr: Component[] = [];
		protected _selectedIndex: number = -1;
		protected _renderHanlder: asf.CallBack;
		protected _selectRenderHandler: asf.CallBack;
		protected _selectHandler: asf.CallBack;
		protected _cells: SimpleListItem[] = [];
		protected _itemrender: any;
		public constructor()
		{
			super();
		}

		protected initialize(): void 
		{
			this.init();
		}

		public init(_itemrender?: any): void
		{
			if (this._itemArr)
			{
				for (var i: number = 0; i < this._itemArr.length; i++)
				{
					this._itemArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMouse, this);
				}
			}
			this._infoArr = null;
			this._itemArr = null;
			this._itemrender = _itemrender;
			this.initItem();
		}

		protected initItem(): void
		{
			var i: number = 0;
			var item: Component;
			this._itemArr = [];
			this._infoArr = [];
			while (true)
			{
				item = this.getChildByName("item" + i) as Component;
				if (!item)
				{
					break;
				}
				item.tag = i;
				item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMouse, this);
				this._itemArr.push(item);
				i++;
			}
		}

		protected onMouse(e: MouseEvent): void
		{
			var temp: any = e.currentTarget;
			var cell: Component = temp as Component;
			if (e.type == egret.TouchEvent.TOUCH_TAP)
			{
				this.selectedIndex = Number(cell.tag);
			}
		}

		public get selectedIndex(): number
		{
			return this._selectedIndex;
		}

		public set selectedIndex(value: number)
		{
			this._selectedIndex = value;

			this.updateCellState(this._selectedIndex, true);
			if (this._selectHandler)
			{
				this._selectHandler.execute(this._selectedIndex);
			}
		}

		/**
		 * 更新单元格状态 
		 * @param index 选中的index
		 * @param show 选中的index的显示状态
		 * @param event 什么事件导致的
		 * 
		 */
		protected updateCellState(index: number, show: Boolean, event: String = ""): void
		{
			for (var i: number = 0; i < this._cells.length; i++)
			{
				if (i == index)
				{
					this._cells[i].selected = true
				}
				else
				{
					this._cells[i].selected = false;
				}
			}

			if (!this._selectRenderHandler) return;
			for (var i: number = 0; i < this._itemArr.length; i++)
			{
				if (i == index)
				{
					this._selectRenderHandler.execute(this._itemArr[i], true);
				}
				else
				{
					this._selectRenderHandler.execute(this._itemArr[i], false);
				}
			}
		}

		public set dataSource(value: any)
		{
			this._infoArr = value;
			for (var i: number = 0; i < this._infoArr.length; i++)
			{
				if (this._itemArr[i])
				{
					this.updateInfoByIndex(i, this._infoArr[i]);
				}
			}
		}

		/**
		 * 根据index更新对应的数据 
		 * @param index
		 * @param info
		 * 
		 */
		public updateInfoByIndex(index: number, info: any): void
		{
			this._infoArr[index] = info;
			var item: Component = this.getSelectedCellByIndex(index);
			if (this.renderHanlder)
			{
				this.renderHanlder.execute(item, info);
			}
			else
			{
				var cell: SimpleListItem = this._cells[item.tag];
				if (!cell)
				{
					cell = new this._itemrender(item);
					this._cells[item.tag] = cell;
				}
				cell.dataSource = info;
			}
		}

		public get selectHandler(): asf.CallBack
		{
			return this._selectHandler;
		}

		public set selectHandler(value: asf.CallBack)
		{
			this._selectHandler = value;
		}

		public get renderHanlder(): asf.CallBack
		{
			return this._renderHanlder;
		}

		public set renderHanlder(value: asf.CallBack)
		{
			this._renderHanlder = value;
		}

		public get selectRenderHandler(): asf.CallBack
		{
			return this._selectRenderHandler;
		}

		public set selectRenderHandler(value: asf.CallBack)
		{
			this._selectRenderHandler = value;
		}

		/**
		 * 根据index获取数据 
		 * @param index
		 * @return 
		 * 
		 */
		public getSelectedInfoByIndex(index: number): Object
		{
			if (this._infoArr.length > index)
			{
				return this._infoArr[index];
			}
			return null;
		}

		/**
		 * 根据Index获取Cell 
		 * @param index
		 * @return 
		 * 
		 */
		public getSelectedCellByIndex(index: number): Component
		{
			if (this._itemArr.length > index)
			{
				return this._itemArr[index];
			}
			return null;
		}

		/**
		 * 选中的单元格 
		 * @return 
		 * 
		 */
		public get selectedCell(): Component
		{
			if (this._itemArr.length > this._selectedIndex)
			{
				return this._itemArr[this._selectedIndex];
			}
			return null;
		}

		/**
		 * 选中的数据 
		 * @return 
		 * 
		 */
		public get selectedInfo(): Object
		{
			if (this._infoArr.length > this._selectedIndex)
			{
				return this._infoArr[this._selectedIndex];
			}
			return null;
		}

		public destroy(): void
		{
			for (var i: number = 0; i < this._itemArr.length; i++)
			{
				this._itemArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMouse, this);
			}
			this._infoArr = null;
			this._itemArr = null;

			for (var i: number = 0; i < this._cells.length; i++)
			{
				this._cells[i].destroy();
			}
			this._cells = null;

			if (this._renderHanlder) this._renderHanlder.destroy();
			if (this._selectRenderHandler) this._selectRenderHandler.destroy();
			if (this._selectHandler) this._selectHandler.destroy();

			this._renderHanlder = null;
			this._selectHandler = null;
			this._selectRenderHandler = null;

			super.destroy();
		}
	}

	export class SimpleListItem
	{
		protected _skin: Component;
		protected _selected: boolean = false;
		public constructor(skin: Component)
		{
			this._skin = skin;
			this.init();
		}

		public get skin(): Component
		{
			return this._skin
		}

		public init(): void
		{

		}

		public get selected(): boolean
		{
			return this._selected;
		}

		public set selected(value: boolean)
		{
			this._selected = value;
		}

		public set dataSource(value: any)
		{
		}

		public destroy(): void
		{
		}
	}
}