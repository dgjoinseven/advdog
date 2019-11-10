namespace morn
{
	export interface ITreeListMainItem
	{
		tree: TreeList;
		mainIndex: number;
		/**
				 * 选中某个子节点 
				 * @param s
				 * 
				 */
		selectIndex(s: number): void;
		setSelectHandler(f: asf.CallBack): void

		/**
		 * 选中主节点 
		 * @return 
		 * 
		 */
		getSelected(): boolean;
		setSelected(value: boolean);

		/**
		 * 是否不能打开 
		 * @return 
		 * 
		 */
		getNotOpen(): boolean;
		setNotOpen(value: boolean);

		/**
		 * 主节点容器 
		 * @return 
		 * 
		 */
		getBar(): Component;
		/**
		 * 主节点的高度 
		 * @return 
		 * 
		 */
		getBarHeight(): number;
		setContentViewWidth(value: number): void;
		getContentViewHeight(): number;
		setContentViewHeight(value: number): void;
		/**
		 * 取消所有自节点的选中状态 
		 * 
		 */
		cancelContentSelect(): void;

		getContentMeasureHeight(): number;

		/**
		 * 设置主节点的数据 
		 * @param value
		 * 
		 */
		setData(value: any): void;
		/**
		 * 设置子节点的数据 
		 * @param value
		 * 
		 */
		setContentData(value: any): void;
		/**
		 * 删除子节点的某个元素 
		 * @param index
		 * 
		 */
		removeTreeIndex(index: number): void;
		/**
		 * 更新子节点的某个元素 
		 * @param index
		 * 
		 */
		updateTreeIndex(index: number, data: any): void;
		/**
		 * 获取子节点的某个数据 
		 * @param index
		 * 
		 */
		getTreeIndex(index: number): any;
		destroy(): void
	}
}