namespace morn
{
	/**列表*/
	export class ListBox extends Panel
	{
		/**间隔X*/
		protected _spaceX: number = 0;
		/**间隔Y*/
		protected _spaceY: number = 0;
		/**X的重复次数*/
		protected _repeatX: number = 1;

		protected _itemRender: any;
		// protected _list: ListBoxBaseItem[] = [];
		protected _listMap: asf.HashMap<string, ListBoxBaseItem>; //ListBoxBaseItem[] = [];
		protected _infoArr: any[] = [];
		protected _sourceInfoArr: any[] = [];

		protected _autoHideScrollBar: boolean = true;
		protected _isAutoHight: boolean = true;
		protected _mouseHandler: asf.CallBack;
		protected _selectHandler: asf.CallBack;

		/**点击这个list的回调 */
		protected _clickHandler: asf.CallBack;
		/**点击这个list的开始 */
		protected _beginHandler: asf.CallBack;
		protected _selectedIndex: number = -1;
		protected _isMeasureHeight: boolean = false;
		private _measureHeight: number = 0;
		private _measureWidth: number = 0;

		private _rectSp: Image;

		/** list自动显示到底层 **/
		public isAutoBottom: boolean;

		public scrollChangeHandler: asf.CallBack;
		/** list的池 **/
		protected pools: any[];

		/** 是否能点击子项来触发selectHandler **/
		public canClickList: boolean = true;
		/** 是否多选 **/
		public isMultiselect: boolean = false;
		/** 多选中的index **/
		multiselectIndex: number[];
		/**多选的条件函数 **/
		multiselectCondition: asf.CallBack;

		public constructor()
		{
			super();
			this._listMap = new asf.HashMap<string, ListBoxBaseItem>();
			this.pools = [];
			this.multiselectIndex = [];
		}

		protected createChildren(): void
		{
			super.createChildren();
			this._rectSp = new Image();
			// this._rectSp.url = Morn.PanelGraphicsUrl;
			this._rectSp.alpha = 0;
			this.addChild(this._rectSp);
		}

		public set vScrollBarSkin(value: string)
		{
			// super.vScrollBarSkin = value;
			egret.superSetter(ListBox, this, "vScrollBarSkin", value)
			if (this.vScrollBar) this.vScrollBar.autoHide = this._autoHideScrollBar;

			this.vScrollBar.changeHandler = new asf.CallBack(this.changeScrollBarHandler1, this);
		}

		public get vScrollBarSkin(): string
		{
			return egret.superGetter(ListBox, this, "vScrollBarSkin")
		}

		public set hScrollBarSkin(value: string)
		{
			egret.superSetter(ListBox, this, "hScrollBarSkin", value)
			if (this.hScrollBar) this.hScrollBar.autoHide = this._autoHideScrollBar;
			this.hScrollBar.changeHandler = new asf.CallBack(this.changeScrollBarHandler2, this);
		}

		/**水平滚动条皮肤*/
		public get hScrollBarSkin(): string
		{
			return egret.superGetter(ListBox, this, "hScrollBarSkin")
		}

		public set autoHideScrollBar(v: boolean)
		{
			this._autoHideScrollBar = v;
			if (this.vScrollBar) this.vScrollBar.autoHide = v;
		}

		public get autoHideScrollBar(): boolean
		{
			return this._autoHideScrollBar;
		}

		public get length(): number
		{
			return this._infoArr.length;
		}

		public set dataSource(value: any[])
		{
			this._sourceInfoArr = value.concat();
			// this._infoArr = [];
			// this._posInfoArr = [];
			this.updateList();
		}

		private clearAll(): void
		{
			// var item: ListBoxBaseItem;
			if (this._listMap)
			{
				this._listMap.forEach(function (item: ListBoxBaseItem): void
				{
					this.clearOne(item);
				}, this)
			}
			// for (item of this._list)
			// {
			// 	this.clearOne(item);
			// }
			this._measureWidth = 0;
			this._measureHeight = 0;
			// this._list = [];
			this._listMap = new asf.HashMap<string, ListBoxBaseItem>();
			this._infoArr = [];
			this._posInfoArr = [];

		}

