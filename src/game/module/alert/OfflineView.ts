namespace game 
{
    /**
     * 游戏弹窗界面
     */
    export class OfflineView extends View<ui.OffLineUI, any,any>
    {
        static NAME         :string = "OfflineView";

        /**
         * 回收的狗等级
         */
        private dogLv:number;
        private autoEffect:AutoRotationEffect;
        public constructor()
        {
            super();
            this.lv = mvc.MvcConst.VIEW_LV_3;
            this.layer = mvc.MvcConst.TIP_LAYER;
        }

        public initLayoutJson(completeCallback: asf.CallBack): void
        {
            this.initContainer(new ui.OffLineUI(), completeCallback);
        }

        init() 
        {
            console.info("OfflineView初始化完成");
            //根据传递过来的参数进行初始化
            this.showGrayBg();
            this.container.videoBtn.gray = true;
            // this.container.videoBtn.visible = false;
            //搜索一下视频的剩余次数
            HttpManager.postHttpByParam(NC.LookVideoCount_Url,{lookType:NC.OffLine_Video},this.LookVideoCount_Url,this);
            //更新离线收益
            this.container.gainLabel.text = this.db.mainInfoVo.offlineGoldCoin;
            // this.container.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
            // this.container.videoBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
            this.addButtonEvent(this.container.videoBtn,this.onClick,this);
            this.autoEffect = new AutoRotationEffect(this.container.effectImg);
            this.autoEffect.play();
        }

        private LookVideoCount_Url(data:LookVideoCountVo):void
        {
            if(data.lookType == 8 && data.remainingTimes && data.remainingTimes > 0)
            {
                this.container.videoBtn.gray = false;
                this.addButtonEvent(this.container.videoBtn,this.onClick,this);
                //this.container.videoBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
            }
        }
        
        private onClick(evt:egret.TouchEvent):void
        {
            if(evt.currentTarget == this.container.videoBtn)
            {
                //调用app的视频播放机制
                JSBrigd.getInstance().openShowAd(NC.OffLine_Video);
            }
            //直接关闭
            this.close();
        }
        onClose()
        {
             this.autoEffect.clear();
        }
    }
}