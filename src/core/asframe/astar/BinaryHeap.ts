namespace asf
{
	/**
	 * 二叉堆
	 */
	export class BinaryHeap
	{
		private _attributeName: string;
		private _arr: any[];
		private _min: boolean;
		/**
		 * 新建二叉堆
		 * @param attributeName 用于堆排序的属性名
		 * @param min 最小堆或最大堆
		 */
		public constructor(attributeName: string, min: boolean = true)
		{
			this._arr = [];
			this._attributeName = attributeName;
			this._min = min;
		}

		/**获取堆头*/
		public getTop(): any
		{
			return this._arr[0];
		}
		/**获取堆数组*/
		public getArr(): any[]
		{
			return this._arr;
		}

		/**是否包含元素*/
		public hasElement(element: any): boolean
		{
			return this._arr.indexOf(element) >= 0;
		}

		/**清空堆*/
		public clear(): void
		{
			this._arr = [];
		}

		/**添加元素至二叉堆*/
		public addToBMH(element: any): void
		{
			this._arr.push(element);
			this.bHUp(this._arr.length - 1);
		}

		/**从二叉堆中删除元素*/
		public removeFromBMH(element: any): void
		{
			var index: number = this._arr.indexOf(element);
			this.removeFromBMHByIndex(index);
		}

		public removeFromBMHByIndex(index: number): void
		{
			if (index >= this._arr.length || index < 0) return;
			if (index == this._arr.length - 1)
			{
				this._arr.pop();
			}

			else
			{
				this._arr[index] = this._arr.pop();//将末端覆盖要删除的元素;
				this.bHDown(index);
			}
		}

		/**重排二叉堆中的某个元素*/
		public changeFromBMH(element: any): void
		{
			var index: number = this._arr.indexOf(element);
			var self: any = this._arr[index];
			if (!self) return;
			var selfIndex: number = index + 1;
			var parentId: number = Math.floor(selfIndex / 2);
			var parent: any = this._arr[parentId - 1];
			if (parent && parent[this._attributeName] > self[this._attributeName])
			{//有父节点且比父节点小 上滤
				this.bHUp(index);
			}
			else
			{//尝试下滤
				this.bHDown(index);
			}
		}

		/**二叉堆下滤
		 * @param index 元素所在数组的索引
		 */
		private bHDown(index: number): void
		{
			var selfIndex: number = index + 1;
			do
			{
				var self: any = this._arr[selfIndex - 1];
				if (!self) break;
				var childIndex: number = selfIndex * 2;
				var child1: any = this._arr[childIndex - 1];//当前测试点的左节点
				var child2: any = this._arr[childIndex];//当前测试点的右节点
				if (child2 && child2[this._attributeName] < child1[this._attributeName])
				{//有右节点,且更小
					if (child2[this._attributeName] < self[this._attributeName])
					{//如果右节点小,置换
						this._arr[childIndex] = self;
						this._arr[selfIndex - 1] = child2;
						selfIndex = childIndex + 1;
					}
					else
					{
						break;
					}
				}
				else if (child1 && child1[this._attributeName] < self[this._attributeName])
				{//跟左节点比较,如果左节点小,置换
					this._arr[selfIndex - 1] = child1;
					this._arr[childIndex - 1] = self;
					selfIndex = childIndex;
				}
				else
				{
					break;
				}
			} while (true);//有右节点(一定有左节点),或有左节点(没有右节点)
		}

		/**
		 * 二叉堆上滤
		 * @param index 元素所在数组的索引
		 */
		private bHUp(index: number): void
		{
			var selfIndex: number = index + 1;
			do
			{
				var self: any = this._arr[selfIndex - 1];
				if (!self) break;
				var parentId: number = Math.floor(selfIndex / 2);
				var parent: any = this._arr[parentId - 1];
				if (parent && parent[this._attributeName] > self[this._attributeName])
				{//父节点大,交换
					this._arr[parentId - 1] = self;
					this._arr[selfIndex - 1] = parent;
					selfIndex = parentId;
				}
				else
				{
					break;
				}
			} while (true);
		}
	}
}