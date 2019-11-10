/**
 * 翻页控制器
 * wangning
 */
class PageBarControl
{

	private prevBtn: morn.Button;
	private nextBtn: morn.Button;
	private text: morn.Label;
	private _curPage: number;
	private _totalPage: number;

	public changePageCallBack: asf.CallBack;

	public constructor(prevBtn: morn.Button, nextBtn: morn.Button, text: morn.Label = null)
	{
		this.prevBtn = prevBtn;
		this.nextBtn = nextBtn;
		this.text = text;

		this.init();
	}
	private init(): void
	{
		this._totalPage = 1;
		this._curPage = 1;
		asf.App.render.callLater(this.changePage, this);

		this.prevBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		this.nextBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
	}
	public destroy(): void
	{
		this.prevBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		this.nextBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);

		this.prevBtn = null;

		this.nextBtn = null;

		this.text = null;

		this.changePageCallBack = null;

		asf.App.render.removeLater(this.changePage, this);
	}
	public get curPage(): number
	{
		return this._curPage;
	}

	public set curPage(value: number)
	{
		if (value > 0 && value <= this.totalPage)
		{
			this._curPage = value;
			asf.App.render.callLater(this.changePage, this);

			if (this.changePageCallBack)
			{
				this.changePageCallBack.execute();
			}
		}
	}

	public get totalPage(): number
	{
		return this._totalPage;
	}

	public set totalPage(value: number)
	{
		if (value > 0)
		{
			this._totalPage = value;

			if (this._totalPage < this._curPage)
			{
				this._curPage = this._totalPage;
			}

			asf.App.render.callLater(this.changePage, this);

			if (this.changePageCallBack)
			{
				this.changePageCallBack.execute();
			}
		}
	}

	protected changePage(): void
	{
		if (this.text)
		{
			this.text.text = this.curPage + "/" + this.totalPage;
		}

		// if (this.curPage == 1)
		// {
		// 	this.prevBtn.disabled = true;
		// }
		// else
		// {
		// 	this.prevBtn.disabled = false;
		// }
		morn.ObjectUtils.gray(this.prevBtn, this.curPage == 1);

		// if (this.curPage == this.totalPage)
		// {
		// 	this.nextBtn.disabled = true;
		// }
		// else
		// {
		// 	this.nextBtn.disabled = false;
		// }
		morn.ObjectUtils.gray(this.nextBtn, this.curPage == this.totalPage);
	}

	private onClick(e: egret.TouchEvent): void
	{
		switch (e.currentTarget)
		{
			case this.prevBtn:
				if (this.curPage > 1)
				{
					this.curPage--;
				}
				break;
			case this.nextBtn:
				if (this.curPage < this.totalPage)
				{
					this.curPage++;
				}
				break;
		}
	}
}