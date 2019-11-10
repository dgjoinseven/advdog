namespace asf {
	export class MathUtils {
		private static PI_divideBy180: number = Math.PI / 180;
		private static PI_divide180: number = 180 / Math.PI;
		/**
		 * 获取方向弧度
		 */
		static getRadian(beginx: number, beginy: number, endx: number, endy: number): number {
			var beginPoint: egret.Point = egret.Point.create(beginx, beginy);
			var endPoint: egret.Point = egret.Point.create(endx, endy);

			//求出1到2的向量
			var vector: egret.Point = endPoint.subtract(beginPoint);
			//求出向量的弧度
			//过原点垂直于这条向量的另一条直线，这条直线的长度就是矩形的宽度。
			//在p1点画一条垂直x坐标轴的直线，这里的夹角是等于向量的角度
			var vectorRadian: number = Math.atan2(vector.y, vector.x);

			//舞台坐标和传统坐标轴是反转的
			vectorRadian = -vectorRadian;

			return vectorRadian
		}

		/**
		 * 判断是否是整数
		 * @static
		 * @param {number} v
		 * @returns {boolean}
		 *
		 * @memberOf Maths
		 */
		public static isInteger(v: number): boolean {
			return v % 1 === 0;
		}

		public static oneTwo(): boolean {
			return RandomUtils.random(0, 1) > 0.5 ? true : false;
		}

		/**四舍五入保留小数点几多位*/
		static toFixed(value: string | number, n: number = 0): number {
			if (typeof value == "string") {
				if (value == "NaN")
					throw Error("该字符串不能正确转换成数值类型");
				value = Number(value)
			}
			return Number(value.toFixed(n));
		}

		/**不四舍五入保留小数点几多位*/
		static toFixedNo(value: string | number, n: number = 0): number {
			//统一转成字符串
			var str: string = value + "";
			var index: number = str.indexOf(".");
			if (index == -1) return Number(str);
			str = str.substr(0, index + n);
			return Number(str);
		}

		/**
		 * 旋转坐标
		 * @param	x
		 * @param	y
		 * @param	sin			旋转角度的正弦
		 * @param	cos			旋转角度的余弦
		 * @param	reverse		是否反转
		 */
		static rotatePos(x: number, y: number, sin: number, cos: number, reverse: boolean): Point {
			var result: Point = Point.create(x, y);
			if (reverse)  // 反转
			{
				result.x = x * cos + y * sin;
				result.y = y * cos - x * sin;
			}
			else 		 // 非反转
			{
				result.x = x * cos - y * sin;
				result.y = y * cos + x * sin;
			}
			return result;
		}

		/**
		 * 获取两点的距离
		 * @param	x1
		 * @param	y1
		 * @param	x2
		 * @param	y2
		 * @return
		 */
		static distance(x1: number, y1: number, x2: number, y2: number): number {
			return Point.distance(Point.create(x1, y1), Point.create(x2, y2));
		}

		/**
		 * 获取弧度
		 * @param	x1
		 * @param	y1
		 * @param	x2
		 * @param	y2
		 * @return
		 */
		static radian(x1: number, y1: number, x2: number, y2: number): number {
			var nx: number = x1 - x2;
			var ny: number = y1 - y2;
			return Math.atan2(ny, nx);
		}

		/**
		 * 角度转弧度
		 */
		public static aToR(angle: number): number {
			return angle * asf.MathUtils.PI_divideBy180;//a*pi/180
		}

		/**
		 * 弧度转角度
		 */
		public static rToA(radian: number): number {
			return radian * asf.MathUtils.PI_divide180;//r*180/pi
		}

		/**
		 * 获取角度
		 * @param	x1
		 * @param	y1
		 * @param	x2
		 * @param	y2
		 * @return
		 */
		static angle(x1: number, y1: number, x2: number, y2: number): number {
			return this.rToA(this.radian(x1, y1, x2, y2));
		}

		/**
		 * 获取正数角度
		 * @param	angle
		 * @return
		 */
		static plusAngle(angle: number): number {
			angle += 360;
			angle %= 360;
			return angle;
		}

		/**
		 * 获取半圆角度
		 * @param	angle
		 * @return
		 */
		static halfAngle(angle: number): number {
			angle %= 360;
			if (angle > 180) {
				angle -= 360;
			}
			else if (angle < -180) {
				angle += 360;
			}
			return angle;
		}


		/**
		 * 将数值精确到小数点到几位
		 * @param	value		要精确的数字
		 * @param	bit			位数
		 * @return
		 */
		static precision(value: number, bit: number = 10): number {
			if (isNaN(value))
				return 0;
			return Number(value.toFixed(bit));
		}

		/**
		 * 检测一个点是否在圆内
		 * @param	x				要检测点的X
		 * @param	y				要检测点的Y
		 * @param	cx				圆的X
		 * @param	cy				圆的Y
		 * @param	radius			圆的半径
		 * @return
		 */
		static isInCircle(x: number, y: number, cx: number, cy: number, radius: number): boolean {
			return this.distance(x, y, cx, cy) <= radius;
		}

		/**
		 * 检测一个点是否在矩形内
		 * @param	x				要检测点的X
		 * @param	y				要检测点的Y
		 * @param	rx				矩形的X
		 * @param	ry				矩形的Y
		 * @param	width			矩形的宽
		 * @param	height			矩形的高
		 * @return
		 */
		static isInRect(x: number, y: number, rx: number, ry: number, width: number, height: number): boolean {
			var dx: number = Math.abs(x - rx);
			var dy: number = Math.abs(y - ry);
			return dx <= width / 2 && dy <= height / 2;
		}

		/**
		 * 动力守恒
		 * 返回一个数组,
		 * 0为速度1变换后的速度
		 * 1为速度2变换后的速度
		 * @param	vx1		速度1
		 * @param	vx2		速度2
		 * @param	mass1	重量1
		 * @param	mass2	重量2
		 * @return
		 */
		static momentumConservation(vx1: number, vx2: number, mass1: number, mass2: number): number[] {
			var vxTotal: number = vx1 - vx2;
			vx1 = ((mass1 - mass2) * vx1 +
				2 * mass2 * vx2) /
				(mass1 + mass2);
			vx2 = vxTotal + vx1;
			return [vx1, vx2];
		}
		static random(param1: number, param2: number, param3: number = 1): number {
			var _loc_4: any = (param2 - param1 + param3) / param3;
			var _loc_5: any = (param2 - param1 + param3) / param3 * Math.random() * param3;
			return (param2 - param1 + param3) / param3 * Math.random() * param3 + param1;
		}

		static rangedArray(param1: number, param2: number, param3: number = 1, param4: boolean = false, param5: boolean = false): number[] {
			var _loc_8: number = 0;
			var _loc_9: number = 0;
			var _loc_6: number[] = [];
			var _loc_7: boolean = false;
			if (param1 > param2) {
				_loc_9 = param2;
				param2 = param1;
				param1 = _loc_9;
				_loc_7 = true;
			}
			_loc_8 = param1 + (param4 ? (0) : (param3));
			while (_loc_8 <= param2 - (param5 ? (0) : (param3))) {

				_loc_6.push(_loc_8);
				_loc_8 = _loc_8 + param3;
			}
			if (_loc_7) {
				_loc_6.reverse();
			}
			return _loc_6;
		}// end function
		/**
		 * 转换向量到角度 
		 * @param param1
		 * @return 
		 * 
		 */
		static convertVectorToRadians(point: Point): Number {
			return this.correctRadians(Math.atan2(point.y, point.x));
		}// end function
		/**
		 * 两点之间的距离 
		 * @param point1
		 * @param ponit2
		 * @return 
		 * 
		 */
		static lengthBetweenPoints(point1: Point, ponit2: Point): Number {
			return Math.sqrt(Math.pow(point1.x - ponit2.x, 2) + Math.pow(point1.y - ponit2.y, 2));
		}// end function
		/**
		 * 修正弧度 
		 * @param param1
		 * @return 
		 * 
		 */
		static correctRadians(radians: number): Number {
			if (radians < 0) {
				radians = radians + Math.PI * 2;
			}
			else if (radians >= Math.PI * 2) {
				radians = radians - Math.PI * 2;
			}
			return radians;
		}
		static numberAsHexString(param1: number, param2: number = 1): string {
			var _loc_3: number = 0;
			var _loc_4: string = "";
			while (param1 > 0 || param2 > 0) {

				param2 = param2 - 1;
				_loc_3 = param1 & 15;
				switch (_loc_3) {
					case 10:
						{
							_loc_4 = "A" + _loc_4;
							break;
						}
					case 11:
						{
							_loc_4 = "B" + _loc_4;
							break;
						}
					case 12:
						{
							_loc_4 = "C" + _loc_4;
							break;
						}
					case 13:
						{
							_loc_4 = "D" + _loc_4;
							break;
						}
					case 14:
						{
							_loc_4 = "E" + _loc_4;
							break;
						}
					case 15:
						{
							_loc_4 = "F" + _loc_4;
							break;
						}
					default:
						{
							_loc_4 = _loc_3.toString() + _loc_4;
							break;
						}
				}
				param1 = param1 >>> 4;
			}
			return _loc_4;
		}// end function
	}

}