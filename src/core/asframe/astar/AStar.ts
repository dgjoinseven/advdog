namespace asf
{
	export class AStar extends Path
	{
		public constructor(ddArray: number[][] = null, moveJudgeFun: Function = null, directionMode: string = "5")
		{
			super(ddArray, moveJudgeFun, directionMode);
			this._binaryHeap = new BinaryHeap("_F");
		}

		/**二叉堆优化*/
		private _bmh: boolean = true;
		public setBMH(enable: boolean): void
		{
			this._bmh = enable;
		}
		public getBMH(): boolean
		{
			return this._bmh;
		}
		private _binaryHeap: BinaryHeap;

		public findPath(currentLocation: egret.Point, targetLocation: egret.Point): PathPoint[]
		{
			var currentPoint: egret.Point = egret.Point.create(currentLocation.x, currentLocation.y);

			if (!this._ddArray[currentPoint.x])
			{
				return [];
			}

			if (this._moveJudgeFun == null) throw new Error("Min:未设置移动判断函数");
			if (!this._moveJudgeFun(this._ddArray[currentPoint.x][currentPoint.y])) 
			{
				//处于不可走的话，将这个点移动最近的可走点
				var k: number = 1;
				flg: while (true)
				{
					for (var i: number = -1; i <= 1; i++)
					{
						for (var j: number = -1; j <= 1; j++)
						{
							if (i != 0 && j != 0)
							{
								if (!this._ddArray[currentPoint.x + i * k])
								{
									break flg;
								}
								else if (this._moveJudgeFun(this._ddArray[currentPoint.x + i * k][currentPoint.y + j * k]))
								{
									currentPoint.x = currentPoint.x + i * k;
									currentPoint.y = currentPoint.y + j * k;
									break flg;
								}
							}
						}
					}

					k++;
				}
			}

			if (!this._ddArray[targetLocation.x])
			{
				return [];
			}

			if (!this._moveJudgeFun(this._ddArray[targetLocation.x][targetLocation.y]))
			{
				//结束点
				//点击的点不可走
				//寻找最近的可走的点
				while (!this._moveJudgeFun(this._ddArray[targetLocation.x][targetLocation.y]))
				{
					if (targetLocation.x > currentPoint.x)
					{
						targetLocation.x--;
					} else if (targetLocation.x < currentPoint.x)
					{
						targetLocation.x++;
					}
					if (targetLocation.y > currentPoint.y)
					{
						targetLocation.y--;
					} else if (targetLocation.y < currentPoint.y)
					{
						targetLocation.y++;
					}
					if (targetLocation.x == currentPoint.x && currentPoint.y == targetLocation.y)
					{
						return [];
					}
				}
			}

			this.resetParameters(currentPoint, targetLocation);
			var targetPoint
			while (true)
			{//循环,开放列表存在节点时
				if (this._bmh)
				{
					this.testPoint(this._binaryHeap.getTop() as PathPoint);
				} else
				{
					// this._waitList.sortOn("_F", Array.NUMERIC);
					SortUtil.sortBy2(this._waitList, "_F", false, false);
					this.testPoint(this._waitList[0]);
				}
				if (this._finded)
				{
					//trace("找到终点"+_targetPoint);
					this.findComplete();
					return this._targetPoint.getWay().reverse();
				}
				if (this._bmh)
				{
					if (this._binaryHeap.getTop() == null) break;
				} else
				{
					if (this._waitList.length == 0) break;
				}
			}
			this.findComplete();
			return [];
		}

		protected resetParameters(currentLocation: egret.Point, targetLocation: egret.Point): void
		{
			super.resetParameters(currentLocation, targetLocation);
			if (this._bmh)
			{
				this._binaryHeap.clear();
				this._binaryHeap.addToBMH(this._startPoint);
			} else
			{
				this._waitList = [this._startPoint];//将起点加入开放列表
			}
		}

		protected testPoint(testPoint: PathPoint): void
		{
			if (this._bmh)
			{
				this._binaryHeap.removeFromBMHByIndex(0);
			} else
			{
				this._waitList.splice(0, 1);
			}
			testPoint._wait = false;
			testPoint._moved = true;
			this._finishList.push(testPoint);
			super.testPoint(testPoint);
		}

		protected testAroundPoint(testPoint: PathPoint, offsetX: number, offsetY: number): boolean
		{
			var x: number = testPoint.x + offsetX;
			var y: number = testPoint.y + offsetY;
			if (x < this._mapRectangle.x || x > (this._mapRectangle.x + this._mapRectangle.width - 1) || y < this._mapRectangle.y || y > (this._mapRectangle.y + this._mapRectangle.height - 1))
			{
				return false;
			}
			var pFPoint: PathPoint = this._pointsArr2D[x][y];
			var G: number = (offsetX != 0 && offsetY != 0) ? 14 : 10;
			if (!pFPoint._moved)
			{//不在关闭列表中
				if (!pFPoint._wait)
				{//不在开放列表中
					if (this._moveJudgeFun(this._ddArray[pFPoint.x][pFPoint.y]))
					{//该点可移动
						pFPoint._parentPoint = testPoint;//标记父坐标
						pFPoint._G = testPoint._G + G;
						pFPoint._F = pFPoint._G + (Math.abs(this._targetPoint.x - pFPoint.x) + Math.abs(this._targetPoint.y - pFPoint.y)) * 10;
						//pFPoint._F=pFPoint._G+Math.floor(Point.distance(_targetPoint,pFPoint)*10);
						if (pFPoint == this._targetPoint)
						{
							this._finded = true;
						} else
						{
							pFPoint._wait = true;
							if (this._bmh)
							{
								this._binaryHeap.addToBMH(pFPoint);//该点若不是终点,加入待测试数组
							} else
							{
								this._waitList.push(pFPoint);
							}
						}
						return true;
					}
				} else
				{//在开放列表中
					if (pFPoint._G > (testPoint._G + G))
					{//如果该点移动代价小
						pFPoint._parentPoint = testPoint;
						pFPoint._G = testPoint._G + G;
						//pFPoint._F=pFPoint._G+Math.floor(Point.distance(_targetPoint,pFPoint)*10);
						pFPoint._F = pFPoint._G + (Math.abs(this._targetPoint.x - pFPoint.x) + Math.abs(this._targetPoint.y - pFPoint.y)) * 10;
						if (this._bmh) this._binaryHeap.changeFromBMH(pFPoint);
					}
					return true;
				}
			}
			return false;
		}

		protected findComplete(): void
		{
			var arr: PathPoint[] = this._bmh ? this._binaryHeap.getArr() : this._waitList;
			var len: number = arr.length;
			for (var i: number = 0; i < arr.length; i++)
			{
				arr[i]._wait = false;
			}
			// for each(var point: PathPoint in arr){
			// 	point._wait = false;
			// }
			super.findComplete();
		}
	}
}