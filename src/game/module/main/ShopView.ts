namespace game 
{
    /**
     * 游戏主界面
     */
    export class ShopView extends View<ui.ShopUI, any,any>
    {
        static NAME         :string = "ShopView";

        private shopItems:ui.ShopItemUI[];
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
            //生成狗的列表
            for(let i:number = 0; i < dataList.length; i++)
            {
                let item = new ui.ShopItemUI();
                this.shopItems.push(item);
                // item.x = 143;
                // item.y = 388 + i * (20 + 160);
                // this.container.addChild(item);
                item.x = 5 + 33;
                item.y = 5 + i * (20 + 160);
                this.container.panel.addChild(item);
                
                let petVo = dataList[i];

                // this.db.shopDB.updateDogItem(petVo);

                // (1)  Math.ceil(等级/5) = 狗狗的形象（1-6）
                // (2)  等级%5 = 狗狗的星星
                // (3)  等级大于30级，为高级狗狗，等级%7 有7种颜色
                // (4)  等级大于等于38级的时候，根据属性判断红包，分红，碎片犬

                //todo 高级狗需要改算法
                let star = PetUtls.getDogStar(petVo.dogGradeId);
                
                item.skin = "main_json." + this.db.dogsRes.get("shop" + petVo.dogGradeId);
                item.starLabel.text = star + "星";
                item.indexLabel.text = String(i + 1);
                item.nameLabel.text = petVo.dogLevelName;
                // if(petVo.isLock == 0)
                // {
                //     item.bugBtn.skin = "main_json.btn_shop_close";
                //     item.bugBtn.mouseEnabled = false;
                // }
                // else
                // {
                    item.bugBtn.mouseEnabled = true;
                    item.bugBtn.label = String(petVo.currentPrice);
                    //判断是使用金币还是使用
                    if(petVo.isBuyGoldcoin == 1)
                    {
                        item.bugBtn.skin = "main_json.btn_shop_gold";
                    }
                    else if(petVo.isBuyTlbc == 1)
                    {
                        item.bugBtn.skin = "main_json.btn_shop_gem";
                    }
                    else
                    {
                        item.bugBtn.skin = "main_json.btn_shop_close";
                        item.bugBtn.mouseEnabled = false;
                        item.bugBtn.label = "";
                    }
                    item.bugBtn.tag = petVo; 
                    item.bugBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
                    //填充金额
                    
                // }
            }
        }
        private selectButton:morn.Button;
        private onClick(evt:egret.TouchEvent):void
        {
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
            }
            else
            {
                mvc.send(NC.Update_Tlbc,data.tlbcValue);
            }
            Modules.mainModule.addDog(data.dogGradeId,data.positionId);
            if(data.goldCoin)
                this.container.goldLabel.text = data.goldCoin;
            if(data.goldCoinValue)
                this.db.mainInfoVo.goldCoinValue = data.goldCoinValue;
            
            Modules.mainModule.mainView.updateGold(data.goldCoin);
            this.db.updateDogGold(data.dogGradeId,true);
            if(Modules.mainModule.mainView)
                Modules.mainModule.mainView.updateTimeDogGold(this.db.currentDogGold);
            //更新当前狗狗价格
            if(this.selectButton)
            {
                let petVo:ShopPetVo = this.selectButton.tag;
                petVo.currentPrice = data.currentPrice;
                this.selectButton.label = data.currentPrice;
            }
        }
    }
}