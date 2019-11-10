namespace morn
{
	/**滑动条*/
	export class Slider extends Component
	{
		/**水平移动*/
		public static HORIZONTAL: string = "horizontal";
		/**垂直移动*/
		public static VERTICAL: string = "vertical";
		protected _allowBackClick: boolean;
		protected _max: number = 100;
		protected _min: number = 0;
		protected _tick: number = 1;
		protected _value: number = 0;
		protected _direction: string;// = Slider.VERTICAL;
		protected _skin: string;
		protected _back: Image;
		protected _bar: Button;
		protected _label: Label;
		protected _showLabel: boolean = true;
		protected _changeHandler: asf.CallBack;
		public constructor()
		{
			super();
		}

		protected preinitialize(): void
		{
			this.touchChildren = true;
		}

		protected createChildren(): void
		{
			this.addChild(this._back = new Image());
			this.addChild(this._bar = new Button());
			this.addChild(this._label = new Label());
		}

		protected initialize(): void
		{
			this._bar.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonMouseDown, this);
			this._back.sizeGrid = this._bar.sizeGrid = "4,4,4,4";
			this.allowBackClick = true;
		}

		private mousePoint: egret.Point = new egret.Point;
		private bounds: egret.Rectangle;// = egret.Rectangle;
		protected onButtonMouseDown(e: egret.TouchEvent): void
		{
			this.mousePoint.x = e.stageX;
			this.mousePoint.y = e.stageY;

			asf.App.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageMouseUp, this);
			asf.App.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageMouseMove, this);
			if (this._direction == Slider.VERTICAL)
			{
				this.bounds = new egret.Rectangle(this._bar.x, 0, this._bar.x, this.height - this._bar.height)
				// this._bar.startDrag(e.stageX, e.stageY, false, new egret.Rectangle(this._bar.x, 0, 0, this.height - this._bar.height));
			}
			else
			{
				this.bounds = new egret.Rectangle(0, this._bar.y, this.width - this._bar.width, this._bar.y)
				// this._bar.startDrag(e.stageX, e.stageY, false, new egret.Rectangle(0, this._bar.y, this.width - this._bar.width, 0));
			}
			//显示提示
			this.showValueText();
		}

		protected showValueText(): void
		{
			if (this._showLabel)
			{
				this._label.text = this._value + "";
				if (this._direction == Slider.VERTICAL)
				{
					this._label.x = this._bar.x + 20;
					this._label.y = (this._bar.height - this._label.height) * 0.5 + this._bar.y;
				} else
				{
					this._label.y = this._bar.y - 20;
					this._label.x = (this._bar.width - this._label.width) * 0.5 + this._bar.x;
				}
			}
		}

		protected hideValueText(): void
		{
			this._label.text = "";
		}

		protected onStageMouseUp(e: egret.TouchEvent): void
		{
			asf.App.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageMouseUp, this);
			asf.App.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageMouseMove, this);
			// this._bar.stopDrag();
			this.hideValueText();
		}

		protected onStageMouseMove(e: egret.TouchEvent): void
		{
			this._bar.x += e.stageX - this.mousePoint.x;
			this._bar.y += e.stageY - this.mousePoint.y;

			if (this.bounds)
			{
				if (this._bar.x < this.bounds.x)
				{
					this._bar.x = this.bounds.x;
				}
				else if (this._bar.x > this.bounds.width)
				{
					this._bar.x = this.bounds.width;
				}

				if (this._bar.y < this.bounds.y)
				{
					this._bar.y = this.bounds.y;
				}
				else if (this._bar.y > this.bounds.height)
				{
					this._bar.y = this.bounds.height;
				}
			}

			this.mousePoint.x = e.stageX;
			this.mousePoint.y = e.stageY;


			var oldValue: number = this._value;
			if (this._direction == Slider.VERTICAL)
			{
				this._value = this._bar.y / (this.height - this._bar.height) * (this._max - this._min) + this._min;
			} else
			{
				this._value = this._bar.x / (this.width - this._bar.width) * (this._max - this._min) + this._min;
			}
			this._value = Math.round(this._value / this._tick) * this._tick;
			if (this._value != oldValue)
			{
				this.showValueText();
				this.sendChangeEvent();
			}
		}

		protected sendChangeEvent(): void
		{
			this.sendEvent(egret.Event.CHANGE);
			if (this._changeHandler != null)
			{
				this._changeHandler.execute(this._value);
			}
		}

		/**皮肤*/
		public get skin(): string
		{
			return this._skin;
		}

		public set skin(value: string)
		{
			if (this._skin != value)
			{
				this._skin = value;
				this._back.url = this._skin;
				this._bar.skin = this._skin + "$bar";
				this._contentWidth = this._back.width;
				this._contentHeight = this._back.height;
				this.setBarPoint();
			}
		}

		protected changeSize(): void
		{
			super.changeSize();
			this._back.width = this.width;
			this._back.height = this.height;
			this.setBarPoint();
		}

		protected setBarPoint(): void
		{
			if (this._direction == Slider.VERTICAL)
			{
				this._bar.x = (this._back.width - this._bar.width) * 0.5;
			}
			else
			{
				this._bar.y = (this._back.height - this._bar.height) * 0.5;
			}
		}

		/**九宫格信息，格式：左边距,上边距,右边距,下边距,是否重复填充(值为0或1)，例如：4,4,4,4,1*/
		public get sizeGrid(): string
		{
			return this._back.sizeGrid;
		}

		public set sizeGrid(value: string)
		{
			this._back.sizeGrid = value;
			this._bar.sizeGrid = value;
		}

		protected changeValue(): void
		{
			this._value = Math.round(this._value / this._tick) * this._tick;
			this._value = this._value > this._max ? this._max : this._value < this._min ? this._min : this._value;
			if (this._direction == Slider.VERTICAL)
			{
				this._bar.y = (this._value - this._min) / (this._max - this._min) * (this.height - this._bar.height);
			} else
			{
				this._bar.x = (this._value - this._min) / (this._max - this._min) * (this.width - this._bar.width);
			}
		}

		/**设置滑动条*/
		public setSlider(min: number, max: number, value: number): void
		{
			this._value = -1;
			this._min = min;
			this._max = max > min ? max : min;
			this.value = value < min ? min : value > max ? max : value;
		}

		/**刻度值，默认值为1*/
		public get tick(): number
		{
			return this._tick;
		}

		public set tick(value: number)
		{
			this._tick = value;
			this.callLater(this.changeValue, this);
		}

		/**滑块上允许的最大值*/
		public get max(): number
		{
			return this._max;
		}

		public set max(value: number)
		{
			if (this._max != value)
			{
				this._max = value;
				this.callLater(this.changeValue, this);
			}
		}

		/**滑块上允许的最小值*/
		public get min(): number
		{
			return this._min;
		}

		public set min(value: number)
		{
			if (this._min != value)
			{
				this._min = value;
				this.callLater(this.changeValue, this);
			}
		}

		public changeValueNow(): void
		{
			this.callLater(this.changeValue, this);
		}

		/**当前值*/
		public get value(): number
		{
			return this._value;
		}

		public set value(num: number)
		{
			if (this._value != num)
			{
				this._value = num;
				//callLater(changeValue);
				//callLater(sendChangeEvent);
				this.changeValue();
				this.sendChangeEvent();
			}
		}

		/**滑动方向*/
		public get direction(): string
		{
			return this._direction;
		}

		public set direction(value: string)
		{
			this._direction = value;
		}

		/**是否显示标签*/
		public get showLabel(): boolean
		{
			return this._showLabel;
		}

		public set showLabel(value: boolean)
		{
			this._showLabel = value;
		}

		/**允许点击后面*/
		public get allowBackClick(): boolean
		{
			return this._allowBackClick;
		}

		public set allowBackClick(value: boolean)
		{
			if (this._allowBackClick != value)
			{
				this._allowBackClick = value;
				if (this._allowBackClick)
				{
					this._back.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBackBoxMouseDown, this);
				} else
				{
					this._back.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBackBoxMouseDown, this);
				}
			}
		}

		protected onBackBoxMouseDown(e: egret.TouchEvent): void
		{
			if (this._direction == Slider.VERTICAL)
			{
				this.value = this._back.mouseY / (this.height - this._bar.height) * (this._max - this._min) + this._min;
			} else
			{
				this.value = this._back.mouseX / (this.width - this._bar.width) * (this._max - this._min) + this._min;
			}
		}

		public set dataSource(value: any)
		{
			this._dataSource = value;
			if (value instanceof Number || value instanceof String)
			{
				this.value = Number(value);
			} else
			{
				egret.superSetter(Slider, this, "dataSource", value);
			}
		}

		/**控制按钮*/
		public get bar(): Button
		{
			return this._bar;
		}

		/**数据变化处理器*/
		public get changeHandler(): asf.CallBack
		{
			return this._changeHandler;
		}

		public set changeHandler(value: asf.CallBack)
		{
			this._changeHandler = value;
		}

		public destroy(): void
		{
			this._direction = null;
			if (this._skin != null) this._skin = null;
			if (this._back)
			{
				if (this._back.parent) this.removeChild(this._back);
				this._back.destroy();
				this._back = null;
			}
			if (this._bar)
			{
				this._bar.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonMouseDown, this);
				if (this._bar.parent) this.removeChild(this._bar);
				this._bar.destroy();
				this._bar = null;
			}
			if (this._label)
			{
				if (this._label.parent) this.removeChild(this._label);
				this._label.destroy();
				this._label = null;
			}
			if (this._changeHandler != null)
			{
				this._changeHandler.destroy();
				this._changeHandler = null;
			}
			super.destroy();
		}
	}
}