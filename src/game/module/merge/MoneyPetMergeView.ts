namespace game 
{
    /**
     * 红包分红犬合成
     */
    export class MoneyPetMergeView extends View<ui.MoneyPetMergeUI, any,any>
    {
        static NAME         :string = "MonyPetMergeView";

        private fiveMap:asf.HashMap<number,number>;
        private autoEffect:AutoRotationEffect;
        private effectList:EgretMovieEffect[];
        private data:DogMergeDTOVo;
        /**
         * 新出生的狗狗
         */
        private dog:egret.MovieClip;
        public constructor()
        {
            super();
            this.lv = mvc.MvcConst.VIEW_LV_1;
            this.layer = mvc.MvcConst.VIEW_LAYER;
            //预加载了就不需要设置
            // this.setUIRes("main");
        }

        public initLayoutJson(completeCallback: asf.CallBack): void
        {
            this.initContainer(new ui.MoneyPetMergeUI(), completeCallback);
        }

        

        init() 
        {
            console.info("MoneyPetMergeView初始化完成");
            for(let j:number = 38; j <= 42; j++)
            {
                let img:morn.Image = this.container["dog" + j];
                img.gray = true;
            }
            this.container.mergeBtn.gray = true;
            //检测一下，当前每只狗的类型
            let dogLv = 0;
            this.fiveMap = new asf.HashMap<number,number>();
            for(let i:number = 1; i <= 12; i++)
            {
                dogLv = this.db.mainInfoVo["position" + i];
                //没有狗，或者小于38，大于42的非五福狗，无法合成
                if(dogLv == 0 || dogLv > 42 || dogLv < 38)
                    continue;
                //没有这只狗，则放起来
                if(!this.fiveMap.hasKey(dogLv))
                {
                    //狗的类型和位置存放起来
                    this.fiveMap.put(dogLv,i);
                    //对应的狗图标亮起来
                    this.container["dog" + dogLv].gray = false;
                }
            }
            //有5只
            if(this.fiveMap.size() >= 5)
            {
                this.container.mergeBtn.gray = false;
            }
            this.addButtonEvent(this.container.mergeBtn,this.onClick,this);
            this.showGrayBg();
            this.autoEffect = new AutoRotationEffect(this.container.imgBg);
            this.autoEffect.play();
        }

        onClose():void
        {
            this.autoEffect.clear();
        }

        private onClick(evt:egret.TouchEvent):void
        {
            // for(let j:number = 38; j <= 42; j++)
            // {
            //     let img:morn.Image = this.container["dog" + j];
            //     img.visible = true;
            // }
            // //模拟假数据
            // let data:DogMergeDTOVo = asf.Global.createAny();
            // data.dogGradeId = asf.RandomUtils.randomBoolean ? 43 : 44;
            // this.SeparateDogMerge(data);
            if(this.fiveMap.size() < 5)
            {
                TipView.showTip(TipConst.Five_Dog_Tip);
                return ;
            }
            if(evt.currentTarget == this.container.mergeBtn)
            {
                let param:any = {};
                for(let key in this.fiveMap.getContainer())
                {
                    let key1 = Number(key);
                    if(param.strDogId)
                    {
                        //等级
                        param.strDogId  += "," + key;
                        //位置
                        param.strPosition  += "," + this.fiveMap.get(key1);
                    }
                    else
                    {
                        param.strDogId  = key;
                        param.strPosition  = this.fiveMap.get(key1);
                    }
                }
                param.toPositionId  = this.openParam;
                //生成合成信息
                HttpManager.postHttpByParam(NC.SeparateDogMerge,param,this.SeparateDogMerge,this);
            }
        }

        private SeparateDogMerge(data:DogMergeDTOVo):void
        {
            this.data = data;
            this.effectList = [];
            for(let j:number = 38; j <= 42; j++)
            {
                let img:morn.Image = this.container["dog" + j];
                // img.visible = false;
                //特效和他们保持
                let effect = new EgretMovieEffect();
                effect.playOnce("effect/lvUp/lvUp");
                effect.x = img.x + 50;
                effect.y = img.y + 50;
                this.container.addChild(effect);
            }
            //延迟多少秒
            asf.App.timeMgr.doOnce(500,this.onLvup,this);
            //直接调用主界面的合成狗狗的方法，统一处理
            // Modules.mainModule.mainView.onMergeDog(data);
        }
        private onLvup():void
        {
            for(let j:number = 38; j <= 42; j++)
            {
                let img:morn.Image = this.container["dog" + j];
                img.visible = false;
            }
            //播放龙特效
            let dragon = new EgretMovieEffect(30);
            dragon.x = 220;
            dragon.y = 450;
            this.container.addChild(dragon);
            dragon.playOnce("effect/fiveDog/fiveDog");
            //
            asf.App.timeMgr.doOnce(2000,this.effectNewDog,this);
        }
        //出现新的狗
        private effectNewDog():void
        {
            //获得当前狗狗的等级
            let url = this.db.dogsRes.get("pet" + this.data.mergeLevel);
            //目前先显示1-5的狗狗吧
            game.MovieMgr.getInstance().load("dog", Session.instance.config.assets + "pet/" + url, new asf.CallBack(this.onLoadMove,this));
        }

        private onLoadMove(mcData: egret.MovieClipData, name: string, url: string):void
        {
            this.dog = new egret.MovieClip(mcData);
            this.dog.frameRate = 10;
            this.dog.anchorOffsetX = 150;
            this.dog.anchorOffsetY = 150;
            this.dog.scaleX = this.dog.scaleY = 0.1;
            this.dog.x = 50;
            this.dog.y = 30;
            // this.dog.x = 400;
            // this.dog.y = 600;
            
            this.dog.frameRate = 10;
            this.container.mergeBtn.addChild(this.dog);
            //变大效果
            egret.Tween.get(this.dog,{loop:false}).
            to({scaleX:1.2,scaleY:1.2},1000,egret.Ease.sineOut);
            // this.mc.addEventListener(egret.Event.LOOP_COMPLETE,this.mcOver,this);
            this.dog.play(-1);

            //播放烟花
            asf.App.timeMgr.doOnce(500,this.playYanhua1,this);
            asf.App.timeMgr.doOnce(600,this.playYanhua2,this);
            asf.App.timeMgr.doOnce(700,this.playYanhua3,this);
            asf.App.timeMgr.doOnce(800,this.playYanhua4,this);
        }
        private playYanhua1():void
        {
            this.playYanHua(120,420);
        }
        private playYanhua2():void
        {
            this.playYanHua(600,400);
        }
        private playYanhua3():void
        {
            this.playYanHua(140,800);
        }
        private playYanhua4():void
        {
            this.playYanHua(570,715);
            //调用首页的操作狗的接口
            Modules.mainModule.mainView.onMergeDog(this.data);
            //1秒钟之后关闭
            asf.App.timeMgr.doOnce(1000,this.close,this);
        }

        private playYanHua(x:number,y:number):void
        {
            let dragon = new EgretMovieEffect(10);
            dragon.x = x - 100;
            dragon.y = y;
            this.container.addChild(dragon);
            dragon.playOnce("effect/yanhua/yanhua");
            SoundMgr.play("yanhua",false,true);
        }

    }
}