namespace morn
{
	/**
	 * 下拉菜单
	 */
	export class ComboBox
	{
		/**文本框离按钮左边的距离 |<--->口   ^   |*/
		public static LABEL_MARGIN_LEFT = 20;

		/**箭头右边框离按钮右边的距离 |     口   ^<->|*/
		public static ARROW_MARGIN_RIGHT = 16;

		/**内按钮与下拉框背景左边的距离 |<->口  |*/
		public static ITEM_MARGIN_LEFT = 16;

		/**内按钮与下拉框背景上边的距离*/
		public static ITEM_MARGIN_TOP = 15;


		private _skin: morn.Box;
		private _list: morn.ListBox;
		private _selectHandler: asf.CallBack
		private _label: Label;
		private _btn: Button;
		private _mc: Box;
		private _bg: morn.Image;
		private _arrow: morn.Image;

		private sizeNums: number = 3;

		public constructor(skin: morn.Box, btnItemRender?: any)
		{
			this._skin = skin;
			this._list = skin["list"];
			this._label = skin["nameLab"];
			this._btn = skin["btn"];
			this._mc = skin["mc"];
			this._bg = skin["bg"];
			this._arrow = skin["arrow"];

			this._list.itemRender = btnItemRender;
			this._list.selectHandler = new asf.CallBack(this.onSelectHandler, this);

			this._mc.visible = false;
			this._btn.ansTime = 0;

			this._label.text = "Label";
			this._btn.setClickHandler(this.onClickBtn, this)
			asf.App.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClickOutside, this);
			this.initSize();
		}

		private initSize(): void
		{
			this._mc.y = this._btn.height + this._btn.y;
			this._mc.x = (this._btn.width - this._bg.width) * 0.5;
			this._label.width = this._label.textField.width;
			this._arrow.x = this._btn.width - ComboBox.ARROW_MARGIN_RIGHT - this._arrow.width;
			this._list.height = 999;
			//this._list.x = 5;
			//this._list.width = this._w - 10;
			// this._list.height = this._h - 20;
		}

		/**设置按钮标签
		 * @param text 标签内容
		 */
		public setBtnText(text: string): void
		{
			this._label.text = text;
			this._label.width = this._label.textField.width;
			//文本宽度大于按钮右边框兼间距
			if (this._label.width > this._btn.width - ComboBox.LABEL_MARGIN_LEFT * 2)
			{
				this._btn.width = this._label.width + ComboBox.LABEL_MARGIN_LEFT * 2;
			}
			//文本框位于按钮并居中
			else
			{
				this._label.x = (this._btn.width - this._label.width) * 0.5;
			}
			this._arrow.x = this._btn.width - ComboBox.ARROW_MARGIN_RIGHT - this._arrow.width;
		}


