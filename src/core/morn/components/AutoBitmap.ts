namespace morn
{
	export class AutoBitmap extends egret.Bitmap implements asf.IDestory
	{
		private _width: number;
		private _height: number;
		private _sizeGridStr: string[];
		private _sizeGrid: egret.Rectangle;
		private _anchorX: number;
		private _anchorY: number;
		private _source: egret.Texture;
		private _key: string;
		public constructor()
		{
			super();
		}

		initSize(): void
		{
			this._width = NaN;
			this._height = NaN;
		}

		/**宽度(显示时四舍五入)*/
		public get width(): number
		{
			if (isNaN(this._width))
			{
				var superBitmap: egret.Texture = this.texture
				//egret.superGetter(AutoBitmap, this, "bitmapData");
				if (superBitmap)
				{
					return superBitmap.textureWidth;
				}
				else
				{
					return egret.superGetter(AutoBitmap, this, "width");
				}
			}
			return this._width;
		}

		public set width(value: number)
		{
			if (this._width != value)
			{
				this._width = value;
				asf.App.render.callLater(this.changeSize, this);
			}
		}

		/**高度(显示时四舍五入)*/
		public get height(): number
		{
			if (isNaN(this._height))
			{
				var superBitmap: egret.Texture = this.texture
				if (superBitmap)
				{
					return superBitmap.textureHeight
				}
				else
				{
					return egret.superGetter(AutoBitmap, this, "height");
				}
			}
			return this._height;
		}

		public set height(value: number)
		{
			if (this._height != value)
			{
				this._height = value;
				asf.App.render.callLater(this.changeSize, this);
			}
		}

		/**九宫格信息，格式：左边距,上边距,右边距,下边距,是否重复填充(值为0或1)，例如：4,4,4,4,1*/
		public get sizeGrid(): string[]
		{
			return this._sizeGridStr;
		}

		public set sizeGrid(value: string[])
		{
			this._sizeGridStr = value;
			asf.App.render.callLater(this.changeSize, this);
		}

		public textureForKey(value: egret.Texture, key: string): void
		{
			this._source = value;
			if (this._key != key)
			{
				if (this._key)
				{
					//删掉旧的引用
					asf.ResMgr.ins().removeCount(this._key);
				}
				this._key = key;
				asf.ResMgr.ins().addCount(this._key);//增加引用次数
			}
			asf.App.render.callLater(this.changeSize, this);
			asf.App.render.exeCallLater(this.changeSize, this);
		}

		private changeSize(): void
		{
			if (this._source)
			{
				this.texture = this._source;

				if (this._sizeGridStr && this._sizeGridStr.length > 0)
				{
					if (!this._sizeGrid) this._sizeGrid = new egret.Rectangle();
					this._sizeGrid.x = Number(this._sizeGridStr[0]);
					this._sizeGrid.y = Number(this._sizeGridStr[1]);
					this._sizeGrid.width = this._source.textureWidth - Number(this._sizeGridStr[0]) - Number(this._sizeGridStr[2]);
					this._sizeGrid.height = this._source.textureHeight - Number(this._sizeGridStr[1]) - Number(this._sizeGridStr[3])
					// this._sizeGrid = new egret.Rectangle(, , , );
					this.scale9Grid = this._sizeGrid;
				}

				// this.pixelHitTest = true;
				// this.scale9Grid = this._sizeGrid;
				var w: number = Math.round(this.width);
				var h: number = Math.round(this.height);
				egret.superSetter(AutoBitmap, this, "width", w);
				egret.superSetter(AutoBitmap, this, "height", h);
			}

			if (this._anchorX)
			{
				// super.x = -Math.round(_anchorX * width);
				this.anchorOffsetX = this._anchorX * this.width;
			}
			if (this._anchorY)
			{
				// super.y = -Math.round(_anchorY * height);
				this.anchorOffsetY = this._anchorY * this.height;
			}
		}

		/**X锚点，值为0-1*/
		public get anchorX(): number
		{
			return this._anchorX;
		}

		public set anchorX(value: number)
		{
			this._anchorX = value;
			asf.App.render.callLater(this.changeSize, this);
		}

		/**Y锚点，值为0-1*/
		public get anchorY(): number
		{
			return this._anchorY;
		}

		public set anchorY(value: number)
		{
			this._anchorY = value;
			asf.App.render.callLater(this.changeSize, this);
		}

		public destroy(o: any = null): void
		{
			asf.App.render.removeLater(this.changeSize, this);
			this.dispose();
		}

		public dispose(): void 
		{
			// if (this._source)
			// {
			// 	this._source.dispose();
			// }
			if (this._key)
			{
				var isDispose: boolean = asf.ResMgr.ins().removeCount(this._key);//增加引用次数
				// if (isDispose)
				// {
				// 	if (this._source) 
				// 	{
				// 		asf.ResMgr.ins().dispose(this._source, this._key);
				// 		// this._source.dispose();
				// 	}
				// }
			}
			this._key = null;

			this._source = null;
			this.texture = null;
			asf.App.render.removeLater(this.changeSize, this);
		}
	}
}