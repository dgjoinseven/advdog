/**
 * @ObjectPool.as
 * 
 * @author sodaChen mail:sujun10#21cn.com
 * @version 1.0
 * <br>Copyright (C), 2010 asFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:挂机冒险
 * <br>Date:2014-6-15
 */
namespace asf
{
	/**
	 * 普通对象池
	 * @author sodaChen
	 * Date:2014-6-15
	 */
	export class Pool<T> implements IPool<Object>
	{
		/** 用到池的对的class **/
		private $clazz:any;
		private $maxIdle:number;
		private $idles:T[];
		private $hasStatus:boolean;
		// private $tempObj:T;
		
		/**
		 * 创建一个通用对象池实例
		 * @param clazz 使用对象的class
		 * @param maxIdle 最大缓存数量
		 * @param hasStatus 是否需要做状态检测（默认为false，如果没有状态，设置false会提升性能）
		 * 
		 */
		constructor(clazz:any,maxIdle:number = 100,hasStatus:boolean = false)
		{
			this.$clazz = clazz;
			this.$maxIdle = maxIdle;
			this.$hasStatus = hasStatus;
			this.$idles = [];
		}
		
		create():T
		{
			var $tempObj;
			if(this.$idles.length == 0)
				$tempObj = new this.$clazz();
			else
				$tempObj = this.$idles.pop();
			//具备激活接口的对象
			if(this.$hasStatus && $tempObj.hasOwnProperty("activate"))
				$tempObj["activate"]();
			
			return $tempObj;
		}

		release(obj:T):void
		{
			if(this.$idles.length > this.$maxIdle)
			{
				DestroyUtils.destroy(obj);
			}
			else
			{
				if(this.$hasStatus && obj.hasOwnProperty("passivate"))
					obj["passivate"]();

				this.$idles.push(obj);
			}
		}
		
		getNumIdle():number
		{
			return this.$idles.length;
		}
		
		clear():void
		{
			// destroy();
			this.$idles = [];
		}
		
		isFull():boolean
		{
			if(this.$idles.length > this.$maxIdle)
			{
				return true;
			}
			return false;
		}
		
		destroy(o:any =null):void
		{
			for (var i:number = 0; i < this.$idles.length; i++)
			{
				DestroyUtils.destroy(this.$idles[i]);
			}
			this.$idles = null;
		}
	}
}