namespace morn
{
	export class StringUtils
	{
		public constructor()
		{
		}

		/**用字符串填充数组，并返回数组副本*/
		public static fillArray(arr: any[], str: string, type: any = null): any[]
		{
			var temp: any[] = arr.concat();//ObjectUtils.clone(arr);
			if (Boolean(str))
			{
				var a: string[] = str.split(",");
				for (var i: number = 0, n: number = Math.min(temp.length, a.length); i < n; i++)
				{
					var value: string = a[i];
					temp[i] = (value == "true" ? true : (value == "false" ? false : value));
					if (type != null)
					{
						temp[i] = type(value);
					}
				}
			}
			return temp;
		}

		/**
		 * 将png.xx.yy的改成改成xx_yy_png
		 * 
		 * @static
		 * @param {string} url
		 * @returns {string}
		 * 
		 * @memberOf StringUtils
		 */
		public static urlFormat(url: string): string
		{
			// var urlArr:url.split(".")
			var newUrl: string = url.replace(/\./g, "_");
			newUrl = newUrl.substr(newUrl.lastIndexOf("_") + 1);
			newUrl += "_png"
			return newUrl;
		}
	}
}