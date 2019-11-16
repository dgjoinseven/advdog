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
            //防止重复生成
            let dogMap:asf.HashMap<string,morn.Button> = new asf.HashMap<string, morn.Button>();
            let key:string;
            let count:number = 0;
            for(let i:number = 1; i <= 44; i++)
            {
                key = this.db.dogsRes.get("dog" + i);
                let img = dogMap.get(key);
                if(!img)
                {
                    img = new morn.Button();
                    img.skin = "main_json.btn_" + key;
                    img.stateNum = 1;
                    img.x = count * 120;
                    //狗狗的等级
                    img.tag = i;
                    dogMap.put(key,img);
                    this.container.dogPanel.addChild(img);
                    if(i < this.db.mainInfoVo.maxLevel)
                    {
                        this.addButtonEvent(img,this.onClick,this);
                    }
                    else
                    {
                        //显示的狗等级大于最大等级，灰色，不可点击
                        morn.ObjectUtils.gray(img,true);
                    }
                    count++;
                }
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
            this.container.dogContainer.addChild(this.dog);
            // this.mc.addEventListener(egret.Event.LOOP_COMPLETE,this.mcOver,this);
            this.dog.play(-1);
            
            if(this.db.mainInfoVo.showLevel >= 31 && this.db.mainInfoVo.showLevel <= 36)
            {
                //生成对应的颜色
                ImageUtils.dogColor(this.dog,this.db.mainInfoVo.showLevel);
            }
        }

        private onClick(evt:egret.TouchEvent):void
        {
            //点击狗狗，切换狗
            let imgBtn:morn.Button = evt.currentTarget;

            HttpManager.postHttpByParam(NC.UpdateHomeDogAvatar_Url,{dogGrade:imgBtn.tag},this.UpdateHomeDogAvatar_Url,this);
        }

        private UpdateHomeDogAvatar_Url(dogGrade:string):void
        {
            console.info(dogGrade);
            this.db.mainInfoVo.showLevel = Number(dogGrade);
            //更新当前狗狗头像
            Modules.mainModule.mainView.container.myDogBtn.skin = "main_json.btn_" + this.db.dogsRes.get("dog" + dogGrade);
            //获得当前狗狗的等级
            let url = this.db.dogsRes.get("pet" + this.db.mainInfoVo.showLevel);
            //目前先显示1-5的狗狗吧
            game.MovieMgr.getInstance().load("dog", Session.instance.config.assets + "pet/" + url, new asf.CallBack(this.onLoadMove,this));
        }
        
    }
}