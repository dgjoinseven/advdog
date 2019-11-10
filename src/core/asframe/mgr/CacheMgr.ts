// /**
//  * @ResCacheMgr.as
//  *
//  * @author sodaChen mail:sujun10@qq.com
//  * @version 1.0
//  * <br>Program Name:ASFrame
//  * <br>Date:2016-8-25
//  */
// namespace asf
// {
// 	/**
// 	 * 资源缓存管理机制.在客户端就是资源需要做缓存，对象管理有对象池管理
// 	 * @author sodaChen
// 	 * #Date:2016-8-25
// 	 */
// 	export class CacheMgr //extends Singleton
// 	{
// 		// private static instance:CacheMgr;

// 		/** 长期存在0(需要手工进行清除) **/
// 		private static longMap:ObjectMap<string,Object>;
// 		/** 场景存在 **/
// 		private static sceneMap:ObjectMap<string,Object>;

// 		private static cacheDataPool:Pool<Object>;


// 		static init()
// 		{
// 			this.sceneMap = new ObjectMap<string,Object>();
// 			this.longMap = new ObjectMap<string,Object>();
// 			this.cacheDataPool = new Pool(CacheResData,1000);
// 		}
// 		/**
// 		 * 获取引用计数资源，计数器会增加1
// 		 * @param key url
// 		 * @return
// 		 */
// 		getCountRes(key:string):any
// 		{
// 			return RefMgr.refer(key);
// 		}
// 		/**
// 		 * 放一个资源到引用池里，默认引用次数为1
// 		 * @param key
// 		 * @param res
// 		 */
// 		putCountRes(key:string,res:any,isRefer:boolean = true):void
// 		{
// 			RefMgr.addRefer(key,res,isRefer);
// 		}
// 		/**
// 		 * 取消资源的引用
// 		 * @param keyOrTarget
// 		 * @param isDestroy
// 		 *
// 		 */
// 		unreferRes(keyOrTarget:any,isDestroy:boolean = false):void
// 		{
// 			RefMgr.unrefer(keyOrTarget,isDestroy);
// 		}
// 		/**
// 		 * 获取资源，自动 1.场景池里查找 2.永久池查找
// 		 * @param key
// 		 * @return
// 		 */
// 		static getRes(key:string):any
// 		{
// 			var res:any = this.sceneMap.get(key);
// 			//永久池查找
// 			if(!res)
// 				res = this.longMap.get(key);
// 			return res;
// 		}
// 		/**
// 		 * 存放资源
// 		 * @param key 唯一key
// 		 * @param res 资源
// 		 * @param cacheType 缓存类型
// 		 *
// 		 */
// 		static putRes(key:string,res:any,cacheType:number = Const.SCENE_CACHE):void
// 		{
// 			if(cacheType == Const.SCENE_CACHE)
// 				this.sceneMap.put(key,res);
// 			else if(cacheType == Const.LONG_CACHE)
// 				this.longMap.put(key,res);
// 			else //引用计数+1
// 				RefMgr.addRefer(key,res);
// 		}
// 		/**
// 		 * 删除资源
// 		 * @param key
// 		 * @return 返回缓存的资源
// 		 */
// 		static removeRes(key:any):void
// 		{
// 			this.sceneMap.remove(key);
// 			this.longMap.remove(key);
// 		}
// 		/**
// 		 * 改变资源的缓存类型
// 		 * @param key key
// 		 * @param cacheType 缓存类型
// 		 */
// 		static changeCacheType(key:any,cacheType:number = Const.SCENE_CACHE):void
// 		{
// 			var res:any = this.getRes(key);
// 			if(res)
// 				this.putRes(key,res,cacheType);
// 		}
// 		/**
// 		 * 清除缓存
// 		 * @param cacheType 默认是清除场景缓存，否则全体缓存都清除
// 		 */
// 		static clearCache(cacheType:number = Const.SCENE_CACHE):void
// 		{
// 			//清除还得优化
// 			if(cacheType == Const.SCENE_CACHE)
// 				this.sceneMap.clear();
// 			else
// 				this.longMap.clear();
// 		}
// 		// /**
// 		//  * 加载并且缓存资源
// 		//  * @param url 加载路径
// 		//  * @param complete 成功回调函数
// 		//  * @param target 附加参数
// 		//  * @param cacheType
// 		//  *
// 		//  */
// 		// loadRes(url:string,complete:Function,target:any = null,cacheType:int = Const.SCENE_CACHE):void
// 		// {
// 		// 	var resData:CacheResData = new CacheResData(url,complete,target,cacheType);
// 		// 	ResMgr.getInstance().load(url,onLoadRes,resData);
// 		// }
// 		// private function onLoadRes(res:any,resData:CacheResData):void
// 		// {
// 		// 	//进行存放
// 		// 	putRes(resData.key,res,resData.cacheType);
// 		// 	FunctionUtils.callFuncTarget(res,resData.complete,resData.target);
// 		// }
// 	}
// }
// class CacheResData
// {
// 	public key:string;
// 	public complete:Function;
// 	public target:any;
// 	public cacheType:number;
// 	CacheResData(key:string,complete:Function,target:any,cacheType:number)
// 	{
// 		this.key = key;
// 		this.complete = complete;
// 		this.target = target;
// 		this.cacheType = cacheType;
// 	}
// }