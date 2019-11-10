namespace asf {
	/**
	 * 资源管理
	 * @author liwenlong
	 * #Date:2017-5-9
	 */
	export class ResMgr {
		private resource: RES.Resource = new RES.Resource();
		/**引用次数字典 */
		private resCountMap: HashMap<string, number>
		/**res.json的配置 */
		private resKeyMap: Object;
		/**将要移除的URL */
		private disposeMap: HashMap<string, string>;
		/**正在外部加载的加载列表 */
		private loaderMap: HashMap<string, LoaderInfo[]>;
		/**保存的外部加载的纹理列表 */
		public resUrlMap: HashMap<string, egret.Texture>;
		/**永久引用的缓存 */
		public foreverArr: string[] = [];
		/**是否加载本地资源 */
		static isLoadLocalRes: boolean = false;

		/**引用次数字典 */
		private resUrlCountMap: HashMap<string, number>;

		private timerId: number = -1;

		public constructor() 
		{
			this.resKeyMap = {};
			PoolMgr.regClass(LoaderInfo, 1000);//注册单例

			this.resCountMap = new HashMap<string, number>();
			this.loaderMap = new HashMap<string, LoaderInfo[]>();
			this.disposeMap = new HashMap<string, string>();
			this.resUrlMap = new HashMap<string, egret.Texture>();
			this.resUrlCountMap = new HashMap<string, number>();

			this.preloadArr = [];
		}

		/**
		 * 初始化，这里要传入白鹭的那个res.json文件，获取纹理关系
		 * 
		 * @param {*} jsonData
		 * 
		 * @memberOf ResMgr
		 */
		public init(url: string, resourceRoot: string, callback?: Function, thisObj?: any): void {
			// if (jsonData)
			// {
			// 	this.resKeyMap = jsonData.resources;
			// }
			

			// App.timer.doLoop(60000, this.loopDispose, this);
			this.timerId = App.timer.doLoop(10000, this.loopDispose, this, null, this.timerId);

			// let res = this.resource;

			// if (resourceRoot.indexOf('://') >= 0) {
			// 	var temp = resourceRoot.split('://');
			// 	resourceRoot = temp[0] + '://' + RES.path.normalize(temp[1] + '/');
			// }
			// else {
			// 	resourceRoot = RES.path.normalize(resourceRoot + "/");
			// 	url = url.replace(resourceRoot, '');
			// }
			//RES.setConfigURL(url, resourceRoot);
			if(callback)
			{
				this.configCallBack = new asf.CallBack(callback, thisObj)
				RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfig, this);
				RES.addEventListener(RES.ResourceEvent.CONFIG_LOAD_ERROR, this.configError, this);
				RES.loadConfig(url, resourceRoot);
			}
			
			//console.info(url, resourceRoot);
			//	res.loadConfig();
			// RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onResourceItemLoadError, this);
			// RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceGroupComplete, this);
		}
		private configCallBack: asf.CallBack;
		private onConfig(e: RES.ResourceEvent): void {
			console.info("配置加载完成", e.target);
			this.resKeyMap = e.target;
			//注册自己的版本管理器


			this.configCallBack.execute();
		}
		private configError(e: RES.ResourceEvent): void {
			console.info("配置加载报错", e);
		}

		private groupResMap: asf.HashMap<string, LoaderInfo>;
		private isInitLoadGroup: boolean = false;
		/**
		 * 加载一组白鹭资源
		 */
		loadGroup(groupName: string, callback?: Function, thisObj?: any/*, err?: asf.CallBack*/): void {
			let res = this.resource;
			if (!this.isInitLoadGroup) {

				this.isInitLoadGroup = true;
				res.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
				res.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
				res.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
				res.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
			}

			if (!this.groupResMap) {
				this.groupResMap = new asf.HashMap<string, LoaderInfo>();
			}

			var info: LoaderInfo = new LoaderInfo();
			info.url = groupName;
			info.callback = new asf.CallBack(callback, thisObj)
			info.thisObj = thisObj;
			this.groupResMap.put(groupName, info);

			res.loadGroup(groupName);
			res.setMaxRetryTimes(1);
		}

		/**
		 * 组别资源加载成功
		 */
		private onResourceLoadComplete(event: RES.ResourceEvent): void {
			if (this.groupResMap) {
				var info: LoaderInfo = this.groupResMap.remove(event.groupName);

				if (info && info.callback) {
					info.data = event.resItem;
					info.callback.execute(info)
				}
			}
		}

		private onResourceLoadError(event: RES.ResourceEvent): void {
		}

		private onResourceProgress(event: RES.ResourceEvent): void {

		}

		private onItemLoadError(): void {

		}

		public getGroupByName(group: string): RES.ResourceInfo[] {
			return this.resource.getGroupByName(group)
		}

		private preloadNums: number = 0;
		private preloadArr: PreloadInfo[];


		/**
		 * 预加载外部资源
		 */
		preload(res: string[], type: number, callback?: Function, thisObj?: any): PreloadInfo {

			var info: PreloadInfo = new PreloadInfo();
			info.id = this.preloadNums;
			info.thisObj = this;
			info.urls = res;
			info.type = type;
			info.callback = callback;
			info.callbackThisObj = thisObj;
			this.preloadArr.push(info);
			// var keys: string[] = []

			// RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onResourceItemLoadError, info);

			var url: string;
			for (var i: number = 0; i < res.length; i++) {
				url = res[i];
				// keys.push(url);
				this.resource.getResByUrl(url, this.onResPreloadLoadComplete, info);
			}

			// RES.createGroup(info.id + "", info.urls, true);
			// RES.loadGroup(info.id + "");

			this.preloadNums++;

			return info;
		}

		private onResPreloadLoadComplete(texture: egret.Texture, url: string): void {
			if (this instanceof PreloadInfo) {
				//是预加载的类型
				var info: PreloadInfo = this.thisObj.preloadArr[this.id];
				var index: number = info.urls.indexOf(url);
				if (index != -1) {
					this.thisObj.resUrlMap.put(url, texture)
					info.callNum++;
					this.thisObj.preloadLoadComplete(info);
				}
			}
		}

		/**
		 * 判断预加载计算是否结束
		 */
		private preloadLoadComplete(info: PreloadInfo): void {
			if (info.callNum >= info.urls.length) {
				//完成
				info.callback.call(info.callbackThisObj);
				this.preloadArr[info.id] = null;
				// RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onResourceItemLoadError, info);
			}
		}

		private checkLocalResUrl(url: string): string {
			var tempUrl: string = url;
			var isLocal: boolean = false;
			if (ResMgr.isLoadLocalRes && url.indexOf("/") != -1) {
				//外部加载的目录会优先判断是否存在本地资源当中
				var urlSpiteArr: string[] = url.split("/");
				url = urlSpiteArr[urlSpiteArr.length - 1];
				urlSpiteArr = url.split(".");
				url = urlSpiteArr[0] + "_" + urlSpiteArr[1];
				// console.log("需要加载本地资源 : " + url);
				if (this.resKeyMap[url]) {
					isLocal = true;
					// console.log("找到资源 : " + url);
				}
				else {
					url = tempUrl;
				}
			}

			return url
		}

		/**
		 * 获取资源，无的话会进行外部加载，有的话会直接返回资源
		 * 
		 * @param {string} url
		 * @returns {*}
		 * 
		 * @memberOf ResMgr
		 */
		getRes(url: string, callback: Function, thisObj: any, param?: any): any {
			var name: string = this.getMainTextureName(url);
			if (this.disposeMap.hasKey(name)) {
				//判断正要加载的资源是否存在待销毁的列表，是的话，清除销毁列表中的标记
				// console.log("清除引用" + url);
				this.disposeMap.remove(name);
			}

			var tempUrl: string = url;
			url = this.checkLocalResUrl(url);

			let res = this.resource;
			var r: any = res.getRes(url);
			if (res.hasRes(url) && r) {

				if (callback) {

					var info: LoaderInfo = new LoaderInfo();
					info.callback = new asf.CallBack(callback, thisObj);
					info.thisObj = thisObj;
					info.url = url;

					info.callback.execute(info);
				}

				return r;
			}
			else {
				//判断url是否合法。必须是不带问好参数，然后url里又有小数点。主要是过滤图集的url(eg role.button.json)
				if (url.indexOf("?") == -1 && url.indexOf(".") == 1) {
					console.error(url + "在图集中不存在！");
					return;
				}

				//没资源进行外部加载
				var info: LoaderInfo = new LoaderInfo();
				info.callback = new asf.CallBack(callback, thisObj);
				info.thisObj = thisObj;
				info.url = url;

				let urlArr: string[] = url.split(".")
				let format: string = urlArr[urlArr.length - 1];
				let type = RES.ResourceItem.TYPE_IMAGE
				if (format == "json") {
					console.log("获取json文件");
					type = RES.ResourceItem.TYPE_JSON
				}
				else if (format == "text") {

					type = RES.ResourceItem.TYPE_TEXT
				}
				info.param = param;
				if (this.loaderMap.hasKey(url)) {
					//已经存在加载，就是加载中的，这个时候需要把相同的加载方法加到数组中
					var infos: LoaderInfo[] = this.loaderMap.get(url);
					infos.push(info);
				}
				else {
					//新的外部加载
					this.loaderMap.put(url, [info]);
				}

				if (this.resUrlMap.hasKey(url)) {
					this.onResLoadComplete(this.resUrlMap.get(url), url);
				}
				else {
					res.getResByUrl(url, this.onResLoadComplete, this, type);
				}
			}
		}

		/**
		 * 外部资源加载完毕
		 * 
		 * @private
		 * @param {egret.Texture} texture
		 * @param {string} url
		 * 
		 * @memberOf ResMgr
		 */
		private onResLoadComplete(texture: egret.Texture, url: string): void {
			if (this.loaderMap.hasKey(url)) {
				if (texture) {
					var name: string = this.getMainTextureName(url);
					if (this.disposeMap.hasKey(name)) {
						//判断正要加载的资源是否存在待销毁的列表，是的话，清除销毁列表中的标记
						// console.log("清除引用" + url);
						this.disposeMap.remove(name);
					}

					var infos: LoaderInfo[] = this.loaderMap.get(url);
					var len: number = infos.length;
					var info: LoaderInfo;
					for (var i: number = 0; i < len; i++) {
						info = infos[i];
						// this.addCount(url);//增加引用次数
						info.callback.execute(texture, url);
					}

					this.resUrlMap.put(url, texture)
				}
				this.loaderMap.remove(url);
			}
			else {
				//没找到原路径的直接返回
			}
		}

		/**
		 * 通过加载路径获取主纹理名字
		 * 
		 * @param {string} url
		 * @returns {string}
		 * 
		 * @memberOf ResMgr
		 */
		getMainTextureName(url: string): string {
			var name: string = url;
			if (this.resKeyMap[url]) {
				//在资源配置中找到了，那么寻找这个url是否属于2级key
				var urlSpiteArr: string[] = (this.resKeyMap[url].url as String).split("/") //从2级key的路径去找属于那个主纹理
				name = urlSpiteArr[urlSpiteArr.length - 2] + "_json";//拿到主纹理

				// name = this.resKeyMap[url].name;//拿到主纹理
			}
			else {
				//找不到，尝试去掉 xxxx. 前序再次查找
				var tempName: string = name.replace(/.*\./, "");
				if (this.resKeyMap[tempName]) {
					name = this.resKeyMap[tempName].name;//拿到主纹理
				}
			}

			return name;
		}

		/**
		 * 憎加引用次数
		 * 
		 * @private
		 * @param {string} url
		 * 
		 * @memberOf ResMgr
		 */
		addCount(url: string): void {
			var num: number = this.resUrlCountMap.get(url);
			if (!num) {
				num = 0;
			}
			this.resUrlCountMap.put(url, num + 1);//引用次数 + 1

			var name: string = this.getMainTextureName(url);

			var num: number = this.resCountMap.get(name);
			if (!num) {
				num = 0;
			}
			// console.log("添加" + name + " 次数：" + num);
			// else
			// {
			// 	console.log("不止一个" + url);
			// }
			this.resCountMap.put(name, num + 1);//引用次数 + 1
		}

		/**
		 * 减少引用次数
		 * 
		 * @private
		 * @param {string} url
		 * 
		 * @memberOf ResMgr
		 */
		removeCount(url: string): boolean {
			var num: number = this.resUrlCountMap.get(url);
			if (num && num > 0) {
				num--;
				this.resUrlCountMap.put(url, num);//引用次数 + 1
			}
			if (!num || num <= 0) {
				this.resUrlCountMap.remove(url);
			}

			var name: string = this.getMainTextureName(url);

			var num: number = this.resCountMap.get(name);
			if (num && num > 0) {
				num--;
				this.resCountMap.put(name, num);//引用次数 + 1
			}

			// console.log("引用" + name + " 次数：" + num);

			if (!num || num <= 0) {
				//删除引用
				this.resCountMap.remove(name);
				this.dispose(null, name);
				return true;
			}

			return false;
		}

		/**
		 * 设置永久引用
		 */
		setForever(name: string): void {
			this.foreverArr.push(name);
		}

		/**
		 * 设置永久引用
		 */
		setForeverGroup(group: string): void {
			var resArr: RES.ResourceInfo[] = this.resource.getGroupByName(group);
			if (resArr.length == 0) {
				console.log("我有问题");
			}
			for (var i: number = 0; i < resArr.length; i++) {
				this.setForever(resArr[i].name);
				console.log(resArr[i].name);
			}
		}

		/**
		 * 销毁
		 * 
		 * @param {egret.Texture} source
		 * @param {string} url
		 * 
		 * @memberOf ResMgr
		 */
		dispose(source: egret.Texture, url: string): void {
			//添加到待销毁列表
			//url = this.checkLocalResUrl(url);
			if (this.foreverArr.indexOf(url) == -1) {
				this.disposeMap.put(url, url);
			}
		}

		/**
		 * 每一定时间检查空余的纹理删除
		 * 
		 * 
		 * @memberOf ResMgr
		 */
		loopDispose(): void {
			if (this.disposeMap.size() > 0) {
				this.disposeMap.forEach(function (url: string): void {
					// var tempUrl: string = url;
					var name: string = this.getMainTextureName(url);

					// url = this.checkLocalResUrl(url);

					var num: number = this.resCountMap.get(name);
					if (!num || num <= 0) {
						var texture: egret.Texture = this.resUrlMap.remove(url);
						if (texture) {
							texture.dispose();
						}
						RES.hasRes(url)
						{
							// RES.destroyRes(url.split(".")[0]).then(function (data) {
							// 	if (!data)
							// 		console.log("资源删除失败" + url);
							// })

						}


					}
				}, this);

				this.disposeMap.clear();
			}
		}

		private static instance: ResMgr;
		static ins(): ResMgr {
			if (this.instance == null) {
				this.instance = new ResMgr();
			}
			return this.instance;
		}
	}

	export class LoaderInfo {
		callback: asf.CallBack;
		thisObj: any;
		url: string;
		param: any;
		data: any;

	}

	export class PreloadInfo {
		id: number;
		thisObj: any;
		urls: string[];
		/**
		 * 类型1是地图预加载类型，加载前回展示Loading，加载成功会关闭loading
		 */
		type: number;
		callNum: number = 0;

		callback: Function;
		callbackThisObj: any;
	}
}