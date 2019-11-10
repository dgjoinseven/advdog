namespace morn
{
	export class ObjectUtils
	{

		public constructor()
		{
		}

		private static grayFilter: egret.ColorMatrixFilter = new egret.ColorMatrixFilter([0.3,0.6,0,0,0,0.3,0.6,0,0,0,0.3,0.6,0,0,0,0,0,0,1,0]);

		/**添加滤镜*/
		public static addFilter(target: egret.DisplayObject, filter: egret.Filter): void
		{
			var filters: egret.Filter[] = target.filters || [];
			filters.push(filter);
			target.filters = filters;
		}

		/**清除滤镜*/
		public static clearFilter(target: egret.DisplayObject, filterType: any): void
		{
			var filters: egret.Filter[] = target.filters;
			if (filters != null && filters.length > 0)
			{
				for (var i: number = filters.length - 1; i > -1; i--)
				{
					var filter: any = filters[i];
					if (filter instanceof filterType)
					{
						filters.splice(i, 1);
					}
				}
				target.filters = filters;
			}
		}

		/**让显示对象变成灰色*/
		public static gray(traget: egret.DisplayObject, isGray: Boolean = true): void
		{
			if (isGray)
			{
				//this.clearFilter(traget, egret.ColorMatrixFilter);
				traget.filters = [ObjectUtils.grayFilter];
				//this.addFilter(traget, ObjectUtils.grayFilter);
			}
			else
			{
				this.clearFilter(traget, egret.ColorMatrixFilter);
			}
		}


		// /**让显示对象变成灰色*/
		// public static colorFilter(traget: egret.DisplayObject, isGray: Boolean = true): void
		// {
		// 	if (isGray)
		// 	{
		// 		this.clearFilter(traget, egret.ColorMatrixFilter);
		// 		this.addFilter(traget, ObjectUtils.grayFilter);
		// 	}
		// 	else
		// 	{
		// 		this.clearFilter(traget, egret.ColorMatrixFilter);
		// 	}
		// }
	}
}