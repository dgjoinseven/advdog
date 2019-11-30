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
            return this.newHandImg;
        }
        /**
         * 在商店显示手指
         */
        static showShopHand(target:morn.Button):void
        {
            this.step = 1;
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
            this.newHandImg.x = gbobla.x + 90;
            this.newHandImg.y = gbobla.y - 80;
            this.handPoint1.y = this.newHandImg.y;
            this.handPoint2.y = this.newHandImg.y - 80;
            this.root.addChild(this.maskSprite);
            this.root.addChild(this.newHandImg);
            this.root.addChild(this.button);
            //生成手指在动
            this.tween = egret.Tween.get( this.newHandImg, { loop:true} );
            this.tween.to({"y":this.handPoint2.y},1000).wait(1000).
            to({"y":this.handPoint1.y},1000);
        }

        private static onClick(evt:egret.TouchEvent):void
        {
            if(this.step == 1)
            {
                mvc.open(ShopView);
                //生成商店手指效果
            }
        }
        
    }
}