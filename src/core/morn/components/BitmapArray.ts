/**图片阵列
 * 支持横/竖复制图片
 */
class BitmapArray extends morn.Box
{
	private _skin: string;

	private clipContainerVec: egret.Sprite[];
	private bitmapArr: morn.AutoBitmap[];
	private texture: egret.Texture;

	private _length: number = 0;
	private _direction: number = 1;
	private _interval: number = 0;
	private _align: string = "left";
	private realWidth: number = 0;
	private realHeight: number = 0;

	public constructor()
	{
		super();

		this.bitmapArr = [];
		this.clipContainerVec = [];
	}
	public destroy(): void
	{
		if (this.bitmapArr)
		{
			while (this.bitmapArr.length > 0)
			{
				this.bitmapArr.pop().destroy();
			}
			this.bitmapArr = null;
		}

		if (this.clipContainerVec)
		{
			while (this.clipContainerVec.length > 0)
			{
				var spr: egret.DisplayObject = this.clipContainerVec.pop();
				if (spr.parent)
				{
					spr.parent.removeChild(spr);
				}
			}
			this.clipContainerVec = null;
		}

		this.texture = null;
	}
	/**设置方向
	 * value:1横 2竖
	 */
	public set direction(value: number)
	{
		if (this._direction != value)
		{
			this._direction = value;
			this.changeClip();
		}
	}
	public get direction(): number
	{
		return this._direction;
	}
	/**设置图片URL */
	public set skin(value: string)
	{
		if (value && this._skin != value)
		{
			this._skin = value;
			asf.ResMgr.ins().getRes(this._skin, this.setBitmapData, this);
		}
	}
	public get skin(): string
	{
		return this._skin;
	}
	public get length(): number
	{
		return this._length;
	}
	/**设置阵列数量 */
	public set length(value: number)
	{
		if (this._length != value)
		{
			this._length = value;
			this.changeClip();
		}
	}
	public get interval(): number
	{
		return this._interval;
	}
	/**设置每个图片之间的间隔 */
	public set interval(value: number)
	{
		if (this._interval != value)
		{
			this._interval = value;
			this.changeClip();
		}
	}
	public get align(): string
	{
		return this._align;
	}
	/**设置对齐方式
	 * value:left左(上);center中;right右(下)
	 */
	public set align(value: string)
	{
		if (this._align != value)
		{
			this._align = value;
			// this.callLater(this.changeClip, this);
			this.changeClip();
		}
	}
	private setBitmapData(texture: egret.Texture, url: string): void
	{
		if (this._skin == url)
		{
			this.texture = texture;

			this.changeClip();
		}
	}
	protected changeClip(): void
	{
		if (!this.texture)
		{
			return;
		}

		var vecLen: number = this.bitmapArr.length;
		var i: number = 0;
		for (; i < this.length; i += 1)
		{
			if (i < vecLen)
			{
				this.bitmapArr[i].textureForKey(this.texture, this._skin);//.texture = this.textureArr[Number(numStrArr[i])];
				this.bitmapArr[i].width = this.texture.textureWidth;
				this.bitmapArr[i].height = this.texture.textureHeight;
				var px: number = this.texture.textureWidth / 2;
				var py: number = this.texture.textureHeight / 2;
				this.bitmapArr[i].x = -px;
				this.bitmapArr[i].y = -py;
				this.bitmapArr[i].visible = true;
			}
			else
			{
				var clip: morn.AutoBitmap = new morn.AutoBitmap();
				this.bitmapArr.push(clip);
				clip.textureForKey(this.texture, this._skin);

				var spr: egret.Sprite = new egret.Sprite();
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
		for (i = this.length; i < this.bitmapArr.length; i += 1)
		{
			this.bitmapArr[i].visible = false;
			// this.bitmapArr[i].x = 0;
		}

		//排位置
		var clipWidth: number = this.texture.textureWidth;
		var clipHeight: number = this.texture.textureHeight;
		var totalWidth: number = (this.length - 1) * this.interval + this.length * clipWidth;
		var totalHeight: number = (this.length - 1) * this.interval + this.length * clipHeight;

		for (i = 0; i < this.length; i += 1)
		{
			if (this.direction == 1)
			{
				this.clipContainerVec[i].y = 0;

				if (this.align == "center")
				{
					this.clipContainerVec[i].x = i * (clipWidth + this.interval) - totalWidth / 2 + clipWidth / 2;
				}
				else if (this.align == "right")
				{
					this.clipContainerVec[i].x = i * (clipWidth + this.interval) - totalWidth + clipWidth;
				}
				else
				{
					this.clipContainerVec[i].x = i * (clipWidth + this.interval);
				}
			}
			else
			{
				this.clipContainerVec[i].x = 0;

				if (this.align == "center")
				{
					this.clipContainerVec[i].y = i * (clipHeight + this.interval) - totalHeight / 2 + clipHeight / 2;
				}
				else if (this.align == "right")
				{
					this.clipContainerVec[i].y = i * (clipHeight + this.interval) - totalHeight + clipHeight;
				}
				else
				{
					this.clipContainerVec[i].y = i * (clipHeight + this.interval);
				}
			}
		}

		this.realWidth = totalWidth;
		this.realHeight = totalHeight;
	}
	public get width(): number
	{
		if (this.texture)
		{
			var numStrLen: number = this.length;
			var clipWidth: number = this.texture.textureWidth;

			var totalLen: number;
			if (this.direction == 1)
			{
				totalLen = (numStrLen - 1) * this.interval + numStrLen * clipWidth;
			}
			else
			{
				totalLen = clipWidth;
			}

			this.realWidth = totalLen;
		}

		return this.realWidth;
	}
	public set width(v: number)
	{
		egret.superSetter(BitmapArray, this, "width", v);
	}
	public get height(): number
	{
		if (this.texture)
		{
			var numStrLen: number = this.length;
			var clipHeight: number = this.texture.textureHeight;

			var totalLen: number;
			if (this.direction == 1)
			{
				totalLen = clipHeight;
			}
			else
			{
				totalLen = (numStrLen - 1) * this.interval + numStrLen * clipHeight;
			}

			this.realHeight = totalLen;
		}

		return this.realHeight;
	}
	public set height(v: number)
	{
		egret.superSetter(BitmapArray, this, "height", v);
	}
}