namespace game 
{
    /**
     * 游戏主界面
     */
    export class MainView extends View<ui.MainViewUI, any,any>
    {
        static NAME         :string = "mainView";


        private dogList:MainPetShowView[];
        /**
         * 是否点击
         */
        private isClick:boolean;
        private selectDogUI:MainPetShowView;
        /**
         * 垃圾桶检测域，用来碰撞检测
         */
        private restCheckScope:egret.Rectangle;
        /**
         * 合成狗的等级
         */
        private mergeDogLv:number;
        public constructor()
        {
            super();
            this.lv = mvc.MvcConst.VIEW_LV_0;
            this.layer = mvc.MvcConst.MAIN_LAYER;
            //目前参数写死
            this.restCheckScope = new egret.Rectangle(619,1159,100,130);
            //预加载了就不需要设置
            // this.setUIRes("main");
        }

        public initLayoutJson(completeCallback: asf.CallBack): void
        {
            this.initContainer(new ui.MainViewUI(), completeCallback);
        }

        init() 
        {
            console.info("MainView初始化完成");
            
            this.dogList = [];

            this.container.steupBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
            this.container.imgDogBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
            this.container.shopBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
            this.container.transferBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
            this.container.myDogBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
            this.container.jiaSuBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
            this.container.inviteBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
            this.container.restBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
            this.container.dogBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
            this.container.waterDogBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
            this.container.howBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
            this.container.activityBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
            this.container.msgBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
            this.container.fenHongBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);

            //请求首页的相关数据
            // game.HttpManager.requestMain(this.onMainResult,this);
            HttpManager.postHttp("api/getHomePage",this.onMainResult,this);

            this.mvcOn(NC.Merger_Dog,this.onMergerEvent,this);

            //注册拖动相关的处理
            // this.container.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onBeginClick,this);
            this.container.addEventListener(egret.TouchEvent.TOUCH_END,this.onEndClick,this);


            this.container.mouseEnabled = false;
            this.container.mouseChildren = false;
      
        }
        /**
         * 更新狗狗每秒产出的金币
         */
        updateTimeDogGold(num:string | number):void
        {
            this.container.timeGoldLabel.text = num + "/秒";
        }

        private onEndClick(evt:egret.TouchEvent):void
        {
            // this.container.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.onBeginClick,this);
            // this.container.removeEventListener(egret.TouchEvent.TOUCH_END,this.onEndClick,this);
            let session = Session.instance;
            console.log("main view 点击结束了:" + session.dragDog);
            if(session.dragDog && session.selectDogUI)
            {
                //有拖动的狗，进行碰撞检测
                mvc.send(NC.Merger_Dog,session.selectDogUI);
                this.isClick = false;
                this.selectDogUI = null;
                //清除一下选中相关逻辑
                session.selectDogUI.cleanDragInfo();
                session.selectDogUI = null;
                session.closeDragDog();
            } 
        }

