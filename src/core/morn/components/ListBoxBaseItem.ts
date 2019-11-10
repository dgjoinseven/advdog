namespace morn
{
	import GameFilter = asf.GameFilter;
	/**列表的渲染器*/
	export class ListBoxBaseItem extends Box
	{
		protected _skin: Box;
		public id: number;

		protected _itemClickHandler: asf.CallBack;
		protected _clickHandler: asf.CallBack;
		protected _selected: boolean = false;
		protected _enable: boolean;

		public list: ListBox;

		public constructor()
		{
			super();
			this.enable = true;
		}

		public get enable(): boolean
		{
			return this._enable;
		}

		public set enable(value: boolean)
		{
			this._enable = value;

			if (value)
			{
				if (!this._clickHandler)
					this._clickHandler = new asf.CallBack(this.onClickHandler, this);
				this.filters = [];
			}
			else
			{
				this._clickHandler = null;
				this.filters = [GameFilter.GrayFilter];
			}
		}

		/**在此创建组件子对象*/
		protected createChildren(): void
		{
			// if (this._skin) this.addChild(this._skin);
			// this._clickHandler = new asf.CallBack(this.onClickHandler, this);
		}

		public canSelected(): boolean
		{
			return true;
		}


		/**
		 * 因为什么鼠标事件而选中，空字符串就是selected，其余2个是MouseEvent.ROLL_OVER，MouseEvent.ROLL_OUT 
		 */
		protected _selectedEvent: String = "";
		public get selected(): boolean
		{
			return this._selected;
		}

		public set selected(value: boolean)
		{
			this._selected = value;
		}

		public get clickHandler(): asf.CallBack 
		{
			return this._clickHandler;
		}

		protected onClickHandler(e: egret.TouchEvent): void 
		{
		}

		public destroy(): void
		{
			if (this._itemClickHandler)
				this._itemClickHandler.destroy();
			this._itemClickHandler = null;
			if (this._clickHandler)
				this._clickHandler.destroy();
			this._clickHandler = null;
			if (this._skin)
			{
				this._skin.remove();
			}
			this._skin = null;
			this.list = null;
			super.destroy();
		}

		public set itemClickHandler(value: asf.CallBack)
		{
			this._itemClickHandler = value;
		}

		public set selectedEvent(value: string)
		{
			this._selectedEvent = value;
		}

		public remove(): void
		{
			super.remove();
			this.enable = true;
		}

		//清理对象池中的值
		public clearPoolObj(): void
		{

			if (this._guide != "")
				GuideMgr.getInstance().remove(this._guide);
			this._guide = "";
		}
	}
}