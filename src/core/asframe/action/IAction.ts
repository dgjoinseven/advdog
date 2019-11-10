namespace asf
{
	/**
	 * 动作接口，在应用所有关于动作的都是该接口的实现类
	 *
	 * @author soda.chen
	 *
	 */
	export interface IAction extends IDestory
	{
		/**
		 * 初始化方法 
		 * @param callBack 销毁前的回调函数
		 * @param param 参数
		 * 
		 */
		initAction(callBack: Function, thisObj: any, param?: any): void;
		/**
		 * 开始执行该动作,绑定动作执行者，每个动作只能绑定一个动作执行者
		 * 
		 * @param actor:动作执行者(IActor接口实现类)
		 */
		start(actor: IActor): void;
		/**
		 * 返回动作基本类型
		 * @see ActionConstants
		 */
		getType(): string;
		/**
		 * @return 返回动作名称
		 * @see ActionConstants
		 */
		getName(): string;
	}
}