/**
 * @IHoldupView.ts
 *
 * @author sodaChen mail:asframe#qq.com
 * @version 1.0
 * <br>Copyright (C), 2012 ASFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:Collections
 * <br>Date:2017/7/7
 */
namespace mvc
{
    /**
     *
     * @author sodaChen
     * Date:2017/7/7
     */
    export interface IHoldupView
    {
        init():void;
        /**
         * hold住oepenView方法，true的时候则表示拦截住，false则表示可以通过openView方法
         * @param viewBean
         * @param param
         * @param callBack
         */
        openViewHold(viewBean:mvc.ViewBean,param:any,callBack: Function, thisObj: Object):boolean;
    }
}