/**
 * @GameHoldupView.ts
 *
 * @author sodaChen mail:asframe#qq.com
 * @version 1.0
 * <br>Copyright (C), 2012 ASFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:Collections
 * <br>Date:2017/7/7
 */
namespace game
{
    import IHoldupView = mvc.IHoldupView;
    /**
     * 拦截view
     * @author sodaChen
     * Date:2017/7/7
     */
    export class GameHoldupView implements IHoldupView
    {
        /** open表数据集合 **/
        private funOpenTabs:Object;
        private db:DB;
        constructor()
        {

        }
        init():void
        {
            // this.funOpenTabs = JsonTabs.getTabDatas("functionOpen");
            this.db = DB.ins;
        }
        /**
         * hold住oepenView方法，true的时候则表示拦截住，false则表示可以通过openView方法
         * @param viewBean
         * @param param
         * @param callBack
         */
        openViewHold(viewBean:mvc.ViewBean,param:any,callBack: Function, thisObj: Object):boolean
        {
            return ;
            // if(!this.funOpenTabs)
            //     return ;
            // var funOpenTab:FunctionOpen_Tab = this.funOpenTabs[viewBean.id];
            // if(funOpenTab)
            // {
            //      //实际满足拦截条件之后，是要返回false，无法打开页面了
            //     return false;
            // }
            // return false;
        }
    }
}