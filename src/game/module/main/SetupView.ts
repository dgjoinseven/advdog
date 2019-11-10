namespace game 
{
    /**
     * 游戏主界面
     */
    export class SetupView extends View<ui.SetupViewUI, any,any>
    {
        static NAME         :string = "setupView";

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
            this.initContainer(new ui.SetupViewUI(), completeCallback);
        }

        init() 
        {
            console.info("setupView初始化完成");
            this.centerView();
            this.showGrayBg();
        }

        private onClick(evt:egret.TouchEvent):void
        {
            
        }
    }
}