namespace morn
{
	export class Box extends Component implements IBox
	{
		public constructor()
		{
			super();
		}

		/**
		 * 是否位图缓存
		 */
		public set isCacheAsBitmap(value: boolean)
		{
			this.cacheAsBitmap = value;
		}

		/**
		 * 是否位图缓存
		 */
		public get isCacheAsBitmap(): boolean
		{
			return this.cacheAsBitmap;
		}

		protected preinitialize(): void
		{
			this.touchEnabled = this.touchChildren = true;
		}

		/**删除子显示对象，子对象为空或者不包含子对象时不抛出异常*/
		public removeElement(element: egret.DisplayObject): void
		{
			if (element && this.contains(element))
			{
				this.removeChild(element);
			}
		}

		/**删除所有子显示对象
		 * @param except 例外的对象(不会被删除)*/
		public removeAllChild(except: egret.DisplayObject = null): void
		{
			for (var i: number = this.numChildren - 1; i > -1; i--)
			{
				if (except != this.getChildAt(i))
				{
					this.removeChildAt(i);
				}
			}
		}

		/**增加显示对象到某对象上面
		   @param element 要插入的对象
		 @param compare 参考的对象*/
		public insertAbove(element: egret.DisplayObject, compare: egret.DisplayObject): void
		{
			this.removeElement(element);
			var index: number = this.getChildIndex(compare);
			this.addChildAt(element, Math.min(index + 1, this.numChildren));
		}

		/**增加显示对象到某对象下面
		   @param element 要插入的对象
		 @param compare 参考的对象*/
		public insertBelow(element: egret.DisplayObject, compare: egret.DisplayObject): void
		{
			this.removeElement(element);
			var index: number = this.getChildIndex(compare);
			this.addChildAt(element, Math.max(index, 0));
		}

		public set dataSource(value: any)
		{
			this._dataSource = value;
			var name: string;
			for (name in value)
			{
				var comp: Component = this.getChildByName(name) as Component;
				if (comp)
				{
					comp.dataSource = value[name];
				}
				else
				{
					if (this.hasOwnProperty(name))
					{
						this[name] = value[name];
					}
				}
			}
		}
	}
}