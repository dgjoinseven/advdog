namespace game 
{
    /**
     * 游戏主界面
     */
    export class RandomMergeView extends View<ui.RamdomMergePetUI, any,any>
    {
        static NAME         :string = "RandomMergeView";

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
            this.container.startBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
            this.showGrayBg();
        }
        private onClick(evt:egret.TouchEvent):void
        {
            if(evt.currentTarget == this.container.startBtn)
            {
                //合成
                HttpManager.postHttpByParam(NC.Merge_Dog_Url,this.openParam,this.onMergeDog,this);
            }
            else
            {
                this.close();
            }
        }
        private onMergeDog(data:DogMergeDTOVo):void
        {
            console.info("37狗合成成功");
            this.close();
            //根据结构显示
            Modules.mainModule.mainView.onMergeDog(data);
        }
        // onOpen(param:number): void 
        // {
        //     HttpManager.postHttpByParam(NC.AddSpeedGoldCoin_Url,param,this.AddSpeedGoldCoin_Url,this);
		// }
    }
}