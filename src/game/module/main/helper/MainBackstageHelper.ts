namespace game 
{
    /**
     * 主界面的后台执行程序，主要是定时器在定时向服务器拉去数据
     */
    export class MainBackstageHelper extends Helper<MainView,any>
    {
        static NAME:string = "MainBackstageHelper";


        private gemList:GemItem[];
        private miner:egret.MovieClip;
        /**
         * 钻石数据
         */
        private tlbcDTO:TlbcDTOVo;
        private goldList:FlyGold[];
        private maxGoldKey:number = 0;
        private updateGoldKey:number = 0;
        init():void
        {
            console.log("MainBackstageHelper初始化了");
            //监听首页初始化信息
            mvc.once(NC.Init_Gem,this.createAllGem,this);
            //监听广告回调
            mvc.on(NC.AD_CallBack,this.AD_CallBack,this);
            this.goldList = [];
        }
        //1.转盘 2.开宝箱  3 摇一摇  4.喂狗粮食 5.加速 6.金币不足看视频 7普通  8离线双倍
        private AD_CallBack(videoType:string):void
        {
            //稳妥，都转换成字符串
            videoType = String(videoType);
            if(videoType == "6" || videoType == "8")
            {
                HttpManager.postHttp(NC.Select_Gold_Url,this.Select_Gold_Url,this);
            }
            else if(videoType == NC.Speed_Video)
            {
                if(this.session.speedLookVideoData)
                {
                    //处理加速
                    let vo:SpeedGoldCoinVo = asf.Global.createAny();
                    vo.speedGoldCoin = this.session.speedLookVideoData.speedGoldCoin;
                    vo.speedTime = this.session.speedLookVideoData.speedTime;
                    Modules.mainModule.mainView.speedControl.startSpeed(vo);
                    return ;
                }
            }
            else if(videoType == NC.Dog_Food_Video)
            {
                //更新一次狗粮的本地数据
                this.db.mainInfoVo.dogFoodCount++;
            }
        }

        
        private onTimeGogGold():void
        {
            let petList = this.view.dogList;
            let showUI:MainPetShowView;
            let flag = false;
            for(let i:number = 1; i <= 12; i++)
            {
                showUI = petList[i];
                if(showUI.hasDog)
                {
                    //有狗，掉金币
                    let gold = new morn.Image();
                    let flyGold:FlyGold = this.goldList[i];
                    if(!flyGold)
                    {
                        flyGold = new FlyGold(this.view.container);
                        this.goldList[i] = flyGold;
                    }
                    flyGold.fly(showUI.x,showUI.y,400 + i * 50);
                    flag = true;
                }
            }
            //250毫秒之后开始放大缩小金币
            if(flag)
                this.maxGoldKey = asf.App.timeMgr.doOnce(450,this.onMaxGoldEffect,this,this.maxGoldKey);
        }
        private onMaxGoldEffect():void
        {
            //狗狗产生金钱，进行抛物线动画
            egret.Tween.get(this.view.container.goldLabel,{loop:false}).
            to({scaleX:1.3,scaleY:1.3},300,egret.Ease.sineOut).
            to({scaleX:1,scaleY:1},500,egret.Ease.sineIn);
            //50毫秒后变化
            this.updateGoldKey = asf.App.timeMgr.doOnce(50,this.onMaxUpdateGold,this,this.updateGoldKey);
        }
        private onMaxUpdateGold():void
        {
            //增加金币
            let gold = DecimalUtils.add(this.db.mainInfoVo.goldCoinValue,this.db.currentDogGold);
            this.db.mainInfoVo.goldCoinValue = gold + "";
            let goldStr = DecimalUtils.goldChange(gold);
            this.db.mainInfoVo.goldCoin = goldStr;
            //显示
            this.view.updateGold(goldStr);
            //播放获得金钱音效
            SoundMgr.play("money");
        }

        private createGem(value:any,isEvent:boolean = true):ui.GemItemUI
        {
            let gemItem:ui.GemItemUI = new ui.GemItemUI();
            gemItem.numLabel.text = String(value);
            this.gemList.push(new GemItem(gemItem));
            this.view.container.addChild(gemItem);
            if(isEvent)
                gemItem.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
            return gemItem;
        }
        /**
         * 创建水晶列表
         */
        private createAllGem(tlbcDTO:TlbcDTOVo):void
        {
            //启动计时器，主动拉去一些服务器数据
            asf.App.timer.doLoop(120000,this.onMinuteUpdate,this);
            //5秒自动增加一下宠物的金币
            asf.App.timer.doLoop(5000,this.onTimeGogGold,this);
            this.tlbcDTO = tlbcDTO;
            
            
            this.gemList = [];
            let gemItem:ui.GemItemUI;
            if(tlbcDTO.progress == -1)
            {
                gemItem = this.createGem("请实名");
                gemItem.x = 287;
                gemItem.y = 169;
                gemItem.tag = 0;
                return ;
            }
            let i:number = 0;
            while(tlbcDTO.tlbcList.length > 0)
            {
                gemItem = this.createGem(tlbcDTO.tlbcList.shift());
                // let value:number = tlbcDTO.tlbcList.shift();
                // gemItem.numLabel.text = String(value);
                gemItem.x = 287 + i * 72;
                gemItem.y = 169;
                gemItem.tag = i;
                // this.gemList[i] = new GemItem(gemItem);
                // this.view.container.addChild(gemItem);
                // gemItem.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);

                i++;
                if(i >= 5)
                    break;
            }
            this.working();
            // for(let i:number = 0; i < tlbcDTO.tlbcList.length; i++)
            // {
            //     if(i >= 5)
            //         break;
    
            //     //有多少就初始化多少个
            //     let gemItem:ui.GemItemUI = new ui.GemItemUI();
            //     gemItem.numLabel.text = String(tlbcDTO.tlbcList[i]);
            //     // gemItem.x = 353 + i * 72;
            //     // gemItem.y = 170;
            //     gemItem.x = 287 + i * 72;
            //     gemItem.y = 169;
            //     gemItem.tag = i;
            //     this.gemList[i] = new GemItem(gemItem);
            //     this.view.container.addChild(gemItem);
            //     gemItem.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
            // }
            // if(tlbcDTO.tlbcList.length > 0)
            // {
                //初始化矿工
                game.MovieMgr.getInstance().load("miner", Session.instance.config.assets + "effect/miner/miner", new asf.CallBack(this.onLoadMove,this));
            // }
        }
        private onLoadMove(mcData: egret.MovieClipData, name: string, url: string):void
        {
            this.miner = new egret.MovieClip(mcData);
            this.miner.scaleX = this.miner.scaleY = 0.36;
            this.miner.x = 629;
            this.miner.y = 164;
            this.miner.frameRate = 12;
            this.view.container.addChild(this.miner);
            this.miner.play(-1);
        }
        private delIndex:number;
        private onClick(evt:egret.TouchEvent):void
        {
            //提交给服务器
            let gemItem = evt.currentTarget as ui.GemItemUI;
            if(!gemItem)
                return ;
            if(this.tlbcDTO.progress == -1)
            {
                TipView.showTip("请去实名认证");
                return ;
            }
            // gemItem.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
            this.delIndex = gemItem.tag;
            //提交给服务器
            let param:any = {};
            param.tlbcIndex = gemItem.tag;
            HttpManager.postHttpByParam(NC.ReceiveGoldTlbc_Url,param,this.ReceiveGoldTlbc_Url,this);
        }
        private ReceiveGoldTlbc_Url(data:number):void
        {
            //弹出恭喜获得界面
            let currentGem = Number(this.view.container.gemLabel.text) + Number(data);
            this.view.container.gemLabel.text = String(currentGem);
            //删除掉，其他几个往前挪动
            let gemItem:GemItem = this.gemList[this.delIndex];
            //从列表中删除
            this.gemList.splice(this.delIndex,1);
            gemItem.gemItem.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
            gemItem.clear();
            if(this.tlbcDTO.tlbcList.length > 0)
                this.createGem(this.tlbcDTO.tlbcList.shift());
            //因为删除和添加过，重新绑定索引
            for(let i:number = 0; i < this.gemList.length; i++)
            {
                gemItem = this.gemList[i];
                gemItem.gemItem.tag = i;
                // gemItem.gemItem.x = 353 + i * 72;
                // gemItem.gemItem.y = 170;
                gemItem.gemItem.x = 287 + i * 72;
                gemItem.gemItem.y = 169;
            }
            this.working();
        }
        /**
         * 显示正在挖矿中
         */
        private working():void
        {
            if(this.gemList.length == 0)
            {
                //一个都没有，显示正在挖矿中的
                let gemItem = this.createGem("采挖" + this.tlbcDTO.progress * 100 + "%");
                gemItem.x = 287;
                gemItem.y = 169;
            }
        }
        /**
         * 目前2分钟自动同步一次服务器的相关数据
         */
        private onMinuteUpdate():void
        {
            //更新用户的金币
            HttpManager.postHttp(NC.Select_Gold_Url,this.Select_Gold_Url,this);
        }
        /**
         * 2分钟同步一次服务器的总金币数量
         */
        private Select_Gold_Url(data:SelectGoldCoinVo):void
        {
            this.view.updateGold(data.goldCoin);
            this.db.mainInfoVo.goldCoinValue = data.goldCoinValue;
            //更新挖矿进度
            this.tlbcDTO.progress = data.progress;
            this.working();
            //这里先做放大缩小的动画效果
            ////播放金币变化音效
            // SoundMgr.play("money.wav");
        }
    }
}