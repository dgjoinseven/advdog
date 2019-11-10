namespace morn
{
	export class Component extends Sprite implements IComponent
	{
		protected _width: number;
		protected _height: number;
		protected _contentWidth: number = 0;
		protected _contentHeight: number = 0;
		protected _disabled: boolean = false;
		protected _tag: any;
		// protected _comXml:XML;
		protected _dataSource: any;
		protected _toolTip: any;
		protected _mouseChildren: boolean;
		protected _top: number;
		protected _bottom: number;
		protected _left: number;
		protected _right: number;
		protected _centerX: number;
		protected _centerY: number;
		protected _layOutEabled: boolean;
		protected _dataStr: string = "";
		/**指引 */
		protected _guide: string = "";
		protected _guideCallback: asf.CallBack;
		

		public constructor()
		{
			super();
			this.touchEnabled = this.touchChildren = false;
			this.preinitialize();
			this.createChildren();
			this.initialize();
		}
		/**
		 * 添加监听事件
		 */
		on(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): any
		{
			this.addEventListener(type,listener,thisObject,useCapture,priority);
		}
		/**
		 * 删除监听事件
		 */
		off(type: string, listener: Function, thisObject: any, useCapture?: boolean): void
		{
			this.removeEventListener(type,listener,thisObject,useCapture);
		}

		/**预初始化，在此可以修改属性默认值*/
		protected preinitialize(): void
		{
			this._contentWidth = 0;
			this._contentHeight = 0;
		}

		/**在此创建组件子对象*/
		protected createChildren(): void
		{

		}

		/**初始化，在此子对象已被创建，可以对子对象进行修改*/
		protected initialize(): void
		{
		}

		/**删除延迟调用*/
		public removeLater(method: Function, thisObj: any): void
		{
			asf.App.render.removeLater(method, thisObj);
		}

		/**延迟调用，在组件被显示在屏幕之前调用*/
		public callLater(method: Function, thisObj: any, args: any[] = null): void
		{
			asf.App.render.callLater(method, thisObj, args);
		}

		/**立即执行延迟调用*/
		public exeCallLater(method: Function, thisObj: any): void
		{
			asf.App.render.exeCallLater(method, thisObj);
		}

		/**派发事件，data为事件携带数据*/
		public sendEvent(type: string, data: any = null): void
		{
			if (this.hasEventListener(type))
			{
				this.dispatchEvent(new UIEvent(type, data));
			}
		}

		/**根据名字删除子对象，如找不到不会抛出异常*/
		public removeChildByName(name: string): void
		{
			var display: egret.DisplayObject = this.getChildByName(name);
			if (display)
			{
				this.removeChild(display);
			}
		}

		/**设置组件位置*/
		public setPosition(x: number, y: number): void
		{
			this.x = x;
			this.y = y;
		}

		public set x(value: number)
		{
			egret.superSetter(Component, this, "x", value)
			this.callLater(this.sendEvent, this, [UIEvent.MOVE]);
		}

		public set y(value: number)
		{
			egret.superSetter(Component, this, "y", value)
			this.callLater(this.sendEvent, this, [UIEvent.MOVE]);
		}

		/**获取X坐标*/
		public get x(): number
		{
			this.exeCallLater(this.resetPosition, this);
			return egret.superGetter(Component, this, "x");;
		}

		/**获取Y坐标*/
		public get y(): number
		{
			this.exeCallLater(this.resetPosition, this);
			return egret.superGetter(Component, this, "y");
		}

		/**宽度(值为NaN时，宽度为自适应大小)*/
		public get width(): number
		{
			this.exeCallLater(this.resetPosition, this);
			if (!isNaN(this._width))
			{
				return this._width;
			}
			else if (this._contentWidth != 0)
			{
				return this._contentWidth;
			}
			else
			{
				return this.measureWidth;
			}
		}

		public set width(value: number)
		{
			if (this._width != value)
			{
				this._width = value;
				this.callLater(this.changeSize, this);
				if (this._layOutEabled)
				{
					this.callLater(this.resetPosition, this);
				}
			}
		}

		/** 是否灰掉 */
		public set gray(value:boolean)
		{
			morn.ObjectUtils.gray(this, value);
		}

		/**显示的宽度(width * scaleX)*/
		public get displayWidth(): number
		{
			return this.width * this.scaleX;
		}

		protected get measureWidth(): number
		{
			this.commitMeasure();
			var max: number = 0;
			for (var i: number = this.numChildren - 1; i > -1; i--)
			{
				var comp: egret.DisplayObject = this.getChildAt(i);
				if (comp.visible /*|| _isInitVisible*/)
				{
					max = Math.max(comp.x + comp.width * comp.scaleX, max);
				}
			}
			return max;
		}

		public set height(value: number)
		{
			if (this._height != value)
			{
				this._height = value;
				this.callLater(this.changeSize, this);
				if (this._layOutEabled)
				{
					this.callLater(this.resetPosition, this);
				}
			}
		}

		/**高度(值为NaN时，高度为自适应大小)*/
		public get height(): number
		{
			this.exeCallLater(this.resetPosition, this);
			if (!isNaN(this._height))
			{
				return this._height;
			}
			else if (this._contentHeight && this._contentHeight != 0)
			{
				return this._contentHeight;
			}
			else
			{
				return this.measureHeight;
			}
		}

		/**显示的高度(height * scaleY)*/
		public get displayHeight(): number
		{
			return this.height * this.scaleY;
		}

		protected get measureHeight(): number
		{
			this.commitMeasure();
			var max: number = 0;
			for (var i: number = this.numChildren - 1; i > -1; i--)
			{
				var comp: egret.DisplayObject = this.getChildAt(i);
				if (comp.visible/* || _isInitVisible*/)
				{
					max = Math.max(comp.y + comp.height * comp.scaleY, max);
				}
			}
			return max;
		}

		public get scaleX(): number
		{
			return egret.superGetter(Component, this, "scaleX");
		}

		public set scaleX(value: number)
		{
			// this.scaleX = value;
			egret.superSetter(Component, this, "scaleX", value)
			this.callLater(this.changeSize, this);
		}

		public get scaleY(): number
		{
			return egret.superGetter(Component, this, "scaleY");
		}

		public set scaleY(value: number)
		{
			// this.scaleY = value;
			egret.superSetter(Component, this, "scaleY", value)
			this.callLater(this.changeSize, this);
		}

		/**缩放比例(等同于同时设置scaleX，scaleY)*/
		public set scale(value: number)
		{
			this.scaleX = this.scaleY = value;
		}

		public get scale(): number
		{
			return this.scaleX;
		}

		/**是否禁用*/
		public get disabled(): boolean
		{
			return this._disabled;
		}

		public set disabled(value: boolean)
		{
			if (this._disabled != value)
			{
				this._disabled = value;
				this.touchEnabled = !value;
				if (value)
				{
					// egret.superSetter(Component, this, "touchChildren", false)
					this.touchChildren = false;
				}
				else
				{
					// egret.superSetter(Component, this, "touchChildren", this._mouseChildren)
					this.touchChildren = true;
				}
				this.touchChildren = value ? false : this._mouseChildren;
				ObjectUtils.gray(this, this._disabled);
			}
		}

		/**
		 * 设置指引的按钮的回调
		 */
		public setGuideHandler(guideCallback: Function, thisObj: any): void
		{
			this._guideCallback = new asf.CallBack(guideCallback, thisObj)
		}

		public getGuideHandler(): asf.CallBack
		{
			return this._guideCallback
		}

		/**
		 * 执行指引回调
		 */
		public executeGuideHandler(): void
		{
			if (this._guideCallback)
			{
				this._guideCallback.execute()
			}
		}

		public set mouseChildren(value: boolean)
		{
			this._mouseChildren = value;
			this.touchChildren = value;
		}
		public get mouseChildren(): boolean
		{
			return this.touchChildren;
		}
		public set mouseEnabled(value: boolean)
		{
			this.touchEnabled = value;
		}
		public get mouseEnabled(): boolean
		{
			return this.touchEnabled;
		}


		/**执行影响宽高的延迟函数*/
		public commitMeasure(): void
		{
		}

		protected changeSize(): void
		{
			this.sendEvent(egret.Event.RESIZE);
		}

		/**重置位置*/
		protected resetPosition(): void
		{
			if (this.parent)
			{
				if (!isNaN(this._centerX))
				{
					this.x = (this.parent.width - this.displayWidth) * 0.5 + this._centerX;
				}
				else if (!isNaN(this._left))
				{
					this.x = this._left;
					if (!isNaN(this._right))
					{
						this.width = (this.parent.width - this._left - this._right) / this.scaleX;
					}
				}
				else if (!isNaN(this._right))
				{
					this.x = this.parent.width - this.displayWidth - this._right;
				}
				if (!isNaN(this._centerY))
				{
					this.y = (this.parent.height - this.displayHeight) * 0.5 + this._centerY;
				}
				else if (!isNaN(this._top))
				{
					this.y = this._top;
					if (!isNaN(this._bottom))
					{
						this.height = (this.parent.height - this._top - this._bottom) / this.scaleY;
					}
				}
				else if (!isNaN(this._bottom))
				{
					this.y = this.parent.height - this.displayHeight - this._bottom;
				}
			}
		}

		private onRemoved(e: egret.Event): void
		{
			if (e.target == this)
			{
				this.parent.removeEventListener(egret.Event.RESIZE, this.onResize, this);
			}
		}

		private onAdded(e: egret.Event): void
		{
			if (e.target == this)
			{
				this.parent.addEventListener(egret.Event.RESIZE, this.onResize, this);
				this.callLater(this.resetPosition, this);
			}
		}

		protected onResize(e?: any): void
		{
			this.callLater(this.resetPosition, this);
		}

		// public addChild(child: egret.DisplayObject): egret.DisplayObject
		// {
		// 	if (doubleClickEnabled && child instanceof InteractiveObject)
		// 	{
		// 		InteractiveObject(child).doubleClickEnabled = true;
		// 	}
		// 	return super.addChild(child);
		// }

		// public addChildAt(child: egret.DisplayObject, index: int): egret.DisplayObject
		// {
		// 	if (doubleClickEnabled && child instanceof InteractiveObject)
		// 	{
		// 		InteractiveObject(child).doubleClickEnabled = true;
		// 	}
		// 	return super.addChildAt(child, index);
		// }

		// public set doubleClickEnabled(value:Boolean):void {
		// 	super.doubleClickEnabled = value;
		// 	for (var i:int = numChildren - 1; i > -1; i--) {
		// 		var display:InteractiveObject = getChildAt(i) as InteractiveObject;
		// 		if (display) {
		// 			display.doubleClickEnabled = value;
		// 		}
		// 	}
		// }

		/**标签(冗余字段，可以用来储存数据)*/
		public get tag(): any
		{
			return this._tag;
		}

		public set tag(value: any)
		{
			this._tag = value;
		}

		public get skin(): string
		{
			return "";
		}

		public set skin(value: string)
		{
			this.initStyle();
		}

		initStyle(): void
		{
			// var dic: asf.HashMap<string, any> = UIStyle.styleDic.get(this.skin);
			// if (dic)
			// {
			// 	dic.forKeyValue(function (key: string, value: any): void
			// 	{
			// 		this[key] = value;
			// 	}, this)
			// }
		}

		/**
		 * 编辑器中的自定义数据 
		 * @return 
		 * 
		 */
		public get dataStr(): string
		{
			return this._dataStr;
		}

		public set dataStr(value: string)
		{
			this._dataStr = value;
			
		}

		public setRedDot(value:string):void
		{
			// if(value && value !="")
			// 	RedDotMgr.getIns().addNode(value,this,false)
		}


		public get guide(): string
		{
			return this._guide;
		}

		/**
		 * 设置指引ID，设置的时候会重新写进GuideMgr
		 * 
		 * 
		 * @memberOf Component
		 */
		public set guide(value: string)
		{
			if (this._guide != "")
			{
				//移除久的指引
				GuideMgr.getInstance().remove(this._guide);
			}
			this._guide = value;
			GuideMgr.getInstance().add(this._guide, this);
		}

		/**
		 * 添加子类型ID
		 * 
		 * @param {string} value
		 * 
		 * @memberOf Component
		 */
		public addGuideSubId(value: string): void
		{
			this.guide = this._guide.split("#")[0] + "#" + value;
		}


		public get dataSource(): any
		{
			return this._dataSource;
		}

		public set dataSource(value: any)
		{
			this._dataSource = value;
			var prop: string;
			for (prop in this._dataSource)
			{
				if (this.hasOwnProperty(prop))
				{
					this[prop] = this._dataSource[prop];
				}
			}
		}

		public get toolTip(): any
		{
			return this._toolTip;
		}

		public set toolTip(value: any)
		{
			if (this._toolTip != value)
			{
				this._toolTip = value;
				if (Boolean(value))
				{
					// this.addEventListener(MouseEvent.ROLL_OVER, onRollMouse);
					// this.addEventListener(MouseEvent.ROLL_OUT, onRollMouse);
				}
				else
				{
					// this.removeEventListener(MouseEvent.ROLL_OVER, onRollMouse);
					// this.removeEventListener(MouseEvent.ROLL_OUT, onRollMouse);
				}
			}
		}

		private onRollMouse(e: MouseEvent): void
		{
			// this.dispatchEvent(new UIEvent(e.type == MouseEvent.ROLL_OVER ? UIEvent.SHOW_TIP : UIEvent.HIDE_TIP, _toolTip, true));
		}

		/**居父容器顶部的距离*/
		public get top(): number
		{
			return this._top;
		}

		public set top(value: number)
		{
			this._top = value;
			this.layOutEabled = true;
		}

		/**居父容器底部的距离*/
		public get bottom(): number
		{
			return this._bottom;
		}

		public set bottom(value: number)
		{
			this._bottom = value;
			this.layOutEabled = true;
		}

		/**居父容器左边的距离*/
		public get left(): number
		{
			return this._left;
		}

		public set left(value: number)
		{
			this._left = value;
			this.layOutEabled = true;
		}

		/**居父容器右边的距离*/
		public get right(): number
		{
			return this._right;
		}

		public set right(value: number)
		{
			this._right = value;
			this.layOutEabled = true;
		}

		/**居父容器水平居中位置的偏移*/
		public get centerX(): number
		{
			return this._centerX;
		}

		public set centerX(value: number)
		{
			this._centerX = value;
			this.layOutEabled = true;
		}

		/**居父容器垂直居中位置的偏移*/
		public get centerY(): number
		{
			return this._centerY;
		}

		public set centerY(value: number)
		{
			this._centerY = value;
			this.layOutEabled = true;
		}

		private set layOutEabled(value: boolean)
		{
			if (this._layOutEabled != value)
			{
				this._layOutEabled = value;
				this.removeEventListener(egret.Event.ADDED, this.onAdded, this);
				this.removeEventListener(egret.Event.REMOVED, this.onRemoved, this);
				this.addEventListener(egret.Event.ADDED, this.onAdded, this);
				this.addEventListener(egret.Event.REMOVED, this.onRemoved, this);

				// asf.App.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
			}
			this.callLater(this.resetPosition, this);
		}

		// public resize(): void
		// {
		// 	this.resetPosition();

		// 	var i: number = 0;
		// 	while (this.numChildren > 0)
		// 	{
		// 		var mc: egret.DisplayObject = this.getChildAt(i);
		// 		if (mc)
		// 		{
		// 			if (mc instanceof Component)
		// 			{
		// 				mc.resize();
		// 			}
		// 		}
		// 	}
		// }

		/**销毁*/
		public destroy(): void
		{
			// ObjectUtils.clearFilter(this, _disabled);
			this.filters = []
			super.destroy();

			this.removeEventListener(egret.Event.ADDED, this.onAdded, this);
			this.removeEventListener(egret.Event.REMOVED, this.onRemoved, this);

			if (this._guide != "")
			{
				GuideMgr.getInstance().remove(this._guide);
			}

			if (this._guideCallback)
			{
				this._guideCallback.destroy();
			}

			this._tag = null;
			this._dataSource = null;
			this._toolTip = null;
			this._guideCallback = null;
			// _comXml = null;
			this.removeLater(this.resetPosition, this);
			this.removeLater(this.changeSize, this);
			this.removeLater(this.sendEvent, this);
		}
	}
}