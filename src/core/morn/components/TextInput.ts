namespace morn {
	export class TextInput extends egret.TextField {
		protected _tipLabel: string;

		public textChangeCallback: asf.CallBack;
		protected _isHtml: boolean;
		public constructor(text: string = "", skin: string = null) {
			super();
			this.initialize();
			this.text = text;

		}


		/**是否是html格式*/
		public get isHtml(): boolean {
			let thisObjs = this;
			return thisObjs._isHtml;
		}

		public set isHtml(value: boolean) {
			let thisObjs = this;
			if (thisObjs._isHtml != value) {
				thisObjs._isHtml = value;
				thisObjs.onTextFieldChange()
				//thisObjs.callLater();
			}
		}


		protected initialize(): void {

			let thisObjs = this;
			//	thisObjs._textField = new egret.TextField()
			//	thisObjs.addChild(thisObjs._textField);
			this.setFocus()
			thisObjs.fontFamily = "方正艺黑简体";
			thisObjs.inputType = egret.TextFieldType.INPUT;
			thisObjs.touchEnabled = true;
			thisObjs.width = 128;
			thisObjs.height = 42;
			thisObjs.color = Styles.labelColor;
			thisObjs.maxChars = 999;
			thisObjs.type = egret.TextFieldType.INPUT;
			thisObjs.addEventListener(egret.Event.CHANGE, thisObjs.onTextFieldChange, thisObjs);
			thisObjs.addEventListener(egret.Event.FOCUS_OUT, thisObjs.onTextStateChanged, thisObjs);
			thisObjs.addEventListener(egret.Event.FOCUS_IN, thisObjs.onTextStateChanged, thisObjs);
			if (egret.Capabilities.isMobile && egret.Capabilities.os == "Android") {
				thisObjs.addEventListener(egret.TouchEvent.TOUCH_TAP, thisObjs.onTextStateChanged, thisObjs);
			}
			thisObjs.onTextFieldChange()
			// this._textField.addEventListener(egretTextEvent.TEXT_INPUT, this.onTextFieldTextInput,this.);
		}

		/**字体颜色*/
		public get color(): number {
			let thisObjs = this;
			return thisObjs.textColor;
		}

		public set color(value: number) {
			let thisObjs = this;
			thisObjs.textColor = value;

		}

		public set align(value:string){
			if(value)
				this.textAlign = value;
		}

		/** 设置居中方式 */
		public set margin(value:string){
			if(value)
			{
				let top = value.split(",")[1];
				if(top && Number(top)>0)
					this.verticalAlign = egret.VerticalAlign.MIDDLE;
			}
		}


		private onTextStateChanged(e: egret.Event) {
			let type = e.type;
			if (type == egret.Event.FOCUS_IN) {
				if (this.text == this.tiplabel) {
					this.text = '';
				}
			}
			else if (type == egret.Event.FOCUS_OUT) {
				if (this.text == '') //如果没有输入文本的状态显示提示文本
				{
					this.text = this.tiplabel;
				}
			}
			else if (type == egret.TouchEvent.TOUCH_TAP) {
				this.setFocus();
				let clientWidth = document.documentElement.clientWidth;
				let clientHeight = document.documentElement.clientHeight;
				document.body.style.width = clientWidth + "px";
				document.body.style.height = clientHeight + "px";
			}
		}

		private onTextFieldTextInput(e: egret.TextEvent): void {
			// this.dispatchEvent(e);
			// this.sendEvent(e);
		}

		protected onTextFieldChange(): void {
			let thisObjs = this;

			if (thisObjs.textChangeCallback) {
				thisObjs.textChangeCallback.execute();
			}
			// e.stopPropagation();
		}



		/**是否可编辑*/
		public get editable(): boolean {
			return this.type == egret.TextFieldType.INPUT;
		}

		public set editable(value: boolean) {
			this.type = value ? egret.TextFieldType.INPUT : egret.TextFieldType.DYNAMIC;
		}

		/**设置文本输入框的提示文本 */
		public get tiplabel(): string {
			return this._tipLabel;
		}

		public set tiplabel(val: string) {
			this._tipLabel = val;
			this.text = val;
		}



		public destroy(): void {
			this.textChangeCallback = null;

			if (this) {
				this.removeEventListener(egret.Event.CHANGE, this.onTextFieldChange, this);
				// this._textField.removeEventListener(egret.TextEvent.TEXT_INPUT, this.onTextFieldTextInput, this);
			}

		}



	}
}