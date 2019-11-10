namespace morn {
	/**面板*/
	export class Panel extends Box {
		protected _content: Box;
		protected _vScrollBar: VScrollBar;
		protected _hScrollBar: HScrollBar;
		protected _touchThrough: boolean = false;
		protected _bg: Image;
		public constructor() {
			super();
			this.width = this.height = 100;
		}

		/**
		 * 是否可点击穿透
		 */
		public get touchThrough(): boolean {
			return this._touchThrough;
		}

		/**
		 * 是否可点击穿透
		 */
		public set touchThrough(value: boolean) {
			this._touchThrough = value
			this.callLater(this.changeScroll, this);
		}

		protected createChildren(): void {
			super.addChild(this._content = new Box());
		}

		public addChild(child: egret.DisplayObject): egret.DisplayObject {
			child.addEventListener(egret.Event.RESIZE, this.onResizePanel, this);
			this.callLater(this.changeScroll, this);
			return this._content.addChild(child);
		}

		private onResizePanel(e: egret.Event): void {
			this.callLater(this.changeScroll, this);
		}

		public addChildAt(child: egret.DisplayObject, index: number): egret.DisplayObject {
			child.addEventListener(egret.Event.RESIZE, this.onResizePanel, this);
			this.callLater(this.changeScroll, this);
			return this._content.addChildAt(child, index);
		}

		public removeChild(child: egret.DisplayObject): egret.DisplayObject {
			child.removeEventListener(egret.Event.RESIZE, this.onResizePanel, this);
			this.callLater(this.changeScroll, this);
			return this._content.removeChild(child);
		}

		public removeChildAt(index: number): egret.DisplayObject {
			this.getChildAt(index).removeEventListener(egret.Event.RESIZE, this.onResizePanel, this);
			this.callLater(this.changeScroll, this);
			return this._content.removeChildAt(index);
		}

		public removeAllChild(except: egret.DisplayObject = null): void {
			for (var i: number = this._content.numChildren - 1; i > -1; i--) {
				if (except != this._content.getChildAt(i)) {
					this._content.removeChildAt(i);
				}
			}
			this.callLater(this.changeScroll, this);
		}

		public getChildAt(index: number): egret.DisplayObject {
			return this._content.getChildAt(index);
		}

		public getChildByName(name: string): egret.DisplayObject {
			return this._content.getChildByName(name);
		}

		public getChildIndex(child: egret.DisplayObject): number {
			return this._content.getChildIndex(child);
		}

		public get numChildren(): number {
			return this._content.numChildren;
		}

		private changeScroll(): void {
			var contentW: number = this._contentWidth == 0 ? this.contentWidth : this._contentWidth;
			var contentH: number = this.contentHeight;
			var vShow: boolean = this._vScrollBar && contentH > this._height;
			var hShow: boolean = this._hScrollBar && contentW > this._width;
			var showWidth: number = vShow ? this._width/* - this._vScrollBar.width*/ : this._width;
			var showHeight: number = hShow ? this._height/* - this._hScrollBar.height*/ : this._height;
			this.setContentSize(showWidth, showHeight);
			if (this._vScrollBar) {
				this._vScrollBar.x = this._width - this._vScrollBar.width;
				this._vScrollBar.y = 0;
				this._vScrollBar.height = this._height - (hShow ? this._hScrollBar.height : 0);
				this._vScrollBar.scrollSize = Math.max(this._height * 0.033, 1);
				this._vScrollBar.thumbPercent = showHeight / contentH;
				// if (this.isAutoBottom)
				// 	this._vScrollBar.setScroll(0, contentH - showHeight, contentH - showHeight);
				// else
				// 	this._vScrollBar.setScroll(0, contentH - showHeight, this._vScrollBar.value);
				this._vScrollBar.setScroll(0, contentH - showHeight, this._vScrollBar.value);
				this._vScrollBar.visible = false;
			}
			if (this._hScrollBar) {
				this._hScrollBar.x = 0;
				this._hScrollBar.y = this._height - this._hScrollBar.height;
				this._hScrollBar.width = this._width - (vShow ? this._vScrollBar.width : 0);
				this._hScrollBar.scrollSize = Math.max(this._width * 0.033, 1);
				this._hScrollBar.thumbPercent = showWidth / contentW;
				this._hScrollBar.setScroll(0, contentW - showWidth, this._hScrollBar.value);
				this._hScrollBar.visible = false;
			}
		}

		set contentWidth(v: number) {
			this._contentWidth = v;
		}

		get contentWidth(): number {
			var max: number = 0;
			for (var i: number = this._content.numChildren - 1; i > -1; i--) {
				var comp: egret.DisplayObject = this._content.getChildAt(i);
				max = Math.max(comp.x + comp.width * comp.scaleX, max);
			}
			return max;
		}

		public get contentHeight(): number {
			var max: number = 0;
			for (var i: number = this._content.numChildren - 1; i > -1; i--) {
				var comp: egret.DisplayObject = this._content.getChildAt(i);
				max = Math.max(comp.y + comp.height * comp.scaleY, max);
			}
			return max;
		}

		private _bgUrl: string = "";
		public setGraphicsUrl(url: string): void {
			this._bgUrl = url;
		}

		// private contentGraphics: Component;
		private setContentSize(width: number, height: number): void {
			if (!this.touchThrough) {
				if (!this._bg) {
					this._bg = new Image();
					this.addChildAt(this._bg, 0);
					// this._bg.url = this._bgUrl == "" ? this._bgUrl : Morn.PanelGraphicsUrl;
					this._bg.alpha = 0;
				}
				//不可穿透
				this._bg.width = width;
				this._bg.height = height;
			}
			else {
				if (this._bg) {
					this._bg.destroy();
					this._bg = null;
				}
			}
			this._content.width = width;
			this._content.height = height;
			this._content.scrollRect = new egret.Rectangle(0, 0, width, height);
		}

		public set width(value: number) {
			egret.superSetter(Panel, this, "width", value)//.width = value;
			this.callLater(this.changeScroll, this);
		}

		public set height(value: number) {
			// super.height = value;
			egret.superSetter(Panel, this, "height", value)
			this.callLater(this.changeScroll, this);
		}

		public get width(): number {
			return egret.superGetter(Panel, this, "width");
		}

		public get height(): number {
			// super.height = value;
			return egret.superGetter(Panel, this, "height");
		}

		/**垂直滚动条皮肤*/
		public get vScrollBarSkin(): string {
			return this._vScrollBar.skin;
		}

		public set vScrollBarSkin(value: string) {
			if (this._vScrollBar == null) {
				super.addChild(this._vScrollBar = new VScrollBar());
				this._vScrollBar.addEventListener(egret.Event.CHANGE, this.onScrollBarChange, this);
				this._vScrollBar.target = this;
				this.callLater(this.changeScroll, this);
			}

			if (this.checkSkinNull(value)) {
				//检测皮肤是否null
				return
			}
			this._vScrollBar.skin = value;
		}

		/**水平滚动条皮肤*/
		public get hScrollBarSkin(): string {
			return this._hScrollBar.skin;
		}

		public set hScrollBarSkin(value: string) {
			if (this._hScrollBar == null) {
				super.addChild(this._hScrollBar = new HScrollBar());
				this._hScrollBar.addEventListener(egret.Event.CHANGE, this.onScrollBarChange, this);
				this._hScrollBar.mouseWheelEnable = false;
				this._hScrollBar.target = this;
				this.callLater(this.changeScroll, this);
			}
			if (this.checkSkinNull(value)) {
				return
			}
			this._hScrollBar.skin = value;
		}

		private checkSkinNull(value: string): boolean {
			if (value) {
				var pIndex: number = value.lastIndexOf(".");
				if (pIndex != -1) {
					var nullStr: string = value.substr(pIndex + 1)
					if (nullStr == "null") {
						return true
					}
				}
			}
			return false
		}

		/**垂直滚动条*/
		public get vScrollBar(): ScrollBar {
			return this._vScrollBar;
		}

		/**水平滚动条*/
		public get hScrollBar(): ScrollBar {
			return this._hScrollBar;
		}

		/**内容容器*/
		public get content(): Sprite {
			return this._content;
		}

		protected onScrollBarChange(e: egret.Event): void {
			var rect: egret.Rectangle = this._content.scrollRect;
			if (rect) {
				var scroll: ScrollBar = e.currentTarget as ScrollBar;
				var start: number = Math.round(scroll.value);
				scroll.direction == ScrollBar.VERTICAL ? rect.y = start : rect.x = start;
				this._content.scrollRect = rect;
			}
		}

		public commitMeasure(): void {
			this.exeCallLater(this.changeScroll, this);
		}

		/**滚动到某个位置*/
		public scrollTo(x: number = 0, y: number = 0): void {
			this.commitMeasure();
			if (this.vScrollBar) {
				this.vScrollBar.value = y;
			}
			if (this.hScrollBar) {
				this.hScrollBar.value = x;
			}
		}

		public refresh(): void {
			this.changeScroll();
		}

		public destroy(): void {
			this.removeLater(this.changeScroll, this);

			if (this._bg) {
				this._bg.destroy();
				this._bg = null;
			}

			var num: number
			if (this._content) {
				num = this._content.numChildren;
				for (var i: number = 0; i < num; i++) {
					this._content.getChildAt(i).removeEventListener(egret.Event.RESIZE, this.onResizePanel, this);
					//有待优化
				}
				if (this._content.parent) super.removeChild(this._content);
				this._content.destroy();
				this._content = null;
			}
			if (this._vScrollBar) {
				this._vScrollBar.removeEventListener(egret.Event.CHANGE, this.onScrollBarChange, this);
				if (this._vScrollBar.parent) super.removeChild(this._vScrollBar);
				this._vScrollBar.destroy();
				this._vScrollBar = null;
			}

			if (this._hScrollBar) {
				this._hScrollBar.removeEventListener(egret.Event.CHANGE, this.onScrollBarChange, this);
				if (this._hScrollBar.parent) super.removeChild(this._hScrollBar);
				this._hScrollBar.destroy();
				this._hScrollBar = null;
			}
		}
	}
}