namespace morn
{
	export interface ISelect extends asf.IDestory
	{
		getSelected(): boolean;
		setSelected(value: boolean): void;
		getClickHandler(): asf.CallBack;
		// setClickHandler(value: asf.CallBack): void;
		setClickHandler(callBack: Function, thisObj: Object, param?: any): void;
	}
}