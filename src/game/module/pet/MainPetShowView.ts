namespace game
{
    export class MainPetShowView extends egret.Sprite
    {
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
        public constructor(index:number) 
        {
            super();
            this.index = index;
            this.stars = [];
            this.createView();
            this.checkScope = new egret.Rectangle(0,0,160,180);
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
             else
             {
                 effect.playOnce("effect/lvUp/lvUp");
                 effect.x = -110;
                 effect.y = -110;
             }
             
             this.addChild(effect);
        }
        cleanDragInfo():void
        {
            Session.instance.root.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMoveClick,this);
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
               this.dog = null;
               this.hasDog = false;
               this.dogLv = 0;
               DB.instance.mainInfoVo["position" + this.index] = 0;
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
            Session.instance.root.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMoveClick,this);
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
            this.isClick = true;
            //启动误触机制
            asf.App.timeMgr.doOnce(10,this.onDragEvent,this);
        }
        private onDragEvent():void
        {
            if(this.isClick)
            {
                Session.instance.selectDogUI = this;
                //狗狗
                //还在点击中，启动拖动程序
                Session.instance.root.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMoveClick,this);
                // this.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onMoveClick,this);
            }
        }
        private onMoveClick(evt:egret.TouchEvent):void
        {
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
            Session.instance.root.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onBeginClick,this);
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
            
            if(this.dogLv >= 31 && this.dogLv <= 36)
            {
                //生成对应的颜色
                ImageUtils.dogColor(this.dog,this.dogLv);
            }

            //test
            // this.showEffect(this.dogLv);
        }
    }
}