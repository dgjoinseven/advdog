namespace asf
{
	export class PathPoint extends egret.Point
	{
		/**父坐标*/
		public _parentPoint: PathPoint;
		/**是否被标记在某条路径上(关闭列表中)*/
		public _moved: boolean;
		/**是否处于等待状态(开放列表中)*/
		public _wait: boolean;
		/**是否处于等待状态(开放列表中)*/
		public _wait2: boolean;
		/**已移动值*/
		public _G: number;
		/**评分*/
		public _F: number;

		/**
		* A星寻路点 
		* @param $x x坐标
		* @param $y y坐标
		* @param $parentPoint 父坐标
		*/
		public constructor($x: number, $y: number, parentPoint: PathPoint = null)
		{
			super();
			this.x = $x;
			this.y = $y;
			this._parentPoint = parentPoint;
		}

		public getWay(): PathPoint[]
		{
			//trace("终点"+finalPoint);
			var wayPointArr: PathPoint[] = [];
			var testPoint: PathPoint = this;
			while (testPoint)
			{//非起点(起点的parentPoint属性是null);
				//trace(">"+testPoint);
				wayPointArr.push(testPoint);
				testPoint = testPoint._parentPoint;
			}
			return wayPointArr;
		}

	}
}