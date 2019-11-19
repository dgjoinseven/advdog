namespace morn {
	export class Label extends Component {
		protected _stroke: string = "";
		protected _margin: string[] = Styles.labelMargin;
		protected _textField: egret.TextField;
		protected _bitmap: AutoBitmap;
		protected _text: string = "";
		protected _skin: string;
		protected _isHtml: boolean;
		protected _isFirst: boolean = true;

		private textLinkCallback: asf.CallBack;

		static SizeY: number[] = [4, 5, 5, 4, 4, 4, 4, 4, 4, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6];//字体从12开始

		public constructor(text: string = "", skin: string = null) {
			super();
			this.text = text;
			this.skin = skin;
		}

		protected preinitialize(): void {
			//			mouseEnabled = false;
			super.preinitialize();
		}

		protected createChildren(): void {
			this.addChild(this._bitmap = new AutoBitmap());
			this.addChild(this._textField = new egret.TextField());
			
			this.updateSizeY();
			this._textField.touchEnabled = true;
			this._textField.addEventListener(egret.TextEvent.LINK, this.onTextLink, this);
		}

		protected updateSizeY(): void {
			this._textField.y = 2;
			// return ;
			// let num = this.size - 12;
			// if (num >= 0) {
			// 	if(num>Label.SizeY.length)
			// 		num = Label.SizeY.length-1;
			// 	this._textField.y = Label.SizeY[num];
			// }
			// else
			//  {
			// 	// this._textField.y = 1;//因为label的morn跟白鹭会相差2个像素
			// 	//todo egret好像修复这个bug，先停止掉
			// }

		}

		protected initialize(): void {
			// _format = _textField.defaultTextFormat;
			// _format.font = Styles.fontName;
			this.font = "方正艺黑简体"
			this.size = Styles.fontSize;
			this.color = Styles.labelColor;
			this.leading = 0;
			// _fdisabledt.size = Styles.fontSize;
			// _format.color = Styles.labelColor;
			// this._textField.selectable = false;
			// this._textField.autoSize = TextFieldAutoSize.LEFT;
			// this._textField.embedFonts = Styles.embedFonts;
			// this._bitmap.sizeGrid = Styles.defaultSizeGrid;
		}

		/**显示的文本*/
		public get text(): string {
			return this._text;
		}

		public set text(value: string) {
			if (this._text != value) {
				// isUiInit = false;
				this._text = value || "";
			//	this._text = this._text.replace(/\\n/g, "\n");
				//				callLater(changeText);
				this.changeText();
				this.sendEvent(egret.Event.CHANGE);
			}
		}

		public set textNoEvent(value: string) {
			if (this._text != value) {
				this._text = value || "";
				this._text = this._text.replace(/\\n/g, "\n");
				//				callLater(changeText);
				this.changeText();
			}
		}

		protected changeText(): void {
			// if(!this._textField)
			// {
			// 	console.log("出现_textField为空");
			// }
			if (this._isFirst && this._text == "") {

			}
			else {
				try {
					if (this._isHtml) {
						if (this._underline) {
							this._textField.textFlow = (new egret.HtmlTextParser).parser("<u>" + this._text + "</u>");
						}
						else {
							this._textField.textFlow = (new egret.HtmlTextParser).parser(this._text);
						}
					}
					else {
						if (!this._textField)
							throw new Error("_textField为空");
						// if(!this._textField.text)
						// 	throw new Error("_textField的text为空");
						this._textField.text = this._text;
					}
				} catch (e) {
					console.error(e, " text = ", this._text);
				}
			}
			this._isFirst = false;
		}

		protected changeSize(): void {
			if (!isNaN(this._width)) {
				// this._textField.autoSize = TextFieldAutoSize.NONE;
				this._textField.width = this._width - Number(this._margin[0]) - Number(this._margin[2]);
				if (isNaN(this._height) && this.wordWrap) {
					// _textField.autoSize = TextFieldAutoSize.LEFT;
				}
				else {
					this._height = isNaN(this._height) ? 18 : this._height;
					this._textField.height = this._height - Number(this._margin[1]) - Number(this._margin[3]);
				}
			}
			else {
				this._width = this._height = NaN;
				// this._textField.autoSize = TextFieldAutoSize.LEFT;
			}
			super.changeSize();
		}

		public set dataSource(value: any) {
			this._dataSource = value;
			if (value instanceof Number || value instanceof String) {
				this.text = String(value);
			}
			else {
				egret.superSetter(Label, this, "dataSource", value);
			}
		}

		/**是否是html格式*/
		public get isHtml(): boolean {
			return this._isHtml;
		}

		public set isHtml(value: boolean) {
			if (this._isHtml != value) {
				this._isHtml = value;
				this.callLater(this.changeText, this);
			}
		}

		/**描边(格式:color,strength)*/
		public get stroke(): string {
			return this._stroke;
		}

		public set stroke(value: string) {
			// return;
			if (this._stroke != value) {
				this._stroke = value;
				if (this._stroke == "") {
					this._textField.stroke = 0;
					this._textField.strokeColor = 0;
				}
				else {
					var stroke: string[] = this._stroke.split(",");
					if (stroke.length == 1) {
						this._textField.stroke = 1;
						this._textField.strokeColor = Number(stroke[0]);
					}
					else if(stroke.length == 2){
						this._textField.stroke = Number(stroke[1]);
						this._textField.strokeColor = Number(stroke[0]);
					}
					else {
						this._textField.stroke = Number(stroke[2]);
						this._textField.strokeColor = Number(stroke[0]);
					}
				}
			}
		}

		/**是否是多行*/
		public get multiline(): boolean {
			return this._textField.multiline;
		}

		public set multiline(value: boolean) {
			this._textField.multiline = value;
		}

		/**是否是密码*/
		public get asPassword(): boolean {
			return this._textField.displayAsPassword;
		}

		public set asPassword(value: boolean) {
			this._textField.displayAsPassword = value;
		}

		/**宽高是否自适应*/
		public get autoSize(): string {
			return "false";//_textField.autoSize;
		}

		public set autoSize(value: string) {
			// _textField.autoSize = value;
		}

		/**是否自动换行*/
		public get wordWrap(): boolean {
			return this._textField.wordWrap;
		}

		public set wordWrap(value: boolean) {
			this._textField.wordWrap = value;
		}

		/**是否可选*/
		public get selectable(): boolean {
			return false;//_textField.selectable;
		}

		public set selectable(value: boolean) {
			// this._textField.selectable = value;
			// mouseEnabled = value;
		}

		/**是否具有背景填充*/
		public get background(): boolean {
			return this._textField.background;
		}

		public set background(value: boolean) {
			this._textField.background = value;
		}

		/**文本字段背景的颜色*/
		public get backgroundColor(): number {
			return this._textField.backgroundColor;
		}

		public set backgroundColor(value: number) {
			this._textField.backgroundColor = value;
		}

		/**字体颜色*/
		public get color(): number {
			return this._textField.textColor;
		}

		public set color(value: number) {
			this._textField.textColor = value;
			// callLater(changeText);
		}

		/**字体类型*/
		public get font(): string {
			return this._textField.fontFamily;
		}

		public set font(value: string) {
			this._textField.fontFamily = "方正艺黑简体";
			this.updateSizeY();
			// callLater(changeText);
		}

		/**对齐方式*/
		public get align(): string {
			return this._textField.textAlign;
		}

		public set align(value: string) {
			this._textField.textAlign = value;
			// callLater(changeText);
		}

		/**粗体类型*/
		public get bold(): boolean {
			return this._textField.bold;
		}

		public set bold(value: boolean) {
			this._textField.bold = value;
			// callLater(changeText);
		}

		/**垂直间距*/
		public get leading(): number {
			return this._textField.lineSpacing - 2;
		}

		public set leading(value: number) {
			this._textField.lineSpacing = value + 2;
			// callLater(changeText);
		}

		/**字间距*/
		public get letterSpacing(): number {
			return 0;
			// return _format.letterSpacing;
		}

		public set letterSpacing(value: number) {
			// _format.letterSpacing = value;
			// callLater(changeText);
		}

		/**第一个字符的缩进*/
		public get indent(): number {
			return 0;
		}

		public set indent(value: number) {
			// _format.indent = value;
			// callLater(changeText);
		}

		/**字体大小*/
		public get size(): number {
			return this._textField.size;
		}

		public set size(value: number) {
			this._textField.size = value;
			this.updateSizeY();
			// callLater(changeText);
		}

		private _underline: boolean = false;
		/**下划线类型*/
		public get underline(): boolean {
			return this._underline;//_format.underline;
		}

		public set underline(value: boolean) {
			this._underline = value;
			this.isHtml = value;
			this.callLater(this.changeText, this);
		}



		/**边距(格式:左边距,上边距,右边距,下边距)*/
		public get margin(): string {
			return this._margin.join(",");
		}

		public set margin(value: string) {
			this._margin = value.split(",");//StringUtils.fillArray(_margin, value, int);
			this._textField.x = Number(this._margin[0]);
			this._textField.y = Number(this._margin[1]);
			this.callLater(this.changeSize, this);
		}

		/**文本控件实体*/
		public get textField(): egret.TextField {
			return this._textField;
		}

		/**将指定的字符串追加到文本的末尾*/
		public appendText(newText: string): void {
			this.text += newText;
		}

		/**皮肤*/
		public get skin(): string {
			return this._skin;
		}

		public set skin(value: string) {
			if (this._skin != value) {
				this._skin = value;
				this._bitmap.textureForKey(RES.getRes(this._skin), this._skin);
				if (this._bitmap.$bitmapData) {
					this._contentWidth = this._bitmap.$bitmapData.width;
					this._contentHeight = this._bitmap.$bitmapData.height;
				}
			}
		}

		/**九宫格信息，格式：左边距,上边距,右边距,下边距,是否重复填充(值为0或1)，例如：4,4,4,4,1*/
		public get sizeGrid(): string {
			return this._bitmap.sizeGrid.join(",");
		}

		public set sizeGrid(value: string) {
			this._bitmap.sizeGrid = value.split(",");
		}

		public commitMeasure(): void {
			this.exeCallLater(this.changeText, this);
			this.exeCallLater(this.changeSize, this);
		}

		public get width(): number {
			if (!isNaN(this._width) || Boolean(this._skin) || Boolean(this._text)) {
				return egret.superGetter(Label, this, "width");
			}
			return 0;
		}

		public set width(value: number) {
			egret.superSetter(Label, this, "width", value);
			this._bitmap.width = value;
		}

		public get height(): number {
			if (!isNaN(this._height) || Boolean(this._skin) || Boolean(this._text)) {
				return egret.superGetter(Label, this, "height");
			}
			return 0;
		}

		public set height(value: number) {
			egret.superSetter(Label, this, "height", value);
			this._bitmap.height = value;
		}

		//设置html文本点击回调
		public setTextLink(callback: asf.CallBack): void {
			this.textLinkCallback = callback;
		}
		private onTextLink(e: egret.TextEvent): void {
			if (this.textLinkCallback) {
				this.textLinkCallback.execute(e.text);
			}
		}

		public destroy(): void {
			this.removeLater(this.changeText, this);
			this.removeLater(this.changeSize, this);
			this.textLinkCallback = null;

			if (this._textField) {
				this._textField.removeEventListener(egret.TextEvent.LINK, this.onTextLink, this);
				if (this._textField.parent) this.removeChild(this._textField);
				this._textField = null;
			}
			if (this._bitmap) {
				if (this._bitmap.parent) this.removeChild(this._bitmap);
				this._bitmap.dispose();
				this._bitmap = null;
			}
			this._stroke = null;
			this._skin = null;
			this._text = null;
			if (this._margin != Styles.labelMargin) {
				this._margin = null;
			}

			super.destroy();
		}
	}
}