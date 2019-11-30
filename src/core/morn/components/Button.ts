namespace morn {
	/**按钮类，可以是单态，两态和三态，默认三态(up,over,down)*/
	export class Button extends Component implements ISelect {
		/**是否开启同时播放放大功能，
		 * 开启后会将btimap和label放在1个容器里，这样会导致外面对按钮进行鼠标监听时，evt.target失效 */
		static isOpenScaleMode: boolean = false;
		static isGlobalPlay: boolean = true;
		protected _isPlayEffect: boolean = true;
		protected static stateMap: Object = { "touchRollOver": 1, "touchRollOut": 0, "touchBegin": 2, "touchEnd": 0, "selected": 2, "touchReleaseOutside": 0 };
		protected _labelColors: number[] = Styles.buttonLabelColors;
		protected _labelMargin: number[] = Styles.buttonLabelMargin;
		/** 文本的描边像素 **/
		protected _labelStrokes: number[] = Styles.buttonLabelStrokes;
		/** 文本的描边颜色 **/
		protected _labelStrokeColors: number[] = Styles.buttonLabelStrokeColors;
		protected _clickHandler: asf.CallBack;
		protected _bitmap: AutoBitmap;
		protected _btnLabel: Label;
		protected _state: number = 0;
		protected _toggle: boolean;
		protected _selected: boolean = false;
		protected _skin: string;
		protected _loadComplete: asf.CallBack;
		protected _loaded: boolean = false;
		protected _autoSize: boolean = true;
		protected _stateNum: number = Styles.buttonStateNum;


		protected _pointUrl: string;
		protected _pointX: number;
		protected _pointY: number;
		protected _pointImage: Image;
		protected _showPoint: boolean = false;

		protected _clickTime: number = 0;
		/**倒数时间 */
		protected _lifeTime: number = 0;
		/**倒数时间 */
		protected _nowLifeTime: number = 0;

		protected _labelText: string = "";

		/**调用按钮点击的响应时间，每次点击大于这个时间才会被触发 **/
		ansTime: number = 0;

		/**2,3态时用到的 */
		protected _labelMargin2: number[];

		// private eff: game.EffectPlayer;

		// private bitmapPlayer: BitmapPlayer;
		// private clipPx: number;
		// private clipPy: number;
		public isStopImmediatePropagation: boolean = false
		protected container: morn.Box;

		private timerId: number = -1;
		public constructor() {
			super()
			// this.skin = skin;
			// this.label = label;
		}

		public setLoadComplete(c: asf.CallBack): void {
			this._loadComplete = c;
		}
		protected preinitialize(): void {
			// this._state = 0;
			this.ansTime = 500;
		}

		clone():morn.Button
		{
			let btn = new morn.Button();
			btn.skin = this.skin;
			btn.label = this.label;
			btn.stateNum = this.stateNum;
			btn.btnLabel.size = this.btnLabel.size;
			btn.btnLabel.bold = this.btnLabel.bold;
			btn.btnLabel.align = this.btnLabel.align;
			btn.btnLabel.color = this.btnLabel.color;
			btn.labelMargin = this.labelMargin;
			return btn;
		}

		protected createChildren(): void {
			if (Button.isOpenScaleMode) {
				this.addChild(this.container = new morn.Box);
				this.container.addChild(this._bitmap = new AutoBitmap);
				this.container.addChild(this._btnLabel = new Label());
				this._bitmap.touchEnabled = this._bitmap.touchEnabled = false;
				this.container.touchChildren = this.container.touchEnabled = false;
			}
			else {
				this.addChild(this._bitmap = new AutoBitmap);
				this.addChild(this._btnLabel = new Label());
			}
			this._btnLabel.touchEnabled = false;
		}

		protected initialize(): void {
			this._btnLabel.align = "center";
			this.touchChildren = this.touchEnabled = true;
			// this.addEventListener(egret.TouchEvent.TOUCH_ROLL_OVER, this.onMouse, this);
			// this.addEventListener(egret.TouchEvent.TOUCH_ROLL_OUT, this.onMouse, this);
			this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onMouse, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.onMouse, this);
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouse, this);
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onMouse, this);
			// this._bitmap.sizeGrid = Styles.defaultSizeGrid;
		}

		protected onMouse(e: egret.TouchEvent): void {
			if ((!this._toggle && this._selected) || this._disabled) {
				return;
			}
			if (e.type == egret.TouchEvent.TOUCH_TAP) {
				// if (Button.isGlobalPlay && this._isPlayEffect)
				// {
				// 	// let sound = RES.getRes('anniu01_mp3');
				// 	// {
				// 	// 	let soundChanel = sound.play(0,1);
				// 	// 	soundChanel.volume = 0.4;
				// 	// 	sound.addEventListener(egret.Event.SOUND_COMPLETE,function(){
				// 	// 		sound = null;
				// 	// 	},this);
				// 	// }
				// }
				if (this._toggle) {
					this.selected = !this._selected;
				}

				if (this._clickHandler) {
					var nowClickTime: number = egret.getTimer();
					if (nowClickTime - this.ansTime > this._clickTime) {
						this.openLifeTime();
						this._clickHandler.execute();
						this._clickTime = egret.getTimer();
					}
				}
				// var c: clipboard.Clipboard = new clipboard.Clipboard(this, {
				// 	text: function ()
				// 	{
				// 		return 'to be or not to be';
				// 	}
				// });
				if (this.isStopImmediatePropagation) e.stopImmediatePropagation()

				return;
			}

			if (Button.isOpenScaleMode) {
				if (this._stateNum == 1) {
					//1态图直接缩放
					if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
						var w: number = this.container.width;
						var h: number = this.container.height;
						this.container.scaleX = this.container.scaleY = 1.2;
						this.container.x = (w - this.container.width * 1.2) * 0.5;
						this.container.y = (h - this.container.height * 1.2) * 0.5;
					}
					else if (e.type == egret.TouchEvent.TOUCH_END || e.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE) {
						this.container.scaleX = this.container.scaleY = 1;
						this.container.x = 0;
						this.container.y = 0;
					}
				}
			}

			if (this._selected == false) {
				this.state = Button.stateMap[e.type];
			}
		}

		/**
		 * 设置点击时间，大于0会开启点击后倒数的功能
		 */
		public setLifeTime(sec: number): void {
			this._lifeTime = sec;
		}

		private openLifeTime(): void {
			asf.App.timer.clearTimer(this.timerId);
			if (this._lifeTime > 0) {
				this._nowLifeTime = this._lifeTime + 1;
				this.timerId = asf.App.timer.doLoop(1000, this.onLifeTimeHandler, this, null, this.timerId);
				this.disabled = true;
				this.onLifeTimeHandler();
			}
		}

		private onLifeTimeHandler(): void {
			this._nowLifeTime--;
			if (this._nowLifeTime <= 0) {
				asf.App.timer.clearTimer(this.timerId);
				this.disabled = false;
				this.label = this._labelText;
			}
			else {
				this._btnLabel.text = this._nowLifeTime + "";
			}
		}

		/**Y锚点，值为0-1*/
		public get anchorY(): number {
			return this._bitmap.anchorY;
		}

		public set anchorY(value: number) {
			this._bitmap.anchorY = value;
		}

		/**Y锚点，值为0-1*/
		public get anchorX(): number {
			return this._bitmap.anchorX;
		}

		public set anchorX(value: number) {
			this._bitmap.anchorX = value;
		}

		public get showPoint(): boolean {
			return this._showPoint;
		}

		/**
		 * 是否显示小圆点
		 * 
		 * 
		 * @memberOf Button
		 */
		public set showPoint(value: boolean) {
			this._showPoint = value;
			this.callLater(this.changePointSkin, this);
		}

		/**原点路径*/
		public get pointUrl(): string {
			return this._pointUrl;
		}

		public set pointUrl(value: string) {
			if (this._pointUrl != value) {
				this._pointUrl = value;
				//				this.changePointSkin();
				this.callLater(this.changePointSkin, this);
				//				callLater(changePointXY);
			}
		}

		/**原点坐标*/
		public get pointY(): number {
			return this._pointY;
		}

		public set pointY(value: number) {
			this._pointY = value;
			this.callLater(this.changePointXY, this);
		}

		/**原点坐标*/
		public get pointX(): number {
			return this._pointX;
		}

		public set pointX(value: number) {
			this._pointX = value;
			this.callLater(this.changePointXY, this);
		}

		protected changePointXY(): void {
			if (this._pointImage && this._bitmap) {
				// this._pointImage.x = this._pointX;
				// this._pointImage.y = this._pointY;
				this._pointImage.x = this._bitmap.width - this._pointImage.width;
				this._pointImage.y = 0;
			}
		}

		protected changePointSkin(): void {
			if (this._pointImage == null) {
				this._pointImage = new Image();
			}

			if (this._pointUrl == "" || !this._showPoint) {
				if (this._pointImage && this._bitmap && this._bitmap.parent) {
					if (this._pointImage.parent) this.removeChild(this._pointImage);
					return;
				}
			}

			this._pointImage.url = this._pointUrl;
			this.addChild(this._pointImage);

			this.callLater(this.changePointXY, this);
		}

		/**按钮标签*/
		public get label(): string {
			return this._labelText;
		}

		public set label(value: string) {
			if (this._btnLabel && this._btnLabel.text != value) {
				this._labelText = value;
				this._btnLabel.text = value;
				this.callLater(this.changeState, this);
			}
		}

		/**皮肤，支持单态，两态和三态，用stateNum属性设置*/
		public get skin(): string {
			return this._skin;
		}
		/**
		 * 返回按钮上的文本对象
		 */
		public getLabel():morn.Label
		{
			return this._btnLabel;
		}

		public set skin(value: string) {
			if (this._skin != value) {
				this._loaded = false;
				this._skin = value;
				this.callLater(this.changeClips, this);
				this.callLater(this.changeLabelSize, this);
			}
			egret.superSetter(Button, this, "skin", value)
		}

		protected changeClips(): void {
			// texture.bitmapData
			// this._bitmap.textureForKey(App.asset.getClips(_skin, 1, _stateNum), this._skin);
			this.changeState();
			if (this._autoSize) {
				this._contentWidth = this._bitmap.width;
				this._contentHeight = this._bitmap.height;
			}
		}

		public commitMeasure(): void {
			this.exeCallLater(this.changeClips, this);
		}

		protected changeLabelSize(): void {
			this.exeCallLater(this.changeClips, this);
			var margin: number[] = this._labelMargin;
			if (this.state == 2) {
				margin = this._labelMargin;
			}
			else if (this._labelMargin2) {
				margin = this._labelMargin2;
			}
			this._btnLabel.width = this.width - margin[0] - margin[2];
			this._btnLabel.height = this._btnLabel.textField.textHeight;//ObjectUtils.getTextField(_btnLabel.format).height;
			this._btnLabel.x = margin[0];
			this._btnLabel.y = (this.height - this._btnLabel.height) * 0.5 + margin[1] - margin[3]// - 2;//因为label的morn跟白鹭会相差2个像素
			this.updateSizeY();
		}

		protected updateSizeY(): void {

			//this._btnLabel.y -= 4;//因为label的morn跟白鹭会相差2个像素

		}

		/**是否是选择状态*/
		public get selected(): boolean {
			return this.getSelected();
		}

		public set selected(value: boolean) {
			this.setSelected(value);
		}

		/**是否是选择状态*/
		public getSelected(): boolean {
			return this._selected;
		}

		public setSelected(value: boolean) {
			if (this._selected != value) {
				this._selected = value;
				this.state = this._selected ? Button.stateMap["selected"] : Button.stateMap["touchRollOut"];
				this.sendEvent(egret.Event.CHANGE);
			}
		}

		protected get state(): number {
			return this._state;
		}

		protected set state(value: number) {
			this._state = value;
			this.callLater(this.changeState, this);
		}

		protected changeState(): void {
			// this._bitmap.index = this.index;
			if (!this.skin) {
				return;
			}


			var texture: egret.Texture = RES.getRes(this._skin);
			if (!texture) {
				//没资源
				RES.getResByUrl(this._skin, this.onSkinLoaded, this, RES.ResourceItem.TYPE_IMAGE)
			}
			else {
				this.onSkinLoaded(texture);
			}
		}

		private textureStates: egret.Texture[];
		protected onSkinLoaded(texture: egret.Texture): void {
			let thisObj = this;
			if (thisObj._bitmap) {
				if (texture) {
					// thisObj._bitmap.dispose();//先重置1次
					var textureName: string = thisObj._skin;
					var newTexture: egret.Texture;
					thisObj.textureStates = TextureUtils.cut2(texture, thisObj._stateNum, false);
					if (thisObj.stateNum == 1 && this._state == 2) {
						//很粗糙的处理
						this.filters = asf.GameFilter.createGradientGlowFilter();
					}
					else if (!this._disabled) {
						this.filters = []
					}
					newTexture = thisObj.textureStates[thisObj.index];

					// thisObj._bitmap.x = texture._offsetX;
					// thisObj._bitmap.y = texture._offsetY;

					thisObj._bitmap.textureForKey(newTexture, textureName);
					thisObj._btnLabel.color = thisObj._labelColors[thisObj._state];
					//描边处理
					thisObj._btnLabel.textField.stroke = thisObj._labelStrokes[thisObj._state];
					thisObj._btnLabel.textField.strokeColor = thisObj._labelStrokeColors[thisObj._state];

					//thisObj._bitmap.pixelHitTest = true;

					thisObj.changePointXY();
					thisObj.callLater(thisObj.changeLabelSize, thisObj);
					// thisObj.changeClipEff();
					if (!thisObj._loaded && thisObj._loadComplete) {
						thisObj._loaded = true;
						thisObj._loadComplete.execute();
					}
				}
				else {
					thisObj._bitmap.dispose();
				}
			}
		}

		// protected updateBitmap(texture: egret.Texture): void
		// {

		// }

		public get index(): number {
			var index: number = this._state;
			if (this._stateNum == 2) {
				index = index < 2 ? index : 1;
			}
			else if (this._stateNum == 1) {
				index = 0;
			}

			return index
		}

		/**是否是切换状态*/
		public get toggle(): boolean {
			return this._toggle;
		}

		public set toggle(value: boolean) {
			this._toggle = value;
		}

		public set disabled(value: boolean) {
			if (this._disabled != value) {
				this.state = this._selected ? Button.stateMap["selected"] : Button.stateMap["touchRollOut"];
				egret.superSetter(Button, this, "disabled", value)
			}
		}

		/**按钮标签颜色(格式:upColor,overColor,downColor,disableColor)*/
		public get labelColors(): string {
			return String(this._labelColors);
		}

		public set labelColors(value: string) {
			this._labelColors = StringUtils.fillArray(this._labelColors, value);
			this.callLater(this.changeState, this);
		}

		/**按钮标签边距(格式:左边距,上边距,右边距,下边距)*/
		public get labelMargin(): string {
			return String(this._labelMargin);
		}

		public set labelMargin(value: string) {
			this._labelMargin = StringUtils.fillArray(this._labelMargin, value, Number);
			this._labelMargin2 = this._labelMargin.concat();
			this.callLater(this.changeLabelSize, this);
		}

		public set labelMargin2(value: string) {
			this._labelMargin2 = StringUtils.fillArray(this._labelMargin2, value, Number);
		}

		/**按钮标签描边(格式:color,strengt)*/
		public get labelStroke(): string {
			return this._btnLabel.stroke;
		}

		public set labelStroke(value: string) {
			let thisObj = this;
			//最新多态描边切换实现 by soda 2017.04.27
			if (value == null || value == "") {
				thisObj._labelStrokes = Styles.buttonLabelStrokes;
				thisObj._labelStrokeColors = Styles.buttonLabelStrokeColors;
				return;
			}
			var params: string[] = value.split(",");
			//只有颜色
			if (params.length == 1) {
				thisObj._labelStrokes = Styles.buttonLabelStrokes;
				thisObj._labelStrokeColors = [Number(params[0]), Number(params[0]), Number(params[0])];
			}
			else if (params.length == 2) {
				thisObj._labelStrokeColors = [Number(params[0]), Number(params[0]), Number(params[0])];
				thisObj._labelStrokes = [Number(params[1]), Number(params[1]), Number(params[1])];
			}
			else if (params.length == 4) {
				thisObj._labelStrokeColors = [Number(params[0]), Number(params[2]), Number(params[2])];
				thisObj._labelStrokes = [Number(params[1]), Number(params[3]), Number(params[3])];
			}
			else if (params.length == 6) {
				thisObj._labelStrokeColors = [Number(params[0]), Number(params[2]), Number(params[4])];
				thisObj._labelStrokes = [Number(params[1]), Number(params[3]), Number(params[5])];
			}
			//原来mornui实现的
			// this._btnLabel.stroke = value;
		}

		/**按钮标签大小*/
		public get labelSize(): number {
			return this._btnLabel.size;
		}

		public set labelSize(value: number) {
			this._btnLabel.size = value
			this.callLater(this.changeLabelSize, this);
		}

		/**按钮标签粗细*/
		public get labelBold(): boolean {
			return this._btnLabel.bold;
		}

		public set labelBold(value: boolean) {
			this._btnLabel.bold = value
			this.callLater(this.changeLabelSize, this);
		}

		/**字间距*/
		public get letterSpacing(): number {
			return this._btnLabel.letterSpacing;
		}

		public set letterSpacing(value: number) {
			this._btnLabel.letterSpacing = value
			this.callLater(this.changeLabelSize, this);
		}

		/**按钮标签字体*/
		public get labelFont(): string {
			return this._btnLabel.font;
		}

		public set labelFont(value: string) {
			this._btnLabel.font = value;
			this.callLater(this.changeLabelSize, this);
		}

		/**点击处理器(无默认参数)*/
		public getClickHandler(): asf.CallBack {
			return this._clickHandler;
		}

		// public setClickHandler(value: asf.CallBack)
		public setClickHandler(callBack: Function, thisObj: Object, param?: any) {
			//增加一个callBack，并且在执行exe之后自动回收
			if (this._clickHandler) {
				asf.CallBack.relesea(this._clickHandler);
			}
			this._clickHandler = asf.CallBack.create(callBack, thisObj, param);
		}

		/**按钮标签控件*/
		public get btnLabel(): Label {
			return this._btnLabel;
		}

		/**九宫格信息，格式：左边距,上边距,右边距,下边距,是否重复填充(值为0或1)，例如：4,4,4,4,1*/
		public get sizeGrid(): string {
			if (this._bitmap.sizeGrid) {
				return this._bitmap.sizeGrid.join(",");
			}
			return null;
		}

		public set sizeGrid(value: string) {
			this._bitmap.sizeGrid = StringUtils.fillArray(Styles.defaultSizeGrid, value);
		}

		public get width(): number {
			return egret.superGetter(Button, this, "width");
		}

		public get height(): number {
			return egret.superGetter(Button, this, "height");
		}

		public set width(value: number) {
			egret.superSetter(Button, this, "width", value)
			if (this._autoSize) {
				this._bitmap.width = value;
			}
			this.callLater(this.changeLabelSize, this);
		}

		public set height(value: number) {
			egret.superSetter(Button, this, "height", value)
			if (this._autoSize) {
				this._bitmap.height = value;
			}
			this.callLater(this.changeLabelSize, this);
		}
		/** 是否开启按钮音效 */
		public set playEffect(val: boolean) {
			this._isPlayEffect = val;
		}
		public get playEffect() {
			return this._isPlayEffect;
		}
		public set dataSource(value: any) {
			this._dataSource = value;
			if (value instanceof Number || value instanceof String) {
				this.label = String(value);
			}
			else {
				egret.superSetter(Button, this, "dataSource", value)
			}
		}

		/**皮肤的状态数，支持单态，两态和三态按钮，分别对应1,2,3值，默认是三态*/
		public get stateNum(): number {
			return this._stateNum;
		}

		public set stateNum(value: number) {
			if (this._stateNum != value) {
				this._stateNum = value < 1 ? 1 : value > 3 ? 3 : value;
				this.callLater(this.changeClips, this);
			}
		}

		public destroy(): void {
			this._loadComplete = null;

			this.removeLater(this.changeLabelSize, this);
			this.removeLater(this.changeClips, this);
			this.removeLater(this.changeState, this);
			this.removeLater(this.changePointSkin, this);

			asf.App.timer.clearTimer(this.timerId);

			// this.removeEventListener(egret.TouchEvent.TOUCH_ROLL_OVER, this.onMouse, this);
			// this.removeEventListener(egret.TouchEvent.TOUCH_ROLL_OUT, this.onMouse, this);
			this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onMouse, this);
			this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onMouse, this);
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onMouse, this);
			this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onMouse, this);

			if (this._bitmap) {
				if (this._bitmap.parent) this._bitmap.parent.removeChild(this._bitmap);
				this._bitmap.dispose();
				this._bitmap = null;
			}
			if (this._btnLabel) {
				this._btnLabel.remove();
				this._btnLabel.destroy();
				this._btnLabel = null;
			}
			if (this._clickHandler != null) {
				asf.CallBack.relesea(this._clickHandler);
				this._clickHandler.destroy();
				this._clickHandler = null;
			}
			if (this._labelColors != Styles.buttonLabelColors) {
				this._labelColors = null;
			}
			if (this._labelMargin != Styles.buttonLabelColors) {
				this._labelMargin = null;
			}
			if (this.container) {
				this.container.remove();
			}
			if (this._skin != null)
				this._skin = null;

			// if (this.eff) {
			// 	this.eff.destroy();
			// 	this.eff = null;
			// }

			// if (this.bitmapPlayer) {
			// 	this.bitmapPlayer.destroy();
			// 	this.bitmapPlayer = null;
			// }

			this.textureStates = null;

			super.destroy();
		}
	}
}