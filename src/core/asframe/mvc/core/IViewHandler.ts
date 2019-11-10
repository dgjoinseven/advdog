/**
 * @IViewHandler.ts
 * @author sodaChen mail:asframe@qq.com
 * @version 1.0
 * <br> Copyright (c) 2012-present, asframe.com
 * <br>Program Name:ASFrameTS
 * <br>Date:2017/2/7
 */
namespace mvc {
    export interface IViewHandler {
        /**
         * 关闭指定等级的view
         * @param lv 指定界面级别，-1时表示关闭当前所有界面
         */
        closeViewByLv(lv: number): void;
        /**
         * 是否已经添加了view对象
         * @param view
         */
        hasView(view: ViewBean): boolean;
        /**
         * 添加一个View对象
         * @param view
         * @return 添加成功则返回true，否则返回false
         */
        addView(view: ViewBean): boolean;
        /**
         * 删除一个View对象
         * @param view
         */
        delView(view: ViewBean): void;
        /**
         * 当前是否存在指定等级的view
         */
        hasViewByLv(lv: number): boolean;
        /**判断当前层级是否存在view */
        hasViewByLayer(layer: number): boolean;
    }
}