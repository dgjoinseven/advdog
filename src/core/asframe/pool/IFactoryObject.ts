/**
 * @PoolableObjectFactory.as
 * 
 * @author sodaChen mail:asframe#163.com
 * @version 1.0
 * <br>Copyright (C), 2012 ASFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:ASFrame Pool
 * <br>Date:2012-1-15
 */
namespace asf
{
	/**
	 * 接口定义的生命周期方法
	 * 实例可以服务的链接ObjectPool。
	 * @author sodaChen
	 * @version 2013.03.31
	 */
	export interface IFactoryObject<T>
	{
		/**
		 * 生成一个全新的对象 
		 * @return 
		 */		
		create():T;
		
		/**
		 * 销毁池里不需要的对象
		 * @param obj
		 */		
		destroy(obj:T):void;
				
		/**
		 * 使用前重新激活对象 
		 * @param obj
		 */		
		activate(obj:T):void;
		
		/**
		 * 对象返回池之前进行调整(使钝化，即进入休眠状态)
		 * @param obj
		 */		
		passivate(obj:T):void;
	}
}
