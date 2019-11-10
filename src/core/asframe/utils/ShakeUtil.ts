namespace asf
{
	export class ShakeUtil
	{
		private static shakeMap: Dictionary<egret.DisplayObject, any>;
		private static timerId: number = -1;
		public constructor()
		{
		}

		static init(): void
		{
			this.shakeMap = new Dictionary<egret.DisplayObject, any>();
		}

		/**
		 * 震动
		 * @param dis 震动对象
		 * @param times 震动时间
		 * @param offest 震动幅度
		 * @param speed 震动速度
		 * @param mode 震动模式，1上下，2左右，3上下左右
		 * */
		public static shake(dis: egret.DisplayObject, times: number = 2, offset: number = 4, speed: number = 32, mode: number = 3): void
		{
			if (ShakeUtil.shakeMap.hasKey(dis))
			{
				return;
			}
			var point: egret.Point = new egret.Point(dis.x, dis.y);
			var offsetXYArray: any[] = [0, 0];
			var num: number = 0;

			this.timerId = asf.App.timer.doLoop(speed, function (): void
			{
				offsetXYArray[num % 2] = (num++) % 4 < 2 ? 0 : offset;
				if (num > (times * 4 + 1))
				{
					// clearInterval(u);
					asf.App.timer.clearTimer(this.timerId);
					num = 0;
					ShakeUtil.shakeMap.remove(dis);
				}

				if (mode == 1)
				{
					dis.y = offsetXYArray[1] + point.y;
				}
				else if (mode == 2)
				{
					dis.x = offsetXYArray[0] + point.x;
				}
				else
				{
					dis.y = offsetXYArray[1] + point.y;
					dis.x = offsetXYArray[0] + point.x;
				}
			}, this, null, this.timerId);

			// var u: number = setInterval(function (): void
			// {


			// }, speed);
			ShakeUtil.shakeMap.put(dis, { point: point, id: this.timerId });// [dis] = { point: point, id: u };
		}

		public static stopShake(dis: egret.DisplayObject): void
		{
			var obj: any = ShakeUtil.shakeMap.get(dis);
			if (!obj)
				return;
			// clearInterval(obj.id);
			asf.App.timer.clearTimer(obj.id);
			dis.x = obj.point.x
			dis.y = obj.point.y
			ShakeUtil.shakeMap.remove(dis);
		}
	}
}