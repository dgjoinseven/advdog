namespace game 
{
    /**
     * 新手引导相关的逻辑处理对象
     */
    export class NewHandHelper //extends Helper<MainView,any>
    {
        // static NAME:string = "NewHandHelper";

        // init():void
        // {
        //     console.log("NewHandHelper初始化了");
        // }
        /**
         * 目标按钮
         */
        private static target:morn.Button;
        /**
         * 点击按钮
         */
        private static button:morn.Button;
        /**
         * 手指
         */
        private static newHandImg:morn.Image;
        /**
         * 遮罩
         */
        private static maskSprite:egret.Sprite;
        /**
         * 容器
         */
        private static root:Main;
        /**
         * 手指动画
         */
        private static tween:egret.Tween;
        /**
         * 
         */
        private static handPoint1:egret.Point;
        /**
         * 
         */
        private static handPoint2:egret.Point; 
        /**
         * 新手引导的步骤
         */
        private static step:number;
        
        static getNewHand():morn.Image
        {
            if(this.newHandImg)
                return this.newHandImg;
            this.newHandImg = new morn.Image();
            this.newHandImg.skin = "main_json.finger"
            this.newHandImg.anchorX = 0.5;
            this.newHandImg.anchorY = 0.5;

            this.maskSprite = new egret.Sprite();
            this.maskSprite.graphics.beginFill( 0x000000, 0.5);
            // this.grayBg.graphics.drawRect( 0, 0, this.stage.stageWidth, this.stage.stageHeight);
            this.maskSprite.graphics.drawRect( 0, 0, 750, 1600);
            this.maskSprite.graphics.endFill();
            // this.maskSprite.alpha = 0.7;

            this.handPoint1 = new egret.Point();
            this.handPoint2 = new egret.Point();
            this.root = Session.instance.main;
            this.maskSprite.touchEnabled = false;
            this.maskSprite.touchChildren = false;

            this.root.addChild(this.newHandImg);

            // Session.instance.mvcRoot.getRootContainer().touchEnabled = false;
            // Session.instance.mvcRoot.getRootContainer().touchChildren = false;
            return this.newHandImg;
        }
        /**
         * 在商店显示手指
         */
        static showShopHand(target:morn.Button):void
        {
            this.createYHand(1,target);
        }
        /**
         * 打开商店购买狗狗的新手引导
         */
        static showBuyDog(target:morn.Button):void
        {
            this.createYHand(2,target);
        }
        /**
         * 清除当前新手引导的状态
         */
        static clearState():void
        {
            egret.Tween.removeAllTweens();
            this.tween = null;
            this.button.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
            this.root.removeChild(this.button);
            this.button = null;
        }
        /**
         * 关闭新手引导，同时发送请求给服务器，更改新手状态
         */
        static closeNewHand():void
        {
            this.clearState();
        }
        private static createYHand(step:number,target:morn.Button):void
        {
            this.step = step;
            this.createTarget(target,180);
            this.tween = egret.Tween.get( this.newHandImg, { loop:true} );
            this.tween.to({"y":this.handPoint2.y},800).wait(800).
            to({"y":this.handPoint1.y},800);
        }
        private static createTarget(target:morn.Button,rotation:number):void
        {
            let handImg = this.getNewHand();
            handImg.rotation = 180;
            this.target = target;
            //转换成全局坐标
            let gbobla = this.target.localToGlobal();
            //复制 
            this.button = this.target.clone();
            this.button.x = gbobla.x;
            this.button.y = gbobla.y;
            this.button.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
            handImg.x = gbobla.x + 90;
            handImg.y = gbobla.y - 80;
            this.handPoint1.y = handImg.y;
            this.handPoint2.y = handImg.y - 60;
            this.root.addChild(this.newHandImg);
            this.root.addChild(this.button);
            
        }
        // private static New_Hand_Buy_Dog2()
        // {
        //     //2只狗都买好了，关闭掉商店界面
        // }

        private static onClick(evt:egret.TouchEvent):void
        {
            if(this.step == 1)
            {
                mvc.open(ShopView);
                this.clearState();
            }
            else if(this.step == 2)
            {
                //需要购买2只狗
                mvc.send(NC.New_Hand_Buy_Dog,evt);
            }
        }
        
    }
}