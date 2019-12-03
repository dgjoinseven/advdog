namespace game 
{
    /**
     * 游戏主界面
     */
    export class ShopView extends View<ui.ShopUI, any,any>
    {
        static NAME         :string = "ShopView";

        private shopItems:ui.ShopItemUI[];

        private mouseX:number;
        private mouseY:number;
        private dogCount:number;
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
            this.initContainer(new ui.ShopUI(), completeCallback);
        }

        init() 
        {
            console.info("ShopView初始化完成");
            HttpManager.postHttp(NC.Shop_Url,this.onPostHttp,this);
            //目前没接口，本地模拟
            // for(let i:number = 0; i < 3; i++)
            // {
            //     let item = new ui.ShopItemUI();
            //     item.x = 143;
            //     item.y = 388 + i * (20 + 160);
            //     this.container.addChild(item);
            // }
            this.showGrayBg();
        }

        onClose():void
        {
            HttpManager.clearUrl(NC.Shop_Url);
            if(this.shopItems)
            {
                for(let i:number = 0; i < this.shopItems.length; i++)
                {
                    let item = this.shopItems[i];
                    item.bugBtn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
                }
                this.shopItems = [];
            }
        }

        private onPostHttp(data:DogSupermarketDTOVo):void
        {
            if(!this.container)
                return ;
            this.shopItems = [];
            this.db.shopDogVoList = data.lists;
            let dataList = data.lists;
            
            this.container.goldLabel.text = data.goldCoin;
            //狗锁住的最小等级
            let lockMin:number = 2;
            let selectIndex:number = 0;
            //生成狗的列表
            for(let i:number = 0; i < dataList.length; i++)
            {
                let item = new ui.ShopItemUI();
                this.shopItems.push(item);
                // item.x = 143;
                // item.y = 388 + i * (20 + 160);
                // this.container.addChild(item);
                // item.x = 5 + 33;
                // item.y = 5 + i * (20 + 160);
                item.x = 30;
                item.y = 10 + i * (20 + 156);
                this.container.panel.addChild(item);
                
                let petVo = dataList[i];

                // this.db.shopDB.updateDogItem(petVo);

                // (1)  Math.ceil(等级/5) = 狗狗的形象（1-6）
                // (2)  等级%5 = 狗狗的星星
                // (3)  等级大于30级，为高级狗狗，等级%7 有7种颜色
                // (4)  等级大于等于38级的时候，根据属性判断红包，分红，碎片犬

                //todo 高级狗需要改算法
                if(petVo.dogGradeId <= 30)
                {
                    let star = PetUtls.getDogStar(petVo.dogGradeId);
                    item.starLabel.text = star + "星";
                }
                else
                {
                    item.starLabel.text = "";
                }
                item.dogImg.skin = "main_json." + this.db.dogsRes.get("shop" + petVo.dogGradeId);
                item.nameLabel.text = petVo.dogLevelName;
                item.indexLabel.text = String(i + 1);
                

                ImageUtils.tryDogColor(item.dogImg,petVo.dogGradeId);
        
                item.bugBtn.mouseEnabled = true;
                item.bugBtn.labelMargin = "30,0,0,0";
                // item.bugBtn.getLabel().align = "right";
                
                //判断是使用金币还是使用
                if(petVo.isBuyGoldcoin == 1)
                {
                    item.bugBtn.skin = "main_json.btn_shop_gold";
                    item.bugBtn.label = String(petVo.currentPrice);
                    if(petVo.dogGradeId > lockMin)
                    {
                        lockMin = petVo.dogGradeId;
                        selectIndex = i - 1;
                        if(selectIndex < 0)
                            selectIndex = 0;
                    }
                }
                else if(petVo.isBuyTlbc == 1)
                {
                    item.bugBtn.skin = "main_json.btn_shop_gem";
                    item.bugBtn.label = String(petVo.tlbcPrice);
                }
                else
                {
                    item.bugBtn.skin = "main_json.btn_shop_close";
                    item.bugBtn.mouseEnabled = false;
                    item.bugBtn.label = "";
                    item.dogImg.gray = true;
                }
                item.bugBtn.tag = petVo; 
                //弹起的时候就买
                item.bugBtn.addEventListener(egret.TouchEvent.TOUCH_END,this.onClick,this);
            }
            // this.container.panel.vScrollBar.value = 1700;
            // selectIndex = 10;
            
            //判断是否处于新手引导状态
            if(this.db.mainInfoVo.tagNum == "0")
            {
                let firtItem:ui.ShopItemUI = this.shopItems[0];
                NewHandHelper.showBuyDog(firtItem.bugBtn);
                this.mvcOn(NC.New_Hand_Buy_Dog,this.onClick,this);
                this.dogCount = 0;
            }//非新手引导状态才会跳转商店宠物
            else if(selectIndex != 0)
                this.container.panel.vScrollBar.scrollToValue(5 + selectIndex * (20 + 160));
        }
        private selectButton:morn.Button;
        private onClick(evt:egret.TouchEvent):void
        {
            // if(evt.target instanceof morn.Button)
            // {
            //     console.info("11111");
            // }
            this.mouseX = evt.$stageX;
            this.mouseY = evt.$stageY;
            //进行购买
            this.selectButton = evt.currentTarget;
            let petVo:ShopPetVo = this.selectButton.tag;
            if(petVo)
            {
                //买狗的位置
                let local = this.db.getBuyBogLocal();
                if(local == 0)
                {
                    console.log("位置已经满了，不能买狗");
                    TipView.showTip(TipConst.Shop_Dog_Full);
                    return ;
                }
                let param:any = {};
                param.dogGrade = petVo.dogGradeId;
                param.toPositionId = local;
                if(petVo.isBuyGoldcoin)
                {
                    param.goldCoin = petVo.currentPrice;
                    HttpManager.postHttpByParam(NC.BuyDog_Url,param,this.onBuyDog,this);
                }
                else
                {
                    // param.tlbcValue = petVo.currentPrice;
                    HttpManager.postHttpByParam(NC.BuyGemDog_Url,param,this.onBuyDog,this);
                }
            }
            else
            {
                console.log("商店没有宠物数据，无法购买");
            }
        }
        private onBuyDog(data:BuyDogByTlbcVo):void
        {
            //发送事件出去
            console.log(data);
            if(data.goldCoin)
            {
                 mvc.send(NC.Update_Gold,data.goldCoin);
                 this.container.goldLabel.text = data.goldCoin;
            }
            else
            {
                mvc.send(NC.Update_Tlbc,data.tlbcValue);
            }
            Modules.mainModule.addDog(data.dogGradeId,data.positionId);
                
            if(data.goldCoinValue)
                this.db.mainInfoVo.goldCoinValue = data.goldCoinValue;

            this.db.updateDogGold(data.dogGradeId,true);
            // let timeGold = DecimalUtils.div(this.db.currentDogGold,"5");
            // timeGold = DecimalUtils.goldChange(timeGold);
            Modules.mainModule.mainView.updateTimeDogGold();
            //更新当前狗狗价格
            if(this.selectButton)
            {
                let petVo:ShopPetVo = this.selectButton.tag;
                if(data.currentPrice && data.currentPrice != "")
                {
                    petVo.currentPrice = data.currentPrice;
                    this.selectButton.label = data.currentPrice;
                }
            }
            //播放特效
            EffectUtls.playGoldEffect(this.mouseX,this.mouseY);

            if(this.db.mainInfoVo.tagNum == "0")
            {
                this.dogCount++;
                if(this.dogCount >=2)
                {
                    NewHandHelper.clearState();
                    //买了2只狗，关闭商店了
                    this.close();
                    //出现拖动狗狗的新手引导
                    NewHandHelper.newHandMerge(Modules.mainModule.mainView);
                }
            }
        }
    }
}