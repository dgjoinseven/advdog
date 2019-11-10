namespace asf
{
	export interface IDestory
	{
		/**
		* 释放对象相关资源
		* @param o:释放时需要的参数（不是必须的）
		*
		*/
		destroy(o?: any): void;
	}
}