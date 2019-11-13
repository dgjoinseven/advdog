namespace game 
{
    /**
     * 我的狗狗主界面
     */
    export class MyDogView extends View<ui.MyDogUI, any,any>
    {
        static NAME         :string = "MyDogView";

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
            this.initContainer(new ui.MyDogUI(), completeCallback);
        }

        init() 
        {
            console.info("MyDogView初始化完成");
            //请求当前狗的信息，以及相关的解锁信息
            //生成默认数据
            let dogs = ["dog1_5","dog6_10","dog11_15","dog16_20","dog21_25","dog26_30","dog30_37","dog38_42","dog43","dog44"];
            for(let i:number = 0; i < dogs.length; i++)
            {
                let img = new morn.Button();
                img.skin = "main_json.btn_" + dogs[i];
                img.stateNum = 1
                // img.width = 160;
                // img.height = 140;
                img.x = i * 120;
                img.tag = i;
                this.container.dogPanel.addChild(img);
                
                this.addButtonEvent(img,this.onClick,this);
            }
            this.showGrayBg();
            //获得当前狗狗的等级
            let url = this.db.dogsRes.get("pet" + this.db.mainInfoVo.showLevel);
            //目前先显示1-5的狗狗吧
            game.MovieMgr.getInstance().load("dog", Session.instance.config.assets + "pet/" + url, new asf.CallBack(this.onLoadMove,this));
        }

        private onLoadMove(mcData: egret.MovieClipData, name: string, url: string):void
        {
            this.dog = new egret.MovieClip(mcData);
            this.dog.scaleX = this.dog.scaleY = 1.2;
            // this.dog.x = -190;
            // this.dog.y = -240;
            this.dog.x = -165;
            this.dog.y = -220;
            this.dog.frameRate = 10;
            this.container.addChild(this.dog);
            // this.mc.addEventListener(egret.Event.LOOP_COMPLETE,this.mcOver,this);
            this.dog.play(-1);
            
            if(this.db.mainInfoVo.showLevel >= 31 && this.db.mainInfoVo.showLevel <= 36)
            {
                //生成对应的颜色
                ImageUtils.dogColor(this.dog,this.db.mainInfoVo.showLevel);
            }

            //test
            // this.showEffect(this.dogLv);
        }

        private onClick(evt:egret.TouchEvent):void
        {
            //点击狗狗，切换狗
            let imgBtn:morn.Button = evt.currentTarget;

            HttpManager.postHttpByParam(NC.UpdateHomeDogAvatar_Url,{dogGrade:1},this.UpdateHomeDogAvatar_Url,this);
        }

        private UpdateHomeDogAvatar_Url(dogGrade:string):void
        {
            console.info(dogGrade);
        }
        
    }
}