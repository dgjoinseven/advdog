namespace game 
{
    /**
     * 游戏主界面
     */
    export class GainView extends View<ui.GainViewUI, any,any>
    {
        static NAME         :string = "GainView";

        public constructor()
        {
            super();
            this.lv = mvc.MvcConst.VIEW_LV_1;
            this.layer = mvc.MvcConst.VIEW_LAYER;
            //预加载了就不需要设置
            // this.setUIRes("main");
        }

        public initLayoutJson(completeCallback: asf.CallBack): void
        {
            this.initContainer(new ui.GainViewUI(), completeCallback);
        }

        init() 
        {
            console.info("GainView初始化完成");
        }
    }
}