        private onMergerEvent(dragDogUI:MainPetShowView):void
        {
            let dragDog = this.session.dragDogContainer;
            
        
            if(!this.session.selectDogUI)
                return ;
           
           console.log("触发拖动狗狗的算法");

           //先检测是否垃圾回收
            if(this.restCheckScope.contains(dragDog.x,dragDog.y))
            {
                console.log("触发回收狗狗");
                //弹出回收狗的界面
                mvc.open(RecoverDogView,{dogGrade:this.session.selectDogUI.dogLv,positionId:this.session.selectDogUI.index});

                this.session.closeDragDog();
                return ;
            }


            for(let i:number = 1; i <= 12; i++)
            {
                if(i == dragDogUI.index)
                    continue;
                let showUI:MainPetShowView = this.dogList[i];
                var rect2:egret.Rectangle = showUI.checkScope;
                //看下鼠标在不在这个范围
                //判断是否这个点是否在这个范围内
                if(rect2.contains(dragDog.x,dragDog.y))
                {
                    console.log("碰撞到了");
                    let param:any = {};
                    param.fromPositionId = dragDogUI.index;
                    param.toPositionId = showUI.index;
                    //进行狗的合成
                    if(showUI.hasDog)
                    {
                        //如果是
                        if(dragDogUI.isFiveCerealsDog() && showUI.isFiveCerealsDog())
                        {
                            //都是5福犬，判断是否满足5福犬的合成条件
                            mvc.open(MoneyPetMergeView,showUI.index);
                            return ;
                        }
                        //判断狗的等级是否一样
                        if(dragDogUI.dogLv == showUI.dogLv)
                        {
                            console.log("狗狗合成:" + showUI.dogLv);
                            this.mergeDogLv = showUI.dogLv;
                            param.dogLevel = dragDogUI.dogLv;
                            if(showUI.dogLv == 37)
                            {
                                //随机合成五福
                                mvc.open(RandomMergeView,param);
                            }
                            else
                            {
                                //合成
                                HttpManager.postHttpByParam(NC.Merge_Dog_Url,param,this.onMergeDog,this);
                            }
                            
                        }
                        else
                        {
                            //交换位置
                            param.fromDogLevel  = dragDogUI.dogLv;
                            param.toDogLevel = showUI.dogLv;
                            HttpManager.postHttpByParam(NC.Change_Dog_Position_Url,param,this.Change_Dog_Position_Url,this);
                        }
                    }
                    else
                    {
                        //没有狗就是改变位置
                        param.fromDogLevel  = dragDogUI.dogLv;
                        param.toDogLevel = 0;
                        HttpManager.postHttpByParam(NC.Change_Dog_Position_Url,param,this.Change_Dog_Position_Url,this);
                    }
                }

            }
        }
        /**
         * 交换狗狗的结果
         */
        private Change_Dog_Position_Url(data:DogChangePositionVo):void
        {
            //两个位置的狗分别初始化
            let showUI:MainPetShowView = this.dogList[data.fromPositionId];
            if(showUI)
            {
                if(data.fromDogGradeId == 0)
                    showUI.closeDog();
                else
                    showUI.update(data.fromDogGradeId);
            }
            showUI = this.dogList[data.toPositionId];
            if(showUI)
            {
                showUI.update(data.toDogGradeId);
            }
        }
        /**
         * 合成狗的回调，会被别的地方进行回调的
         */
        onMergeDog(data:DogMergeDTOVo):void
        {
            console.log("合成狗成功了");
            //原来位置的狗肯定销毁
            let dogUI:MainPetShowView;
            if(data.fromPositionId && data.fromPositionId != 0)
            {
                dogUI = this.dogList[data.fromPositionId];  
                dogUI.closeDog();
            }
            else if(data.strfromPositionId && data.strfromPositionId != "0")
            {
                let delIds:string[] = data.strfromPositionId.split(",");
                for(let i:number = 0; i < delIds.length; i++)
                {
                    dogUI = this.dogList[Number(delIds[i])]; 
                    if(dogUI)
                        dogUI.closeDog();
                }
            }
            if(data.toPositionId != 0)
            {
                dogUI = this.dogList[data.toPositionId];  
                //被交换的位置合成新的狗
                dogUI.update(data.mergeLevel);
                dogUI.showEffect(data.mergeLevel);
            }
            //根据合成狗显示不同的特效
        }

