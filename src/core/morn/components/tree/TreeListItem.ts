namespace morn
{
	export class TreeListItem<C extends Box> extends Box implements ITreeListMainItem
	{
		tree: TreeList;
		mainIndex: number;
		/**
		 * 主节点的皮肤
		 */
		protected _skin: C;
		/**
		 * 子节点的皮肤类
		 */
		protected _itemRender: any;

		protected _contentMask: ShapeMc;
		protected _contentMc: egret.Sprite;
		protected _contentViewHeight: number = 0;
		protected _contentViewWidth: number = 0;
		protected _contentMeasureHeight: number = 0;
		protected _select: boolean = false;
		protected _notOpen: boolean = false;
		protected _selectIndex: number = -1;


		protected currentSelect: ITreeListSubItem;

		protected _selectHandler: asf.CallBack;

		public constructor()
		{
			super();
		}

		protected init(): void
		{
			if (this._skin == null)
			{
				throw new Error("要先new 一个bar对象")
			}
			this.addChild(this._skin);
			this._contentMc = new egret.Sprite();
			this._contentMc.y = this._skin.height;
			this.addChild(this._contentMc);
			this._contentMask = new ShapeMc();
			this._contentMask.y = this._contentMc.y
			this._contentMask.x = this._contentMc.x
			//_contentMc.scrollRect = new Rectangle(0,0,0,0);
			this._contentMc.mask = this._contentMask;
			this.addChild(this._contentMask);
		}

		public setData(value: any): void
		{
			//子类实现 
		}

		protected selectedHandler(): void
		{
			// 子类实现，改变选择状态的时候要做什么事。
		}

		protected notOpenHandler(): void
		{
			// 子类实现，当不能打开时的处理
		}

		public getSelected(): boolean
		{
			return this._select;
		}

		/**
		 * 删除子节点的某个元素 
		 * @param index
		 * 
		 */
		public removeTreeIndex(index: number): void
		{
			var item: ITreeListSubItem = this.getTreeItem(index);
			if (item)
			{
				var box: Box = asf.TypeofUtils.asAny(item);
				this._contentMc.removeChild(box);
				box.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onItemBegin, this);
				box.removeEventListener(egret.TouchEvent.TOUCH_END, this.onItemSelectHandler, this);
				box.destroy();
			}
			this.updateItemPos();
		}

		/**
		 * 更新子节点的某个元素 
		 * @param index
		 * 
		 */
		public updateTreeIndex(index: number, data: any): void
		{
			var item: ITreeListSubItem = this.getTreeItem(index);
			if (item)
			{
				item.setData(data);
				if (this.tree.nowSelectMainIndex == item.mainIndex && this.tree.nowSelectSubIndex == item.index)
				{
					this.selectIndex(item.index);
				}
			}
		}

		/**
		 * 获取子节点的某个数据 
		 * @param index
		 * 
		 */
		public getTreeIndex(index: number): Object
		{
			var item: ITreeListSubItem = this.getTreeItem(index);
			if (item)
			{
				return item.getData();
			}
			return null;
		}

		public getTreeItem(index: number): ITreeListSubItem
		{
			if (this._contentMc.numChildren > index)
			{
				this._contentMc.numChildren
				var item: ITreeListSubItem = asf.TypeofUtils.asAny(this._contentMc.getChildAt(index))
				if (item)
				{
					return item;
				}
			}
			return null;
		}

		public setSelected(value: boolean): void
		{
			if (this._select != value)
			{
				this._select = value;
				this.selectedHandler();
				this.upDataRect();
			}
		}

		public selectIndex(s: number): void
		{
			if (this._contentMc.numChildren > s)
			{
				var i: number = 0;
				var item: any
				while (i < this._contentMc.numChildren)
				{
					item = this._contentMc.getChildAt(s);
					if (item)
					{
						item.selected = false;
					}
					i++;
				}

				item = this._contentMc.getChildAt(s);
				if (item)
				{
					item.selected = true;
					this.currentSelect = item as ITreeListSubItem;
					this.currentSelect.setSelected(true);
					this.currentSelect.tree.nowSelectMainIndex = this.currentSelect.mainIndex;
					this.currentSelect.tree.nowSelectSubIndex = this.currentSelect.index;
					if (this._selectHandler)
					{
						this._selectHandler.execute(this.currentSelect.getData());
					}
				}
			}
		}

		public getNotOpen(): boolean
		{
			return this._notOpen;
		}

		public setNotOpen(value: boolean): void
		{
			if (this._notOpen != value)
			{
				this._notOpen = value;
				this.notOpenHandler();
			}
		}

		public getBar(): C
		{
			return this._skin;
		}

		public getBarHeight(): number
		{
			return this._skin.height;
		}

		/**
		 *可视高度 
		 * @return 
		 * 
		 */
		public getContentViewHeight(): number
		{
			return this._contentViewHeight;
		}

		/**
		 *内容的真实高度 
		 * @return 
		 * 
		 */
		public getContentMeasureHeight(): number
		{
			return this._contentMeasureHeight;
		}

		public setContentViewHeight(value: number): void
		{
			if (this._contentViewHeight != value)
			{
				this._contentViewHeight = value;
				this._contentMask.height = this._contentViewHeight;
			}
		}

		public setContentViewWidth(value: number): void
		{
			if (this._contentViewWidth != value)
			{
				this._contentViewWidth = value;
				this._contentMask.width = this._contentViewWidth;
			}

		}

		public cancelContentSelect(): void
		{
			if (this.currentSelect && this.currentSelect.getSelected())
			{
				this.currentSelect.setSelected(false);
			}
		}

		public setContentData(value: any): void
		{
			//子类实现，对窗口加item对象，和初始化数据
			this.currentSelect = null;
			var item: ITreeListSubItem;
			var disp: Box;
			while (this._contentMc.numChildren > 0)
			{
				item = asf.TypeofUtils.asAny(this._contentMc.removeChildAt(0))//; as ITreeListSubItem;
				disp = asf.TypeofUtils.asAny(item);
				disp.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onItemBegin, this);
				disp.removeEventListener(egret.TouchEvent.TOUCH_END, this.onItemSelectHandler, this);
				disp.destroy();
				item = null;
			}

			if (!value)
			{
				this.updateItemPos();
				return;
			}

			for (var i: number = 0; i < value.length; i++) 
			{
				item = new this._itemRender();//TreeListSubItem();
				item.tree = this.tree;
				item.mainIndex = this.mainIndex;
				item.index = i;
				disp = asf.TypeofUtils.asAny(item);// item as Box;
				this._contentMc.addChild(disp);
				item.setData(value[i]);
				if (this.tree.nowSelectMainIndex == item.mainIndex && this.tree.nowSelectSubIndex == item.index)
				{
					this.selectIndex(item.index);
				}
				//				disp.y = (_contentMc.numChildren - 1) * disp.height;
				disp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onItemBegin, this);
				disp.addEventListener(egret.TouchEvent.TOUCH_END, this.onItemSelectHandler, this);
			}
			this.updateItemPos();
		}

		protected updateItemPos(): void
		{
			for (var i: number = 0; i < this._contentMc.numChildren; i++) 
			{
				var item: Box = this._contentMc.getChildAt(i) as Box;
				item.y = i * item.height;
			}
			this.rendHeight();
		}

		private clickX: number = 0;
		private clickY: number = 0;
		protected onItemBegin(e: egret.TouchEvent): void
		{
			this.clickX = e.stageX;
			this.clickY = e.stageY;
		}

		protected onItemSelectHandler(event: egret.TouchEvent): void
		{
			if (event.currentTarget instanceof this._itemRender)
			{
				if (Math.abs(event.stageX - this.clickX) < 10 && Math.abs(event.stageY - this.clickY) < 10)
				{
					if (this.currentSelect)
					{
						this.currentSelect.setSelected(false);
						this.currentSelect = null;
					}
					(this.parent.parent as TreeListMain).cancelContentSelect();
					this.currentSelect = asf.TypeofUtils.asAny(event.currentTarget);
					this.currentSelect.setSelected(true);
					this.currentSelect.tree.nowSelectMainIndex = this.currentSelect.mainIndex;
					this.currentSelect.tree.nowSelectSubIndex = this.currentSelect.index;
					if (this._selectHandler)
					{
						this._selectHandler.execute(this.currentSelect.getData());
					}
				}
			}
		}

		private rendHeight(): void
		{
			this._contentMeasureHeight = 0;
			for (var i: number = 0; i < this._contentMc.numChildren; i++) 
			{
				this._contentMeasureHeight += this._contentMc.getChildAt(i).height;
			}
			this.upDataRect();
		}


		private upDataRect(): void
		{
			if (this._select)
			{
				this._contentMask.height = this._contentMeasureHeight;
			}
			else
			{
				this._contentMask.height = 0;
			}
		}

		public setSelectHandler(value: asf.CallBack): void
		{
			this._selectHandler = value;
		}

		public destroy(): void
		{
			this._selectHandler = null;

			if (this.currentSelect)
			{
				this.currentSelect.setSelected(false);
				var box: Box = asf.TypeofUtils.asAny(this.currentSelect)
				box.destroy();
				box.remove();
				this.currentSelect = null;
			}

			var item: any
			if (this._contentMc)
			{
				while (this._contentMc.numChildren > 0)
				{
					item = this._contentMc.removeChildAt(0);
					item.destroy();
					item = null;
				}
				if (this._contentMc.parent) this.removeChild(this._contentMc);
				this._contentMc = null;
			}

			if (this._skin && this._skin instanceof Component)
			{
				this._skin.remove();
				this._skin.destroy();
				this._skin = null;
			}
			this.tree = null;

			super.destroy();
		}
	}
}