namespace game
{
	/**
	 * 环形菜单
	 */
	export class AnnularMenu extends morn.Box
	{
		/**
		 * 半径
		 */
		r: number = 0;
		/**
		 * 多少个
		 */
		num: number = 0;
		nowAngle: number = 0;
		turnDir: string = "";
		imgSp: egret.Sprite;

		protected _itemArr: AnnularItem[] = [];
		protected _infoArr: any[] = [];
		protected _sourceInfoArr: any[] = [];
		protected _itemRender: any;

		protected _selectHandler: asf.CallBack;
		protected _selectedIndex: number = -1;
		public constructor(r: number, num: number)
		{
			super();

			this.r = r;
			this.num = num;

			this.imgSp = new egret.Sprite();
			this.addChild(this.imgSp);
		}

		init(): void
		{
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
		}

		setItemRender(value: any): void
		{
			this._itemRender = value;
			this.clearAll();
			this.updateList();
		}

		/**
		 * dir false是逆时针赋值,true 顺时针赋值
		 */
		setDataSource(value: any[]): void
		{
			this._sourceInfoArr = value.concat();
			this._sourceInfoArr = this._sourceInfoArr.slice(0, this.num);
			this.updateList();
		}

		/**
		 * 更新列表 
		 * 
		 */
		protected updateList(): void
		{
			if (!this._itemRender)
				return;

			for (var i: number = 0; i < this._sourceInfoArr.length; i++)
			{
				if (this._infoArr[i] != null && this._infoArr[i] != undefined)
				{
					//有数据就更新
					this._infoArr[i] = this._sourceInfoArr[i];
				}
				else
				{
					//无数据就添加
					this._infoArr.push(this._sourceInfoArr[i]);
				}

				if (!this._itemArr[i])
				{
					this._itemArr[i] = this.createOne();
					this._itemArr[i].id = i;
				}
				this._itemArr[i].dataSource = this._infoArr[i];
			}

			var n: number = this._infoArr.length - this._sourceInfoArr.length;
			if (n > 0)
			{
				//源数据多余新数据，就要删除多出的那部分
				this._infoArr.splice(this._sourceInfoArr.length);
				var delArr: AnnularItem[] = this._itemArr.splice(this._sourceInfoArr.length);
				var item: AnnularItem;
				for (item of delArr)
				{
					item.remove();
					item.destroy();
				}
			}
		}

		protected createOne(): AnnularItem
		{
			var item: AnnularItem = new this._itemRender();

			item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchItem, this);

			var angle: number = 360 / this.num;
			var index: number = this._itemArr.length;
			// for (var i: number = 0; i < this.num; i++)
			{
				var radian: number = asf.MathUtils.aToR(angle * index);
				// var img: morn.Image = new morn.Image();
				// img.skin = "mainMenu_json.main_skillbg";
				// img.anchorX = img.anchorY = 0.5;
				item.x = Math.cos(radian) * this.r - item.width * 0.5;
				item.y = Math.sin(radian) * this.r - item.height * 0.5;
				// img.touchEnabled = img.touchChildren = true
				this.imgSp.addChild(item);
			}

			return item;
		}

		protected onTouchItem(e: egret.TouchEvent): void
		{
			var cell: AnnularItem = e.currentTarget as AnnularItem;
			this.selectedIndex(cell.id);
		}

		/**
		 * 设置选中回调
		 */
		public setSelectHandler(value: asf.CallBack): void
		{
			this._selectHandler = value;
		}

		setMaskRect(x: number, y: number, w: number, h: number): void
		{
			var shape: egret.Shape = new egret.Shape();
			shape.graphics.lineStyle(0, 0);
			shape.graphics.beginFill(0)
			shape.graphics.drawRect(0, 0, w, h);
			shape.graphics.endFill();
			shape.x = x
			shape.y = y;
			this.addChild(shape);
			this.mask = shape;
		}

		protected touchBeginX: number;
		protected touchBeginY: number;
		protected onTouchBegin(e: egret.TouchEvent): void
		{
			this.turnDir = "";
			this.touchBeginX = e.stageX;
			this.touchBeginY = e.stageY;
			this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
			this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
		}

		protected onTouchEnd(e: egret.TouchEvent): void
		{
			this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
			this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);

			//移动
			var angle: number = 360 / this.num;
			angle = Math.floor(this.imgSp.rotation / angle) * angle;
			this.tweenAngle(angle);
			// if ((Math.abs(this.touchBeginX - e.stageX) < 10) && (Math.abs(this.touchBeginY - e.stageY) < 10))
			// {
			// 	//点击
			// }
			// else
			// {

			// }
		}

		/**
		 * 选中某个
		 */
		public selectedIndex(value: number): void
		{
			this._selectedIndex = value;
			if (this._selectHandler)
			{
				this._selectHandler.execute(this._selectedIndex);
			}
		}

		public getSelectedIndex(): number
		{
			return this._selectedIndex
		}

		public getSelectInfoByIndex(index: number): any
		{
			return this._infoArr[index]
		}

		protected onTouchMove(e: egret.TouchEvent): void
		{
			var tempX: number = this.touchBeginX - e.stageX;
			var tempY: number = e.stageY - this.touchBeginY;

			// console.info("e.stageY:" + e.stageY);
			// console.info("touchBeginY:" + this.touchBeginY);

			// console.info("旧的:" + this.imgSp.rotation);

			if (Math.abs(tempX) > 5)
			{
				//根据X坐标
				this.turnDir = "x";
			}
			else if (Math.abs(tempY) > 5)
			{
				//根据Y坐标
				this.turnDir = "y";
			}

			if (this.turnDir == "x")
			{
				if (tempX > 0)
				{
					this.move(false);
				}
				else if (tempX < 0)
				{
					this.move(true);
				}
			}
			else if (this.turnDir == "y")
			{
				if (tempY > 0)
				{
					this.move(false);
				}
				else if (tempY < 0)
				{
					this.move(true);
				}
			}

			if (this.turnDir != "")
			{
				this.touchBeginX = e.stageX;
				this.touchBeginY = e.stageY;
			}
		}

		/**
		 * true右，false左
		 */
		protected move(dir: boolean): void
		{
			this.nowAngle = this.imgSp.rotation;

			if (dir)
			{
				this.nowAngle += 3;
				// console.info("nowAngle + 3:" + this.nowAngle);
			}
			else
			{
				this.nowAngle -= 3;
				// console.info("nowAngle - 3:" + this.nowAngle);
			}

			// if (this.nowAngle > 360)
			// {
			// 	this.nowAngle = this.nowAngle - 360;
			// }
			// else if (this.nowAngle < 0)
			// {
			// 	this.nowAngle = 360 - Math.abs(this.nowAngle);
			// }
			// this.imgSp.rotation = this.nowAngle
			this.imgSp.rotation = this.nowAngle;
		}

		tweenAngle(angle: number): void
		{
			this.imgSp.rotation = angle;
		}

		protected clearAll(): void
		{
			var item: AnnularItem;
			for (item of this._itemArr)
			{
				item.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchItem, this);
				item.remove();
				item.destroy();
			}
			this._itemArr = [];
			this._infoArr = [];
		}

		public destroy(): void
		{
			this.clearAll();
			this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
			super.destroy();
		}
	}
}