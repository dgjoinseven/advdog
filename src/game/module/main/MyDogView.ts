namespace game 
{
    /**
     * 我的狗狗主界面
     */
    export class MyDogView extends View<ui.MyDogUI, any,any>
    {
        static NAME         :string = "MyDogView";

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
            let url = this.db.dogsRes.get("pet" + this.db.mainInfoVo.showLevel)
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