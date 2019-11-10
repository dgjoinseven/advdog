namespace morn
{
	export class ProgressBarCtr
	{
		protected _bar: Image;
		protected _label: Label;
		protected _width: number;
		protected _maxValue: number = 0;
		protected _curValue: number = 0;
		protected _skin: Box;
		isShowMax: boolean = false;
		public updateHandler: asf.CallBack;
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
		protected _mode: number;
		protected _mask: Image;

		/**
		 * 进度条控制类 
		 * @param box 皮肤
		 * @param width 宽度
		 * @param label 外部的label
		 * @param bar 外部的bar
		 * @param isShowMax 是否显示最大值
		 * @param isShowEff 是否特效进度条
		 * @param mode 0是遮罩,1是宽度
		 * 
		 */
		public constructor(proBg: Box, width: number = 245, label: Label = null, bar: Image = null, isShowMax: boolean = false, isShowEff: boolean = false, mode: number = 1)
		{
			this._skin = proBg;
			this._width = width;
			this._label = label;
			this._bar = bar;
			this._mode = mode;
			this.isShowMax = isShowMax;

			this.init();
		}

		protected init(): void
		{
			if (this._mode == 0)
			{
				var index: number;
				if (!this._bar && this._skin["proBg"])
				{
					this._mask = new Image((this._skin["proBg"] as Image).url);
					this._mask.sizeGrid = (this._skin["proBg"] as Image).sizeGrid;
					this._mask.width = this._width;
					this._mask.height = this._skin["proBg"].height;
					index = this._skin.getChildIndex((this._skin["proBg"] as Image))
					this._skin.addChildAt(this._mask, index);
					this._mask.mask = this._skin["proBg"];
					this._mask.y = this._skin["proBg"].y;
					this._mask.x = -this._width;
				}
				else if (this._bar)
				{
					this._mask = new Image(this._bar.url);
					this._mask.sizeGrid = this._bar.sizeGrid;
					this._mask.width = this._width;
					index = this._skin.getChildIndex(this._bar)
					this._skin.addChildAt(this._mask, index);
					this._mask.mask = this._bar;
					this._mask.y = this._bar.y;
					this._mask.x = -this._width;
				}
			}

			this.update();
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
				if (this.canOverflow)
				{

				}
				else
				{
					this._curValue = this._maxValue;
				}
			}
			this.update();
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
				if (this.canOverflow)
				{

				}
				else
				{
					this._curValue = this._maxValue;
				}
			}
			this.update();
		}

		protected update(): void
		{
			if (this._skin)
			{
				if (!this._label && this._skin.hasOwnProperty("txt"))
				{
					if (this.isShowMax)
					{
						(this._skin["txt"] as Label).text = this._curValue + "/" + this._maxValue;
					}
					else
					{
						(this._skin["txt"] as Label).text = this._curValue + "";
					}
				}
				else if (this._label)
				{
					if (this.isShowMax)
					{
						this._label.text = this._curValue + "/" + this._maxValue;
					}
					else
					{
						this._label.text = this._curValue + "";
					}

				}

				if (!this._bar && this._skin.hasOwnProperty("proBg"))
				{
					if (this._maxValue == 0)
					{
						if (this._mode == 0)
						{
							this._mask.x = -this._width
						}
						else
						{
							(this._skin["proBg"] as Image).width = 0;
						}
					}
					else
					{
						if (this._curValue >= this._maxValue)
						{
							if (this.overflowBarNotFull)
							{
								if (this._mode == 0)
								{
									this._mask.x = -this._width + (this._skin["proBg"] as Image).x
								}
								else
								{
									(this._skin["proBg"] as Image).width = 0;
								}
							}
							else
							{
								if (this._mode == 0)
								{
									this._mask.x = (this._skin["proBg"] as Image).x;
								}
								else
								{
									(this._skin["proBg"] as Image).width = this._width;
								}
							}
						}
						else
						{
							if (this._mode == 0)
							{
								this._mask.x = -this._width + (this._curValue / this._maxValue) * this._width + (this._skin["proBg"] as Image).x;
							}
							else
							{
								(this._skin["proBg"] as Image).width = (this._curValue / this._maxValue) * this._width//Math.max(, this._width);
							}
						}
					}
				}
				else if (this._bar)
				{
					if (this._maxValue == 0)
					{
						if (this._mode == 0)
						{
							this._mask.x = -this._width
						}
						else
						{
							this._bar.width = 0;
						}
					}
					else
					{
						if (this._curValue >= this._maxValue)
						{
							if (this.overflowBarNotFull)
							{
								if (this._mode == 0)
								{
									this._mask.x = -this._width + this._bar.x
								}
								else
								{
									this._bar.width = 0;
								}
							}
							else
							{
								if (this._mode == 0)
								{
									this._mask.x = this._bar.x;
								}
								else
								{
									this._bar.width = this._width;
								}
							}
						}
						else
						{
							if (this._mode == 0)
							{
								this._mask.x = -this._width + (this._curValue / this._maxValue) * this._width + this._bar.x;
							}
							else
							{
								this._bar.width = (this._curValue / this._maxValue) * this._width//Math.max(, this._width);
							}
						}
					}
				}

				if (this.updateHandler) this.updateHandler.execute();
			}
		}

		public destroy(): void
		{
			if (this._mask)
			{
				this._mask.remove();
				this._mask = null;
			}

			if (this.updateHandler)
			{
				this.updateHandler.destroy();
				this.updateHandler = null;
			}
		}
	}
}