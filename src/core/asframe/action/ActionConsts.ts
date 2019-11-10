namespace asf
{
	/***
	 * Action的相关常量
	 */
	export class ActionConsts
	{
		////////////////////动作类型////////////////////
		/** 队列动作代理动作 */
		public static QUEUE: string = "queue";
		/** 普通正常类型,可以多个动作同时存在 **/
		public static SAME: string = "same";
		/** 普通正常类型,可以多个动作同时存在 **/
		public static REPEAT: string = "repeat";
		/** 该类型动作只允许队列里只存在一个动作 **/
		public static ALONE: string = "alone";

		////////////////////框架指定的依赖注入属性////////////////////
		/** 表演者注入 **/
		public static INJECT_ACTOR: string = "actor";
		/** 参数注入 **/
		public static INJECT_PARAM: string = "param";
		/** 方法注入 **/
		public static INJECT_SET_PARAMS: string = "setParams";
		public constructor()
		{
		}
	}
}