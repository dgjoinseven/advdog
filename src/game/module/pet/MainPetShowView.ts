namespace game
{
    export class MainPetShowView extends egret.Sprite
    {
        /**
         * 是否有狗狗点击了，这些狗只有一只狗可以点击，不支持同时点击多只狗
         */
        static isClickDog:boolean = false;
        /**
         * 当前点击选中的对象
         */
        static selectPet:MainPetShowView;
        private bg:ui.MainPetShowUI;
        private stars:morn.Image[];
        private dog:egret.MovieClip;

        private isClick:boolean;
        /**
         * 检测域，用来碰撞检测
         */
        checkScope:egret.Rectangle;
        /**
         * 选中狗的等级
         */
        dogLv:number;
        /**
         * 索引
         */
        index:number;
        /**
         * 是否有狗
         */
        hasDog:boolean;
        private grayBg:egret.Shape;
        public constructor(index:number) 
        {
            super();
            this.index = index;
            this.stars = [];
            this.createView();
            this.checkScope = new egret.Rectangle(0,0,160,180);

            // this.grayBg = new egret.Shape();
            // this.grayBg.graphics.beginFill( 0x000000, 1);
            // // this.grayBg.graphics.drawRect( 0, 0, this.stage.stageWidth, this.stage.stageHeight);
            // this.grayBg.graphics.drawRect( -65, -70, 150, 150);
            // this.grayBg.graphics.endFill();
            // this.grayBg.alpha = 5;
            // //放在最底下
            // this.addChildAt(this.grayBg,0);
        }
        /**
         * 是否为5福犬
         */
        isFiveCerealsDog():boolean
        {
            if(this.dogLv >= 38 && this.dogLv <= 42)
            {
                return true;
            }
            return false;
        }


        private createView(): void 
        {
            this.bg = new ui.MainPetShowUI();
            this.bg.bgBlankImg.alpha = 0;
            this.addChild(this.bg);
        }
        /**
         * 销毁
         */
        destory():void
        {
            if(this.dog)
            {
                this.dog.stop();
                this.dog = null;
            }
            this.bg.destroy();
            this.bg = null;
        }

        showEffect(dogLv:number):void
        {
            let effect = new EgretMovieEffect();
             //小升级特效
             //大特效
             let file = dogLv % 5;
             if(dogLv > 38 || dogLv == 31 || (dogLv < 31 && file == 0))
             {
                effect.playOnce("effect/changeLv/changeLv");
                effect.x = -85;
                effect.y = -150;
             }
             else //if(dogLv < 43)
             {
                 effect.playOnce("effect/lvUp/lvUp");
                 effect.x = -110;
                 effect.y = -110;
             }
             this.addChild(effect);
        }
        cleanDragInfo():void
        {
            Session.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMoveClick,this);
        }
        /**
         * 关闭掉这里的狗狗显示
         */
        closeDog():void
        {
            if(this.dog)
            {
               this.dog.stop();
               this.removeChild(this.dog);
               //星星也要删除隐藏掉
               for(let i:number = 1; i <= this.stars.length; i++)
                {
                    let starImg:morn.Image = this.stars[i];
                    if(starImg)
                    {
                        starImg.visible = false;
                    }
                }
            }
            this.dog = null;
            this.hasDog = false;
            this.dogLv = 0;
            DB.instance.mainInfoVo["position" + this.index] = 0;
            Session.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMoveClick,this);
        }
        

        update(dogLv:number):void
        {
           this.closeDog();
           this.dogLv = dogLv;
           console.info(this.index + "更新狗狗信息:" + dogLv);
           if(dogLv == 0)
           {
               console.log("1");
           }
           DB.instance.mainInfoVo["position" + this.index] = dogLv;
            this.hasDog = true;
            let pet = DB.instance.dogsRes.get("pet" + dogLv);
            let star = PetUtls.getDogStar(dogLv);
            this.dog = new egret.MovieClip();
            
            // this.dog.mo
            game.MovieMgr.getInstance().load(pet, Session.instance.config.assets + "pet/" + pet, new asf.CallBack(this.onLoadMove,this));

            //直接由5颗星（1-5）
            if(dogLv < 31)
            {
                for(let i:number = 1; i <= 5; i++)
                {
                    let starImg:morn.Image = this.stars[i];
                    if(!starImg)
                    {
                        starImg = new morn.Image();
                        starImg.skin = "main_json.star";
                        starImg.scale = 1.4;
                        starImg.x = -70 + 30 * (i - 1);
                        starImg.y = 35;
                        this.addChild(starImg);
                        this.stars[i] = starImg;
                    }  
                    starImg.visible = true;
                    if(i > star)
                        starImg.gray = true;
                    else
                        starImg.gray = false;
                }
            }
            
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBeginClick,this);
            this.addEventListener(egret.TouchEvent.TOUCH_END,this.onEndClick,this);

            
        }

        private onBeginClick(evt:egret.TouchEvent):void
        {
            console.log("点击了");
            if(!this.dog || !this.hasDog)
                return;
            if(MainPetShowView.isClickDog)
            {
                return ;
            }
            MainPetShowView.selectPet = this;
            //注册唯一点击标记
            MainPetShowView.isClickDog = true;
            this.isClick = true;
            //启动误触机制
            asf.App.timeMgr.doOnce(5,this.onDragEvent,this);
        }
        private onDragEvent():void
        {
            if(this.isClick)
            {
                Session.instance.selectDogUI = this;
                //狗狗
                //还在点击中，启动拖动程序
                Session.instance.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMoveClick,this);
                // this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMoveClick,this);
            }
        }
        private onMoveClick(evt:egret.TouchEvent):void
        {
            //选中对象不是自己，进行清除
            if(MainPetShowView.selectPet != this)
            {
                 Session.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMoveClick,this);
                return ;
            }
            console.log("开始移动了");
            Session.instance.moveDragDog(this.index,this.dogLv,evt.stageX,evt.stageY);
        }
        private onEndClick(evt:egret.TouchEvent):void
        {
            // let session = Session.instance;
            // console.log("点击结束了:" + session.dragDog);
            // if(session.dragDog)
            // {
            //     //有拖动的狗，进行碰撞检测
            //     mvc.send(NC.Merger_Dog,this);
            //     session.closeDragDog();
            // }
            this.isClick = false;
            // this.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onBeginClick,this);
            //只有选择是自己的生活，才删除首页的移动效果
            if(MainPetShowView.selectPet == this)
            {
                MainPetShowView.isClickDog = false;
                MainPetShowView.selectPet = null;
            } 
            //自己的事件肯定清除
            Session.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onBeginClick,this);
        }


        private getImage(index:number):morn.Image
        {
            return this.bg["start" + index];
        }

        private onLoadMove(mcData: egret.MovieClipData, name: string, url: string):void
        {
            if(!this.bg)
                return ;

            this.dog = new egret.MovieClip(mcData);
            this.dog.scaleX = this.dog.scaleY = 1.2;
            // this.dog.x = -190;
            // this.dog.y = -240;
            this.dog.x = -165;
            this.dog.y = -220;
            this.dog.frameRate = 10;
            this.addChild(this.dog);
            // this.mc.addEventListener(egret.Event.LOOP_COMPLETE,this.mcOver,this);
            this.dog.play(-1);
            
            ImageUtils.tryDogColor(this.dog,this.dogLv);
            // if(this.dogLv >= 31 && this.dogLv <= 36)
            // {
            //     //生成对应的颜色
            //     ImageUtils.dogColor(this.dog,this.dogLv);
            // }

            //test
            // this.showEffect(this.dogLv);
        }
    }
}