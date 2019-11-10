namespace morn
{
	//指引
	export class GuideMgr
	{
		private guideMap: asf.HashMap<string, morn.Component>
		/**
		 * 添加后刷新的方法
		 * 
		 * @type {asf.CallBack}
		 * @memberOf GuideMgr
		 */
		public updateCallback: asf.CallBack;
		/**
		 * 移除后刷新的方法
		 * 
		 * @type {asf.CallBack}
		 * @memberOf GuideMgr
		 */
		public removeCallback: asf.CallBack;
		public constructor()
		{
			this.guideMap = new asf.HashMap<string, morn.Component>();
		}

		/**
		 * 获取需要指引的对象
		 * 
		 * @param {string} str
		 * @returns {morn.Component}
		 * 
		 * @memberOf GuideMgr
		 */
		public get(str: string): morn.Component
		{
			var com = this.guideMap.get(str);
			if (com && com.guide == str)
			{
				return com;
			}
			return null;
		}

		/**
		 * 添加指引对象到字典
		 * 
		 * @param {string} str
		 * @param {morn.Component} obj
		 * 
		 * @memberOf GuideMgr
		 */
		public add(str: string, obj: morn.Component): void
		{
			this.guideMap.put(str, obj);
			if (this.updateCallback)
				this.updateCallback.execute(str);
		}

		/**
		 * 移除指引
		 * 
		 * @param {string} str
		 * 
		 * @memberOf GuideMgr
		 */
		public remove(str: string): void
		{
			this.guideMap.remove(str);
			if (this.removeCallback) this.removeCallback.execute();
		}

		private static instance: GuideMgr;
		static getInstance(): GuideMgr
		{
			if (this.instance == null)
			{
				this.instance = new GuideMgr();
			}
			return this.instance;
		}
	}
}