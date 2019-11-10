namespace morn
{
	export interface ITreeListSubItem
	{
		tree: TreeList;
		mainIndex: number
		index: number;
		getData(): any;
		setData(value: any): void;
		setSelected(value: boolean): void;
		getSelected(): boolean;
	}
}