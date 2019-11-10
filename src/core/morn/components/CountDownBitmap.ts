namespace morn
{
	/**倒计时用的位图
	 * wangning
	 */
	export class CountDownBitmap extends Component
	{
		private container: Box;

		protected _skin: string;
		protected _colonSkin: string;
		protected _interval: number;
		protected _value: number;
		protected _align: string;

		private _showHour: boolean = true;
		private _showMinute: boolean = true;
		private _showSecond: boolean = true;

		private hourNumLine: NumberLine;
		private minuteNumLine: NumberLine;
		private secondNumLine: NumberLine;
		private colon1: Image;
		private colon2: Image;
		private numLoadedCount: number[];
		private colonLoadedCount: number[];
		private realWidth: number = 0;

		public constructor()
		{
			super();
		}
		protected preinitialize(): void
		{
			super.preinitialize();
			var ts:CountDownBitmap = this;
			var container:Box = new Box();
			ts.container = container;
			ts.addChild(container);

			ts._interval = 0;
			ts._value = 0;
			ts._align = "left";

			ts.numLoadedCount = [];
			ts.colonLoadedCount = [];
			ts.hourNumLine = new NumberLine();
			ts.hourNumLine.interval = ts._interval;
			ts.minuteNumLine = new NumberLine();
			ts.minuteNumLine.interval = ts._interval;
			ts.secondNumLine = new NumberLine();
			ts.secondNumLine.interval = ts._interval;
			ts.colon1 = new Image();
			ts.colon2 = new Image();

			container.addChild(ts.hourNumLine);
			container.addChild(ts.minuteNumLine);
			container.addChild(ts.secondNumLine);
			container.addChild(ts.colon1);
			container.addChild(ts.colon2);
		}

		public destroy(): void
		{
			this._skin = null;
			this._colonSkin = null;
			this._align = null;
			this.numLoadedCount = null;
			this.colonLoadedCount = null;

			this.hourNumLine.destroy();
			this.hourNumLine = null;
			this.minuteNumLine.destroy();
			this.minuteNumLine = null;
			this.secondNumLine.destroy();
			this.secondNumLine = null;
			this.colon1.destroy();
			this.colon1 = null;
			this.colon2.destroy();
			this.colon2 = null;

			super.destroy();
		}



		public get value(): number
		{
			return this._value;
		}
		/**
		 *设置倒计时剩余秒数
		 */
		public set value(num: number)
		{
			if (this._value != num)
			{
				this._value = num;
				this.changeClip();
			}
		}
		public get showHour(): boolean
		{
			return this._showHour;
		}
		/**
		 *设置是否显示 小时
		 */
		public set showHour(value: boolean)
		{
			if (this._showHour != value)
			{
				this._showHour = value;
				this.changeClip();
			}
		}
		public get showMinute(): boolean
		{
			return this._showMinute;
		}
		/**
		 *设置是否显示 分钟
		 */
		public set showMinute(value: boolean)
		{
			if (this._showMinute != value)
			{
				this._showMinute = value;
				this.changeClip();
			}
		}
		public get showSecond(): boolean
		{
			return this._showSecond;
		}
		/**
		 *设置是否显示 秒数
		 */
		public set showSecond(value: boolean)
		{
			if (this._showSecond != value)
			{
				this._showSecond = value;
				this.changeClip();
			}
		}

		public get skin(): string
		{
			return this._skin;
		}
		/**设置数字资源的URL*/
		public set skin(value: string)
		{
			if (value && this._skin != value)
			{
				this._skin = value;

				this.numLoadedCount = [];
				this.hourNumLine.loadedCallback = asf.CallBack.create(this.numLoaded, this, 1);
				this.minuteNumLine.loadedCallback = asf.CallBack.create(this.numLoaded, this, 2);
				this.secondNumLine.loadedCallback = asf.CallBack.create(this.numLoaded, this, 3);

				this.hourNumLine.skin = this._skin;
				this.minuteNumLine.skin = this._skin;
				this.secondNumLine.skin = this._skin;
			}
		}
		private numLoaded(id: number): void
		{
			// console.log("@@num加载完毕>" + id);
			if (this.numLoadedCount.indexOf(id) == -1)
			{
				this.numLoadedCount.push(id);
			}

			this.changeClip();
		}
		/**设置冒号资源的URL*/
		public get colonSkin(): string
		{
			return this._colonSkin;
		}
		public set colonSkin(value: string)
		{
			if (value && this._colonSkin != value)
			{
				this._colonSkin = value;

				this.colonLoadedCount = [];
				this.colon1.setLoadComplete(asf.CallBack.create(this.colonLoaded, this, 1));
				this.colon2.setLoadComplete(asf.CallBack.create(this.colonLoaded, this, 2));

				this.colon1.url = this._colonSkin;
				this.colon2.url = this._colonSkin;
			}
		}
		private colonLoaded(id: number): void
		{
			// console.log("@@冒号加载完毕>" + id);

			if (this.colonLoadedCount.indexOf(id) == -1)
			{
				this.colonLoadedCount.push(id);
			}

			this.changeClip();
		}

		public get interval(): number
		{
			return this._interval;
		}
		/**设置字符之间的间隔 */
		public set interval(value: number)
		{
			if (this._interval != value)
			{
				this._interval = value;

				this.hourNumLine.interval = this._interval;
				this.minuteNumLine.interval = this._interval;
				this.secondNumLine.interval = this._interval;

				this.changeClip();
			}
		}


		public get align(): string
		{
			return this._align;
		}
		/**设置对齐方式
		 * left:数字往右边延伸
		 * center:数字往左右延伸
		 * right:数字往左边延伸
		 */
		public set align(value: string)
		{
			if (this._align != value)
			{
				this._align = value;
				this.changeClip();
			}
		}

		protected changeClip(): void
		{
			if (this.numLoadedCount.length == 3 && this.colonLoadedCount.length == 2)
			{
				var hours: number = Math.floor(this.value / 3600);
				var minutes: number = Math.floor(this.value % 3600 / 60);
				var seconds: number = this.value % 60;
				var hoursStr: string = (hours < 10 ? "0" + hours : hours).toString();
				// var minutesStr: string = minutes.toString();
				// var secondsStr: string = seconds.toString();

				

				this.hourNumLine.value = hoursStr;
				// this.hourNumLine.value = (hours < 10 ? "0" + hours : hours);
				this.minuteNumLine.value = (minutes < 10 ? "0" + minutes : minutes);
				this.secondNumLine.value = (seconds < 10 ? "0" + seconds : seconds);

				var tx: number = 0;
				//半个数字的宽度
				var halfNumWidth: number = this.hourNumLine.width / hoursStr.length / 2;

				//小时
				this.hourNumLine.x = halfNumWidth;
				this.hourNumLine.visible = this.showHour;
				if (this.showHour)
				{
					tx += this.hourNumLine.width;
				}
				//分钟
				this.colon1.visible = this.showHour && this.showMinute;//第一个冒号
				this.minuteNumLine.visible = this.showMinute;
				if (this.showMinute)
				{
					if (this.colon1.visible)
					{
						this.colon1.x = tx + this.interval;
						tx += this.interval + this.colon1.width;
						this.colon1.y = -this.colon1.height / 2;
					}

					this.minuteNumLine.x = tx + this.interval + halfNumWidth;
					tx += this.interval + this.minuteNumLine.width;
				}
				//秒数
				this.secondNumLine.visible = this.showSecond;
				this.colon2.visible = (this.showHour || this.showMinute) && this.showSecond;//第二个冒号
				if (this.showSecond)
				{
					if (this.colon2.visible)
					{
						this.colon2.x = tx + this.interval;
						tx += this.interval + this.colon2.width;
						this.colon2.y = -this.colon2.height / 2;
					}

					this.secondNumLine.x = tx + this.interval + halfNumWidth;
					tx += this.interval + this.secondNumLine.width;
				}

				//排位置
				if (this.align == "center")
				{
					this.container.x = -tx / 2;
				}
				else if (this.align == "right")
				{
					this.container.x = -tx;
				}
				else
				{
					this.container.x = 0;
				}


				this.realWidth = tx;
			}

		}
		/**获取真实宽度 */
		public get width(): number
		{
			return this.realWidth;
		}

		public set width(v: number)
		{
			egret.superSetter(NumberLine, this, "width", v);
		}

	}
}