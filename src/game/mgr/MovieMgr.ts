namespace game
{
	export class MovieLoaderInfo
	{
		//加载的资源名字
		name: string;
		//加载后回调
		callback: Function;
		thisObj: any;
		url: string;
		//最终加载完成事件
		loadComplete: asf.CallBack;
		//加载失败事件
		errorComplete: asf.CallBack
		//模型的json数据
		jsonData: any;
	}

    /***
     * 播放器类
     */
	export class MovieMgr
	{
		static InType_Nomal: number = 0;
		static InType_Scene: number = 1;

		/**
		 * 动画数据缓存类
		 * key 是 模型名字，第2层key是url
		 */
		mcDataMap: asf.HashMap<string, asf.HashMap<string, egret.MovieClipData>>;
		/**
		 * 缓存引用计数,key是模型名字
		 */
		cacheMap: asf.HashMap<string, number>;
		/**
		 * json数据
		 */
		jsonDataMap: asf.HashMap<string, any>;
		/**
		 * intype的字典，InType_Nomal会在模型销毁后的10秒内销毁，scene会在场景销毁时销毁
		 */
		inTypeMap: asf.HashMap<string, number>;
		/**
		 * 加载中的列表，url是key
		 */
		loaderMap: asf.HashMap<string, MovieLoaderInfo>;
		// delayDestroyHandler: asf.CallBack;
		private timerId: number;

		public constructor()
		{
			this.mcDataMap = new asf.HashMap<string, asf.HashMap<string, egret.MovieClipData>>();
			this.cacheMap = new asf.HashMap<string, number>();
			this.jsonDataMap = new asf.HashMap<string, any>();
			this.inTypeMap = new asf.HashMap<string, number>();
			this.loaderMap = new asf.HashMap<string, MovieLoaderInfo>();

			// this.delayDestroyHandler = new asf.CallBack(this.delayToDestroyRes, this);

			this.timerId = asf.App.timer.doLoop(60000, this.delayToDestroyRes, this, null, this.timerId);

			asf.PoolMgr.regClass(MovieLoaderInfo, 50);

			RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onResourceItemLoadError, this);
		}

		/**
		 * 强制销毁
		 */
		destroyForce(): void
		{
			var objs: Object = this.cacheMap.getSource();
			var name: string;
			for (name in objs)
			{
				var n: number = this.cacheMap.get(name);
				var urlMap: asf.HashMap<string, egret.MovieClipData> = this.mcDataMap.get(name);
				var url: string;
				if (urlMap)
				{
					var urlObjs: Object = urlMap.getSource();
					for (url in urlObjs)
					{
						RES.destroyRes(url + ".png");
					}
					this.mcDataMap.remove(name);
				}
			}

			this.cacheMap.clear();
			this.inTypeMap.clear();
		}

		/**
		 * 销毁当前引用为0的模型资源
		 * 例外的路径
		 */
		destroyRes(excepts?: string[]): void
		{
			var objs: Object = this.cacheMap.getSource();
			var name: string;
			var removeArr: string[] = []
			flg: for (name in objs)
			{
				if (excepts)
				{
					//例外的不会销毁
					for (var i: number = 0; i < excepts.length; i++)
					{
						if (excepts[i] == name)
						{
							continue flg;
						}
					}
				}

				var n: number = this.cacheMap.get(name);
				if (!n || n <= 0)
				{
					var urlMap: asf.HashMap<string, egret.MovieClipData> = this.mcDataMap.get(name);
					var url: string;
					if (urlMap)
					{
						var urlObjs: Object = urlMap.getSource();
						for (url in urlObjs)
						{
							var mcData: egret.MovieClipData = urlMap.remove(url);
							if (mcData && mcData.spriteSheet)
							{
								mcData.spriteSheet.dispose();
							}
							RES.destroyRes(url + ".png");
						}
					}

					removeArr.push(name);
				}
			}

			for (var i: number = 0; i < removeArr.length; i++)
			{
				this.cacheMap.remove(removeArr[i]);
				this.inTypeMap.remove(removeArr[i]);
			}
		}

		/**
		 * 添加缓存
		 */
		addCache(name: string, forever: boolean = false, inType: number = 0): void
		{
			var n: number = 0;
			if (this.cacheMap.hasKey(name))
			{
				n = this.cacheMap.get(name);
			}
			n++;
			//永久的再加1就不能清除了
			if (forever)
				n++;
			this.cacheMap.put(name, n);
			this.addInTypeMap(name, inType);
		}

		/**
		 * 移除缓存
		 */
		removeCache(name: string, inType: number): void
		{
			var n: number = 0;
			if (this.cacheMap.hasKey(name))
			{
				n = this.cacheMap.get(name);
				n--;
				this.cacheMap.put(name, n);
			}

			if (n < 0)
			{
				n = 0;
				this.cacheMap.remove(name);
			}
		}

		/**
		 * 添加到类型列表
		 */
		addInTypeMap(name: string, inType: number = 0): void
		{
			var type: number = this.inTypeMap.get(name);
			if (type == MovieMgr.InType_Scene)
			{
				//只要转换为场景，那都在场景销毁后才销毁了
				return
			}
			this.inTypeMap.put(name, inType);
		}

		/**
		 * 延时销毁非场景的东东
		 */
		delayToDestroyRes(): void
		{
			var objs: Object = this.inTypeMap.getSource();
			var name: string;
			var excepts: string[] = []
			for (name in objs)
			{
				var type: number = this.inTypeMap.get(name);
				if (type == MovieMgr.InType_Scene)
				{
					//场景类型是忽略类型，这个只会在转换场景时销毁
					excepts.push(name);
				}
			}
			this.destroyRes(excepts);
		}

		/**
		 * 加载资源模型
		 * name 模型名字（会通过模型名字绑定）
		 * url 该模型动作方向的url
		 */
		load(name: string, url: string, loadComplete?: asf.CallBack, errorComplete?: asf.CallBack): void
		{
			if (!name || name == "")
			{
				console.log("" + "没走URL的 : " + "" + url);
			}
			var mcData: egret.MovieClipData = this.getMovieClipData(name, url);
			if (mcData)
			{
				this.onLoadComplete(loadComplete, mcData, name, url);
				return;
			}
			this.loadJson(name, url, loadComplete, errorComplete);
		}

		/**
		 * 全部资源加载完成
		 */
		onLoadComplete(loadComplete: asf.CallBack, mcData: egret.MovieClipData, name: string, url: string): void
		{
			if (loadComplete && mcData)
			{
				loadComplete.execute(mcData, name, url);
			}
		}

		/**
		 * 获取Default.res的名称
		 */
		private getResUrlName(url: string, str: string = ""): string
		{
			var lastIndex: number = url.lastIndexOf("/");
			return url.substr(lastIndex + 1) + str;
		}

		/**
		 * 加载纹理
		 */
		loadJson(name: string, url: string, loadComplete?: asf.CallBack, errorComplete?: asf.CallBack): void
		{
			var jsonUrl: string = url + ".json";
			var loaderInfo: MovieLoaderInfo = asf.PoolMgr.create(MovieLoaderInfo);
			loaderInfo.url = url;
			loaderInfo.name = name;
			loaderInfo.thisObj = this;
			loaderInfo.callback = this.onLoadJson;
			loaderInfo.loadComplete = loadComplete;
			loaderInfo.errorComplete = errorComplete;

			var urlName: string = this.getResUrlName(url, "_json");
			var jsonData: any = RES.getRes(urlName);
			if (!jsonData)
			{
				jsonData = RES.getRes(jsonUrl);
			}
			else
			{
				console.log("" + "json加载完成" + "");
			}

			if (jsonData)
			{
				loaderInfo.callback.call(loaderInfo, jsonData);
			}
			else
			{
				this.loaderMap.put(jsonUrl, loaderInfo);
				RES.getResByUrl(jsonUrl, loaderInfo.callback, loaderInfo,RES.ResourceItem.TYPE_JSON)
			}
		}

		/**
		 * json加载完成
		 */
		onLoadJson(jsonData: any, url: string): void
		{
			var a: any = this;
			var loaderInfo: MovieLoaderInfo = a;
			// console.log("json加载完成");
			loaderInfo.jsonData = jsonData;
			loaderInfo.thisObj.addJsonMap(loaderInfo.url, jsonData)
			loaderInfo.thisObj.loadImage(loaderInfo);
			// asf.PoolMgr.release(loaderInfo, MovieLoaderInfo);
		}

		/**
		 * 加载图片
		 */
		loadImage(loaderInfo: MovieLoaderInfo): void
		{
			var imageUrl: string = loaderInfo.url + ".png";
			loaderInfo.callback = loaderInfo.thisObj.onLoadImage;

			var urlName: string = this.getResUrlName(loaderInfo.url, "_png");
			var texture: egret.Texture = RES.getRes(urlName);
			if (!texture)
			{
				texture = RES.getRes(imageUrl);
			}

			if (texture)
			{
				loaderInfo.callback.call(loaderInfo, texture);
			}
			else
			{
				this.loaderMap.put(imageUrl, loaderInfo);
				RES.getResByUrl(imageUrl, loaderInfo.callback, loaderInfo,RES.ResourceItem.TYPE_IMAGE)
			}
		}

		/**
		 * 图片加载完成
		 */
		onLoadImage(texture: egret.Texture, url: string): void
		{
			var a: any = this;
			var loaderInfo: MovieLoaderInfo = a;
			// console.log("image加载完成");

			var movieData: egret.MovieClipData = loaderInfo.thisObj.addMovieClipData(loaderInfo.name, loaderInfo.url, loaderInfo.jsonData, texture);
			loaderInfo.thisObj.onLoadComplete(loaderInfo.loadComplete, movieData, loaderInfo.name, loaderInfo.url);

			loaderInfo.callback = null;
			loaderInfo.jsonData = null;
			loaderInfo.loadComplete = null;
			loaderInfo.thisObj = null;
			asf.PoolMgr.release(loaderInfo, MovieLoaderInfo);
		}

		/**
		 * 项目加载失败
		 */
		private onResourceItemLoadError(event: RES.ResourceEvent): void
		{
			var loaderInfo: MovieLoaderInfo = this.loaderMap.remove(event.resItem.name);
			if (loaderInfo && loaderInfo.errorComplete)
			{
				loaderInfo.errorComplete.execute();
			}
		}

		/**
		 * 添加播放数据
		 */
		addMovieClipData(name: string, url: string, jsonData: any, texture: egret.Texture): egret.MovieClipData
		{
			var mcDataFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(jsonData, texture);
			if (mcDataFactory)
			{
				var movieData: egret.MovieClipData = mcDataFactory.generateMovieClipData();
				var urlMap: asf.HashMap<string, egret.MovieClipData> = this.mcDataMap.get(name);
				if (!urlMap)
				{
					urlMap = new asf.HashMap<string, egret.MovieClipData>();
					this.mcDataMap.put(name, urlMap)
				}
				urlMap.put(url, movieData);
				return movieData
			}
		}

		/**
		 * 获取动画数据
		 */
		getMovieClipData(name: string, url: string): egret.MovieClipData
		{
			var urlMap: asf.HashMap<string, egret.MovieClipData> = this.mcDataMap.get(name);
			if (urlMap)
			{
				var mcData: egret.MovieClipData = urlMap.get(url);
				if (mcData)
				{
					return mcData;
				}
			}
			// console.error(name + "没有movieData:" + url);
			return null;
		}

		/**
	 	* 添加json数据到字典
	 	*/
		addJsonMap(url: string, jsonData: any): void
		{
			this.jsonDataMap.put(url, jsonData);
		}

		// /**
		//  * 获取json数据
		//  */
		// getJsonData(url: string): game.PlayerJsonData
		// {
		// 	var data: any = this.jsonDataMap.get(url);
		// 	if (!data || !data.setting) return null;
		// 	var jsonData: PlayerJsonData = new PlayerJsonData();
		// 	jsonData.setSetting(data, url + ".json");
		// 	return jsonData
		// }

		private static instance: MovieMgr;
		static getInstance(): MovieMgr
		{
			if (this.instance == null)
			{
				this.instance = new MovieMgr();
			}
			return this.instance;
		}
	}
}