		private clearOne(box: ListBoxBaseItem): void
		{
			this._listMap.remove(box.x + "_" + box.y);
			// box.removeEventListener(egret.TouchEvent.TOUCH_END, this.onMouse, this);
			box.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouse, this);
			box.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMouse, this);
			box.remove();
			box.clearPoolObj();
			this.pools.push(box);
			// asf.PoolMgr.release(box, this._itemRender);
		}

		private clickX: number;
		private clickY: number;
		private nowScrollValue: number;
		protected onMouse(e: egret.TouchEvent): void
		{
			if (!this.canClickList) return
			var cell: ListBoxBaseItem = e.currentTarget as ListBoxBaseItem;

			if (e.type == egret.TouchEvent.TOUCH_BEGIN)
			{
				// console.log("@@@@listbox TOUCH_BEGIN");
				if (this.vScrollBar)
				{
					this.nowScrollValue = this.vScrollBar.value;
				}
				else if (this.hScrollBar)
				{
					this.nowScrollValue = this.hScrollBar.value;
				}
				if (this._beginHandler)
				{
					this._beginHandler.execute(cell.id);
				}

				this.clickX = e.stageX;
				this.clickY = e.stageY;
			}
			else if (e.type == egret.TouchEvent.TOUCH_TAP)
			{
				// console.log("@@@@listbox TOUCH_END");
				// if ((!this.vScrollBar && !this.hScrollBar) || (this.vScrollBar && Math.abs(this.nowScrollValue - this.vScrollBar.value) < 10)
				// 	|| (this.hScrollBar && Math.abs(this.nowScrollValue - this.hScrollBar.value) < 10))
				if (Math.abs(e.stageX - this.clickX) < 10 && Math.abs(e.stageY - this.clickY) < 10)
				{
					if (cell.canSelected())
					{
						if (this.isMultiselect)
						{
							this.selectMulti(cell.id);
						}
						else
						{
							this.selectedIndex = cell.id;
						}

						if (cell.clickHandler)
						{
							cell.clickHandler.execute(e);
						}

						if (this.clickHandler)
						{
							this.clickHandler.execute(cell.id);
						}
					}
					e.stopPropagation();
				}
			}
			// else if (e.type == egret.TouchEvent.TOUCH_TAP)
			// {
			// 	console.log("@@@@listbox TOUCH_TAP");
			// 	if (this.clickHandler)
			// 	{
			// 		this.clickHandler.execute();
			// 	}
			// }

			if (this._mouseHandler)
				this._mouseHandler.execute(e, cell.id);
		}

		/**
		 * 设置多选状态
		 * index:cell的下标
		 * show：null是自动切换，非null是根据值
		 */
		public selectMulti(index: number, show: boolean = null): void
		{
			if (index != -1)
			{
				var cell: ListBoxBaseItem = this.getSelectedCellByIndex(index);
				if (!cell.canSelected())
				{
					index = this.selectedIndex;
				}
				//null的话，就自动切换选中状态
				var multiIndex: number = this.multiselectIndex.indexOf(index)
				if (show == null)
				{
					if (multiIndex == -1)
					{
						//无有选中就选中
						if (!this.multiselectCondition || this.multiselectCondition.execute(this.getSelectedInfoByIndex(index)))
						{
							if (cell)
								cell.selected = true;
							this.multiselectIndex.push(index);
						}
					}
					else
					{
						//有选中就取消
						if (cell)
							cell.selected = false;
						this.multiselectIndex.splice(multiIndex, 1)
					}
				}
				else
				{
					if (cell)
						cell.selected = show;
					if (show)
					{
						var checker: boolean = true;
						for (var i in this.multiselectIndex)
						{
							if (this.multiselectIndex[i] == index)
								checker = false;
						}
						if (checker)
							this.multiselectIndex.push(index);
					}
					else if (multiIndex > -1)
					{
						this.multiselectIndex.splice(multiIndex, 1);
					}
				}
			}
			this.selectedIndex = index;
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
		/**如果能横向滚动的话就移到选中的位置 */
		public hMoveToSelected(): void
		{
			if (this.selectedIndex != -1)
			{
				var totalSpaceX: number = (this.infoArr.length - 1) * this.spaceX;
				var cellLen: number = (this.measureWidth - totalSpaceX) / this.infoArr.length;
				this.hScrollBar.value = (cellLen + this.spaceX) * this.selectedIndex;
			}
		}

		/**横向移动到某个item*/
		public hMoveToIndex(index: number): void
		{
			index = index < 0 ? 0 : ((index >= this.infoArr.length) ? this.infoArr.length - 1 : index);
			var totalSpaceX: number = (this.infoArr.length - 1) * this.spaceX;
			var cellLen: number = (this.measureWidth - totalSpaceX) / this.infoArr.length;
			this.hScrollBar.value = (cellLen + this.spaceX) * index;
		}

		/** 获取当前滚动条的位置下标 竖向*/
		public getVCurrentIndex(): number
		{
			var value = this.vScrollBar.value;
			var infoArr = this.infoArr;
			var totalSpaceY: number = (infoArr.length - 1) * this.spaceY;
			var cellLen: number = (this.measureHeight - totalSpaceY) / infoArr.length;
			var index = Math.round(value / (cellLen + this.spaceY));
			if (index < 0) index = 0;
			if (index >= infoArr.length) index = infoArr.length - 1;
			return index;
		}

		/** 获取当前滚动条的位置下标 横向*/
		public getHCurrentIndex(): number
		{
			var value = this.hScrollBar.value;
			var infoArr = this.infoArr;
			var totalSpaceX: number = (infoArr.length - 1) * this.spaceX;
			var cellLen: number = (this.measureWidth - totalSpaceX) / infoArr.length;
			var index = Math.round(value / (cellLen + this.spaceX));
			if (index < 0) index = 0;
			if (index >= infoArr.length) index = infoArr.length - 1;
			return index;
		}


		/**如果能竖向滚动的话就移到选中的位置 */
		public vMoveToSelected(): void
		{
			if (this.selectedIndex != -1)
			{
				var totalSpaceY: number = (this.infoArr.length - 1) * this.spaceY;
				var cellLen: number = (this.measureHeight - totalSpaceY) / this.infoArr.length;
				this.vScrollBar.value = (cellLen + this.spaceY) * this.selectedIndex;
			}
		}

		/**纵向移动到某个item*/
		public vMoveToIndex(index: number): void
		{
			index = index < 0 ? 0 : ((index >= this.infoArr.length) ? this.infoArr.length - 1 : index);
			var totalSpaceY: number = (this.infoArr.length - 1) * this.spaceY;
			var cellLen: number = (this.measureHeight - totalSpaceY) / this.infoArr.length;
			this.vScrollBar.value = (cellLen + this.spaceY) * index;
		}

		/**
		 * 通过index更新数据
		 */
		public updateInfoByIndex(index: number, info: any): void
		{
			this._infoArr[index] = info;
			var cell: ListBoxBaseItem = this.getSelectedCellByIndex(index);
			if (cell)
			{
				cell.dataSource = info;
			}
		}

		/**
		 * 通过index更新cell的某个方法
		 */
		public updateCallbackByIndex(index: number, info: any, callback: string, ...args): void
		{
			this._infoArr[index] = info;
			var cell: ListBoxBaseItem = this.getSelectedCellByIndex(index);
			if (cell && cell[callback])
			{
				cell[callback].apply(cell, args);
			}
		}

		public getSelectedInfoByIndex(index: number): Object
		{
			if (this._infoArr.length > index)
			{
				return this._infoArr[index];
			}
			return null;
		}

		/**
		 * 根据坐标获取CELL
		 */
		private getCellByXY(x: number, y: number): ListBoxBaseItem
		{
			return this._listMap.get(x + "_" + y);
		}

		/**
		 * 根据Index获取Cell 
		 * @param index
		 * @return 
		 * 
		 */
		public getSelectedCellByIndex(index: number): ListBoxBaseItem
		{
			if (this._posInfoArr.length > index)
			{
				return this.getCellByXY(this._posInfoArr[index].x, this._posInfoArr[index].y);
			}
			return null;
		}

		/**
		 * 选中的单元格 
		 * @return 
		 * 
		 */
		public get selectedCell(): ListBoxBaseItem
		{
			if (this._posInfoArr.length > this._selectedIndex && this._selectedIndex >= 0)
			{
				return this.getCellByXY(this._posInfoArr[this._selectedIndex].x, this._posInfoArr[this._selectedIndex].y);
			}

			return null;
		}

		/**
		 * 选中的数据 
		 * @return 
		 * 
		 */
		public get selectedInfo(): any
		{
			if (this._infoArr.length > this._selectedIndex)
			{
				return this._infoArr[this._selectedIndex];
			}
			return null;
		}

		/**
		 * 更新单元格的多选状态
		 */
		protected updateMuitState(): void
		{
			if (this.isMultiselect)
			{
				this._listMap.forEach(function (cell: ListBoxBaseItem): void
				{
					var index: number = this.multiselectIndex.indexOf(cell.id)
					cell.selected = false;
					if (index != -1)
					{
						cell.selected = true;
					}
					else
					{
						cell.selected = false;
					}
				}, this)
			}
		}

		/**
		 * 更新单元格状态 
		 * @param index 选中的index
		 * @param show 选中的index的显示状态
		 * @param event 什么事件导致的
		 * 
		 */
		protected updateCellState(index: number, show: boolean, event: string = ""): void
		{
			if (!this.isMultiselect)
			{
				this._listMap.forEach(function (cell: ListBoxBaseItem): void
				{
					cell.selectedEvent = event;
					cell.selected = false;
					if (cell.id == index)
					{
						cell.selected = show;
					}

				}, this)

				if (this.selectedCell) this.selectedCell.selected = true;
			}
		}

		public set selectHandler(value: asf.CallBack)
		{
			this._selectHandler = value;
		}

		/**X方向单元格数量*/
		public get repeatX(): number
		{
			return this._repeatX;
		}

		public set repeatX(value: number)
		{
			if (this._repeatX != Math.max(value, 1))
			{
				this._repeatX = value;
				this.callLater(this.updateList, this)
			}
		}

		/**X方向单元格间隔*/
		public get spaceX(): number
		{
			return this._spaceX;
		}

		public set spaceX(value: number)
		{
			if (this._spaceX != value)
			{
				this._spaceX = value;
				this.callLater(this.updateList, this)
			}
		}

		/**Y方向单元格间隔*/
		public get spaceY(): number
		{
			return this._spaceY;
		}

		public set spaceY(value: number)
		{
			if (this._spaceY != value)
			{
				this._spaceY = value;
				this.callLater(this.updateList, this)
			}
		}

		/**
		 * 通过index删除对应列表中的数据和cell
		 */
		public removeItemByIndex(index: number): void
		{
			this._sourceInfoArr.splice(index, 1);
			this.updateList();
		}

		/**
		 * 设置渲染器 
		 * @param value
		 * 
		 */
		public set itemRender(value: any)
		{
			if (this._itemRender && this._itemRender != value)
			{
				//不等于的情况，将旧的清除
				// asf.PoolMgr.clearPool(this._itemRender, true)//清除对象池中的数据
				this.clearPool();
			}
			this._itemRender = value;
			this.pools = [];
			// asf.PoolMgr.regClass(value, 100);
			//			callLater(updateList)
			this.clearAll();
			this.updateList();
		}

		private clearPool(): void
		{
			for (var i: number = 0; i < this.pools.length; i++)
			{
				asf.DestroyUtils.destroy(this.pools[i]);
			}
		}

		/**
		 * 创建cell
		 */
		private createCell(): ListBoxBaseItem
		{
			var item: ListBoxBaseItem = this.pools.shift();//asf.PoolMgr.create(this._itemRender);//new this._itemRender();
			if (!item)
			{
				item = new this._itemRender();
			}
			item.list = this;

			// if (this._itemClickHandler) item.itemClickHandler = this._itemClickHandler;

			// item.addEventListener(egret.TouchEvent.TOUCH_END, this.onMouse, this);
			item.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouse, this);
			item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMouse, this);

			return item;
		}

		private nowCellHeight: number = 0;
		private nowCellWidth: number = 0
		private _posInfoArr: ListBoxPosInfo[] = [];
		/**
		 * 更新列表 
		 * 
		 */
		public updateList(): void
		{
			if (!this._itemRender)
				return;

			var _h: number = 0;
			var w: number = 0;
			var xx: number = 0;

			var itemTemp: ListBoxBaseItem = new this._itemRender();
			this.nowCellHeight = itemTemp.height;
			this.nowCellWidth = itemTemp.width;

			this._measureHeight = 0;
			this._measureWidth = 0;

			for (var i: number = 0; i < this._sourceInfoArr.length; i++)
			{
				if (this._infoArr[i] != null && this._infoArr[i] != undefined)
				{
					//有数据就更新
					this._infoArr[i] = this._sourceInfoArr[i];
				}
				else
				{
					// soda更改，支持null。根据新传的数据源的下标存放
					this._infoArr[i] = this._sourceInfoArr[i];
					//null的主要处理是因为需要生成ListBoxPosInfo对象
					this._posInfoArr[i] = new ListBoxPosInfo();
					//无数据就添加
					//下面是原文龙写的，不支持null
					// this._infoArr.push(this._sourceInfoArr[i]);
					// this._posInfoArr.push(new ListBoxPosInfo());
				}
				var posInfo: ListBoxPosInfo = this._posInfoArr[i];
				posInfo.data = this._infoArr[i];
				if (xx < this._repeatX)
				{
					posInfo.x = w;
					posInfo.y = _h
					this.nowCellHeight = itemTemp.height;
				}
				else
				{
					xx = 0;
					w = 0;
					_h += this.nowCellHeight + this._spaceY;
					posInfo.x = w;
					posInfo.y = _h;
				}
				w += this.nowCellWidth + this._spaceX;
				xx++;

				this._measureHeight = Math.max(this._measureHeight, _h + this.nowCellHeight);
				this._measureWidth = Math.max(this._measureWidth, w - this._spaceX);
			}

			var n: number = this._infoArr.length - this._sourceInfoArr.length;
			if (n > 0)
			{
				//源数据多余新数据，就要删除多出的那部分
				this._infoArr.splice(this._sourceInfoArr.length);
				var delArr: ListBoxPosInfo[] = this._posInfoArr.splice(this._sourceInfoArr.length);
				var posInfo: ListBoxPosInfo;
				for (posInfo of delArr)
				{
					let item = this.getCellByXY(posInfo.x, posInfo.y);
					if (item) this.clearOne(item);
				}
			}

			this._rectSp.height = this._measureHeight;
			this._rectSp.width = this._measureWidth
			this.updateVisualRange(0, 0, true);
			if (this.isAutoBottom)
			{
				//自动到最后
				asf.App.render.renderAll();
				this.scrollTo(0, this._measureHeight + 999)
			}
			else
			{
				this.refresh();
			}

			itemTemp.destroy();
		}

		/**
		 * 滚动后的回调，这时候更新可视范围
		 */
		protected changeScrollBarHandler1(): void
		{
			var y: number = this.vScrollBar ? this.vScrollBar.value : 0;
			var x: number = this.hScrollBar ? this.hScrollBar.value : 0
			this.updateVisualRange(x, y);

			if (this.scrollChangeHandler)
			{
				this.scrollChangeHandler.execute(this.vScrollBar.value);
			}
		}

		/**
		 * 滚动后的回调，这时候更新可视范围
		 */
		protected changeScrollBarHandler2(): void
		{
			var y: number = this.vScrollBar ? this.vScrollBar.value : 0;
			var x: number = this.hScrollBar ? this.hScrollBar.value : 0
			this.updateVisualRange(x, y);

			if (this.scrollChangeHandler)
			{
				this.scrollChangeHandler.execute(this.hScrollBar.value);
			}
		}

		private _nowShowPosX: number = NaN;
		private _nowShowPosY: number = NaN;
		/**
		 * 更新可视范围
		 */
		private updateVisualRange(x: number, y: number, force: boolean = false): void
		{
			var tempNowShowPosX: number = Math.floor(x / (this.nowCellWidth + this._spaceX));
			var tempNowShowPosY: number = Math.floor(y / (this.nowCellHeight + this._spaceY));

			if (force || tempNowShowPosX != this._nowShowPosX || tempNowShowPosY != this._nowShowPosY)
			{
				// console.log("_nowShowPosX:       " + tempNowShowPosX);
				// console.log("_nowShowPosY:       " + tempNowShowPosY);
				this._nowShowPosX = tempNowShowPosX;
				this._nowShowPosY = tempNowShowPosY;
				var len: number = this._posInfoArr.length;
				for (var i: number = 0; i < len; i++)
				{
					var item: ListBoxBaseItem;
					var posY: number = this._posInfoArr[i].y - y
					var posX: number = this._posInfoArr[i].x - x;
					var key: string = this._posInfoArr[i].x + "_" + this._posInfoArr[i].y
					// if (i == 10)
					// {
					// 	console.log("10")
					// }
					if (posY + this.nowCellHeight + this._spaceY >= -(this.nowCellHeight + this._spaceY) && posY <= this.height + (this.nowCellHeight + this._spaceY) && posX + this.nowCellWidth + this._spaceX >= 0 && posX <= this.width)
					{
						// if (i == 10)
						// {
						// 	console.log("10")
						// }
						if (!this._listMap.hasKey(key))
						{
							item = this.createCell();
							item.x = this._posInfoArr[i].x;
							item.y = this._posInfoArr[i].y;
							this._listMap.put(key, item);
						}
						item = this._listMap.get(key);
						item.id = i;
						this.addChildAt(item, item.id);
						item.dataSource = this._posInfoArr[i].data;
					}
					else
					{
						item = this._listMap.get(key);
						if (item)
						{
							this.clearOne(item)
						}
					}
				}

				this.updateCellState(this._selectedIndex, true);
				this.updateMuitState();
			}
		}

		/**
		 * 是否自动按照高度排列 
		 * @param value
		 * 
		 */
		public get isAutoHight(): boolean
		{
			return this._isAutoHight;
		}

		/**
		 * 是否自动按照高度排列 
		 * @param value
		 * 
		 */
		public set isAutoHight(value: boolean)
		{
			this._isAutoHight = value;
			this.callLater(this.updateList, this)
		}

		public set mouseHandler(value: asf.CallBack)
		{
			this._mouseHandler = value;
		}

		/**点击list回调*/
		public set clickHandler(value: asf.CallBack)
		{
			this._clickHandler = value;
		}
		public get clickHandler(): asf.CallBack
		{
			return this._clickHandler;
		}

		public destroy(): void
		{
			// if (this._clickHandler)
			// 	this._clickHandler.destroy();
			this._clickHandler = null;

			if (this._mouseHandler)
				this._mouseHandler.destroy();
			this._mouseHandler = null;

			if (this._selectHandler)
				this._selectHandler.destroy()
			this._selectHandler = null;

			this.clearAll();
			// asf.PoolMgr.clearPool(this._itemRender, true)//清除对象池中的数据
			this.clearPool();
			this._listMap = null;
			this._infoArr = null;
			this._itemRender = null;

			if (this._rectSp)
			{
				this._rectSp.destroy();
				this._rectSp = null;
			}
			this.removeLater(this.updateList, this);

			if (this.scrollChangeHandler)
			{
				this.scrollChangeHandler = null;
			}

			this.multiselectIndex = null;
			this.multiselectCondition = null;

			super.destroy();
		}

		/**
		 * 是否整个list做自适应 
		 * @return 
		 * 
		 */
		public get isMeasureHeight(): boolean
		{
			return this._isMeasureHeight;
		}

		public set isMeasureHeight(value: boolean)
		{
			this._isMeasureHeight = value;
		}

		public get infoArr(): any[]
		{
			return this._infoArr;
		}

		public get measureWidth(): number
		{
			return this._measureWidth;
		}

		public set measureWidth(value: number)
		{
			this._measureWidth = value;
		}

		public get measureHeight(): number
		{
			return this._measureHeight;
		}
	}

	export class ListBoxPosInfo
	{
		data: any;
		x: number;
		y: number;
	}
}