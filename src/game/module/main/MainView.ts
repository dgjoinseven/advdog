namespace game 
{
    /**
     * 游戏主界面
     */
    export class MainView extends View<ui.MainViewUI, any,any>
    {
        static NAME         :string = "mainView";

        /**
         * 狗动画列表
         */
        dogList:MainPetShowView[];
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
        speedControl:SpeedControl;
        /**
         * 专门给宠物做容器的地方
         */
        petContainer:egret.Sprite;
        public constructor()
        {
            super();
            this.lv = mvc.MvcConst.VIEW_LV_0;
            this.layer = mvc.MvcConst.MAIN_LAYER;
            //目前参数写死
            // this.restCheckScope = new egret.Rectangle(619,1159,100,130);
            this.restCheckScope = new egret.Rectangle(600,1159,200,200);
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

            // this.grayBg = new egret.Shape();
            // this.grayBg.graphics.beginFill( 0x000000, 1);
            // this.grayBg.graphics.drawRect( 0, 0, 752, 543);
            // this.grayBg.graphics.endFill();
            // this.grayBg.alpha = 0.5;
            // //放在最底下
            // this.container.addChildAt(this.grayBg,0);
            
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
            // this.container.addEventListener(egret.TouchEvent.TOUCH_END,this.onEndClick,this);
            this.session.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onEndClick,this);


            this.container.mouseEnabled = false;
            this.container.mouseChildren = false;

            this.container.goldLabel.x = 187;
            this.container.goldLabel.y = 455;
            this.container.goldLabel.anchorOffsetX = this.container.goldLabel.width / 2;
            this.container.goldLabel.anchorOffsetY = this.container.goldLabel.height / 2;

            this.speedControl = new SpeedControl(this);
            this.petContainer = new egret.Sprite();
            this.container.addChild(this.petContainer);
            this.container.addChild(this.container.bottomBox);

            this.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
            this.onResize(null); 
            
        }

        protected onResize(e: egret.Event): void 
        {
            console.info("舞台的stage.stageHeight：" + this.stage.stageHeight);
            //子类重写
            this.container.bottomBox.y = this.stage.stageHeight - 145 - this.session.config.mainBottomY;
            this.restCheckScope.y = this.stage.stageHeight - 100 - this.session.config.mainBottomY;
            NC.Main_Pet_OffY = this.stage.stageHeight / 2 - NC.Main_Pet_Pos - 174 + 20;
            //动态计算狗狗的位置
            this.petContainer.y = NC.Main_Pet_OffY;
        }
        /**
         * 更新狗狗每秒产出的金币
         */
        updateTimeDogGold():void
        {
            //除成每秒
            let timeGold = DecimalUtils.div(this.db.currentDogGold,"5");
            //查看是否有倍率
            // if(this.db.speedVo)
            // {
            //     timeGold = DecimalUtils.mul(timeGold,this.db.speedVo.speedGoldCoin);
            // }
            this.container.timeGoldLabel.text = DecimalUtils.goldChange(timeGold) + "/秒";
            // if(num)
            //     this.container.timeGoldLabel.text = num + "/秒";
            // else
            // {
            //     //自己更新vo
                
            // }
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
                this.closeDragDog();
            }
            //清掉状态
            MainPetShowView.selectPet = null;
            //注册唯一点击标记
            MainPetShowView.isClickDog = false;
        }
        /** */
        private closeDragDog():void
        {
            let session = Session.instance;
            if(session.dragDog && session.selectDogUI)
            {
                this.isClick = false;
                this.selectDogUI = null;
                //清除一下选中相关逻辑
                session.selectDogUI.cleanDragInfo();
                session.selectDogUI = null;
                session.closeDragDog();
            }
        }
        /**
         * 合成狗的操作
         */
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
                if(this.session.selectDogUI.dogLv == NC.Feng_Hong_Dog)
                {
                    TipView.showTip("分红犬无法回收");
                }
                else
                {
                    //弹出回收狗的界面
                    mvc.open(RecoverDogView,{dogGrade:this.session.selectDogUI.dogLv,positionId:this.session.selectDogUI.index});
                }
                

                this.session.closeDragDog();
                return ;
            }


            for(let i:number = 1; i <= 12; i++)
            {
                if(i == dragDogUI.index)
                    continue;
                let showUI:MainPetShowView = this.dogList[i];
                var rect2:egret.Rectangle = showUI.checkScope;
                // rect2.y = -NC.Main_Pet_OffY;
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
                                // mvc.open(RandomMergeView,param);
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

            //尝试关闭错误操作的狗狗
            this.closeDragDog();
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
            //播放音效
            SoundMgr.play("lvup",false,true);

            //尝试关闭错误操作的狗狗
            this.closeDragDog();
        }
        /**
         * 更新显示首页的狗狗
         */
        showMainPet():void
        {
            let index:number = 0;
            for(let i:number = 0; i < 3; i++)
            {
                for(let j:number = 0; j < 4; j++)
                {
                    index++;
                    // let showUI:MainPetShowView = new MainPetShowView(index);
                    let showUI:MainPetShowView = this.dogList[index];
                    if(!showUI)
                    {
                        showUI = new MainPetShowView(index);
                        this.dogList[index] = showUI;
                        showUI.x = 116 + j * 170;//116
                        showUI.y = NC.Main_Pet_Pos + 174 + i * 190;//674  200
                        //生成全局检测域
                        showUI.checkScope.x = 30 + j * 170;
                        //需要减去父容器的偏移量
                        showUI.checkScope.y = NC.Main_Pet_Pos + 55 + i * 190 + NC.Main_Pet_OffY;  //180
                        this.petContainer.addChild(showUI);
                    }
                    
                    let lv = this.db.mainInfoVo["position" + index];
                    //首页的狗不为0，并且的和已经存在狗不相等（相等就排除掉）
                    if(lv != 0 && showUI.dogLv != lv)
                    {
                        showUI.update(lv);
                    }

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
            if(this.dogList[postiton])
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
            this.container.gemLabel.text = result.tlbc.toString();
            if(result.tagNum == "0")
            {
                TipView.showTip(this.session.config.lang["new1"],this.onNew1Back,this);
            }
            //离线收益
            else if(result.offlineGoldCoin && result.offlineGoldCoin != "" && result.offlineGoldCoin != "0.0" && result.offlineGoldCoin != "0.00" && result.offlineGoldCoin != "0")
            {
                //每天晚上20点重置视频次数(剩余14次)
                // AlertView.showGooffLine(result.offlineGoldCoin);
                mvc.open(OfflineView);
            }
            mvc.send(NC.Init_Gem,result.tlbcDTO);
            //更新分红数据
            this.container.gainMoneyLabel.text = result.shareTotalAmount;
            this.container.rateLabel.text = Math.floor(Number(result.fhdogProcess) * 100) + "%";
            //更新当前狗狗头像
            this.container.myDogBtn.skin = "main_json.btn_" + this.db.dogsRes.get("dog" + result.maxLevel);
        }

        private onNew1Back():void
        {
            //新手引导，点击了确定和关闭按钮，弹出手指到商店那里
            NewHandHelper.showShopHand(this.container.shopBtn);
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
                //我的狗狗面板
                // mvc.open(MyDogView);
            }
            else if(evt.currentTarget == this.container.jiaSuBtn)
            {
                mvc.open(SpeedUpView);
            }
            // else if(evt.currentTarget == this.container.inviteBtn)
            // {
            //     mvc.open(InviteView);
            // }
            else if(evt.currentTarget == this.container.waterDogBtn)
            {
                // TipView.showTip("该功能尚未开放！");
                //喂水，流程跟狗粮一样
                HttpManager.postHttp(NC.Feedingwater_Url,this.Feedingwater_Url,this);
            }
            else if(evt.currentTarget == this.container.dogBtn)
            {
                // let data:SpeedGoldCoinVo = asf.Global.createAny();
                // data.speedGoldCoin = "2";
                // data.speedTime = "30";
                // this.speedControl.startSpeed(data);
                // return ;
                //喂狗粮加速
                if(this.db.mainInfoVo.dogFoodCount > 0)
                {
                    HttpManager.postHttpByParam(NC.AddSpeedGoldCoin_Url,{addSpeedType:3},this.AddSpeedGoldCoin_Url,this);
                }
                else
                {
                    //弹出提示信息
                    mvc.open(TipDogView,NC.Dog_Food_Video);
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
            else if(evt.currentTarget == this.container.inviteBtn)
            {
                // urls = this.session.config.inviteUrl;
                JSBrigd.getInstance().jumpInvitation();
            }


            if(urls)
            {
                JSBrigd.getInstance().jumpClick(urls[0],urls[1]);
            }
            //尝试关闭错误操作的狗狗
            this.closeDragDog();
        }
        /**
         * 喂水回调接口
         */
        private Feedingwater_Url(data:FeedingwaterVo):void
        {
            if(data.showWind == 1)
            {
                //有水，弹出获得金币的效果，直接更新金币
                this.updateGold(data.goldCoin);
            }
            else
            {
                mvc.open(TipDogView,NC.Water_Video);
                // JSBrigd.getInstance().openShowAd(NC.Water_Video);
            }
        }
        //狗粮使用回调接口
        private AddSpeedGoldCoin_Url(data:SpeedGoldCoinVo):void
        {
            // if(data != "60")
            // {
            //     this.db.mainInfoVo.dogFoodCount--;
            //     //喂粮成功 
            //     TipView.showTip("喂粮成功");
            //     //狗产出加快速度
            // }
            this.speedControl.startSpeed(data);
        }
        
    }
}