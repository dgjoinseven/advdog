namespace game 
{
    /**
     * 游戏弹窗界面
     */
    export class AlertView extends View<ui.GainViewUI, any,any>
    {
        static NAME         :string = "alertView";

        private static instance:AlertView;
        private autoEffect:AutoRotationEffect;
        /**
         * 查看视频的类型
         */
        private lookVideoType:string;
        public constructor()
        {
            super();
            this.lv = mvc.MvcConst.VIEW_LV_3;
            this.layer = mvc.MvcConst.TIP_LAYER;
            AlertView.instance = this;
            this.isCloseDestroy = false;
        }

        public initLayoutJson(completeCallback: asf.CallBack): void
        {
            this.initContainer(new ui.GainViewUI(), completeCallback);
        }

        init() 
        {
            console.info("alertView初始化完成");
            //根据传递过来的参数进行初始化
            this.container.visible = false;
            this.autoEffect = new AutoRotationEffect(this.container.effectImg);
            this.autoEffect.clear();
            this.showGrayBg();
            this.setCloseBtn(this.container.closeBtn);
            this.setCloseBtn(this.container.sureBtn);
            // this.container.videoBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
        }
        // /**
        //  * 离线收益
        //  */
        // public static showGooffLine(num:string):void
        // {
        //     this.instance.showTile("main_json.title_online_gold",num,"观看视频翻倍");
        //     this.instance.container.goldImg2.visible = true;
        // }
        /**
         * 获得金币
         */
        public static showGainGold(num:string):void
        {
            this.instance.showTile("main_json.title_gain_gold",num);
            // this.instance.lookVideoType = "7";
            this.instance.container.goldImg1.visible = true;
        }
        /**
         * 获得一堆金币
         */
        public static showMoreGainGold(num:string):void
        {
            this.instance.showTile("main_json.title_gain_more_gold",num);
            // this.instance.lookVideoType = "7";
            this.instance.container.goldImg3.visible = true;
        }
        public showTile(title:string,num:string,btnContext?:string,tip?:string):void
        {
            mvc.open(AlertView);
            // this.container.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
            this.container.visible = true;
            this.container.titleImg.skin = title;
            this.container.gainLabel.text = num;
            this.autoEffect.play();
            // if(btnContext)
            // {
            // this.container.videoBtn.visible = true;
            // this.container.videoBtn.btnLabel.text = btnContext;
                //同时更新视频的次数
            // }
            // if(tip)
            // {
            //     this.container.tipLabel.visible = true;
            //     this.container.tipLabel.text = tip;
            // }
        }
        private onClick(evt:egret.TouchEvent):void
        {
            if(evt.currentTarget == this.container.videoBtn)
            {
                //调用看广告视频的方法
                JSBrigd.getInstance().openShowAd(this.lookVideoType);
                this.close();
            }
        }

        onOpen(param?: any): void 
        {
            //每次打开的时候调用
        }
        onClose()
        {
            // this.container.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
             this.container.visible = false;
             this.container.goldImg1.visible = false;
             this.container.goldImg2.visible = false;
             this.container.goldImg3.visible = false;
             this.container.videoBtn.visible = false;
             this.container.tipLabel.visible = false;
             this.autoEffect.clear();
        }
    }
}