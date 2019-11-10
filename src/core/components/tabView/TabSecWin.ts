/**
 * @TabWin.ts
 *
 * @author liwenlong
 * @version 1.0
 * <br>Copyright (C), 2012 ASFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:Collections
 * <br>Date:2017/4/7
 */
namespace game
{
    /**
     * 只支持2级面板的TABWIN
     * @author liwenlong
     * Date:2017/4/7
     */
	export class TabSecWin<C extends morn.View> extends TabWin<C>
	{
		protected _page: number = 0;
		protected _nowTab: ITabWin<morn.View>;
		protected _tabList: ITabWin<morn.View>[] = [];
		protected _tabClass: any[] = [];
		public constructor()
		{
			super();
			this.setTabClass();
		}

		/**在此设置每个页面的类引用 */
		protected setTabClass(): void
		{
			// this._tabClass[0] = XXXX;
			// this._tabClass[1] = XXXX;
			// this._tabClass[2] = XXXX;
		}

		/**
         * 设置第几个页面
         * @param value
         *
         */
		public set page(value: number)
		{
			this._page = value;
			this.openTabPage();
		}

		public get page(): number
		{
			return this._page;
		}

		protected openTabPage(): void
		{
			this.removeAllTabs();
			if (!this._tabClass)
			{
				return;
			}
			if (!this._tabClass[this._page])
			{
				return;
			}

			if (!this._tabList[this._page])
			{
				this._tabList[this._page] = new this._tabClass[this._page];
				this._nowTab = this._tabList[this._page];
				this.preinit(this._page);
				this._tabList[this._page].init();
			}

			this._nowTab = this._tabList[this._page];
			var t: any = this._nowTab;
			this.mainViewTabMc.addChild(t as egret.DisplayObject);
			this._nowTab.onTabOpen();
			//this.onTabOpen();
		}

		/**获取要添加tab页面的容器,在子类重写 */
		protected get mainViewTabMc(): egret.DisplayObjectContainer
		{
			return null;
		}

		tabClose(): void
		{
			super.tabClose();
			if (this._nowTab) this._nowTab.onTabClose()
		}

        /**
         * 清楚所有tab页面
         *
         */
		removeAllTabs(): void
		{
			if (this._tabList)
			{
				var tab: ITabWin<morn.View>;
				for (tab of this._tabList)
				{
					if (tab && tab instanceof egret.DisplayObject)
					{
						if (tab.parent)
						{
							tab.onTabClose();
							tab.parent.removeChild(tab);
						}
					}
				}
			}
		}
		protected clearTabList(): void
		{
			this.removeAllTabs();

			if (this._tabList)
			{
				var tab: ITabWin<morn.View>;
				for (tab of this._tabList)
				{
					if (tab)
					{
						tab.destroy();
					}
				}
			}

			this._nowTab = null;
			this._tabList = [];
			this._tabClass = [];
		}

		// public onDestroy(o: any = null): void
		public destroy(): void
		{
			this.removeAllTabs();
			if (this._tabList)
			{
				var tab: ITabWin<morn.View>;
				for (tab of this._tabList)
				{
					if (tab)
					{
						tab.destroy();
					}
				}
			}

			this._nowTab = null;
			this._tabList = null;
			this._tabClass = null;

			super.destroy();
		}

		public get nowTab(): ITabWin<morn.View>
		{
			var t: any = this._nowTab;
			return t;
		}

	}
}