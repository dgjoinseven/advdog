namespace game
{
	/**
	 * 摇杆控件
	 */
	export class Rocker
	{

		private rocker: morn.Box;
		private limitDistance: number;
		private iRockerControl: game.IRockerControl;

		private touchStatus: boolean;              //当前触摸状态，按下时，值为true
		private distance: egret.Point; //鼠标点击时，鼠标全局坐标与_bird的位置差
		private originalX: number;
		private originalY: number;
		private resultPoint: egret.Point;
		private touchPointID: number = -1;
		private scaleValue: number = 1//0.7

		/**
		*@rockerImage 摇杆资源
		*@limitDistance 摇杆最大移动距离
		*@iRockerControl 实现game.IRockerControl的实例,用于执行回调
		*/
		public constructor(rockerImage: morn.Box, limitDistance: number, iRockerControl: game.IRockerControl)
		{
			this.rocker = rockerImage;
			this.limitDistance = limitDistance;
			this.iRockerControl = iRockerControl;


			this.touchStatus = false;
			this.distance = new egret.Point();
			this.originalX = this.rocker.x;
			this.originalY = this.rocker.y;
			this.resultPoint = new egret.Point();

			this.rocker.touchEnabled = true;
			// rockerImage.scale = this.scaleValue;

			if (this.rocker.stage)
			{
				this.rocker.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
				this.rocker.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
			}
			else
			{
				this.rocker.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
			}
		}

		public destroy(): void
		{
			this.rocker.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
			this.rocker.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
			this.rocker.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
			this.rocker.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);

			this.resultPoint = null;
			this.iRockerControl = null;
			this.rocker = null;
			this.distance = null;
		}

		private onAddtoStage(e: Event): void
		{
			this.rocker.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddtoStage, this);
			this.rocker.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.mouseDown, this);
			this.rocker.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.mouseUp, this);
		}

		private mouseDown(e: egret.TouchEvent): void
		{
			// this.rocker.scale = 1;
			this.setRockScale(this.scaleValue);
			this.touchPointID = e.touchPointID;//按下记录touchID
			// console.log("按下摇杆--e.localX>" + e.localX + "  e.localY>" + e.localY + "  e.stageX>" + e.stageX + "  e.stageY>" + e.stageY);
			this.touchStatus = true;

			this.distance.x = e.localX;
			this.distance.y = e.localY;

			this.rocker.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
		}

		private mouseUp(e: egret.TouchEvent): void
		{
			if (this.touchPointID == e.touchPointID)
			{
				this.touchPointID = -1;
				if (this.touchStatus)
				{
					// console.log("弹起摇杆");
					// this.rocker.scale = this.scaleValue
					this.setRockScale(1);
					this.touchStatus = false;
					this.rocker.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);

					this.rocker.x = this.originalX;
					this.rocker.y = this.originalY;

					this.iRockerControl.reset();
				}
			}
		}

		private mouseMove(e: egret.TouchEvent)
		{
			if (this.touchPointID == e.touchPointID)
			{
				if (this.touchStatus)
				{
					// console.log("移动摇杆--e.localX>" + e.localX + "  e.localY>" + e.localY + "  e.stageX>" + e.stageX + "  e.stageY>" + e.stageY);


					this.rocker.parent.globalToLocal(e.stageX - this.distance.x, e.stageY - this.distance.y, this.resultPoint);
					this.rocker.x = this.resultPoint.x;
					this.rocker.y = this.resultPoint.y;


					//求出弧度
					var radian: number = Math.atan2(this.rocker.y - this.originalY, this.rocker.x - this.originalX);
					// console.log("角度>" + 180 * radian / Math.PI + "  弧度>" + radian);

					//移动幅度大于限定距离时候
					// if (this.distanceSqrt(this.rocker.x, this.rocker.y, this.originalX, this.originalY) > this.limitDistance * this.limitDistance) {
					var moveDistance: number = this.getDistance(this.rocker.x, this.rocker.y, this.originalX, this.originalY);
					if (moveDistance > this.limitDistance)
					{
						moveDistance = this.limitDistance;
						this.rocker.x = this.originalX + Math.cos(radian) * this.limitDistance;
						this.rocker.y = this.originalY + Math.sin(radian) * this.limitDistance;
					}

					// console.log("摇杆位置>" + this.rocker.x + "  " + this.rocker.y);

					this.iRockerControl.move(radian, moveDistance / this.limitDistance);
				}
			}
		}

		// private distanceSqrt(x1: number, y1: number, x2: number, y2: number): number {
		// 	return Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2);
		// }
		private getDistance(x1: number, y1: number, x2: number, y2: number): number
		{
			return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
		}

		/**更改缩放比例
		 * @author czh
		 * @param value 缩放比例 缺省则设置默认值0.7
		 * @param isUpdate 是否立即更新视图
		 */
		public setScaleValue(value: number = 0.7, isUpdate: boolean = false)
		{
			this.scaleValue = value;
			if (isUpdate)
			{
				this.rocker.scale = value;
				this.setRockScale(value);
			}
		}

		private setRockScale(value: number): void
		{
			var w: number = this.rocker.width;
			var h: number = this.rocker.height;
			this.rocker.scaleX = this.rocker.scaleY = value;
			this.rocker.x = (w - this.rocker.width * value) * 0.5;
			this.rocker.y = (h - this.rocker.height * value) * 0.5;
		}
	}
}