namespace game 
{
    /**
     * 狗粮提示界面(需要金币看视频的也可以用这个)
     */
    export class TipDogView extends View<ui.TipDogUI, any,any>
    {
        static NAME         :string = "TipDogView";

        public constructor()
        {
            super();
            this.lv = mvc.MvcConst.VIEW_LV_3;
            this.layer = mvc.MvcConst.TOP_LAYER;
            this.isCloseDestroy = false;
        }

        public initLayoutJson(completeCallback: asf.CallBack): void
        {
            this.initContainer(new ui.TipDogUI(), completeCallback);
        }

        init() 
        {
            console.info("TipDogView初始化完成");
            //根据传递过来的参数进行初始化
            this.setCloseBtn(this.container.sureBtn);
            this.showGrayBg();
            this.container.videoBtn.gray = true;
            this.addButtonEvent(this.container.videoBtn,this.onClick,this);
            //这里应该查看是否还有看视频的次数的
            HttpManager.postHttpByParam(NC.LookVideoCount_Url,{lookType:NC.Dog_Food_Video},this.LookVideoCount_Url,this);
        }

        private LookVideoCount_Url(data:LookVideoCountVo):void
        {
            if(data.lookType == 4 && data.remainingTimes && data.remainingTimes > 0)
            {
                this.container.videoBtn.gray = false;
                // this.container.videoBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
            }
        }

        private onClick(evt:egret.TouchEvent):void
        {
            if(evt.currentTarget == this.container.videoBtn)
            {
                //调用看狗粮的视频
                JSBrigd.getInstance().openShowAd(NC.Dog_Food_Video);
            }
            this.close();
        }

        onOpen(videoType:string):void
        {
            //根据视频类型去请求服务器，看能不能看视频
            // if(videoType == NC.Shop_Video)
            // {
            //     this.container.tipLabel.text = TipConst
            // }
        }
    }
}