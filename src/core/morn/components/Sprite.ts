namespace morn
{
	/**
	 * 扩展的sprite
	 * 
	 * @export
	 * @class Sprite
	 */
	export class Sprite extends egret.Sprite
	{
		private lockCenter: boolean;
		private bounds2: egret.Rectangle;
		/**是否已经销毁 */
		protected isDestroy: boolean = false;

		public constructor()
		{
			super();
		}

		/**从父容器删除自己，如已经被删除不会抛出异常*/
		public remove(): void
		{
			if (this.parent)
			{
				this.parent.removeChild(this);
			}
		}

		/**
		 * 开始拖动
		 * 
		 * @param {Boolean} [lockCenter=false] 是否锁定中心
		 * @param {egret.Rectangle} [bounds=null] 拖动范围
		 * 
		 * @memberOf Component
		 */
		public startDrag(x: number, y: number, lockCenter: boolean = false, bounds: egret.Rectangle = null): void
		{
			this.touchEnabled = this.touchChildren = true;
			this.lockCenter = lockCenter;
			this.bounds2 = bounds;

			this.p.x = x;
			this.p.y = y;

			this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
			// this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStart, this)
		}

		/**
		 * 停止拖动
		 * 
		 * 
		 * @memberOf Sprite
		 */
		public stopDrag(): void
		{
			this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStart, this)
			this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this)
			this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this)
		}

		public get mouseX(): number
		{
			return this.p.x;
		}

		public get mouseY(): number
		{
			return this.p.y;
		}

		private p: egret.Point = new egret.Point;
		private onStart(e: egret.TouchEvent): void
		{
			this.p.x = e.stageX;
			this.p.y = e.stageY;

			if (this.lockCenter)
			{
				this.x = e.stageX - this.width * 0.5;
				this.y = e.stageY - this.height * 0.5;
			}

			console.log("onStart");
			this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
			// this.stage. addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onEnd, this);
		}

		private onMove(e: egret.TouchEvent): void
		{
			this.x += e.stageX - this.p.x;
			this.y += e.stageY - this.p.y;

			// console.log("x:" + this.x);
			// console.log("y:" + this.y);
			if (this.bounds2)
			{
				if (this.x < this.bounds2.x)
				{
					this.x = 0;
				}
				else if (this.x > this.bounds2.width - this.width)
				{
					this.x = this.bounds2.width - this.width;
				}

				if (this.y < this.bounds2.y)
				{
					this.y = 0;
				}
				else if (this.y > this.bounds2.height - this.height)
				{
					this.y = this.bounds2.height - this.height;
				}
			}

			this.p.x = e.stageX;
			this.p.y = e.stageY;
		}

		private onEnd(e: egret.TouchEvent): void
		{
			console.log("end");

			this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this)
			this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this)
			// this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onEnd, this);
		}

		public destroy(): void
		{
			this.remove();
			var i: number = 0;
			while (this.numChildren > 0)
			{
				var mc: egret.DisplayObject = this.getChildAt(i);
				if (mc)
				{
					if (mc instanceof Sprite)
					{
						(mc as Sprite).remove();
						(mc as Sprite).destroy();
					}
					else 
					{
						this.removeChild(mc);
						if (mc.hasOwnProperty("destroy"))
						{
							mc["destroy"]();
						}
					}
				}
			}

			this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStart, this)
			this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMove, this)
			this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this)
			// this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onEnd, this);
			this.isDestroy = true;
		}
	}
}