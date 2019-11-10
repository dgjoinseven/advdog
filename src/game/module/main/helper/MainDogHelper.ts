namespace game 
{
    /**
     * 主界面的关于处理12只狗的相关逻辑
     */
    export class MainDogHelper extends Helper<MainView,any>
    {
        static NAME:string = "MainDogHelper";

        init():void
        {
            console.log("MainDogHelper初始化了");
            mvc.on(NC.Init_Gem,this.createGem,this);
        }

        /**
         * 创建水晶列表
         */
        private createGem(tlbcDTO:TlbcDTOVo):void
        {
            //收到这个事件表示首页的数据已经请求下来，开始请求商店的狗狗信息
            // HttpManager.postHttp(NC.Shop_Url,this.onPostHttp,this);
            HttpManager.postHttp(NC.GetDogConfigure_Url,this.GetDogConfigure_Url,this);
        
        }
        private GetDogConfigure_Url(dataList:DogConfigureVo[]):void
        {
            let vo:DogConfigureVo;
            for(let i:number = 0; i < dataList.length; i++)
            {
                vo = dataList[i];
                this.db.addDogConfig(vo);
            }
            // this.db.shopDB.update(data);
            // let timeGold:number = 0;
            // let shopVo:ShopPetVo;
            // //检查一下有多少只狗，需要计算他们每秒增加多少金币
            // let bigNumber = DecimalUtils.add();
            // let decima = DecimalUtils.createDecimal();
            let timeGold = this.db.currentDogGold;
            if(!timeGold)
                timeGold = "0";
            for(let i:number = 1; i <= 12; i++)
            {
                if(this.db.mainInfoVo["position" + i] != 0)
                {
                    vo = this.db.getDogConfig(this.db.mainInfoVo["position" + i]);
                    if(vo)
                    {
                        timeGold = DecimalUtils.add(timeGold,vo.onlineProduceValue).toString();
                    }
                }
            }
            timeGold = DecimalUtils.div(timeGold,"5");
            this.db.currentDogGold = timeGold;
            //除5 
            timeGold = DecimalUtils.goldChange(timeGold);
            this.view.updateTimeDogGold(timeGold);
            
        }
    }
}