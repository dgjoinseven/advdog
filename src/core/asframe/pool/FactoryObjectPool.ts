/**
 * @ObjectPool.as
 * 
 * @author sodaChen mail:sujun10#21cn.com
 * @version 1.0
 * <br>Copyright (C), 2010 asFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:ASFrame
 * <br>Date:2014-6-15
 */
namespace asf
{
	/**
	 * 基于工厂的生成对象的对象池，主要是用于创建和休闲以及销毁时需要做额外处理的对象
	 * 包具体工作外包给IFactoryObject接口，使用者只需要实现自己的IFactoryObject来处理即可。
	 * @author sodaChen
	 * Date:2014-6-15
	 */
	export class FactoryObjectPool<T> implements IPool<T>
	{
		protected objectFactory:IFactoryObject<T>;
		protected maxIdle:number;
		protected list:T[];

		constructor(objectFactory:IFactoryObject<T>,maxIdle:number = 300)
		{
			this.objectFactory = objectFactory;
			this.maxIdle = maxIdle;
			this.list = [];
		}
		
		create():T
		{
			var obj:T = null;
			if(this.list.length == 0)
			{
				obj = this.objectFactory.create();
			}
			else
			{
				obj =  this.list.shift();
			}
			this.objectFactory.activate(obj);
			return obj;
		}
		
		release(obj:T):void
		{
			if(this.list.length < this.maxIdle)
			{
				this.objectFactory.passivate(obj);
				//放进池里
				this.list.push(obj);
			} 
			else
			{
				// destroyObject(obj);
			}
		}
		
		getNumIdle():number
		{
			return this.list.length;
		}
		
		clear():void
		{
		}
		
		destroy(o:any = null):void
		{
		}
		
		isFull():boolean
		{
			return false;
		}
	}
}