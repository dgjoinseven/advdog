namespace game
{
	export class MaskControl
	{

		public static SHAPE_TYPE_RECT: number = 1;
		public static SHAPE_TYPE_CIRCLE: number = 2;

		private static START_RADIAN: number = -Math.PI / 2;
		private static END_RADIAN: number = Math.PI * 3 / 2;
		private static PI2: number = Math.PI * 2;

		private obj: egret.DisplayObjectContainer;
		private shapeType: number;
		public countDownTime: number;

		private shape: egret.Shape;
		private centerPoint: egret.Point;
		private objWidth: number;
		private objHeight: number;

		private timeStamp: number;
		private currentRadian: number;
		// private totalRadian: number;
		private curTime: number;

		private timerId: number = -1;
		private isPause: boolean;
		private callback: asf.CallBack;
		private label: morn.Label;

		private width: number;
		private height: number;

		private loopId: number = -1;

		public constructor(displayObjectContainer: egret.DisplayObjectContainer, shapeType: number = MaskControl.SHAPE_TYPE_RECT,
			width: number = displayObjectContainer.width, height: number = displayObjectContainer.height)
		{
			this.obj = displayObjectContainer;
			this.shapeType = shapeType;
			this.width = width;
			this.height = height;

			this.init();
		}
		private init(): void
		{
			if (this.obj == null || isNaN(this.shapeType))
			{
				console.log("MaskControl参数有误");
				return;
			}

			this.centerPoint = new egret.Point(this.obj.width / 2, this.obj.height / 2);
			this.shape = new egret.Shape();
			this.obj.addChild(this.shape);

			this.label = new morn.Label();
			this.label.width = this.obj.width;
			this.label.size = 26;
			this.label.color = 0xffffff;
			this.label.text = "0";
			this.label.align = "center";
			// this.label.height = this.label.textField.textHeight;
			this.label.y = (this.height - this.label.height) * 0.5;
			this.obj.addChild(this.label);
			this.label.text = "";
		}
		public destroy(): void
		{
			if (!isNaN(this.timerId))
			{
				asf.App.timer.clearTimer(this.timerId);
			}

			if (this.shape)
			{
				if (this.shape.parent)
				{
					this.shape.parent.removeChild(this.shape);
				}
				this.shape.graphics.clear();
			}
			this.shape = null;

			this.obj = null;
			this.centerPoint = null;

			if (this.label.parent)
			{
				this.label.parent.removeChild(this.label);
			}
			this.label = null;
			this.callback = null;
		}
		/**countDownTime总时间(毫秒)  callback完成后回调 startTime已经过了的时间(起始时间)*/
		public start(countDownTime: number, callback: asf.CallBack, startTime: number = 0): void
		{
			// public start(countDownTime: number, startTime: number = 0): void {
			if (countDownTime < 0 || startTime < 0)
			{
				throw new Error("参数不能小于0");
			}

			this.isPause = false;
			this.callback = callback;

			if (countDownTime <= startTime)
			{
				this.complete();
				return;
			}

			this.curTime = startTime;
			this.countDownTime = countDownTime;

			this.timeStamp = egret.getTimer();
			this.currentRadian = MaskControl.START_RADIAN + startTime / countDownTime * MaskControl.PI2;


			this.creatShape(this.currentRadian, MaskControl.END_RADIAN);

			// if (!isNaN(this.timerId))
			// {
			// 	asf.App.timer.clearTimer(this.timerId);
			// }
			this.timerId = asf.App.timer.doFrameLoop(1, this.tick, this, null, this.timerId);
		}
		/**暂停 */
		public pause(): void
		{
			if (this.isPause)
			{
				return;
			}
			if (isNaN(this.timerId))
			{
				return;
			}
			this.isPause = true;
			asf.App.timer.pauseTimer(this.timerId);
		}
		/**恢复 */
		public resume(): void
		{
			if (!this.isPause)
			{
				return;
			}

			if (isNaN(this.timerId))
			{
				return;
			}
			this.isPause = false;
			this.timeStamp = egret.getTimer();
			asf.App.timer.resumeTimer(this.timerId);

		}
		private tick(): void
		{
			var nowTimeStamp: number = egret.getTimer();
			var pastTime: number = nowTimeStamp - this.timeStamp;
			this.curTime += pastTime;

			var leftTime: number = this.countDownTime - this.curTime;

			var percent: number = pastTime / this.countDownTime;

			this.timeStamp = nowTimeStamp;
			this.currentRadian += MaskControl.PI2 * percent;
			// this.currentRadian = -Math.PI / 3;

			if (this.currentRadian < MaskControl.END_RADIAN)
			{
				this.creatShape(this.currentRadian, MaskControl.END_RADIAN);

				this.label.text = String(Math.ceil(leftTime / 1000));
			}
			else
			{
				asf.App.timer.clearTimer(this.timerId);

				this.complete();
			}
		}
		private complete(): void
		{
			this.isPause = true;
			this.shape.graphics.clear();
			this.label.text = "";

			if (this.callback)
			{
				this.callback.execute();
			}
		}
		private creatShape(startRadian: number, endRadian: number): void
		{
			switch (this.shapeType)
			{
				case MaskControl.SHAPE_TYPE_CIRCLE:
					this.creatCircleShape(startRadian, endRadian);
					break;
				case MaskControl.SHAPE_TYPE_RECT:
					this.creatRectShape(startRadian, endRadian);
					break;
			}
		}
		private creatRectShape(startRadian: number, endRadian: number): void
		{
			this.shape.graphics.clear();

			this.shape.graphics.beginFill(0, 0.5);
			this.shape.graphics.moveTo(this.centerPoint.x, this.centerPoint.y);
			this.shape.graphics.lineTo(this.centerPoint.x, 0);

			var radian: number = Math.atan(this.centerPoint.y / this.centerPoint.x);


			if (startRadian < -radian)
			{
				this.shape.graphics.lineTo(-this.centerPoint.y / Math.tan(startRadian) + this.centerPoint.x, 0);
			}
			else if (startRadian < radian)
			{
				this.shape.graphics.lineTo(this.width, 0);
				this.shape.graphics.lineTo(this.width, this.centerPoint.x * Math.tan(startRadian) + this.centerPoint.y);
			}
			else if (startRadian < Math.PI - radian)
			{
				this.shape.graphics.lineTo(this.width, 0);
				this.shape.graphics.lineTo(this.width, this.height);
				this.shape.graphics.lineTo(this.centerPoint.y / Math.tan(startRadian) + this.centerPoint.x, this.height);
			}
			else if (startRadian < Math.PI + radian)
			{
				this.shape.graphics.lineTo(this.width, 0);
				this.shape.graphics.lineTo(this.width, this.height);
				this.shape.graphics.lineTo(0, this.height);
				this.shape.graphics.lineTo(0, -this.centerPoint.x * Math.tan(startRadian) + this.centerPoint.y);
			}
			else
			{
				this.shape.graphics.lineTo(this.width, 0);
				this.shape.graphics.lineTo(this.width, this.height);
				this.shape.graphics.lineTo(0, this.height);
				this.shape.graphics.lineTo(0, 0);
				this.shape.graphics.lineTo(-this.centerPoint.y / Math.tan(startRadian) + this.centerPoint.x, 0);
			}


			this.shape.graphics.lineTo(this.centerPoint.x, this.centerPoint.y);

			this.shape.graphics.endFill();
		}
		public getLabel(): morn.Label
		{
			return this.label;
		}
		private creatCircleShape(startRadian: number, endRadian: number): void
		{
			this.shape.graphics.clear();

			this.shape.graphics.beginFill(0, 0.5);
			this.shape.graphics.moveTo(this.centerPoint.x, this.centerPoint.y);
			this.shape.graphics.lineTo(this.centerPoint.x, 0);
			this.shape.graphics.drawArc(this.centerPoint.x, this.centerPoint.y, this.width / 2, startRadian, endRadian, false);
			this.shape.graphics.lineTo(this.centerPoint.x, this.centerPoint.y);

			this.shape.graphics.endFill();
		}
	}
}