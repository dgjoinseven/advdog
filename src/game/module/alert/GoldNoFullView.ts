namespace game 
{
    /**
     * 狗粮提示界面(需要金币看视频的也可以用这个)
     */
    export class GoldNoFullView extends View<ui.GoldNoFullUI, any,any>
    {
        static NAME         :string = "GoldNoFullView";

        private data:LookVideoCountVo;
        public constructor()
        {
            super();
            this.lv = mvc.MvcConst.VIEW_LV_3;
            this.layer = mvc.MvcConst.TOP_LAYER;
        }

        public initLayoutJson(completeCallback: asf.CallBack): void
        {
            this.initContainer(new ui.GoldNoFullUI(), completeCallback);
        }

        init() 
        {
            console.info("GoldNoFullView初始化完成");
            //根据传递过来的参数进行初始化
            // this.setCloseBtn(this.container.sureBtn);
            this.showGrayBg();
            this.container.videoBtn.gray = true;
            this.addButtonEvent(this.container.videoBtn,this.onClick,this);
            //这里应该查看是否还有看视频的次数的
            HttpManager.postHttpByParam(NC.LookVideoCount_Url,{lookType:NC.Shop_Video},this.LookVideoCount_Url,this);
        }

        private LookVideoCount_Url(data:LookVideoCountVo):void
        {
            this.data = data;
            if(data.lookType == Number(NC.Shop_Video) && data.remainingTimes && data.remainingTimes > 0)
            {
                // this.container.videoBtn.gray = false;
                this.container.gainLabel.text = data.getGoldCoin; 
                // this.container.videoBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
            }
            this.container.tipLabel.text = "每天凌晨12点重置视频次数(剩余" + data.remainingTimes + "次)";
        }

        private onClick(evt:egret.TouchEvent):void
        {
            console.info("点击了,",evt.currentTarget);
            if(evt.currentTarget == this.container.videoBtn)
            {
                console.info("点击看视频按钮,",this.data);
                if(!this.data)
                    return ;
                if(this.data.remainingTimes > 0)
                    //调用看狗粮的视频
                    JSBrigd.getInstance().openShowAd(NC.Shop_Video);
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