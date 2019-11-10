namespace morn {
	export class NumberLine extends Component {

		protected _skin: string;
		protected _interval: number;
		protected _value: string;
		protected _align: string;

		private clipContainerVec: Sprite[];
		private clipVec: AutoBitmap[];
		private textureArr: egret.Texture[];
		private realWidth: number = 0;

		public loadedCallback: asf.CallBack;

		public constructor() {
			super();

			this.clipVec = [];
			this.textureArr = [];
			this.clipContainerVec = [];
		}
		protected preinitialize(): void {
			super.preinitialize();

			this._interval = 0;
			this._value = "0";
			this._align = "left";
		}

		public destroy(): void {
			this._skin = null;
			this._align = null;
			this.loadedCallback = null;

			var i: number;
			while (this.clipContainerVec.length > 0) {
				var spr: egret.DisplayObject = this.clipContainerVec.pop();
				if (spr.parent) {
					spr.parent.removeChild(spr);
				}
			}
			this.clipContainerVec = null;

			while (this.clipVec.length > 0) {
				var bm: AutoBitmap = this.clipVec.pop();
				if (bm.parent) {
					bm.parent.removeChild(bm);
				}
				bm.dispose();
			}
			this.clipVec = null;

			this.textureArr = null;

			this.removeLater(this.changeClip, this);

			super.destroy();
		}

		public set skin(value: string) {
			if (value && this._skin != value) {
				this._skin = value;
				var txtr: egret.Texture = RES.getRes(this._skin);
				if (txtr) {
					this.setBitmapData(txtr, this.skin);
				}
				else {
					RES.getResByUrl(this._skin, this.setBitmapData, this, RES.ResourceItem.TYPE_IMAGE);
				}
			}
		}

		private setBitmapData(texture: egret.Texture, url: string): void {
			if (this._skin == url) {
				this.textureArr = TextureUtils.cut2(texture, 10, true)

				this.changeClip();

				if (this.loadedCallback) {
					this.loadedCallback.execute();
				}
			}
		}

		public get value(): any {
			return this._value;
		}

		/**
		 *设置数字 只支持无符号整数 带符号的忽略符号(负数取绝对值) 
		 * @param num
		 * 
		 */
		public set value(num: any) {
			var str: string;
			var wrong: boolean = false;

			if (asf.TypeofUtils.isString(num)) {
				str = String(num);
			}
			else if (asf.TypeofUtils.isNumber(num)) {
				str = String(Math.abs(num));
			}
			else {
				wrong = true;
			}

			if (wrong) {
				console.log("NumberLine的value方法参数有误" + (typeof num));
			}
			else {
				if (this._value != str) {
					this._value = str;
					// this.callLater(this.changeClip, this);
					this.changeClip();
				}
			}
		}
		/**图片地址，等同于url*/
		public get skin(): string {
			return this._skin;
		}

		public get interval(): number {
			return this._interval;
		}

		public set interval(value: number) {
			if (this._interval != value) {
				this._interval = value;
				this.changeClip();
			}
		}


		public get align(): string {
			return this._align;
		}

		public set align(value: string) {
			if (this._align != value) {
				this._align = value;
				this.changeClip();
			}
		}

		protected changeClip(): void {
			if (!this._skin) {
				return;
			}

			var numStrArr: string[] = this._value.split("");
			var numStrLen: number = numStrArr.length;
			var vecLen: number = this.clipVec.length;
			var i: number = 0;

			for (i = 0; i < numStrLen; i += 1) {
				if (i < vecLen) {
					this.clipVec[i].textureForKey(this.textureArr[Number(numStrArr[i])], this._skin);
					this.clipVec[i].height = this.textureArr[Number(numStrArr[i])].textureHeight;
					this.clipVec[i].width = this.textureArr[Number(numStrArr[i])].textureWidth;
					var px: number = this.clipVec[i].width / 2;
					var py: number = this.clipVec[i].height / 2;
					this.clipVec[i].x = -px;
					this.clipVec[i].y = -py;
					this.clipVec[i].visible = true;
				}
				else {
					var clip: AutoBitmap = new AutoBitmap();
					this.clipVec.push(clip);
					clip.textureForKey(this.textureArr[Number(numStrArr[i])], this._skin);

					var spr: Sprite = new Sprite();
					this.clipContainerVec.push(spr);

					spr.addChild(clip);
					this.addChild(spr);

					var px: number = clip.width / 2;
					var py: number = clip.height / 2;

					clip.x = -px;
					clip.y = -py;
				}
			}


			//隐藏掉多余的clip
			for (i = numStrLen; i < this.clipVec.length; i += 1) {
				this.clipVec[i].visible = false;
			}

			//排位置
			var clipWidth: number = this.clipVec[0].width;
			var totalLen: number = (numStrLen - 1) * this.interval + numStrLen * clipWidth;

			for (i = 0; i < numStrLen; i += 1) {
				if (this.align == "center") {
					this.clipContainerVec[i].x = i * (clipWidth + this.interval) - totalLen / 2 + clipWidth / 2;
				}
				else if (this.align == "right") {
					this.clipContainerVec[i].x = i * (clipWidth + this.interval) - totalLen + clipWidth;
				}
				else {
					this.clipContainerVec[i].x = i * (clipWidth + this.interval);
				}
			}

			this.realWidth = totalLen;


		}

		public get width(): number {

			var numStrArr: string[] = this._value.split("");
			var numStrLen: number = numStrArr.length;
			var clipWidth: number = this.clipVec[0].width;
			var totalLen: number = (numStrLen - 1) * this.interval + numStrLen * clipWidth;
			this.realWidth = totalLen;
			return this.realWidth;
		}

		public set width(v: number) {
			egret.superSetter(NumberLine, this, "width", v);
		}

	}
}