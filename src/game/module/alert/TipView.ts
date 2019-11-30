namespace game 
{
    /**
     * 游戏弹窗界面
     */
    export class TipView extends View<ui.TipUI, any,any>
    {
        static NAME         :string = "TipView";

        private static instance:TipView;
        // private autoEffect:AutoRotationEffect;
        /**
         * 查看视频的类型
         */
        private lookVideoType:string;
        /**
         * 关闭的回调函数
         */
        private callBack:asf.CallBack;
        public constructor()
        {
            super();
            this.lv = mvc.MvcConst.VIEW_LV_3;
            this.layer = mvc.MvcConst.TOP_LAYER;
            TipView.instance = this;
            this.isCloseDestroy = false;
        }

        public initLayoutJson(completeCallback: asf.CallBack): void
        {
            this.initContainer(new ui.TipUI(), completeCallback);
        }

        init() 
        {
            console.info("alertView初始化完成");
            //根据传递过来的参数进行初始化
            this.container.visible = false;
            this.setCloseBtn(this.container.sureBtn);
            this.showGrayBg();
        }

        static showTip(msg:string,callBack?:Function,that?:any):void
        {
            if(msg && msg != "")
            {
                this.instance.show(msg,callBack,that);
            }
        }
        
        public show(msg:string,callBack?:Function,that?:any):void
        {
            mvc.open(TipView);
            this.container.visible = true;
            this.container.tipLabel.text = msg;
            if(callBack)
            {
                this.callBack = new asf.CallBack(callBack,that);
            }
            
        }
        // private onClick(evt:egret.TouchEvent):void
        // {
        //     if(evt.currentTarget == this.container.sureBtn)
        //     {
        //         this.close();
        //     }
        //     // this.close();
        // }

        onOpen(param?: any): void 
        {
            //每次打开的时候调用
        }
        onClose()
        {
            //  this.container.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
             this.container.visible = false;
             if(this.callBack)
             {
                //  let temp = this.callBack;
                this.callBack.execute();
                this.callBack = null;
             }
        }
    }
}