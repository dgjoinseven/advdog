namespace morn
{
	/**
	 * 位图字体的按钮
	 */
	export class FontButton extends Button
	{
		protected _fontbitmap: AutoBitmap;
		protected _fontPointArr: string[] = null;
		protected _fontSkin: string[];
		protected _fontSkinStr: string;
		protected _nowfontSkin: string;

		protected _clipX: number = 10;
		protected _clipY: number = 1;
		protected _selectIndex: number = 0;
		protected _isCenter: boolean = true;
		public constructor()
		{
			super();
		}

		public get isCenter(): boolean
		{
			return this._isCenter;
		}

		/**
		 * 是否居中
		 */
		public set isCenter(value: boolean)
		{
			if (this._isCenter != value)
			{
				this._isCenter = value;
				// this.callLater(this.changeFontClip, this);
				this.callLater(this.changeFont, this);
			}
		}

		/**
		 * 设置位图字体
		 */
		public set fontSkin(value: string)
		{
			if (this._fontSkinStr != value)
			{
				this._fontSkinStr = value;
				this._fontSkin = this._fontSkinStr.split(",")
				if (this._fontbitmap == null) 
				{
					this.addChild(this._fontbitmap = new AutoBitmap);
				}
				this.callLater(this.changeFont, this);
			}
		}

		private changeFont(): void
		{
			if (!this._fontbitmap || !this._fontSkin) return;
			// this._fontbitmap.clipsForKey(App.asset.getClips(_fontSkin, 1, 1), _fontSkin);
			// var newTexture: egret.Texture = TextureUtils.cut(texture, textureName, this.index, this._stateNum);
			// this.callLater(this.updateFont, this);
			this.updateFont();
		}

		protected updateFont(): void
		{
			if (!this._fontSkin)
			{
				return;
			}

			this._nowfontSkin = this._fontSkin[this.state];
			if (!this._fontSkin[this.state])
			{
				this._nowfontSkin = this._fontSkin[this._fontSkin.length - 1];
			}

			asf.ResMgr.ins().getRes(this._nowfontSkin, this.onFontSkinLoaded, this);
		}

		private onFontSkinLoaded(texture: egret.Texture): void
		{
			if (this._fontbitmap)
			{
				if (texture)
				{
					// var textureName: string = this._fontSkin;
					// var newTexture: egret.Texture = TextureUtils.cut(texture, textureName, 1, 1);

					this._fontbitmap.x = texture.$offsetX;
					this._fontbitmap.y = texture.$offsetY;

					this._fontbitmap.textureForKey(texture, this._nowfontSkin);
				}
				else
				{
					this._fontbitmap.dispose();
				}
			}

			this.changeFontClip();
		}

		private changeFontClip(): void
		{
			if (!this._fontbitmap)
			{
				return;
			}
			// this._fontbitmap.index = Number(this._selectIndex);

			// asf.ResMgr.ins().getRes(this._skin, this.onSkinLoaded, this);
			// var newTexture: egret.Texture = TextureUtils.cut(texture, this._fontSkin, this._selectIndex, this._stateNum);

			if (this._isCenter)
			{
				this._fontbitmap.x = (this.width - this._fontbitmap.width) * 0.5;
				this._fontbitmap.y = (this.height - this._fontbitmap.height) * 0.5;
			}
			else
			{
				this._fontbitmap.x = 0;
				this._fontbitmap.y = 0;
			}

			if (this._fontPointArr)
			{
				this._fontbitmap.x += Number(this._fontPointArr[0]);
				this._fontbitmap.y += Number(this._fontPointArr[1]);
			}
		}

		protected changeLabelSize(): void
		{
			this.updateFont();
		}

		public set fontPoint(value: string)
		{
			this._fontPointArr = value.split(",");;
			this.callLater(this.changeFont, this);
			// this.callLater(this.changeFontClip, this);
			// this.callLater(this.updateFont, this);
		}

		public destroy(): void
		{
			this.removeLater(this.changeFont, this);
			// this.removeLater(this.updateFont, this);
			if (this._fontbitmap)
			{
				if (this._fontbitmap.parent) this.removeChild(this._fontbitmap);
				this._fontbitmap.dispose();
				this._fontbitmap = null;
			}
			if (this._fontPointArr)
			{
				this._fontPointArr = null;
			}
			if (this._fontSkin != null)
			{
				this._fontSkin = null;
			}
			super.destroy();
		}
	}
}