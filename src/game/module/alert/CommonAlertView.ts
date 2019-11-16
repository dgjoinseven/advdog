namespace game 
{
    /**
     * 游戏弹窗界面
     */
    export class CommonAlertView extends View<ui.CommonAlertUI, any,any>
    {
        static NAME         :string = "CommonAlertView";

        private static instance:CommonAlertView;

        private autoEffect:AutoRotationEffect;
        public constructor()
        {
            super();
            this.lv = mvc.MvcConst.VIEW_LV_3;
            this.layer = mvc.MvcConst.TIP_LAYER;
            CommonAlertView.instance = this;
            this.isCloseDestroy = false;
        }

        public initLayoutJson(completeCallback: asf.CallBack): void
        {
            this.initContainer(new ui.CommonAlertUI(), completeCallback);
        }

        init() 
        {
            console.info("CommonAlertView初始化完成");
            this.setCloseBtn(this.container.videoBtn);
            //根据传递过来的参数进行初始化
            this.container.visible = false;
            this.autoEffect = new AutoRotationEffect(this.container.effectImg);
            this.autoEffect.clear();
            this.showGrayBg();
        }
        /**
         * 获得金币
         */
        public static showGainGold(num:string):void
        {
            this.instance.showTile("main_json.title_gain_gold",num);
            this.instance.container.videoImg.visible = true;
        }
        /**
         * 恭喜获得钻石
         */
        public static showGem(num:string):void
        {
            this.instance.showTile("main_json.title_gain",num);
            this.instance.container.videoImg.skin = "main_json.gem_big";
        }

        public showTile(title:string,num:string,btnContext?:string,tip?:string):void
        {
            mvc.open(CommonAlertView);
            this.container.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
            this.container.visible = true;
            this.container.titleImg.skin = title;
            this.container.gainLabel.text = num;
            this.container.videoBtn.visible = true;
            this.autoEffect.play();
        }
        private onClick(evt:egret.TouchEvent):void
        {
            if(evt.currentTarget != this.container.closeBtn)
            {
                //直接关闭
                //调用看广告视频的方法
                this.close();
            }
        }

        onOpen(param?: any): void 
        {
            //每次打开的时候调用
        }
        onClose()
        {
            this.container.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
             this.container.visible = false;
            //  this.container.goldImg1.visible = false;
            //  this.container.goldImg2.visible = false;
            //  this.container.goldImg3.visible = false;
            //  this.container.videoImg.visible = false;
            //  this.container.videoBtn.visible = false;
             this.container.tipLabel.visible = false;
             this.autoEffect.clear();
        }
    }
}