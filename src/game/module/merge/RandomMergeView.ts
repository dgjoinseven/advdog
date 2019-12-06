namespace game 
{
    /**
     * 游戏主界面
     */
    export class RandomMergeView extends View<ui.RamdomMergePetUI, any,any>
    {
        static NAME         :string = "RandomMergeView";

        private data:DogMergeDTOVo;
        private autoEffect:AutoRotationEffect;
        /**
         * 随机显示的狗狗
         */
        private randomDog:number;
        /**
         * 随机key
         */
        private randomKey:number;
        private time:number;
        private upImage:morn.Image;
        private time5Key:number;

        /**
         * 转盘计时器key
         */
        private timeKey:number = 0;
        /**
         * 是否先转3圈
         */
        private isThree:boolean;
        /**
         * 图像的顺序，按照这个顺序进行点亮特效
         */
        private imgIndexs:string[] = ["effect44","effect392","effect40","effect41","effect382","effect43","effect391","effect42","effect381"];
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
            this.initContainer(new ui.RamdomMergePetUI(), completeCallback);
        }

        init() 
        {
            console.info("RandomMergeView初始化完成");
            //调用合成接口
            // HttpManager.postHttpByParam(NC.AddSpeedGoldCoin_Url,param,this.AddSpeedGoldCoin_Url,this);
            this.addButtonEvent(this.container.startBtn,this.onClick,this);
            this.showGrayBg();
            this.autoEffect = new AutoRotationEffect();
            this.autoEffect.speed = 5;
            if(this.db.mainInfoVo.tagNum == "0")
            {
                this.container.startBtn.visible = false;
                this.time5Key = asf.App.timeMgr.doOnce(5000,this.close,this);
            }
            else
            {
                this.container.startBtn.visible = true;
            }
        }
        private onClick(evt:egret.TouchEvent):void
        {
            if(evt.currentTarget == this.container.startBtn)
            {
                //合成
                // HttpManager.postHttpByParam(NC.Merge_Dog_Url,this.openParam,this.onMergeDog,this);
                //自己做点模拟数据
                let mock:DogMergeDTOVo = asf.Global.createAny();
                mock.dogGradeId = asf.RandomUtils.randomInt(38,42);
                console.log("随机狗:" + mock.dogGradeId);
                this.onMergeDog(mock);
            }
            else
            {     
                this.close();
            }
        }
        private onMergeDog(data:DogMergeDTOVo):void
        {
            console.info("37狗合成成功");
            this.data = data;
            //随机几次显示效果
            //this.close();
            //根据结构显示
            //Modules.mainModule.mainView.onMergeDog(data);
            this.randomEffectDog();
            this.time = 0;
            //开启计时器
            this.randomKey = asf.App.timeMgr.doLoop(500,this.onLoop,this,this.randomKey)
            // this.timeKey = asf.App.timeMgr.doLoop(500,this.onLoop,this,this.timeKey);
        }
        onClose():void
        {
            if(this.container)
                this.container.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
            if(this.time5Key)
                asf.App.timeMgr.clearTimer(this.time5Key);
            if(this.randomKey)
                asf.App.timeMgr.clearTimer(this.randomKey);
            if(this.db && this.db.mainInfoVo.tagNum == "0")
            {
                NewHandHelper.newHandOver();
            }
        }
        private onLoop():void
        {
            this.time++;
            if(this.isThree)
            {
                
                if(this.time >= 3)
                {
                    this.time = 0;
                    this.isThree = false;
                }
                else
                {
                    
                    return ;
                }
            }


            //以前随机旋转的
            // this.time--;
            // if(this.time <= 0)
            // {
            //     asf.App.timeMgr.clearTimer(this.randomKey);
            //     //弹出恭喜获得
            //     CommonAlertView.showGainDog(this.data.dogGradeId);
            //     this.close();
            // }
            // else
            // {
            //     this.randomEffectDog();
            // }
        }
        private randomEffectDog(dog?:number):void
        {
            if(dog)
            {
                this.randomDog = dog;
            }
            else
            {
                this.randomDog = asf.RandomUtils.randomInt(38,44);
                //修正
                if(this.randomDog < 38 || this.randomDog > 44)
                    this.randomDog = 38;
            }
            let key:string = "effect" + this.randomDog;
            //38 39有2只
            if(this.randomDog == 38 || this.randomDog == 39)
            {
                key = key + asf.RandomUtils.randomInt(1,2);
            }
            this.updateEffectImage(key);
        }
        /**
         * 更新动画图像
         */
        private updateEffectImage(key:string):void
        {
            if(this.upImage)
            {
                this.upImage.visible = false;
            }
            this.upImage = this.container[key];
            this.upImage.visible = true;
            this.upImage.skin = "main_json.perfect_effect";
            //对应的image亮起来
            this.autoEffect.changeImage(this.upImage);
            this.autoEffect.play();
        }
    }
}