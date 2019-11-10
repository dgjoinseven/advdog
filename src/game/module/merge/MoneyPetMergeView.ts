namespace game 
{
    /**
     * 游戏主界面
     */
    export class MoneyPetMergeView extends View<ui.MoneyPetMergeUI, any,any>
    {
        static NAME         :string = "MonyPetMergeView";

        private fiveMap:asf.HashMap<number,number>;
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
            console.info("InviteView初始化完成");
            for(let j:number = 38; j <= 42; j++)
            {
                let img:morn.Image = this.container["img" + j];
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
                    this.container["img" + dogLv].gray = false;
                }
            }
            //有5只
            if(this.fiveMap.size() >= 5)
            {
                this.container.mergeBtn.gray = false;
                this.addButtonEvent(this.container.mergeBtn,this.onClick,this);
            }
            this.showGrayBg();
        }

        private onClick(evt:egret.TouchEvent):void
        {
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
            //直接调用主界面的合成狗狗的方法，统一处理
            Modules.mainModule.mainView.onMergeDog(data);
        }
    }
}