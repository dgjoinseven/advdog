namespace morn
{
	export class ProgressNormalBarCtr
	{
		protected _bar: Image;
		protected _label: Label;
		protected _bg: Image;
		protected _barWidth: number;
		protected _maxValue: number = 0;
		protected _curValue: number = 0;
		protected _skin: Box;

		/**
		 * 是否显示文本
		 * 
		 * @type {boolean}
		 * @memberOf ProgressNormalBarCtr
		 */
		public isShowLabel: boolean = true;
		/**
		 * 是否显示最大值的LABEL
		 * 
		 * @type {boolean}
		 * @memberOf ProgressNormalBarCtr
		 */
		public isShowMax: boolean = false;
		/**
		 * 是否能超过最大值显示
		 * 
		 * @type {boolean}
		 * @memberOf ProgressBarCtr
		 */
		public canOverflow: boolean = false;
		/**
		 * 超过最大值后显示空的状态
		 * 
		 * @type {boolean}
		 * @memberOf ProgressBarCtr
		 */
		public overflowBarNotFull: boolean = false;
		/**
		 * 更新的回调函数
		 */
		public updateHandler: asf.CallBack;


		public constructor(skin: Box, isShowMax: boolean = true)
		{
			this._skin = skin;
			this._bar = this._skin["proBg"];
			if (!this._bar)
			{
				throw "必须存在proBg";
			}
			this._label = this._skin["txt"];
			this._bg = this._skin["bg"];
			if (this._bg)
			{
				var w: number = (this._bg.width - this._bar.width)
				this._bg.width = this._skin.width;
				this._bar.width = this._bg.width - w;
			}
			else
			{
				// this._bar.width = this._skin.width;
			}
			this._barWidth = this._bar.width;
			if (this._label)
			{
				this._label.x = this._bar.x;
				this._label.width = this._bar.width;
			}
			this.isShowMax = isShowMax;
			this.init();
		}

		protected init(): void
		{
			asf.App.render.callLater(this.update, this)
		}

		public get maxValue(): number
		{
			return this._maxValue;
		}

		public set maxValue(value: number)
		{
			this._maxValue = value;
			if (this._curValue > this._maxValue)
			{
				if (!this.canOverflow)
				{
					this._curValue = this._maxValue;
				}
			}
			asf.App.render.callLater(this.update, this)
		}

		public get curValue(): number
		{
			return this._curValue;
		}

		public set curValue(value: number)
		{
			this._curValue = value;
			if (this._curValue > this._maxValue)
			{
				if (!this.canOverflow)
				{
					this._curValue = this._maxValue;
				}
			}
			asf.App.render.callLater(this.update, this)
		}

		protected update(): void
		{
			if (this._skin)
			{
				if (!this._label || !this.isShowLabel)
				{
					this._label.visible = false;
				}
				else
				{
					this._label.visible = true;
					if (this.isShowMax)
					{
						this._label.text = this._curValue + "/" + this._maxValue;
					}
					else
					{
						this._label.text = this._curValue + "";
					}
				}

				if (this._maxValue == 0)
				{
					this._bar.width = 0;
				}
				else
				{
					if (this._curValue >= this._maxValue)
					{
						if (this.overflowBarNotFull)
						{
							this._bar.width = 0;
						}
						else
						{
							this._bar.width = this._barWidth;
						}
					}
					else
					{
						this._bar.width = (this._curValue / this._maxValue) * this._barWidth;
					}
				}

				if (this.updateHandler) this.updateHandler.execute();
			}
		}

		public destroy(): void
		{
			if (this.updateHandler)
			{
				this.updateHandler.destroy();
				this.updateHandler = null;
			}

			asf.App.render.removeLater(this.update, this);

			this._bar = null;
			this._label = null;
			this._bg = null;
			this._skin = null;
		}
	}
}