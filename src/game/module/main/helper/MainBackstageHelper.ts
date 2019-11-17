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
        /**
         * 5秒狗加金币事件
         */
        private fiveDogGoldKey:number = 0;
        /**
         * 固定在那里的
         */
        private workingGen:GemItem;
        /**
         * 是否处于需要实名的状态
         */
        private isShiming:boolean;

        init():void
        {
            console.log("MainBackstageHelper初始化了");
            //监听首页初始化信息
            mvc.once(NC.Init_Gem,this.createAllGem,this);
            //监听广告回调
            mvc.on(NC.AD_CallBack,this.AD_CallBack,this);
            //监听加速事件
            // mvc.on(NC.Add_Speed_Gold,this.Add_Speed_Gold,this);
            //监听结束加速事件
            // mvc.on(NC.End_Add_Speed_Gold,this.End_Add_Speed_Gold,this);
            //监听app那边回调过来
            mvc.on(NC.App_Update_Gold,this.App_Update_Gold,this);
            this.goldList = []; 
        }
        private App_Update_Gold(data:string):void
        {
            // this.db.mainInfoVo.goldCoin = DecimalUtils.goldChange(data);
            this.db.mainInfoVo.goldCoin = data;
            //总金币变大效果
            // egret.Tween.get(this.view.container.goldLabel,{loop:false}).
            // to({scaleX:1.3,scaleY:1.3},300,egret.Ease.sineOut).
            // to({scaleX:1,scaleY:1},500,egret.Ease.sineIn);
            // //50毫秒后变化
            // this.updateGoldKey = asf.App.timeMgr.doOnce(50,this.onAppUpdateGold,this,this.updateGoldKey);
            //走回以前的5秒出发狗的流程
            this.onTimeGogGold();
        }
        private onAppUpdateGold():void
        {
            //显示
            this.view.updateGold(this.db.mainInfoVo.goldCoin);
            //播放获得金钱音效
            SoundMgr.play("money");
        }
        private Add_Speed_Gold(data:SpeedGoldCoinVo):void
        {
            // asf.App.timeMgr.clearTimer(this.fiveDogGoldKey);
            //加速
            let time = 5000 / Number(data.speedGoldCoin);
            this.fiveDogGoldKey = asf.App.timeMgr.doLoop(time,this.onTimeGogGold,this,this.fiveDogGoldKey);
        }
        private End_Add_Speed_Gold():void
        {
            //恢复5秒
            asf.App.timeMgr.doLoop(5000,this.onTimeGogGold,this,this.fiveDogGoldKey);
        }
        //1.转盘 2.开宝箱  3 摇一摇  4.喂狗粮食 5.加速 6.金币不足看视频 7普通  8离线双倍
        private AD_CallBack(videoType:string):void
        {
            //稳妥，都转换成字符串
            videoType = String(videoType);
            //商店、离线、喂水的金币不足
            if(videoType == NC.Shop_Video || videoType == NC.OffLine_Video || videoType == NC.Water_Video)
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
            //450毫秒之后开始放大缩小金币
            if(flag)
                this.maxGoldKey = asf.App.timeMgr.doOnce(450,this.onMaxGoldEffect,this,this.maxGoldKey);
        }
        private onMaxGoldEffect():void
        {
            //总金币变大效果
            egret.Tween.get(this.view.container.goldLabel,{loop:false}).
            to({scaleX:1.3,scaleY:1.3},300,egret.Ease.sineOut).
            to({scaleX:1,scaleY:1},500,egret.Ease.sineIn);
            //50毫秒后变化
            this.updateGoldKey = asf.App.timeMgr.doOnce(50,this.onMaxUpdateGold,this,this.updateGoldKey);
        }
        private onMaxUpdateGold():void
        {
            //增加金币
            // let gold = DecimalUtils.add(this.db.mainInfoVo.goldCoinValue,this.db.currentDogGold);
            // this.db.mainInfoVo.goldCoinValue = gold + "";
            // let goldStr = DecimalUtils.goldChange(gold);
            // this.db.mainInfoVo.goldCoin = goldStr;
            //显示
            this.view.updateGold(this.db.mainInfoVo.goldCoin);
            //播放获得金钱音效
            SoundMgr.play("money");
        }

        private addNewGem(value:any):void
        {
            let last:GemItem = this.gemList[this.gemList.length - 1];
            if(last)
            {
                
            }
            else
            {
                this.createGem(value);
            }
        }
        private createGem(value:any,isEvent:boolean = true,isAdd:boolean = true):GemItem
        {
            //如果最后一个
            let gemItem:ui.GemItemUI = new ui.GemItemUI();
            gemItem.numLabel.text = String(value);
            let item:GemItem = new GemItem(gemItem);
            if(isAdd)
                this.gemList.push(item);
            this.view.container.addChild(gemItem);
            if(isEvent)
                gemItem.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
            return item;
        }
        /**
         * 创建水晶列表
         */
        private createAllGem(tlbcDTO:TlbcDTOVo):void
        {
            //启动计时器，主动拉去一些服务器数据
            asf.App.timeMgr.doLoop(300000,this.onMinuteUpdate,this);
            // asf.App.timeMgr.doLoop(2000,this.onMinuteUpdate,this);
            //5秒自动增加一下宠物的金币
            if(this.session.config.isClientUpdateGold)
                this.fiveDogGoldKey = asf.App.timeMgr.doLoop(5000,this.onTimeGogGold,this);

            this.tlbcDTO = tlbcDTO;
            
            
            this.gemList = [];
            let gemItem:GemItem;
            let tile:string;
            if(tlbcDTO.progress == -1)
            {
                gemItem = this.createGem("请实名",true,false);
                //实名是9999
                gemItem.gemItem.tag = 9999;
                gemItem.gemItem.x = 287;
                gemItem.gemItem.y = 169;
                this.workingGen = gemItem;
                this.isShiming = true;
                return ;
            }
            else
            {
                //创建挖矿中
                gemItem = this.createGem(this.getWorkTitle(),false,false);
                gemItem.gemItem.x = 287;
                gemItem.gemItem.y = 169;
            }
            this.workingGen = gemItem;
            
            // //第一个永远都是采集中
            // let i:number = 1;
            // while(tlbcDTO.tlbcList.length > 0)
            // {
            //     gemItem = this.createGem(tlbcDTO.tlbcList.shift());
            //     gemItem.gemItem.x = 287 + i * 72;
            //     gemItem.gemItem.y = 169;
            //     gemItem.gemItem.tag = i - 1;
            //     i++;
            //     //只能放个了
            //     if(i >= 5)
            //         break;
            // }
            // this.working();
            //更新钻石列表
            this.updateGemList();
            //初始化矿工
            game.MovieMgr.getInstance().load("miner", Session.instance.config.assets + "effect/miner/miner", new asf.CallBack(this.onLoadMove,this));
        }
        /**
         * 获得正在挖矿的标题
         */
        private getWorkTitle():string
        {
            return "采挖" + this.tlbcDTO.progress * 100 + "%";
        }
        //挖矿工人初始化
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
                // TipView.showTip("请去实名认证");
                //跳转到app的实名认证
                // JSBrigd.getInstance().jumpClick(this.session.config.shimingUrl[0],this.session.config.shimingUrl[1]);
                JSBrigd.getInstance().jumpShiMing();
                return ;
            }
            //挖矿中
            if(gemItem.tag == 10000)
            {
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
            // let currentGem = Number(this.view.container.gemLabel.text) + Number(data);
            // this.view.container.gemLabel.text = String(Math.floor(currentGem * 1000) / 1000);
            this.view.container.gemLabel.text = String(data);
            //删除掉，其他几个往前挪动
            let gemItem:GemItem = this.gemList[this.delIndex];
            //数组也要删除掉一个，随便删除一个
            this.tlbcDTO.tlbcList.shift();
            //从列表中删除
            this.gemList.splice(this.delIndex,1);
            gemItem.gemItem.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
            gemItem.clear();
            // if(this.tlbcDTO.tlbcList.length > 0)
            //     this.createGem(this.tlbcDTO.tlbcList.shift());
            // //因为删除和添加过，重新绑定索引
            // for(let i:number = 0; i < this.gemList.length; i++)
            // {
            //     gemItem = this.gemList[i];
            //     gemItem.gemItem.tag = i;
            //     // gemItem.gemItem.x = 353 + i * 72;
            //     // gemItem.gemItem.y = 170;
            //     gemItem.gemItem.x = 287 + (i + 1)  * 72;
            //     gemItem.gemItem.y = 169;
            // }
            // this.working();
            this.updateGemList();
        }
        /**
         * 全部重新初始化一次
         */
        private updateGemList():void
        {
            let tlbcDTO = this.tlbcDTO;
            if(!tlbcDTO.tlbcList || tlbcDTO.tlbcList.length == 0)
                return;
            let i:number = 0;
            let gemItem;
            for(let i:number = 0; i < tlbcDTO.tlbcList.length; i++)
            {
                gemItem = this.gemList[i];
                if(!gemItem)
                    gemItem = this.createGem(tlbcDTO.tlbcList[i]);
                //重新排一下位置
                gemItem.gemItem.x = 287 + 72 + i * 72;
                gemItem.gemItem.y = 169;
                gemItem.gemItem.tag = i;
                //只能放个了
                if(i >= 4)
                    break;
            }
        }
        /**
         * 显示正在挖矿中
         */
        private working():void
        {
            // let isNeed:boolean = false;
            // let gemItem:ui.GemItemUI;
            // if(this.gemList.length > 0)
            // {
            //     //查看是否已经添加了挖矿中的数据
            //     for(let i:number = 0; i < this.gemList.length; i++)
            //     {
            //         gemItem = this.gemList[i].gemItem;
            //         //已经有了就不需要了
            //         if(gemItem.tag == 10000)
            //         {
            //             isNeed = false;
            //             break;
            //         }
            //     }
            // }
            //不满足5个，始终都要显示一个挖矿中
            // if(this.gemList.length == 0 && this.tlbcDTO.progress != -1)
            // {
            //     //一个都没有，显示正在挖矿中的
            //     let gemItem = this.createGem("采挖" + this.tlbcDTO.progress * 100 + "%");
            //     gemItem.x = 287 + (this.gemList.length - 1) * 72;
            //     gemItem.y = 169;
            //     //目前定义1w
            //     gemItem.tag = 10000;
            // }
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
            this.tlbcDTO = data.tlbcDTO;
            if(this.tlbcDTO.progress != -1)
            {
                //更新挖矿进度
                this.workingGen.gemItem.numLabel.text = this.getWorkTitle();
            }
            //检测一下钻石的数量
            this.updateGemList();
            // if(data.tlbcDTO.tlbcList && data.tlbcDTO.tlbcList.length > 0)
            // {
            //     if((this.gemList.length != data.tlbcDTO.tlbcList.length) || 
            //     ((this.gemList.length == data.tlbcDTO.tlbcList.length) && this.gemList.length == 1))
            //     {
            //         //肯定多加一个啦
            //         this.createGem(data.tlbcDTO.tlbcList[data.tlbcDTO.tlbcList.length - 1]);
            //         //因为删除和添加过，重新绑定索引
            //         for(let i:number = 0; i < this.gemList.length; i++)
            //         {
            //             let gemItem = this.gemList[i];
            //             gemItem.gemItem.tag = i;
            //             gemItem.gemItem.x = 287 + i * 72;
            //             gemItem.gemItem.y = 169;
            //         }
            //     }

            // }
            // this.working();
            //这里先做放大缩小的动画效果
            ////播放金币变化音效
            // SoundMgr.play("money.wav");
        }
    }
}