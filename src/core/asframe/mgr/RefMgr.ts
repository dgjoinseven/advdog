// /**
//  * @SharingPool.as
//  *
//  * @author sodaChen mail:asframe@qq.com
//  * @version 1.0
//  * <br>Copyright (C), 2013 ASFrame.com
//  * <br>This program is protected by copyright laws.
//  * <br>Program Name:ASFrame
//  * <br>Date:2013-8-22
//  */
// namespace asf
// {
// 	export class ReferData
// 	{
// 		timeId: number = 0;
// 		key: string;
// 		target: Object;
// 		refCount: number;

// 		destroy(): void
// 		{
// 			delete this.key;
// 			delete this.target;
// 			this.refCount = 0;
// 			this.timeId = 0;
// 		}
// 	}

// 	/**
// 	 * 共享对象池，提供引用次数的计算
// 	 * @author sodaChen
// 	 * #Date:2013-8-22
// 	 */
// 	export class RefMgr
// 	{
// 		// private static instance: RefMgr;

// 		/** 通过key引用target记录 **/
// 		private static refMap: Dictionary<string, ReferData>;
// 		/** 通过target本身作为引用，来保存target记录 **/
// 		private static targetMap: Dictionary<Object, ReferData>;
// 		/** 对象 **/
// 		private static pool: IPool<any>;
// 		/** 是否正在清除状态中 **/
// 		private static isClear: boolean;

// 		// /**
// 		//  * 获取实例的静态方法实例
// 		//  * @return
// 		//  *
// 		//  */
// 		// static getInstance(): RefMgr
// 		// {
// 		// 	if (this.instance == null)
// 		// 	{
// 		// 		this.instance = new RefMgr();
// 		// 	}
// 		// 	return this.instance;
// 		// }

// 		static init()
// 		{
// 			this.refMap = new Dictionary<string, ReferData>();
// 			this.targetMap = new Dictionary<Object, ReferData>();
// 			PoolMgr.regClass(ReferData);
// 			this.pool = PoolMgr.getPool(ReferData);
// 		}

// 		/**
// 		 * 添加一个引用共享对象
// 		 * @param key 唯一key
// 		 * @param target 共享对象
// 		 * @param isRefer 是否马上增加一次引用
// 		 *
// 		 */
// 		static addRefer(key: string, target: Object, isRefer: boolean = true): void
// 		{
// 			var referData: ReferData = this.refMap.get(key);
// 			if (referData)
// 			{
// 				throw new Error(key + "重复添加Refer");
// 			}
// 			if (!target)
// 			{
// 				throw new Error("target为空");
// 			}
// 			referData = this.pool.create();
// 			this.refMap.put(key, referData);
// 			this.targetMap.put(target, referData);
// 			referData.key = key;
// 			referData.target = target;
// 			if (isRefer)
// 			{
// 				referData.refCount++;
// 			}
// 		}
// 		/**
// 		 * 指定的key是否存在共享对象的引用
// 		 * @param key 唯一
// 		 * @return true则表示存在，否则不存在
// 		 *
// 		 */
// 		static hasRefer(key: string): boolean
// 		{
// 			if (!key)
// 				return false;
// 			return this.refMap[key] != null;
// 		}
// 		/**
// 		 * 指定key取得一个公共引用对象（对象的引用次数会增加1） 如果没有对象则会抛出异常
// 		 * @param key 唯一字符串
// 		 * @return 公共对象
// 		 */
// 		static refer(keyTarget: string | Object): any
// 		{
// 			var referData: ReferData;
// 			//先判断key
// 			if (typeof keyTarget === "string")
// 				referData = this.targetMap.get(keyTarget);
// 			else
// 				referData = this.targetMap.get(keyTarget);

// 			if (!referData)
// 			{
// 				throw new Error(keyTarget + "没有对应的Refer，请先添加");
// 			}
// 			referData.refCount++;
// 			if (referData.timeId != 0)
// 			{
// 				//清除原来的定时器
// 				referData.timeId = 0;
// 			}
// 			return referData.target;
// 		}
// 		/**
// 		 * 清除所有的共享缓存资源
// 		 * @param isDestory 清除的同时销毁缓存的资源，默认是销毁
// 		 *
// 		 */
// 		static clearAll(isDestory: boolean = true): void
// 		{
// 			if (isDestory)
// 			{
// 				this.isClear = true;
// 				this.refMap.forEach(this.forEachRef, this);
// 				this.isClear = false;
// 				//再次尝试释放target
// 				this.targetMap.forEach(this.forEachRef, this);
// 			}
// 			this.refMap = new Dictionary<string, ReferData>();
// 			this.targetMap = new Dictionary<Object, ReferData>();
// 		}
// 		private static forEachRef(refer: ReferData): void
// 		{
// 			if (this.isClear)
// 			{
// 				//同时删除targe的标签
// 				this.targetMap.remove(refer.target);
// 				DestroyUtils.destroy(refer.target);
// 			}
// 			refer.destroy();
// 			//放回对象池
// 			this.pool.release(refer);
// 		}
// 		/**
// 		 * 取消一次公共对象的引用
// 		 * @param keyOrTarget 唯一key或者共享对象实例
// 		 * @param isDestroy 立刻销毁对象，否则是引用次数为0时30(可配置设定)秒后销毁
// 		 *
// 		 */
// 		static unrefer(keyTarget: string | Object, isDestroy: boolean = false): void
// 		{
// 			//优先从key取值
// 			var referData: ReferData;
// 			//先判断key
// 			if (typeof keyTarget === "string")
// 				referData = this.targetMap.get(keyTarget);
// 			else
// 				referData = this.targetMap.get(keyTarget);
// 			//空则不处理
// 			if (!referData)
// 			{
// 				return;
// 			}
// 			referData.refCount--;
// 			if (referData.refCount <= 0)
// 			{
// 				if (isDestroy)
// 					//强制销毁，没有延迟
// 					this.recover(referData);
// 				else
// 					//ASF.sharingPoolDelay后清除资源
// 					referData.timeId = App.timer.doOnce(ASF.sharingPoolDelay, this.recover, this, [referData], referData.timeId);
// 			}
// 		}
// 		private static recover(referData: ReferData): void
// 		{
// 			// clearTimeout(referData.timeId);
// 			App.timer.clearTimer(referData.timeId);
// 			//防止延迟销毁期间又被引用
// 			if (referData.refCount > 0) return;

// 			//资源进行销毁
// 			this.refMap.remove(referData.key);
// 			this.targetMap.remove(referData.target)
// 			//判断是否销毁实例
// 			var target: Object = referData.target;
// 			DestroyUtils.destroy(target);
// 			referData.destroy();
// 			//放回对象池
// 			this.pool.release(referData);
// 		}
// 	}
// }
