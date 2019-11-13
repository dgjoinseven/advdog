namespace game 
{
    /**
     * 游戏主界面
     */
    export class InviteView extends View<ui.InviteUI, any,any>
    {
        static NAME         :string = "InviteView";

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
            this.initContainer(new ui.InviteUI(), completeCallback);
        }

        init() 
        {
            console.info("InviteView初始化完成");

            //点击事件
            this.addButtonEvent(this.container.inviteBtn,this.onClick,this);
            JSBrigd.getInstance().jumpClick(this.session.config.shimingUrl[0],this.session.config.shimingUrl[1]);
        }
        private onClick(evt:egret.TouchEvent):void
        {
            let urls:string[];
            if(evt.currentTarget == this.container.inviteBtn)
            {
                JSBrigd.getInstance().jumpClick(this.session.config.inviteUrl[0],this.session.config.inviteUrl[1]);
            }
        }
    }
}