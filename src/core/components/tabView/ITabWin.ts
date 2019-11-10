/**
 * @ITabWin.ts
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
     *
     * @author liwenlong
     * Date:2017/4/7
     */
    export interface ITabWin<C extends morn.View>
    {
        container: C;

        openSecParam: number;
        initLayoutJson(completeCallback: asf.CallBack): void
        /**
         * 初始化
         *
         */
        init(): void;
        destroy(): void;
        /**
         * 传入数据
         * @param data
         *
         */
        setData(data?: any): void;
        /**
         * 页面打开后
         *
         */
        onTabOpen(param?: any): void;
        /**
         *页面关闭后
         *
         */
        onTabClose(): void;
        /**
         *页面关闭前
         *
         */
        tabClose(): void;
        /**
         *与初始化
         *
         */
        preinit(...args): void;
        /**
         * 设置对应的helper
         * @param h
         *
         */
        // setHelper(h:mvc.Helper<V>)
    }
}