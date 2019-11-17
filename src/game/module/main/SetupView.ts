namespace game 
{
    /**
     * 游戏设置界面
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
            // this.centerView();
            this.showGrayBg();
            this.addButtonEvent(this.container.soundBtn,this.onClick,this);
            this.container.soundBtn.toggle = true;
            // if(this.db.isSound)
            // {
                // this.container.soundBtn.toggle = this.db.isStopSound;
            this.container.soundBtn.selected = this.db.isStopSound;
            // }
            // else
            // {

            // }
        }

        private onClick(evt:egret.TouchEvent):void
        {
            if(evt.currentTarget == this.container.soundBtn)
            {
                this.db.isStopSound = !this.db.isStopSound;
                egret.localStorage.setItem("jia.pet.sound",String(this.db.isStopSound));
                if(this.db.isStopSound)
                {
                    SoundMgr.stopAll();
                }
                else
                {
                    SoundMgr.playAll();
                }
            }
        }
    }
}