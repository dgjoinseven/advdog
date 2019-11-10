namespace asf
{
	/**
	 * 显示对象容器接口，主要用途是被其他显示对象接口集成，这里只提供公共和基础的功能
	 *
	 * @author soda.chen
	 *
	 */
	export interface IActor
	{
		/**
		 * 执行动作action，返回是否成功启动动作。执行动作action，返回是否成功启动动作。
		 * @param action 需要执行的动作实例
		 * @param callBack acton被销毁前的回调函数
		 * @param param action需要使用到的相关参数
		 * @return 
		 * 
		 */
		act(action: IAction, callBack: Function, thisObj: any, param?: any): boolean;
		/**
		 * 删除一个动作 
		 * @param action 为动作名称或者IAction实例
		 * @param isDestory 是否销毁action 默认是不销毁，只是从容器中删除
		 */
		delAction(action: IAction, isDestory?: boolean): void;
	}
}