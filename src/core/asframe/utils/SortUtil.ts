namespace asf
{
	export class SortUtil
	{
		public constructor()
		{
		}

		/**
		 *  对数组的进行NUMBER排序
		 *  对象数组
		 *  re:true升序 false降序
		 *  isNew 是否创建新的数组
		 */
		public static sortBy(_arr1: any[], re: boolean = false, isNew: boolean = true): any[]
		{
			var arr: any[] = isNew ? _arr1.concat() : _arr1;
			arr.sort(sortFun);
			return arr;

			function sortFun(a: any, b: any): number
			{
				if (a < b) 
				{
					if (re) return -1;
					return 1;
				}
				if (a == b) return 0;

				if (re) return 1;
				return -1;
			}
		}

		private static _p: string;
		private static _re: boolean;
		/**
		 *  对数组的某个属性排序
		 *  _arr1:对象数组
		 *  p:属性名
		 *  re:false降序 true升序
		 *  isNew:是否创建新的数组
		 */
		public static sortBy2(_arr1: any[], p: string, re: boolean = false, isNew: boolean = true): any[]
		{
			this._p = p;
			this._re = re;

			var arr: any[] = isNew ? _arr1.concat() : _arr1;
			arr.sort(this.sortFun);
			return arr;
		}

		static sortFun(a: any, b: any): number
		{
			if (a[SortUtil._p] < b[SortUtil._p]) 
			{
				if (SortUtil._re) return -1;
				return 1;
			}
			if (a[SortUtil._p] == b[SortUtil._p]) return 0;

			if (SortUtil._re) return 1;
			return -1;
		}

		/**
		 * 对数组的某些属性排序
		 * @param _arr1 对象数组
		 * @param p 属性名
		 * @param re false 升序 true 降序
		 * @param isNew 是否创建新的数组
		 * @return 
		 * 
		 */
		public static sortBy3(_arr1: any[], p: any[], re: boolean = false, isNew: boolean = true): any[]
		{
			var arr: any[] = isNew ? _arr1.concat() : _arr1;
			arr.sort(sortFun);
			return arr;

			function sortFun(a: any, b: any): number
			{
				var i: number = 0;
				while (true)
				{
					if (a[p[i]] < b[p[i]]) 
					{
						if (re) return 1;
						return -1;
					}
					else if (a[p[i]] > b[p[i]])
					{
						if (re) return -1;
						return 1;
					}
					if (a[p[i]] == b[p[i]])
					{
						i++;
						if (i >= p.length)
						{
							break;
						}
					}
				}
				return 0;
			}
		}

		/**
		 *  对数组的某个属性的属性排序
		 *  对象数组
		 *  属性名
		 *  false 升序 true 降序
		 *  isNew 是否创建新的数组
		 */
		public static sortBy4(_arr1: any[], _arr2: any[], reArr: any[], isNew: boolean = true): any[]
		{
			var arr: any[] = isNew ? _arr1.concat() : _arr1;
			if (!arr || arr.length == 0) return [];

			arr.sort(sortFun);

			return arr;

			function sortFun(a: any, b: any): number
			{
				var i: number;
				var aa: Object = a;
				var bb: Object = b;
				var re: Boolean = false;
				for (var j: number = 0; j < _arr2.length; j++)
				{
					a = aa;
					b = bb;
					re = reArr[j];
					for (i = 0; i < _arr2[j].length; i++)
					{
						a = a[_arr2[j][i]];
					}

					for (i = 0; i < _arr2[j].length; i++)
					{
						b = b[_arr2[j][i]];
					}

					if (a != b)
					{
						continue;
					}
				}

				if (a < b) 
				{
					if (re) return -1;
					return 1;
				}
				if (a == b) return 0;

				if (re) return 1;
				return -1;
			}
		}


		/**
		 * 对数组的某些属性排序
		 * @param _arr1 对象数组
		 * @param p 属性名
		 * @param reArr false 升序 true 降序
		 * @param isNew 是否创建新的数组
		 * 
		 * 例子:sortBy5(list,["type","id"],[fales,true],false);//对type升序排完再对id降序排
		 * @return 
		 * 
		 */
		public static sortBy5(_arr1: any[], p: any[], reArr: boolean[] = [], isNew: boolean = true): any[]
		{
			var arr: any[] = isNew ? _arr1.concat() : _arr1;
			arr.sort(sortFun);
			return arr;

			function sortFun(a: any, b: any): number
			{
				var i: number = 0;
				while (true)
				{
					var re: boolean = reArr[i];
					if (a[p[i]] < b[p[i]]) 
					{
						if (re) return 1;
						return -1;
					}
					else if (a[p[i]] > b[p[i]])
					{
						if (re) return -1;
						return 1;
					}
					if (a[p[i]] == b[p[i]])
					{
						i++;
						if (i >= p.length)
						{
							break;
						}
					}
				}
				return 0;
			}
		}
	}
}