        private showMainPet():void
        {
            let index:number = 0;
            for(let i:number = 0; i < 3; i++)
            {
                for(let j:number = 0; j < 4; j++)
                {
                    index++;
                    let showUI:MainPetShowView = new MainPetShowView(index);
                    this.dogList[index] = showUI;
                    showUI.x = 116 + j * 170;//116
                    showUI.y = 674 + i * 200;//674
                    //生成全局检测域
                    showUI.checkScope.x = 30 + j * 170;
                    showUI.checkScope.y = 555 + i * 180;
                    let lv = this.db.mainInfoVo["position" + index]
                    if(lv != 0)
                    {
                        showUI.update(lv);
                    }
                    this.container.addChild(showUI);
                }
            }
        }
        /**
         * 添加一直狗
         */
        addDog(dogLv:number,postiton:number):void
        {
            this.dogList[postiton].update(dogLv);
        }
        /**
         * 删除指定位置的狗
         */
        removeDog(postiton:number):void
        {
            this.dogList[postiton].closeDog();
        }
        /**
         * 更新当前金币总量
         */
        updateGold(gold:string):void
        {
            this.db.mainInfoVo.goldCoin = gold;
            if(this.container)
                this.container.goldLabel.text = gold;
        }
        /**
         * 更新钻石
         */
        updateGem(gem:number):void
        {
            this.db.mainInfoVo.tlbc = gem;
            if(this.container)
                this.container.gemLabel.text = String(gem);
        }
        /**
         * 返回服务器的数据
         */
        private onMainResult(result:MainInfoVo)
        {
            this.container.mouseEnabled = true;
            this.container.mouseChildren = true;

            // console.info(DecimalUtils.goldChange(result.goldCoinValue));

            this.db.mainInfoVo = result;
            this.showMainPet();
            //初始化相关的界面值
            this.container.goldLabel.text = result.goldCoin;
            this.container.gainMoneyLabel.text = result.shareTotalAmount;
            this.container.gemLabel.text = result.tlbc.toString();
            //离线收益
            if(result.offlineGoldCoin && result.offlineGoldCoin != "" && result.offlineGoldCoin != "0.0" && result.offlineGoldCoin != "0.00" && result.offlineGoldCoin != "0")
            {
                //每天晚上20点重置视频次数(剩余14次)
                // AlertView.showGooffLine(result.offlineGoldCoin);
                mvc.open(OfflineView);
            }
            mvc.send(NC.Init_Gem,result.tlbcDTO);
        }

        private onClick(evt:egret.TouchEvent):void
        {
            let urls:string[];
            if(evt.currentTarget == this.container.steupBtn)
            {
                mvc.open(SetupView);
            }
            else if(evt.currentTarget == this.container.imgDogBtn)
            {
                mvc.open(DiagramView);
            }
            else if(evt.currentTarget == this.container.shopBtn)
            {
                mvc.open(ShopView);
            }
            else if(evt.currentTarget == this.container.transferBtn)
            {
                mvc.open(TransterView);
            }
            else if(evt.currentTarget == this.container.myDogBtn)
            {
                mvc.open(MyDogView);
            }
            else if(evt.currentTarget == this.container.jiaSuBtn)
            {
                mvc.open(SpeedUpView);
            }
            else if(evt.currentTarget == this.container.inviteBtn)
            {
                mvc.open(InviteView);
            }
            else if(evt.currentTarget == this.container.waterDogBtn)
            {
                TipView.showTip("该功能尚未开放！");
            }
            else if(evt.currentTarget == this.container.dogBtn)
            {
                //喂狗粮加速
                if(this.db.mainInfoVo.dogFoodCount > 0)
                {
                    HttpManager.postHttpByParam(NC.AddSpeedGoldCoin_Url,{addSpeedType:3},this.AddSpeedGoldCoin_Url,this);
                }
                else
                {
                    //弹出提示信息
                    mvc.open(TipDogView);
                }
            }
            else if(evt.currentTarget == this.container.howBtn)
            {
                urls = this.session.config.howGameUrl;
            }
            else if(evt.currentTarget == this.container.activityBtn)
            {
                urls = this.session.config.activeUrl;
            }
            else if(evt.currentTarget == this.container.msgBtn)
            {
                urls = this.session.config.msgUrl;
            }
            else if(evt.currentTarget == this.container.fenHongBtn)
            {
                urls = this.session.config.fenHongUrl;
            }

            if(urls)
            {
                JSBrigd.getInstance().jumpClick(urls[0],urls[1]);
            }
        }
        //狗粮使用回调接口
        private AddSpeedGoldCoin_Url(data):void
        {
            if(data != "60")
            {
                this.db.mainInfoVo.dogFoodCount--;
                //喂粮成功 
                TipView.showTip("喂粮成功");
                //狗产出加快速度
            }
        }
    }
}