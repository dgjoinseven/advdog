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
     * 可切换的页面 需要继承这个，单独页面不需要继承
     * @author liwenlong
     * Date:2017/4/7
     */
    export class TabWin<C extends morn.View> extends morn.Box implements ITabWin<C>
    {
        container: C;

        openSecParam: number;
        constructor()
        {
            super();
        }

        /*预初始化*/
        preinit(...args): void
        {
        }
        public initLayoutJson(completeCallback: asf.CallBack): void
		{
			if (completeCallback)
			{
				completeCallback.execute();//默认直接执行回调,子类如果要加载布局文件,就重写成加载并处理完再回调
			}
		}
        /**
         * 初始化
         *
         */
        public init(): void
        {

        }



        /**
         * 初始化容器对象，这里主要是由子类进行调用
         * @param container
         */
        protected initContainer(container: C, completeCallback: asf.CallBack = null): void
        {
            this.container = container;
            this.addChild(this.container);
            // this.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
            // this.mContainer.once(egret.Event.COMPLETE, this.viewComplete, this);
            if (this.container instanceof morn.View)
            {
                if (this.container.layoutComolete && completeCallback)
                {
                    completeCallback.execute();
                }
                else
                {
                    this.container.layoutCallback = completeCallback;
                }
            }
        }

        /**
         * 传入数据
         * @param data
         *
         */
        public setData(data: any): void
        {
            // trace("收到数据：" + data.data)
        }

        /**
         * 页面打开后
         *
         */
        public onTabOpen(): void
        {
            //trace("主要做事件监听")
        }

        /**
         *页面关闭后
         *
         */
        public onTabClose(): void
        {
            //trace("主要做事件监听移出")
        }

        /**
                 *页面关闭前
                 *
                 */
        public tabClose(): void
        {

        }

        /**
         * 设置对应的helper
         * @param h
         *
         */
        // public  set helper(h: DragonHelper): void
        // {
        // }

        public destroy(): void
        {
            super.destroy();
            this.onDestroy();
            this.container.destroy();
            this.container = null;
        }
        public onDestroy(): void
        {

        }
    }
}