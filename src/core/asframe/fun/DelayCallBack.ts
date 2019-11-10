namespace asf
{
    /**
     * 挂起等待操作的方法
     * @author liwenlong
     */
	export class DelayCallBack
	{
		static map: asf.Dictionary<any, CallBack[]> = new asf.Dictionary<any, CallBack[]>();
		public constructor()
		{
		}

		/**
		 * 添加延迟方法
		 * 
		 * @static
		 * @param {*} key
		 * @param {CallBack} callback
		 * 
		 * @memberOf DelayCallBack
		 */
		static push(key: any, callback: CallBack): void
		{
			var arr: CallBack[] = this.map.get(key);
			if (!arr)
			{
				arr = [];
				this.map.put(key, arr);
			}
			arr.push(callback);
		}

		/**
		 * 调用第一个延迟方法
		 * 
		 * @static
		 * @param {*} key
		 * @returns {boolean}
		 * 
		 * @memberOf DelayCallBack
		 */
		static call(key: any): boolean
		{
			var arr: CallBack[] = this.map.get(key);
			if (arr && arr.length > 0)
			{
				var c: CallBack = arr.shift();
				c.execute();
				if (arr.length == 0)
				{
					this.map.remove(key);
				}
				return true;
			}

			return false;
		}

		/**
		 * 按顺序执行所有延迟
		 * 
		 * @static
		 * @param {*} key
		 * 
		 * @memberOf DelayCallBack
		 */
		static callAll(key: any): void
		{
			while (this.has(key))
			{
				this.call(key);
			}
		}

		/**
		 * 是否有延时方法
		 * 
		 * @static
		 * @param {*} key
		 * @returns {boolean}
		 * 
		 * @memberOf DelayCallBack
		 */
		static has(key: any): boolean
		{
			var arr: CallBack[] = this.map.get(key);
			if (arr && arr.length > 0)
			{
				return true;
			}

			return false
		}
	}
}