		/**设置下拉按钮数据，同时会将标签按钮文本居中
		 * @param datas 下拉选择内容数据集
		 * @param showItemCount 打开下拉后显示多少个，设置后即变成滚动列表，默认为0则显示全部
		 * @param isUIFixed UI是否列表贴边，主要应付一态按钮，默认为false
		 * @param itemMarginLeft 内按钮与下拉框背景左边的距离
		 * @param itemMarginTop 内按钮与下拉框背景上边的距离
		 */
		public setData(datas: any[], showItemCount: number = 0, isUIFixed: boolean = false, itemMarginLeft?: number, itemMarginTop?: number)
		{
			{//先遍历所有item并取出最长那个
				this._list.dataSource = datas;
				var maxWidth: number = 0;
				var cell: ListBoxBaseItem = this._list.getSelectedCellByIndex(0);
				for (var i = 0; i < this._list.length; i++)
				{
					if (this._list.getSelectedCellByIndex(i).width > maxWidth)
					{
						maxWidth = this._list.getSelectedCellByIndex(i).width;
						cell = this._list.getSelectedCellByIndex(i);
					}
				}
			}
			//列表贴边系列，按钮偏移
			if (isUIFixed)
			{
				if (cell["btn"])
				{
					itemMarginLeft = cell["btn"].x;
					itemMarginTop = cell["btn"].y;
				}
				this._list.height = cell.height * this._list.length;
				this._list.width = maxWidth + (itemMarginLeft ? itemMarginLeft : ComboBox.ITEM_MARGIN_LEFT);
				this._list.y = ComboBox.ITEM_MARGIN_TOP;
				this._bg.height = this._list.height + (itemMarginTop ? itemMarginTop : ComboBox.ITEM_MARGIN_TOP) + ComboBox.ITEM_MARGIN_TOP;
				this._bg.width = this._list.width;
			}
			//列表不贴边系列
			else
			{
				this._list.height = cell.height * this._list.length;
				this._list.width = maxWidth;
				this._bg.height = this._list.height + (itemMarginTop ? itemMarginTop : ComboBox.ITEM_MARGIN_TOP) * 2;
				this._bg.width = this._list.width + (itemMarginLeft ? itemMarginLeft : ComboBox.ITEM_MARGIN_LEFT) * 2;
				this._list.x = itemMarginLeft ? itemMarginLeft : ComboBox.ITEM_MARGIN_LEFT;
				this._list.y = itemMarginTop ? itemMarginTop : ComboBox.ITEM_MARGIN_TOP;
			}
			//是滚动列表
			if (showItemCount != 0)
			{
				//贴边
				if (isUIFixed)
				{
					this._list.height = (cell.height - (itemMarginTop ? itemMarginTop : ComboBox.ITEM_MARGIN_TOP)) * showItemCount;
					this._list.y = ComboBox.ITEM_MARGIN_TOP;
					this._bg.height = this._list.height + 2 * ComboBox.ITEM_MARGIN_TOP;
				}
				//不贴边
				else
				{
					this._list.height = cell.height * showItemCount;
					this._bg.height = this._list.height + (itemMarginTop ? itemMarginTop : ComboBox.ITEM_MARGIN_TOP) * 2;
				}
			}
			this._list.updateList();

			this._btn.width = this._bg.width;
			this._label.x = (this._btn.width - this._label.width) * 0.5;
			this._mc.x = (this._btn.width - this._bg.width) * 0.5;
			this._arrow.x = this._btn.width - ComboBox.ARROW_MARGIN_RIGHT - this._arrow.width;
		}

		/**开关下拉菜单 */
		private onClickBtn(): void
		{
			//开
			if (!this._mc.visible)
			{
				this._mc.visible = true;
				this._arrow.scaleY = -1;
				// this._arrow.y += this._arrow.height;
			}
			//关
			else
			{
				this._mc.visible = false;
				this._arrow.scaleY = 1;
				// this._arrow.y -= this._arrow.height;
			}
		}

		/**点击外面关闭下拉框 */
		private onClickOutside(e: egret.TouchEvent): void
		{
			var mcStageX: number = this._mc.x;
			var mcStageY: number = this._mc.y;
			var up;

			if (this._mc.visible)
			{
				up = this._mc.parent;
				while (!(up instanceof egret.Stage))
				{
					mcStageX += up.x;
					mcStageY += up.y;
					up = up.parent;
				}
				if (e.stageX < mcStageX || e.stageX > mcStageX + this._mc.width || e.stageY < mcStageY - this._btn.height || e.stageY > mcStageY + this._mc.height)
				{
					this._mc.visible = false;
					this._arrow.scaleY = 1;
					// this._arrow.y -= this._arrow.height;
				}
			}
		}

		setSelectHandler(func: Function, thisObj?: Object, param?: any): void
		{
			this._selectHandler = new asf.CallBack(func, thisObj, param);
		}

		private onSelectHandler(index: number): void
		{
			this._label.text = this._list.getSelectedInfoByIndex(index) as string;
			if (this._selectHandler)
				this._selectHandler.execute(this._list.selectedIndex);
			this._mc.visible = false;
			this._arrow.scaleY = 1;
			// this._arrow.y -= this._arrow.height;
		}

		/**
				 * 设置选中的数据
				 */
		/*public getSelectInfo(): ComboboxInfo
		{
			return this._list.selectedInfo;
		}*/

		/**
				 * d当前选中的小标
				 */
		public getSelectIndex(): number
		{
			return this._list.selectedIndex;
		}

		/**
		 * 设置选中的小标
		 */
		public setSelectIndex(index: number): void
		{
			this._list.selectedIndex = index;
		}

		public setSizeNum(num: number): void
		{
			this.sizeNums = num;
		}

		public destroy(): void
		{
			asf.App.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClickOutside, this);
			if (this._selectHandler)
				delete this._selectHandler;
		}
		/*setData(datas: any[]): void
		{
			this._list.dataSource = datas;

			this._list.height = Math.min(this._list.measureHeight, this._h - 20);
		}*/
	}
}