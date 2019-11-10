/**
 * @PoolManager.as
 *
 * @author sodaChen mail:asframe@qq.com
 * @version 1.0
 * <br>Copyright (C), 2012 ASFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:ASFrame
 * <br>Date:2013-6-20
 */
namespace asf
{
	/**
	 * 对象池管理器包括IObjectPool的对象，实现了统一管理。具体使用到了pool包里面的各种对象池的实例和接口
	 * @author sodaChen
	 * #Date:2013-6-20
	 */
	export class PoolMgr
	{
		/** 默认一个对象池的最大空闲对象是数量 **/
		public static defaultMax: number = 20;
		/** 对象池集合 **/
		private static $poolMap: Dictionary<any, any>;
		/** 一次取对象池时的缓存对象，主要用于提升性能 ，避免经常产生临时变量 **/
		private static $tempPool: IPool<Object>;

		static init()
		{
			this.$poolMap = new Dictionary<any, any>();
		}
		/**
		 * 获取到指定对象池对象
		 * @param clazz 对象池缓存的对象Class
		 * @return 返回指定的对象池对象
		 *
		 */
		static getPool<T>(clazz: any): IPool<T>
		{
			return this.$poolMap.get(clazz);
		}
		/**
		 * 注册一个需要缓存池的Class对象，内部会自动生成通用的ObjectPool对象池
		 * @param clazz 缓存对象class
		 * @param maxIdle 最大的空闲数量
		 * @param hasStatus 是否需要做激活和不激活的状态检测(false有助提升性能)
		 *
		 */
		static regClass(clazz: any, maxIdle: number = -1, hasStatus: boolean = false): IPool<any>
		{
			let poolMap = this.$poolMap;
			if (poolMap.hasKey(clazz)) return;//注册过1次就不能再注册了
			if (maxIdle == -1)
				maxIdle = this.defaultMax;
			var pool:IPool<any> = new Pool(clazz, maxIdle, hasStatus);
			poolMap.put(clazz, pool);
			return pool;
		}

		/**
		 * 注册一个对象池，由外部提供对象池
		 * @param clazz 生产的对象class
		 * @param objectPool 对象池实例
		 */
		static regPool(clazz: any, objectPool: IPool<Object>): void
		{
			this.$poolMap.put(clazz, objectPool);
		}

		/**
		 * 销毁指定池对象中的所有子节点
		 */
		static clearPoolChildren(clazz: any): void
		{
			let pool = this.$poolMap.get(clazz);
			if (pool)
			{
				pool.destroy();
			}
		}

		/**
		 * 清除指定的对象池
		 * @param clazz 对象class
		 * @param isDestory 是否同时销毁。默认false
		 */
		static clearPool(clazz: any, isDestory: boolean = false): void
		{
			let poolMap = this.$poolMap;
			let pool = poolMap.get(clazz);
			if(!pool)
				return ;
			// Assert.notNull(this.$tempPool, clazz + "没有对应的对象池");
			if (isDestory)
			{
				pool.destroy();
				poolMap.remove(clazz);
			}
			else
			{
				pool.clear();
			}
		}
		/**
		 * 借出一个对象(借出的对象，对象池和管理器本身不会对它有任何引用，完全干净无引用的对象)
		 * @param clazz
		 * @return
		 *
		 */
		static create(clazz: any): any
		{
			let pool = this.$poolMap.get(clazz);
			if (!pool) return null;
			return pool.create();
		}
		/**
		 * 归还对象。如果对象池满了，则会进行销毁。调用dispose方法或者IDestroy接口的方法
		 * @param obj 实例
		 * @param clazz 对象class.为空时则会自动从obj上获取到对应的class
		 */
		static release(obj: Object, clazz: any = null): void
		{
			if (!clazz)
				clazz = ClassUtils.forInstance(obj);

			let pool = this.$poolMap.get(clazz);
			if(pool)
				pool.release(obj);
		}

		/**
		 * 是否已满
		 * @param obj
		 * @param clazz
		 * @return
		 *
		 */
		static isFull(obj: Object, clazz: any = null): Boolean
		{
			if (!clazz)
				clazz = ClassUtils.forInstance(obj);

			let pool = this.$poolMap.get(clazz);
			return pool.isFull();
		}
	}
}
