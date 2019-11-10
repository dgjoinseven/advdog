namespace morn
{
	/**滚动条*/
	export class ScrollBar extends Component
	{
		/**水平移动*/
		public static HORIZONTAL: string = "horizontal";
		/**垂直移动*/
		public static VERTICAL: string = "vertical";

		protected _skin: string;
		protected _upButton: Button;
		protected _downButton: Button;
		protected _slider: Slider;

		protected _scrollSize: number = 1;
		protected _changeHandler: asf.CallBack;
		protected _thumbPercent: number = 1;
		protected _target: egret.DisplayObject;
		protected _touchScrollEnable: boolean = true;//onfig.touchScrollEnable;
		protected _mouseWheelEnable: boolean = false;//Config.mouseWheelEnable;

		/**是否像素移动*/
		public pixelScroll: boolean = false;
		/**是否自动隐藏*/
		protected _autoHide: boolean = true;

		protected _lastPoint: egret.Point;
		protected _lastOffset: number = 0;
		protected _showButtons: boolean = true;
		/**是否永久隐藏*/
		foreverHide: boolean = false;

		public constructor()
		{
			super();
		}

		protected preinitialize(): void
		{
			this.touchEnabled = this.touchChildren = true;
		}

		protected createChildren(): void
		{
			this.addChild(this._slider = new Slider());
			this.addChild(this._upButton = new Button());
			this.addChild(this._downButton = new Button());
		}

		protected initialize(): void
		{
			this._slider.showLabel = false;
			this._slider.addEventListener(egret.Event.CHANGE, this.onSliderChange, this);
			this._slider.setSlider(0, 0, 0);
			// this._upButton.addEventListener(MouseEvent.MOUSE_DOWN, onButtonMouseDown);
			// this._downButton.addEventListener(MouseEvent.MOUSE_DOWN, onButtonMouseDown);
			this._upButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonMouseDown, this);
			this._downButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonMouseDown, this);
			this.callLater(this.upDataScrollShow, this)
		}

		public upDataScrollShow(): void
		{
			if (this.pixelScroll && this._target)
			{
				var rect: egret.Rectangle = this._target.scrollRect;
				if (this._autoHide)
				{
					if (rect)
					{
						if (this._target.height > rect.height)
						{
							this.visible = true;
							this._slider.disabled = this._upButton.disabled = this._downButton.disabled = false;
							this._slider.bar.visible = true;

						}
						else
						{
							this.visible = false;
							this._slider.disabled = this._upButton.disabled = this._downButton.disabled = true;
							this._slider.bar.visible = false;
						}
					}
					else
					{
						this.visible = false;
						this._slider.disabled = this._upButton.disabled = this._downButton.disabled = true;
						this._slider.bar.visible = false;
					}
				}
				else
				{
					this.visible = true;
					if (rect)
					{
						if (this._target.height > rect.height)
						{
							this._slider.disabled = this._upButton.disabled = this._downButton.disabled = false;
							this._slider.bar.visible = true;

						}
						else
						{
							this._slider.disabled = this._upButton.disabled = this._downButton.disabled = true;
							this._slider.bar.visible = false;
						}
					}
					else
					{
						this._slider.disabled = this._upButton.disabled = this._downButton.disabled = false;
						this._slider.bar.visible = true;
					}
				}

				this._slider.changeValueNow();
			}

			if (this.foreverHide)
			{
				this.visible = false;
				this._slider.bar.visible = false;
			}
		}

		public upDataTargetContent(): void
		{
			this.onSliderChange(null);
		}

		protected onSliderChange(e: egret.Event): void
		{
			this.sendEvent(egret.Event.CHANGE);
			if (this._changeHandler != null)
			{
				this._changeHandler.execute(this.value);//executeWith([value]);
			}

			if (this.pixelScroll && this._target)
			{
				var rect: egret.Rectangle = this._target.scrollRect;
				if (rect)
				{
					if (this._target.height > rect.height)
					{
						var h: number = this._target.height - rect.height;
						rect.y = this.value / 100 * h;
						if (rect.y < 0)
						{
							rect.y = 0;
						}
					} else
					{
						rect.y = 0;
					}
					this._target.scrollRect = rect;
				}
			}
		}

		private _startLoopTimer: number;
		private _slideTimer: number;
		protected onButtonMouseDown(e: egret.TouchEvent): void
		{
			var isUp: boolean = (e.currentTarget as any) == this._upButton;
			this.slide(isUp);
			// asf.App.timer.clearTimer(this._startLoopTimer);
			this._startLoopTimer = asf.App.timer.doOnce(Styles.scrollBarDelayTime, this.startLoop, this, [isUp],this._startLoopTimer);
			// asf.App.stage.addEventListener(MouseEvent.MOUSE_UP, onStageMouseUp);
			asf.App.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageMouseUp, this);
		}

		protected startLoop(isUp: boolean): void
		{
			// asf.App.timer.clearTimer(this._slideTimer);
			this._slideTimer = asf.App.timer.doFrameLoop(1, this.slide, this, [isUp],this._slideTimer);
		}

		protected slide(isUp: boolean): void
		{
			if (isUp)
			{
				this.value -= this._scrollSize;
			}
			else
			{
				this.value += this._scrollSize;
			}
		}

		protected onStageMouseUp(e: egret.TouchEvent): void
		{
			asf.App.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageMouseUp, this);
			asf.App.timer.clearTimer(this._startLoopTimer);
			asf.App.timer.clearTimer(this._slideTimer);
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
				if (this._skin)
				{
					this._slider.skin = this._skin;
				}
			}
			this.callLater(this.changeScrollBar, this);
		}

		protected changeScrollBar(): void
		{
			this._upButton.visible = this._showButtons;
			this._downButton.visible = this._showButtons;

			if (this._skin)
			{
				if (this._showButtons)
				{
					this._upButton.skin = this._skin + "$up";
					this._downButton.skin = this._skin + "$down";
				}
			}
			if (this._slider.direction == ScrollBar.VERTICAL)
			{
				this._slider.y = this._upButton.height;
			}
			else
			{
				this._slider.x = this._upButton.width;
			}
			this.resetPositions();
		}

		protected resetButtonPosition(): void
		{
			if (this._slider.direction == ScrollBar.VERTICAL)
			{
				this._downButton.y = this._slider.y + this._slider.height;
				this._contentWidth = this._slider.width;
				this._contentHeight = this._downButton.y + this._downButton.height;
			}
			else
			{
				this._downButton.x = this._slider.x + this._slider.width;
				this._contentWidth = this._downButton.x + this._downButton.width;
				this._contentHeight = this._slider.height;
			}
		}

		protected changeSize(): void
		{
			super.changeSize();
			this.resetPositions();
		}

		private resetPositions(): void
		{
			if (this._slider.direction == ScrollBar.VERTICAL)
			{
				this._slider.height = this.height - this._upButton.height - this._downButton.height;
			}
			else
			{
				this._slider.width = this.width - this._upButton.width - this._downButton.width;
			}
			this.resetButtonPosition();
		}

		/**设置滚动条*/
		public setScroll(min: number, max: number, value: number): void
		{
			this.exeCallLater(this.changeSize, this);
			this._slider.setSlider(min, max, value);
			this._upButton.disabled = max <= 0;
			this._downButton.disabled = max <= 0;
			this._slider.bar.visible = max > 0;
			this.visible = !(this._autoHide && max <= min);
		}

		/**最大滚动位置*/
		public get max(): number
		{
			return this._slider.max;
		}

		public set max(value: number)
		{
			this._slider.max = value;

		}

		/**最小滚动位置*/
		public get min(): number
		{
			return this._slider.min;
		}

		public set min(value: number)
		{
			this._slider.min = value;
		}

		/**当前滚动位置*/
		public get value(): number
		{
			return this._slider.value;
		}

		public set value(value: number)
		{
			this._slider.value = value;
		}
		/**滚动到最底层 */
		public scrollToBottom(): void
		{
			asf.App.render.renderAll();
			this._slider.value = this._slider.max;
		}

		/**滚动方向*/
		public get direction(): string
		{
			return this._slider.direction;
		}

		public set direction(value: string)
		{
			this._slider.direction = value;
		}

		/**九宫格信息，格式：左边距,上边距,右边距,下边距,是否重复填充(值为0或1)，例如：4,4,4,4,1*/
		public get sizeGrid(): string
		{
			return this._slider.sizeGrid;
		}

		public set sizeGrid(value: string)
		{
			this._slider.sizeGrid = value;
		}

		/**点击按钮滚动量*/
		public get scrollSize(): number
		{
			return this._scrollSize;
		}

		public set scrollSize(value: number)
		{
			this._scrollSize = value;
		}

		public set dataSource(value: any)
		{
			this._dataSource = value;
			if (value instanceof Number || value instanceof String)
			{
				this.value = Number(value);
			}
			else
			{
				egret.superSetter(ScrollBar, this, value)
				// super.dataSource = value;
			}
		}

		/**滑条长度比例(0-1)*/
		public get thumbPercent(): number
		{
			return this._thumbPercent;
		}

		public set thumbPercent(value: number)
		{
			this.exeCallLater(this.changeSize, this);
			this._thumbPercent = value;
			if (this._slider.direction == ScrollBar.VERTICAL)
			{
				this._slider.bar.height = Math.max(Math.min(Math.floor(this._slider.height * value), this.height), Styles.scrollBarMinNum);
			}
			else
			{
				this._slider.bar.width = Math.max(Math.floor(this._slider.width * value), Styles.scrollBarMinNum);
			}
		}

		/**滚动对象*/
		public get target(): egret.DisplayObject
		{
			return this._target;
		}

		public set target(value: egret.DisplayObject)
		{
			if (this._target)
			{
				// this._target.removeEventListener(egret.TouchEvent.MOUSE_WHEEL, onMouseWheel);
				this._target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTargetMouseDown, this);
				this._target.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTargetMouseUp, this);
			}

			this._target = value;
			if (value)
			{
				if (this._mouseWheelEnable)
				{
					// this._target.addEventListener(egret.TouchEvent.MOUSE_WHEEL, onMouseWheel);
				}
				if (this._touchScrollEnable)
				{
					this._target.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTargetMouseDown, this);
					this._target.addEventListener(egret.TouchEvent.TOUCH_END, this.onTargetMouseUp, this);
				}
			}
		}

		/**是否触摸滚动，默认为true*/
		public get touchScrollEnable(): boolean
		{
			return this._touchScrollEnable;
		}

		public set touchScrollEnable(value: boolean)
		{
			this._touchScrollEnable = value;
			this.target = this._target;
		}

		/**是否滚轮滚动，默认为true*/
		public get mouseWheelEnable(): boolean
		{
			return this._mouseWheelEnable;
		}

		public set mouseWheelEnable(value: boolean)
		{
			this._mouseWheelEnable = value;
			this.target = this._target;
		}

		/**是否自动隐藏滚动条(无需滚动时)，默认为true*/
		public get autoHide(): boolean
		{
			return this._autoHide;
		}

		public set autoHide(value: boolean)
		{
			this._autoHide = value;
		}

		/**是否显示按钮，默认为true*/
		public get showButtons(): boolean
		{
			return this._showButtons;
		}

		public set showButtons(value: boolean)
		{
			this._showButtons = value;
		}

		/**滚动变化时回调，回传value参数*/
		public get changeHandler(): asf.CallBack
		{
			return this._changeHandler;
		}

		public set changeHandler(value: asf.CallBack)
		{
			this._changeHandler = value;
		}

		private _tweenMoveTimer: number;
		protected onTargetMouseDown(e: egret.TouchEvent): void
		{
			asf.App.timer.clearTimer(this._tweenMoveTimer);
			if (!this.contains(e.target as egret.DisplayObject))
			{
				// console.log("onTargetMouseDown,url : ");
				asf.App.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onStageMouseUp2, this);
				// asf.App.stage.addEventListener(egret.Event.ENTER_FRAME, this.onStageEnterFrame, this);
				asf.App.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageEnterFrame, this);
				this._lastPoint = new egret.Point(e.stageX, e.stageY);
			}
		}

		protected onTargetMouseUp(e: egret.TouchEvent): void
		{
			// console.log("onTargetMouseUp,url : ");
			asf.App.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageEnterFrame, this);
			asf.App.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageMouseUp2, this);
		}

		protected onStageEnterFrame(e: egret.TouchEvent): void
		{
			this._lastOffset = this._slider.direction == ScrollBar.VERTICAL ? e.stageY - this._lastPoint.y : e.stageX - this._lastPoint.x;
			if (Math.abs(this._lastOffset) >= 1)
			{
				this._lastPoint.x = e.stageX;
				this._lastPoint.y = e.stageY;
				this.value -= this._lastOffset;
			}
		}

		protected onStageMouseUp2(e: egret.TouchEvent): void
		{
			asf.App.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageMouseUp2, this);
			// asf.App.stage.removeEventListener(egret.Event.ENTER_FRAME, this.onStageEnterFrame, this);
			asf.App.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageEnterFrame, this);
			this._lastOffset = this._slider.direction == ScrollBar.VERTICAL ? e.stageY - this._lastPoint.y : e.stageX - this._lastPoint.x;
			if (Math.abs(this._lastOffset) > 50)
			{
				this._lastOffset = 50 * (this._lastOffset > 0 ? 1 : -1);
			}
			// asf.App.timer.clearTimer(this._tweenMoveTimer);
			this._tweenMoveTimer = asf.App.timer.doFrameLoop(1, this.tweenMove, this,null,this._tweenMoveTimer);
		}

		private tweenMove(): void
		{
			this._lastOffset = this._lastOffset * 0.92;
			this.value -= this._lastOffset;
			if (Math.abs(this._lastOffset) < 0.5)
			{
				//_target.mouseChildren = true;
				asf.App.timer.clearTimer(this._tweenMoveTimer);
			}
		}

		// protected onMouseWheel(e: egret.TouchEvent): void
		// {
		// 	this.value += (e.delta < 0 ? 1 : -1) * this.scrollSize * 3;
		// 	if (this.value < this.max && this.value > this.min)
		// 	{
		// 		e.stopPropagation();
		// 	}
		// }

		public destroy(): void
		{
			this.removeLater(this.changeScrollBar, this);
			this.removeLater(this.upDataScrollShow, this)

			if (this._target)
			{
				// this._target.removeEventListener(egret.TouchEvent.MOUSE_WHEEL, onMouseWheel);
				this._target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTargetMouseDown, this);
				this._target.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTargetMouseUp, this);
			}

			asf.App.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onStageMouseUp2, this);
			asf.App.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onStageEnterFrame, this);
			// asf.App.stage.removeEventListener(egret.Event.ENTER_FRAME, this.onStageEnterFrame, this);
			this.onStageMouseUp(null);

			this._skin = null;
			if (this._upButton)
			{
				this._upButton.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonMouseDown, this);
				if (this._upButton.parent) this.removeChild(this._upButton);
				this._upButton.destroy();
				this._upButton = null;
			}
			if (this._downButton)
			{
				this._downButton.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onButtonMouseDown, this);
				if (this._downButton.parent) this.removeChild(this._downButton);
				this._downButton.destroy();
				this._downButton = null;
			}
			if (this._slider)
			{
				this._slider.removeEventListener(egret.Event.CHANGE, this.onSliderChange, this);
				if (this._slider.parent) this.removeChild(this._slider);
				this._slider.destroy();
				this._slider = null;
			}
			if (this._changeHandler != null)
			{
				this._changeHandler.destroy();
				this._changeHandler = null;
			}
			this._lastPoint = null;

			asf.App.timer.clearTimer(this._tweenMoveTimer);
			asf.App.timer.clearTimer(this._startLoopTimer);
			asf.App.timer.clearTimer(this._slideTimer);

			super.destroy();
		}
	}
}