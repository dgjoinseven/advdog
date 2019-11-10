namespace morn
{
	export class TreeListMain extends Box
	{
		tree: TreeList;
		private _viewWidth: number;
		private _viewHeight: number;
		private _selectIndex: number = -1;
		private _container: egret.Sprite;
		private _onlyOpenOne: boolean = false;
		/**
		 * 打开后不能关闭 
		 */
		public mustOpenOne: boolean = false;
		/**打开后选择第1个 */
		public openSelectFirst: boolean = false;
		public rendViewHandle: asf.CallBack;

		/**
		 * 主节点的样式,假如设置了，则无设置皮肤的默认使用这个皮肤
		 */
		public mainItemRender: any;

		protected _selectHandler: asf.CallBack;

		public constructor(w: number = 100, h: number = 100)
		{
			super();

			this._viewWidth = w;
			this._viewHeight = h;

			this.scrollRect = new egret.Rectangle(0, 0, w, h);
		}

		protected createChildren(): void 
		{
			this.addChild(this._container = new egret.Sprite());
		}

		public set selectHandler(value: asf.CallBack)
		{
			this._selectHandler = value;
		}

		/**
		 * 添加主节点的样式 
		 * @param view
		 * 
		 */
		public addItem(view: ITreeListMainItem): void
		{
			this._container.addChild(asf.TypeofUtils.asAny(view));
			view.setContentViewWidth(this._viewWidth) //= ;
			view.getBar().addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClieckBegin, this);
			view.getBar().addEventListener(egret.TouchEvent.TOUCH_END, this.changeItemSelect, this);

			this.callLater(this.renderView, this);
		}

		/**
		 * 设置每个子节点的内容 
		 * @param arr
		 * 
		 */
		public setContentData(arr: any[]): void
		{
			//			for (var i:number = 0; i < arr.length; i++) 
			//			{
			//				var item:ITreeListMainItem = getItem(i);
			//				if(item)
			//				{
			//					item.contentData = arr[i];
			//				}
			//			}
			var i: number;
			var item: ITreeListMainItem;
			for (i = 0; i < this._container.numChildren; i++) 
			{
				item = this.getItem(i);
				if (item)
				{
					if (i >= arr.length)
					{
						this.removeItem(item);
						i--;
					}
					else
					{
						item.setContentData(arr[i]);
					}
				}
			}

			for (i; i < arr.length; i++)
			{
				//有多余的数据
				item = new this.mainItemRender();
				item.tree = this.tree;
				item.mainIndex = i;
				item.setSelectHandler(this._selectHandler);
				this.addItem(item);
				item.setData(arr[i]);
			}

			this.callLater(this.renderView, this);
		}

		/**
		 * 通过默认样式设置主节点的内容，会清除原来的
		 * @param arr
		 * 
		 */
		public initMainData(arr: any[]): void
		{
			this.removeAllItem();
			for (var i: number = 0; i < arr.length; i++) 
			{
				var item: ITreeListMainItem = new this.mainItemRender();//getItem(i);
				item.tree = this.tree;
				item.mainIndex = i;
				item.setSelectHandler(this._selectHandler);
				this.addItem(item);
				item.setData(arr[i]);
			}
			this.callLater(this.renderView, this);
		}

		/**
		 * 更新主节点的数据，会无视样式直接赋值 
		 * @param arr
		 * 
		 */
		public updatetMainData(arr: any[]): void
		{
			for (var i: number = 0; i < arr.length; i++) 
			{
				var item: ITreeListMainItem = this.getItem(i);
				if (item)
				{
					item.setData(arr[i]);
				}
			}
			this.callLater(this.renderView, this);
		}

		/**
		 * 更新某个主节点的数据 
		 * @param index
		 * @param data
		 * 
		 */
		public updatetMainDataByIndex(index: number, data: any): void
		{
			var item: ITreeListMainItem = this.getItem(index);
			if (item)
			{
				item.setData(data);
			}

			this.callLater(this.renderView, this);
		}

		/**
		 * 取消所有子节点的选中 
		 * 
		 */
		public cancelContentSelect(): void
		{
			var view: ITreeListMainItem
			for (var i: number = 0; i < this._container.numChildren; i++) 
			{
				view = asf.TypeofUtils.asAny(this._container.getChildAt(i));
				view.cancelContentSelect();
			}
		}


		/**
		 * 删除所有主节点 
		 * 
		 */
		public removeAllItem(): void
		{
			if (this._container)
			{
				while (this._container.numChildren > 0)
				{
					this.removeItem(asf.TypeofUtils.asAny(this._container.getChildAt(0)), true);
				}
			}
		}

		/**
		 * 删除某个主节点 
		 * @param view
		 * @param isDestroy
		 * 
		 */
		public removeItem(view: ITreeListMainItem, isDestroy: boolean = false): void
		{
			this._container.removeChild(asf.TypeofUtils.asAny(view));
			view.getBar().removeEventListener(egret.TouchEvent.TOUCH_END, this.changeItemSelect, this);
			view.destroy();
			view = null;
			if (!isDestroy)
			{
				this.callLater(this.renderView, this);
			}
		}

		/**
		 * 根据index删除主节点 
		 * @param index
		 * @param isDestroy
		 * 
		 */
		public removeItemByIndex(index: number, isDestroy: boolean = false): void
		{
			var view: ITreeListMainItem = this.getItem(index);
			this.removeItem(view);
		}

		/**
		 * 根据INDEX获取主节点 
		 * @param index
		 * @return 
		 * 
		 */
		public getItem(index: number): ITreeListMainItem
		{
			if (index >= this._container.numChildren)
			{
				return null;
			}
			return asf.TypeofUtils.asAny(this._container.getChildAt(index));// as ITreeListMainItem;
		}

		protected clickX: number;
		protected clickY: number;
		protected onClieckBegin(event: egret.TouchEvent): void
		{
			this.clickX = event.stageX;
			this.clickY = event.stageY;
		}

		/**
		 * 点击主节点后展开的操作 
		 * @param event
		 * 
		 */
		protected changeItemSelect(event: egret.TouchEvent): void
		{
			if (Math.abs(this.clickX - event.stageX) >= 10 || Math.abs(this.clickY - event.stageY) >= 10)
			{
				return
			}

			var target: ITreeListMainItem;
			var tmpTarget: any = event.target;

			do 
			{
				if (tmpTarget instanceof TreeListItem)
				{
					target = tmpTarget;
				}
				else
				{
					tmpTarget = tmpTarget.parent;
				}
			} while (target == null && !(tmpTarget instanceof TreeList));

			if (target)
			{
				var view: ITreeListMainItem;
				if (this._onlyOpenOne)
				{
					var len: number = this._container.numChildren;
					for (var i: number = 0; i < len; i++) 
					{
						view = asf.TypeofUtils.asAny(this._container.getChildAt(i));//this._container.getChildAt(i) as ITreeListMainItem;
						if (view)
						{
							if (view.getSelected() && view != target)
							{
								// view.setSelected(false);
								this.selectSubItem(view, false);
							}
						}
					}
				}

				if (!target.getNotOpen())
				{
					if (this.mustOpenOne)
					{
						target.setSelected(true);
					}
					else
					{
						target.setSelected(!target.getSelected());
					}

					if (this.openSelectFirst && target.getSelected())
					{
						this.cancelContentSelect();
						target.selectIndex(0);
					}

				}
				this.renderView();
			}
		}

		/**
		 * 选中主节点，则是展开该节点 
		 * @param value
		 * 
		 */
		public setSelectIndex(value: number): void
		{
			var view: ITreeListMainItem;
			view = asf.TypeofUtils.asAny(this._container.getChildAt(value));//this._container.getChildAt(value) as ITreeListMainItem;
			if (view)
			{
				if (!view.getNotOpen())
				{
					if (view.getSelected() != true)
					{
						// view.setSelected(true);
						this.selectSubItem(view, true);
						this.callLater(this.renderView, this);
					}
				}
			}
		}

		/**
		 * 关闭某个主节点 
		 * @param value
		 * 
		 */
		public setCloseTreeIndex(value: number): void
		{
			var view: ITreeListMainItem;
			view = asf.TypeofUtils.asAny(this._container.getChildAt(value));//this._container.getChildAt(value) as ITreeListMainItem;
			if (view)
			{
				if (view.getSelected() == true)
				{
					this.selectSubItem(view, false);
					// view.setSelected(false);
					this.callLater(this.renderView, this);
				}
			}
		}

		/**
		 * 删除主节点中某个自节点 
		 * @param value
		 * @param index
		 * 
		 */
		public removeTreeIndex(value: number, index: number = -1): void
		{
			var view: ITreeListMainItem = this.getItem(value);
			if (view)
			{
				view.removeTreeIndex(index);
			}
			this.callLater(this.renderView, this);
		}

		/**
		 * 更新主节点中某个自节点 
		 * @param value
		 * @param index
		 * 
		 */
		public updateTreeIndex(value: number, index: number = -1, data: Object = null): void
		{
			var view: ITreeListMainItem = this.getItem(value);
			if (view)
			{
				view.updateTreeIndex(index, data);
			}
		}

		/**
		 * 获取主节点的某个节点的数据
		 * @param value
		 * @param index
		 * 
		 */
		public getTreeInfoIndex(value: number, index: number = -1): any
		{
			var view: ITreeListMainItem = this.getItem(value);
			if (view)
			{
				return view.getTreeIndex(index);
			}

			return null;
		}

		/**
		 * 打开主节点后选中自节点 
		 * @param value
		 * @param index
		 * 
		 */
		public openTreeIndex(value: number, index: number = -1): void
		{
			var view: ITreeListMainItem;
			if (this._onlyOpenOne)
			{
				var len: number = this._container.numChildren;
				for (var i: number = 0; i < len; i++) 
				{
					view = asf.TypeofUtils.asAny(this._container.getChildAt(i));//this._container.getChildAt(i) as ITreeListMainItem;
					if (view)
					{
						if (view.getSelected())
						{
							// view.setSelected(false);
							this.selectSubItem(view, false);
						}
					}
				}
			}

			this.cancelContentSelect();
			if (this._container.numChildren > value)
			{
				view = asf.TypeofUtils.asAny(this._container.getChildAt(value))///this._container.getChildAt(value) as ITreeListMainItem;
				if (view)
				{
					if (!view.getNotOpen())
					{
						if (!view.getSelected())
						{
							this.selectSubItem(view, true);
							// view.setSelected(true);
						}
						if (index != -1)
						{
							view.selectIndex(index);
						}
						this.callLater(this.renderView, this);
					}
				}
			}
		}

		private selectSubItem(view: ITreeListMainItem, value: boolean): void
		{
			view.setSelected(value);
		}

		/**
		 * 更新 
		 * 
		 */
		public renderView(): void
		{
			this.scrollRect = new egret.Rectangle(0, 0, this.getViewWidth(), this.getViewHeight());

			var len: number = this._container.numChildren;
			var view: ITreeListMainItem;
			var hasFindSlect: boolean = false;
			var i: number = 0;
			var h: number = 0;
			for (i = 0; i < len; i++) 
			{
				view = asf.TypeofUtils.asAny(this._container.getChildAt(i));
				asf.TypeofUtils.asAny(view).y = h;
				if (view.getSelected())
				{
					h += view.getBarHeight() + view.getContentMeasureHeight();
					view.setContentViewHeight(view.getContentMeasureHeight());
				}
				else
				{
					h += view.getBarHeight();
					view.setContentViewHeight(0);
				}
			}

			if (this.rendViewHandle != null)
			{
				this.rendViewHandle.execute();
			}
		}

		/**
		 * 是否只能展开1个主节点 
		 * @param value
		 * 
		 */
		public setOnlyOpenOne(value: boolean): void
		{
			this._onlyOpenOne = value;
		}

		public get height(): number
		{
			var h: number = 0;
			var view: ITreeListMainItem
			for (var i: number = 0; i < this._container.numChildren; i++) 
			{
				view = asf.TypeofUtils.asAny(this._container.getChildAt(i));//this._container.getChildAt(i) as ITreeListMainItem;
				h += view.getContentViewHeight() + view.getBarHeight();
			}
			h += this._container.y;
			return h;
		}

		public destroy(): void
		{
			this._selectHandler = null;

			if (this._container)
			{
				while (this._container.numChildren > 0)
				{
					this.removeItem(asf.TypeofUtils.asAny(this._container.getChildAt(0)), true);
				}

				if (this._container.parent) this.removeChild(this._container);
				this._container = null;
			}
			this.scrollRect = null;
			this.tree = null;

			super.destroy();
		}

		/**
		 * 树的高度 
		 */
		public setViewHeight(value: number): void
		{
			this._viewHeight = value;
			this.callLater(this.renderView, this);
		}

		public getViewHeight(): number
		{
			return this._viewHeight;
		}

		/**
		 * 树的宽度 
		 */
		public getViewWidth(): number
		{
			return this._viewWidth;
		}

		/**
		 * @private
		 */
		public setViewWidth(value: number): void
		{
			this._viewWidth = value;
			this.callLater(this.renderView, this);
		}
	}
}