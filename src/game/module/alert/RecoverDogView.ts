namespace game 
{
    /**
     * 回收狗狗界面
     */
    export class RecoverDogView extends View<ui.RecoverDogUI, any,any>
    {
        static NAME         :string = "RecoverDogView";

        // /**
        //  * 回收的狗等级
        //  */
        // private dogLv:number;
        
        public constructor()
        {
            super();
            this.lv = mvc.MvcConst.VIEW_LV_3;
            this.layer = mvc.MvcConst.TIP_LAYER;
        }

        public initLayoutJson(completeCallback: asf.CallBack): void
        {
            this.initContainer(new ui.RecoverDogUI(), completeCallback);
        }

        init() 
        {
            console.info("RecoverDogView初始化完成");
            //根据传递过来的参数进行初始化
            this.showGrayBg();
            this.container.sureBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
            this.setCloseBtn(this.container.cancelBtn);
            // this.container.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
        }

        // private onPostHttp(data:DogSupermarketDTOVo):void
        // {
        //     this.db.shopDogVoList = data.lists;
        //     this.showDogInfo();
        // }
        
        private onClick(evt:egret.TouchEvent):void
        {
            if(evt.currentTarget == this.container.sureBtn)
            {
                if(this.openParam.dogGrade == 43)
                {
                    HttpManager.postHttpByParam(NC.RecoveryRedPacketDog_Url,this.openParam,this.RecoveryRedPacketDog_Url,this);
                }
                else
                {
                    HttpManager.postHttpByParam(NC.RecoveryDog_Url,this.openParam,this.RecoveryDog_Url,this);
                }
                // console.info("没有回收狗狗的参数，无法调用回收接口");
            }
            else
            {
                //直接关闭
                this.close();
            }
        }

        private RecoveryRedPacketDog_Url(data:DogBuySellDTOVo):void
        {
            CommonAlertView.showGem(data.tlbcValue.toString());
            if(data.tlbcValue)
                this.db.mainInfoVo.tlbc += data.tlbcValue;
            Modules.mainModule.mainView.updateGem(this.db.mainInfoVo.tlbc);

            this.db.updateDogGold(data.dogGradeId,false);
            Modules.mainModule.mainView.updateTimeDogGold();
            //删除掉回收的狗
            Modules.mainModule.mainView.removeDog(data.positionId);
        }
        private RecoveryDog_Url(data:DogBuySellDTOVo):void
        {
            console.log("回收狗成功");
            AlertView.showGainGold(data.recoveryGoldCoin);
            Modules.mainModule.mainView.updateGold(data.goldCoin);
            this.db.updateDogGold(data.dogGradeId,false);
            Modules.mainModule.mainView.updateTimeDogGold();
            //对应位置的狗进行清除
            Modules.mainModule.mainView.removeDog(data.positionId);
            this.close();
        }

        // private showDogInfo():void
        // {
        //     let dataList = this.db.shopDogVoList;
        //     //生成狗的列表
        //     for(let i:number = 0; i < dataList.length; i++)
        //     {
        //         let shopVo = dataList[i];
        //         if(shopVo.dogGradeId == this.dogLv)
        //         {
        //             //使用他的信息
        //             this.container.tipLabel.text = "您当前回收" + shopVo.dogLevelName + "，可获取：";
        //             this.container.gainLabel.text = shopVo.currentPrice;
        //             break;
        //         }
        //     }
        // }

        onOpen(param?: any): void 
        {
            //每次打开的时候调用
            // this.dogLv = param;
            let dogConfig:DogConfigureVo = this.db.getDogConfig(param.dogGrade);
            if(dogConfig)
            {
                this.container.tipLabel.text = "您当前回收" + dogConfig.gradeName + "，可获取：";
                this.container.gainLabel.text = dogConfig.recoveryStrValue;
            }
            else
            {
                console.info("回收狗狗时还没狗的配置信息");
                //没有配置关闭掉，服务器还没请求下来
                asf.App.timeMgr.doOnce(1000,this.close,this,0);
            }
            // if(this.db.shopDogVoList)
            // {
            //     this.showDogInfo();
            // }
            // else
            // {
            //     //请求一下狗的销售信息
            //     HttpManager.postHttp(NC.Shop_Url,this.onPostHttp,this);
            // }
            
        // }
        // onClose()
        // {
            
        // }
        }
    }
}