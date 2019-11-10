namespace morn
{
	export class TreeList extends Box
	{
		private _container: Box;
		protected _scrollBar: ScrollBar;
		protected _treeVs: TreeListMain;


		protected _selectHandler: asf.CallBack;

		private _viewWidth: number;
		private _viewHeight: number;

		nowSelectMainIndex: number = -1;
		nowSelectSubIndex: number = -1;

		public constructor()
		{
			super();
		}

		/**预初始化，在此可以修改属性默认值*/
		protected preinitialize(): void
		{
			this._container = new Box;
			this.addChild(this._container);
		}

		protected createChildren(): void 
		{
			super.createChildren();

			this._treeVs = new TreeListMain(this._viewWidth, this._viewHeight);
			this._treeVs.tree = this;
			this._treeVs.rendViewHandle = asf.CallBack.create(function (): void
			{
				this.updateScrollBar();
			}, this)

			this._container.addChild(this._treeVs);

			this.mouseChildren = this.mouseEnabled = true;
		}

		public set selectHandler(value: asf.CallBack)
		{
			this._selectHandler = value;
			this._treeVs.selectHandler = this._selectHandler;
		}

		/**
		 * 是否只能展开1个主节点 
		 * @param value
		 * 
		 */
		public setOnlyOpenOne(value: boolean): void
		{
			this._treeVs.setOnlyOpenOne(value);
		}

		public getViewHeight(): number
		{
			return this._treeVs.getViewHeight();
		}

		/**
		 * 打开后不能关闭 
		 */
		public setMustOpenOne(value: boolean): void
		{
			this._treeVs.mustOpenOne = value;
		}

		/**
		 * 打开后自动选择第1个
		 */
		public setOpenSelectFirst(value: boolean): void
		{
			this._treeVs.openSelectFirst = value;
		}

		/**
		 * 主节点的样式,假如设置了，则无设置皮肤的默认使用这个皮肤
		 */
		public setMainItemRender(value: any): void
		{
			this._treeVs.mainItemRender = value;
		}

		/**
		 * 添加主节点的样式 
		 * @param view
		 * 
		 */
		public addItem(view: ITreeListMainItem): void
		{
			this._treeVs.addItem(view);
		}

		/**
		 * 设置每个子节点的内容 
		 * @param arr
		 * 
		 */
		public setContentData(arr: any[]): void
		{
			this._treeVs.setContentData(arr);
		}

		/**
		 * 通过默认样式设置主节点的内容，会清除原来的
		 * @param arr
		 * 
		 */
		public initMainData(arr: any[]): void
		{
			this._treeVs.initMainData(arr);
		}

		/**
		 * 更新主节点的数据，会无视样式直接赋值 
		 * @param arr
		 * 
		 */
		public updatetMainData(arr: any[]): void
		{
			this._treeVs.updatetMainData(arr);
		}

		/**
		 * 更新某个主节点的数据 
		 * @param index
		 * @param data
		 * 
		 */
		public updatetMainDataByIndex(index: number, data: any): void
		{
			this._treeVs.updatetMainDataByIndex(index, data);
		}

		/**
		 * 取消所有子节点的选中 
		 * 
		 */
		public cancelContentSelect(): void
		{
			this._treeVs.cancelContentSelect();
		}

		/**
		 * 删除所有主节点 
		 * 
		 */
		public removeAllItem(): void
		{
			this._treeVs.removeAllItem();
		}

		/**
		 * 删除某个主节点 
		 * @param view
		 * @param isDestroy
		 * 
		 */
		public removeItem(view: ITreeListMainItem, isDestroy: boolean = false): void
		{
			this._treeVs.removeItem(view, isDestroy);
		}

		/**
		 * 根据index删除主节点 
		 * @param index
		 * @param isDestroy
		 * 
		 */
		public removeItemByIndex(index: number, isDestroy: boolean = false): void
		{
			this._treeVs.removeItemByIndex(index, isDestroy);
		}


		/**
		 * 根据INDEX获取主节点 
		 * @param index
		 * @return 
		 * 
		 */
		public getItem(index: number): ITreeListMainItem
		{
			return this._treeVs.getItem(index);
		}

		/**
		 * 选中主节点，则是展开该节点 
		 * @param value
		 * 
		 */
		public setSelectIndex(value: number): void
		{
			this._treeVs.setSelectIndex(value);
		}

		/**
		 * 关闭某个主节点 
		 * @param value
		 * 
		 */
		public setCloseTreeIndex(value: number): void
		{
			this._treeVs.setCloseTreeIndex(value);
		}

		/**
		 * 删除主节点中某个自节点 
		 * @param value
		 * @param index
		 * 
		 */
		public removeTreeIndex(value: number, index: number = -1): void
		{
			this._treeVs.removeTreeIndex(value, index);
		}

		/**
		 * 更新主节点中某个自节点 
		 * @param value
		 * @param index
		 * 
		 */
		public updateTreeIndex(value: number, index: number = -1): void
		{
			this._treeVs.updateTreeIndex(value, index);
		}

		/**
		 * 获取主节点的某个节点的数据
		 * @param value
		 * @param index
		 * 
		 */
		public getTreeInfoIndex(value: number, index: number = -1): any
		{
			return this._treeVs.getTreeInfoIndex(value, index);
		}

		/**
		 * 打开主节点后选中自节点 
		 * @param value
		 * @param index
		 * 
		 */
		public openTreeIndex(value: number, index: number = -1): void
		{
			this._treeVs.openTreeIndex(value, index);
		}

		/**
		 * 更新 
		 * 
		 */
		public renderView(): void
		{
			this._treeVs.renderView();
		}

		public set width(value: number) 
		{
			egret.superSetter(TreeList, this, "width", value)
			if (this._treeVs) this._treeVs.setViewWidth(value);
			this.callLater(this.changeCells, this);
		}

		public set height(value: number)
		{
			egret.superSetter(TreeList, this, "height", value)
			if (this._treeVs) this._treeVs.setViewHeight(value);
			this.callLater(this.changeCells, this);
		}

		public get height(): number
		{
			return egret.superGetter(TreeList, this, "height")
		}

		public get width(): number
		{
			return egret.superGetter(TreeList, this, "width")
		}

		protected changeCells(): void 
		{
			if (this._scrollBar)
			{
				this._scrollBar.height = this.height;
				this._scrollBar.x = this.width - this._scrollBar.width;
			}
		}

		/**滚动条*/
		public getScrollBar(): ScrollBar 
		{
			return this._scrollBar;
		}

		/**滚动条皮肤*/
		public get vScrollBarSkin(): string 
		{
			return this._scrollBar.skin;
		}

		public set vScrollBarSkin(value: string) 
		{
			this.removeChildByName("scrollBar");
			this._scrollBar = new VScrollBar();
			this._scrollBar.skin = value;
			this._scrollBar.addEventListener(egret.Event.CHANGE, this.onScrollBarChange, this);
			this.initScrollBar();
		}

		private initScrollBar(): void
		{
			this._scrollBar.name = "scrollBar";
			this.addChild(this._scrollBar);

			this._scrollBar.foreverHide = true;
			// this._scrollBar.visible = false;
			this._scrollBar.autoHide = true;
			// this._scrollBar.pixelScroll = true;
			this._scrollBar.target = this._treeVs;
			// this._scrollBar.scrollSize = 5;
			// var contentH: number = this.contentHeight;
			// var showHeight: number = this._height


			// this._scrollBar.setScroll(0, 100, 0);
		}

		// public get contentHeight(): number
		// {
		// 	var max: number = 0;
		// 	for (var i: number = this.numChildren - 1; i > -1; i--)
		// 	{
		// 		var comp: egret.DisplayObject = this.getChildAt(i);
		// 		max = Math.max(comp.y + comp.height * comp.scaleY, max);
		// 	}
		// 	return max;
		// }

		private updateScrollBar(): void
		{
			// var contentH: number = this.contentHeight;
			// var showHeight: number = this._height

			// this._scrollBar.scrollSize = Math.max(this._height * 0.033, 1);
			// this._scrollBar.thumbPercent = showHeight / contentH;

			// this._scrollBar.visible = false;

			// var contentH: number = this.contentHeight;
			// var showHeight: number = this._height

			// this._scrollBar.setScroll(0, contentH - showHeight, 0);

			var showHeight: number = this._container.height;
			var contentH: number = this._treeVs.getViewHeight();
			var contentW: number = this._treeVs.getViewWidth();
			this._scrollBar.thumbPercent = contentH / showHeight;
			this._scrollBar.setScroll(0, showHeight - contentH, this._scrollBar.value);


			this._treeVs.scrollRect = new egret.Rectangle(0, 0, contentW, contentH);

			this._scrollBar.upDataScrollShow();
			if (this._scrollBar.value >= this._scrollBar.max)
			{
				this._scrollBar.upDataTargetContent()
			}
		}

		protected onScrollBarChange(e: egret.Event): void
		{
			var rect: egret.Rectangle = this._treeVs.scrollRect;
			if (rect)
			{
				var scroll: ScrollBar = e.currentTarget as ScrollBar;
				var start: number = Math.round(scroll.value);
				scroll.direction == ScrollBar.VERTICAL ? rect.y = start : rect.x = start;
				this._treeVs.scrollRect = rect;
			}
		}

		public destroy(): void
		{
			this._treeVs.destroy();

			if (this._selectHandler)
				this._selectHandler.destroy()
			this._selectHandler = null;

			if (this._scrollBar)
			{
				if (this._scrollBar.parent) this.removeChild(this._scrollBar);
				this._scrollBar.destroy();
				this._scrollBar = null;
			}

			super.destroy();
		}
	}
}