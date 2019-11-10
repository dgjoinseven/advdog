namespace game 
{
    /**
     * 游戏主界面
     */
    export class SpeedUpView extends View<ui.SpeedUpUI, any,any>
    {
        static NAME         :string = "SpeedUpView";


        private data:LookVideoCountVo;
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
            this.initContainer(new ui.SpeedUpUI(), completeCallback);
        }

        init() 
        {
            console.info("SpeedUpView初始化完成");
            this.showGrayBg();
            // this.container.add60Btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
            // this.container.add200Btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
            this.addButtonEvent(this.container.add60Btn,this.onClick,this);
            this.addButtonEvent(this.container.add200Btn,this.onClick,this);
            HttpManager.postHttpByParam(NC.LookVideoCount_Url,{lookType:NC.Speed_Video},this.LookVideoCount_Url,this);
        }
        private LookVideoCount_Url(data:LookVideoCountVo):void
        {
            this.data = data;
            this.session.speedLookVideoData = data;
            // if(data.lookType == Number(NC.Speed_Video) && data.remainingTimes && data.remainingTimes > 0)
            // {
                
            // }
        }
        private onClick(evt:egret.TouchEvent):void
        {
            let addSpeedType  = 0;
            if(evt.currentTarget == this.container.add60Btn)
            {
               addSpeedType = 1;
            }
            else if(evt.currentTarget == this.container.add200Btn)
            {
                // addSpeedType = 3;
                if(this.data.remainingTimes > 0)
                {
                    JSBrigd.getInstance().openShowAd(NC.Speed_Video);
                }
                else
                {
                    TipView.showTip(TipConst.Video_Not_Count);
                }
                this.close();
                return ;
            }
            let param:any = {};
            param.addSpeedType = addSpeedType;
            HttpManager.postHttpByParam(NC.AddSpeedGoldCoin_Url,param,this.AddSpeedGoldCoin_Url,this);
        }

        private AddSpeedGoldCoin_Url(data:SpeedGoldCoinVo):void
        {
            if(data.speedTime == "60")
            {
                //钻石加速成功
                console.info("钻石加速成功");
                TipView.showTip("钻石加速成功");
                this.db.mainInfoVo.tlbc -= 10;
                //更新钻石
                Modules.mainModule.mainView.updateGem(this.db.mainInfoVo.tlbc);
                //进行加速显示
                Modules.mainModule.mainView.speedControl.startSpeed(data);
            }
            this.close();
        }
    }
}