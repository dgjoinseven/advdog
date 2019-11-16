namespace game 
{
    /**
     * 狗粮提示界面(需要金币看视频的也可以用这个)
     */
    export class TipDogView extends View<ui.TipDogUI, any,any>
    {
        static NAME         :string = "TipDogView";

        private data:LookVideoCountVo;
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
            // this.container.videoBtn.gray = true;
            // morn.ObjectUtils.gray(this.container.videoBtn, true);
            this.addButtonEvent(this.container.videoBtn,this.onClick,this);
        }

        private LookVideoCount_Url(data:LookVideoCountVo):void
        {
            this.data = data;
            if(data.lookType == 4 && data.remainingTimes && data.remainingTimes > 0)
            {
                this.container.videoBtn.gray = false;
                // this.container.videoBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
            }
            else if(data.lookType == 9 && data.remainingTimes && data.remainingTimes > 0)
            {
                this.container.videoBtn.gray = false;
            }
        }

        private onClick(evt:egret.TouchEvent):void
        {
            if(evt.currentTarget == this.container.videoBtn)
            {
                // if(this.data)
                // {
                //     if(this.data.remainingTimes > 0)
                //     {
                //         //调用看狗粮的视频
                //         JSBrigd.getInstance().openShowAd(this.openParam);
                //     }
                //     else
                //     {
                //         TipView.showTip("观看视频次数已满");
                //     }
                // }
                // else
                // {
                    JSBrigd.getInstance().openShowAd(this.openParam);
                // }
                // JSBrigd.getInstance().openShowAd(NC.Dog_Food_Video);
            }
            this.close();
        }

        onOpen(videoType:string):void
        {
            //根据视频类型去请求服务器，看能不能看视频
            if(videoType == NC.Water_Video)
            {
                this.container.tipLabel.text = "您没水，请观看视频获得";
            }
            else
            {
                this.container.tipLabel.text = "您没狗粮，请观看视频获得";
                //这里应该查看是否还有看视频的次数的
                HttpManager.postHttpByParam(NC.LookVideoCount_Url,{lookType:videoType},this.LookVideoCount_Url,this);
            }       
        }
    }
}