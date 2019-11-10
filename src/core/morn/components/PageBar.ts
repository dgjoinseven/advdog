namespace morn {
	export class PageBar extends Component {
		protected _skin: string;
		protected prevBtn: Button;
		protected nextBtn: Button;
		protected _interval: number;

		protected text: Label;
		protected _size: number;
		protected _curPage: number;
		protected _totalPage: number;

		private changePageCallBack: asf.CallBack;
		private changePageCallBackArg: any[];

		/**
		* 翻页组件
		* @skin 皮肤
		* @interval 两个按钮之间的间隔
		*/
		public constructor() {
			super();
		}
		protected preinitialize(): void {
			super.preinitialize();

			this._size = 12;
			this._interval = 0;
		}
		/**在此创建组件子对象*/
		protected createChildren(): void {
			super.createChildren();

			this.prevBtn = new Button();
			this.addChild(this.prevBtn);
			this.nextBtn = new Button();
			this.addChild(this.nextBtn);

			this.text = new Label();
			this.text.align = "center";
			this.text.width = 50;
			this.text.height = 15;
			this.addChild(this.text);

			this.prevBtn.touchEnabled = true;
			this.nextBtn.touchEnabled = true;
			this.prevBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
			this.nextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		}

		/**初始化，在此子对象已被创建，可以对子对象进行修改*/
		protected initialize(): void {
			super.initialize();

			this.touchChildren = true;

			this._totalPage = 1;
			this._curPage = 1;

			this.callLater(this.changePage, this);
		}

		public destroy(): void {
			this.prevBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
			this.nextBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);

			this.prevBtn.remove();
			this.prevBtn.destroy();
			this.prevBtn = null;

			this.nextBtn.remove();
			this.nextBtn.destroy();
			this.nextBtn = null;

			this.text.remove();
			this.text.destroy();
			this.text = null;

			this.changePageCallBack = null;
			this._skin = null;
			this.changePageCallBackArg = null;

			this.removeLater(this.changePage, this);

			super.destroy();
		}


		public setChangePageCallBack(func: asf.CallBack, args: any[] = null): void {
			this.changePageCallBack = func;
			this.changePageCallBackArg = args;
		}
		public get interval(): number {
			return this._interval;
		}

		public set interval(value: number) {
			if (this._interval != value) {
				this._interval = value;
				this.callLater(this.changePosition, this);
			}
		}



		protected changePosition(): void {
			this.nextBtn.x = this.prevBtn.x + this.prevBtn.width + this.interval;

			this.text.width = this.interval;
			this.text.height = this.prevBtn.height;

			this.text.x = this.prevBtn.x + this.prevBtn.width;
		}
		protected changeSkin(): void {
			if (this.skin) {
				this.prevBtn.skin = this.skin + "$prevBtn";
				this.nextBtn.skin = this.skin + "$nextBtn";

				this.callLater(this.changePosition, this);
			}
		}

		public get curPage(): number {
			return this._curPage;
		}

		public set curPage(value: number) {
			if (value > 0 && value <= this.totalPage) {
				this._curPage = value;
				this.callLater(this.changePage, this);

				if (this.changePageCallBack) {
					this.changePageCallBack.execute(this.changePageCallBackArg);
				}
			}
		}

		public get totalPage(): number {
			return this._totalPage;
		}

		public set totalPage(value: number) {
			if (value > 0) {
				this._totalPage = value;

				if (this._totalPage < this._curPage) {
					this._curPage = this._totalPage;
				}

				this.callLater(this.changePage, this);

				if (this.changePageCallBack) {
					this.changePageCallBack.execute(this.changePageCallBackArg);
				}
			}
		}

		protected changePage(): void {
			this.text.text = this.curPage + "/" + this.totalPage;

			if (this.curPage == 1) {
				this.prevBtn.disabled = true;
			}
			else {
				this.prevBtn.disabled = false;
			}

			if (this.curPage == this.totalPage) {
				this.nextBtn.disabled = true;
			}
			else {
				this.nextBtn.disabled = false;
			}
		}

		public get size(): number {
			return this._size;
		}

		public set size(value: number) {
			if (this._size != value) {
				this._size = value;

				this.text.size = this._size;

				this.callLater(this.changePosition, this);
			}
		}

		public get skin(): string {
			return this._skin;
		}

		public set skin(value: string) {
			if (value && this._skin != value) {
				this._skin = value;
				this.callLater(this.changeSkin, this);
			}
		}

		private onClick(e: egret.TouchEvent): void {
			switch (e.currentTarget) {
				case this.prevBtn:
					this.curPage--;
					break;
				case this.nextBtn:
					this.curPage++;
					break;
			}
		}

	}
}