namespace morn {
	export class Image extends Component {
		protected _bitmap: AutoBitmap;
		protected _url: string;
		protected _urlFormat: string;
		protected _loadComplete: asf.CallBack;
		public constructor(url: string = null) {
			super();
			this._url = url;
		}

		protected createChildren(): void {
			this.addChild(this._bitmap = new AutoBitmap);
		}

		public setLoadComplete(c: asf.CallBack): void {
			this._loadComplete = c;
		}

		/**图片地址，如果值为已加载资源，会马上显示，否则会先加载后显示，加载后图片会自动进行缓存
		 * 举例：url="png.comp.bg" 或者 url="img/face.png"*/
		public get url(): string {
			return this._url;
		}

		public set url(value: string) {
			if (this._url != value) {
				// this.texture = null;
				this._url = value;
				this._urlFormat = this._url;//StringUtils.urlFormat(this._url);
				if (Boolean(value)) {
					try {
						if (RES.hasRes(this._urlFormat)) {
							RES.getResAsync(this._urlFormat, this.set$bitmapData, this);

						}
						else {
							RES.getResByUrl(this._urlFormat, this.set$bitmapData, this, RES.ResourceItem.TYPE_IMAGE);
						}
					} catch (e) {
						console.error("资源加载失败：url=", value, e);
					}
				}
				else {
					this.texture = null;
				}
			}
		}

		public set width(value: number) {
			egret.superSetter(Image, this, "width", value);
			if (this._bitmap) this._bitmap.width = egret.superGetter(Image, this, "width");
		}

		public set height(value: number) {
			egret.superSetter(Image, this, "height", value);
			if (this._bitmap) this._bitmap.height = egret.superGetter(Image, this, "height");
		}

		public get height(): number {
			return egret.superGetter(Image, this, "height");
		}

		public get width(): number {
			return egret.superGetter(Image, this, "width");
		}

		private set$bitmapData(texture: egret.Texture, url: string): void {
			if (url == this._url) {
				this.texture = texture;
			}
		}

		/**图片地址，等同于url*/
		public get skin(): string {
			return this._url;
		}

		public set skin(value: string) {
			this.url = value;
		}

		initSize(): void {
			this._height = NaN
			this._width = NaN
			if (this._bitmap) {
				this._bitmap.initSize();
			}
		}

		/**源位图数据*/
		public get $bitmapData(): egret.BitmapData {
			return this._bitmap.$bitmapData;
		}

		public set texture(value: egret.Texture) {
			if (this._bitmap) {
				if (value && this._url) {
					this._contentWidth = value.textureWidth;
					this._contentHeight = value.textureHeight
					//通过key来获取$bitmapData
					this._bitmap.textureForKey(value, this._url);
					if (this._loadComplete) {
						this._loadComplete.execute();
					}
					this.sendEvent(UIEvent.IMAGE_LOADED);
				}
				else if (value) {
					this._contentWidth = value.textureWidth;
					this._contentHeight = value.textureHeight;

					this._bitmap.$bitmapData = value.$bitmapData;
					if (this._loadComplete) {
						this._loadComplete.execute();
					}

					this.sendEvent(UIEvent.IMAGE_LOADED);

				}
				else {
					this._bitmap.dispose();
				}
			}
		}
		public get texture(): egret.Texture {
			return this._bitmap.texture;
		}


		public set$bitmapDataBy$bitmapData(value: egret.BitmapData): void {
			if (value) {
				this._contentWidth = value.width;
				this._contentHeight = value.height;

				this._bitmap.$bitmapData = value;
				if (this._loadComplete) {
					this._loadComplete.execute();
				}

				this.sendEvent(UIEvent.IMAGE_LOADED);

			}
			else {
				this._bitmap.dispose();
			}
		}

		/**九宫格信息，格式：左边距,上边距,右边距,下边距,是否重复填充(值为0或1)，例如：4,4,4,4,1*/
		public get sizeGrid(): string {
			if (this._bitmap.sizeGrid) {
				return this._bitmap.sizeGrid.join(",");
			}
			return null;
		}

		public set sizeGrid(value: string) {
			if (value) {
				this._bitmap.sizeGrid = value.split(",");
			}
		}

		/**是否对位图进行平滑处理*/
		public get smoothing(): boolean {
			return this._bitmap.smoothing;
		}

		public set smoothing(value: boolean) {
			this._bitmap.smoothing = value;
		}

		/**X锚点，值为0-1*/
		public get anchorX(): number {
			return this._bitmap.anchorX;
		}

		public set anchorX(value: number) {
			this._bitmap.anchorX = value;
		}

		/**Y锚点，值为0-1*/
		public get anchorY(): number {
			return this._bitmap.anchorY;
		}

		public set anchorY(value: number) {
			this._bitmap.anchorY = value;
		}

		public set dataSource(value: any) {
			this._dataSource = value;
			if (value instanceof String) {
				this.url = String(value);
			}
			else {
				egret.superSetter(Image, this, "dataSource", value);
			}
		}

		/**销毁资源，从位图缓存中销毁掉
		 * @param	clearFromLoader 是否同时删除加载缓存*/
		public dispose(clearFromLoader: boolean = false): void {
			if (this._bitmap) {
				if (this._bitmap.parent) this._bitmap.parent.removeChild(this._bitmap);
				this._bitmap.dispose();
				this._bitmap = null;
			}
		}

		public destroy(): void {
			this.dispose();

			if (this._url)
				this._url = null;
			this._loadComplete = null;

			super.destroy();
		}
	}
}