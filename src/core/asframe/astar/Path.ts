namespace asf
{
	export class Path
	{
		/**4方向模式*/
		public static DIRECTION_4: string = "4";
		/**4方向斜角模式*/
		public static DIRECTION_4_BEVEL: string = "5";
		/**8方向模式*/
		public static DIRECTION_8: string = "8";
		/**方向模式*/
		protected _directionMode: string = "8";

		/**节点二维数组*/
		protected _pointsArr2D: PathPoint[][] = [];
		/**起始点*/
		protected _startPoint: PathPoint;
		/**目标点*/
		protected _targetPoint: PathPoint;
		/**每次可移动但已标记过的节点数组(关闭列表)*/
		protected _finishList: PathPoint[] = [];
		/**要测试的节点数组(开放列表)*/
		protected _waitList: PathPoint[] = [];
		/**找到终点标记*/
		protected _finded: boolean;

		private _lastTime: number;

		/**测试点可往上移动*/
		protected _topMove: boolean;
		/**测试点可往下移动*/
		protected _bottomMove: boolean;
		/**测试点可往左移动*/
		protected _leftMove: boolean;
		/**测试点可往右移动*/
		protected _rightMove: boolean;
		/**地图大小*/
		protected _mapRectangle: egret.Rectangle;

		protected _ddArray: number[][];
		/**用于判断可否移动的函数,参数是值,返回Boolean*/
		protected _moveJudgeFun: Function;

		public constructor(ddArray: number[][] = null, moveJudgeFun: Function = null, directionMode: string = "8")
		{
			if (ddArray) this.setGrids(ddArray);
			this.setMoveJudgeFun(moveJudgeFun);
			if (directionMode) this.setDirectionMode(directionMode);
		}

		public setGrids(ddArray: number[][]): void
		{
			this._pointsArr2D = [];
			this._ddArray = ddArray;
			var col: number = this._ddArray.length;
			var row: number = this._ddArray[0].length;
			for (var i: number = 0; i < col; i++)
			{//克隆一个由PathPoint组成的二维数组
				if (!this._pointsArr2D[i]) this._pointsArr2D[i] = new Array();
				for (var s: number = 0; s < row; s++)
				{
					if (!this._pointsArr2D[i][s]) this._pointsArr2D[i][s] = new PathPoint(i, s, null);
				}
			}
		}

		public setPointValue(x: number, y: number, value: any): void
		{
			this._ddArray[x][y] = value;
		}

		public setMoveJudgeFun(fun: Function): void
		{
			this._moveJudgeFun = fun;
		}

		public setDirectionMode(directionMode: string): void
		{
			this._directionMode = directionMode;
		}

		public getDirectionMode(): string
		{
			return this._directionMode;
		}

		public findPath(currentLocation: egret.Point, targetLocation: egret.Point): PathPoint[]
		{
			throw new Error("Min:未执行复写");
		}

		protected resetParameters(currentLocation: egret.Point, targetLocation: egret.Point): void
		{
			this._lastTime = egret.getTimer();
			this._finded = false;
			this._startPoint = this._pointsArr2D[currentLocation.x][currentLocation.y];
			this._startPoint._parentPoint = null;
			this._startPoint._G = 0;
			this._targetPoint = this._pointsArr2D[targetLocation.x][targetLocation.y];//设置终点
			this._finishList = [];//清空关闭列表
			this._mapRectangle = new egret.Rectangle(0, 0, this._ddArray.length, this._ddArray[0].length);
			this._waitList = [this._startPoint];//将起点加入开放列表
		}


		protected findComplete(): void
		{
			var len: number = this._finishList.length;
			// for (i in this._finishList)
			for (var i: number = 0; i < len; i++)
			{
				this._finishList[i]._moved = false;
			}
		}

		/**
		 *获得周围点可移动的点,加入_aroundPointArr数组
		 * @param testPoint当前要测试的点
		 * @return 是否找到终点
		 */
		protected testPoint(testPoint: PathPoint): void
		{
			this._rightMove = this.testAroundPoint(testPoint, 1, 0);
			this._leftMove = this.testAroundPoint(testPoint, -1, 0);
			this._bottomMove = this.testAroundPoint(testPoint, 0, 1);
			this._topMove = this.testAroundPoint(testPoint, 0, -1);
			if (this._directionMode == Path.DIRECTION_4_BEVEL)
			{//4方向斜角时,确保2个方向都畅通才可穿过夹角
				if (this._rightMove && this._topMove) this.testAroundPoint(testPoint, 1, -1);
				if (this._rightMove && this._bottomMove) this.testAroundPoint(testPoint, 1, 1);
				if (this._leftMove && this._bottomMove) this.testAroundPoint(testPoint, -1, 1);
				if (this._leftMove && this._topMove) this.testAroundPoint(testPoint, -1, -1);
			}
			else if (this._directionMode == Path.DIRECTION_8)
			{//8方向
				this.testAroundPoint(testPoint, 1, -1);
				this.testAroundPoint(testPoint, 1, 1);
				this.testAroundPoint(testPoint, -1, 1);
				this.testAroundPoint(testPoint, -1, -1);
			}
		}

		protected testAroundPoint(testPoint: PathPoint, offsetX: number, offsetY: number): boolean
		{
			throw new Error("未执行复写");
		}

		private _testPeakArr: egret.Point[];
		private _peakArr: egret.Point[]
		private _indexArr: number[];
		public getOptimizePath(path: PathPoint[], crossBorder: boolean): PathPoint[]
		{
			if (!path) return null;
			// this._lastTime = egret.getTimer();
			var testPath: egret.Point[] = path.concat();
			var len: number = testPath.length;
			var i: number;
			this._peakArr = [];
			this._indexArr = [0];
			var index: number;
			do
			{
				this._testPeakArr = PathLineUtils.getPeaksInLine(testPath, this.notInArr, this);//取得路径上的所有顶点,包含起点和终点
				len = this._testPeakArr.length;
				for (i = 1; i < len - 1; i++)
				{//遍历顶点,尝试消除
					index = testPath.indexOf(this._testPeakArr[i]);
					if (this._peakArr.indexOf(this._testPeakArr[i]) < 0)
					{//未记录为不可消除
						if (this.canCross(testPath[index + 1], testPath[index - 1], crossBorder))
						{//顶点的2个相邻点连接无障碍,消除这个顶点
							testPath.splice(index, 1);
						}
						else
						{//有障碍,保留这个点
							this._peakArr.push(this._testPeakArr[i]);
							this._indexArr.push(path.indexOf(this._testPeakArr[i] as PathPoint));
						}
					}
				}
			} while (this._testPeakArr.length > 2);//大于1表示取得了
			// this._indexArr.sort(Array.NUMERIC);
			SortUtil.sortBy(this._indexArr, true, false);
			this._indexArr.push(path.length - 1)

			//得到的顶点数组是树形排列的,这里对齐顺序
			var orderArr: PathPoint[] = [];
			var len: number = this._indexArr.length;
			for (var i: number = 0; i < len; i++)
			{
				index = this._indexArr[i];
				orderArr.push(path[index] as PathPoint);
			}
			// for each(index in this._indexArr){
			// 	orderArr.push(path[index]);
			// }
			return orderArr;
		}

		/**
		 * 判断函数 
		 * @param point
		 * @return 
		 */
		private notInArr(point: egret.Point): boolean
		{
			return this._peakArr.indexOf(point) < 0;
		}

		/**
		 * 2点是否没有障碍
		 * @param n1 点1
		 * @param n2 点2
		 * @return 是否没有障碍
		 */
		private canCross(point1: egret.Point, point2: egret.Point, crossBorder: boolean): boolean
		{
			var points: egret.Point[] = PathLineUtils.getCrossPoint(point1, point2, crossBorder);
			var len: number = points.length;
			for (var i: number = 0; i < len; i++)
			{
				if (this._moveJudgeFun.call(this, this._ddArray[points[i].x][points[i].y]) == false)
				{
					return false;
				}
			}
			return true;
		}
	}
}