/**
 * 斗地主游戏的本地数据库管理对象。
 * 注意增加一个新的db的时候，必须写值 null，属性名字和dbClass的静态NAME一样
 * 
 * DB主要是存放各个模块需要的数据，以及从服务器拉取的数据
 */
namespace game
{
    export class DB
    {
        static ins:DB = new DB();

        static get instance():DB
        {
            return this.ins;
        }

        shopDB:ShopDB;
        /**
         * 当前所有狗每秒产生的金币
         */
        currentDogGold:string;
        /**
         * 是否播放音乐，默认关闭声音
         */
        isSound:boolean = false;
        /**
         * 加速设计模型
         */
        speedVo:SpeedGoldCoinVo;
        private dogConfigMap:asf.HashMap<number,DogConfigureVo>;
        constructor()
        {
            this.dogsRes = new asf.HashMap<string,string>();
            this.dogConfigMap = new asf.HashMap<number,DogConfigureVo>();
            for(let i:number = 1; i <= 44; i++)
            {
                if(i >= 1 && i <= 5)
                {
                    this.dogsRes.put("pet" + i,"pet1_5");
                    this.dogsRes.put("dog" + i,"dog1_5");
                    this.dogsRes.put("shop" + i,"shop1_5");
                }
                else if(i >= 6 && i <= 10)
                {
                    this.dogsRes.put("pet" + i,"pet6_10");
                    this.dogsRes.put("dog" + i,"dog6_10");
                    this.dogsRes.put("shop" + i,"shop6_10");
                }
                else if(i >= 11 && i <= 15)
                {
                    this.dogsRes.put("pet" + i,"pet11_15");
                    this.dogsRes.put("dog" + i,"dog11_15");
                    this.dogsRes.put("shop" + i,"shop11_15");
                }
                else if(i >= 16 && i <= 20)
                {
                    this.dogsRes.put("pet" + i,"pet16_20");
                    this.dogsRes.put("dog" + i,"dog16_20");
                    this.dogsRes.put("shop" + i,"shop16_20");
                }
                else if(i >= 21 && i <= 25)
                {
                    this.dogsRes.put("pet" + i,"pet21_25");
                    this.dogsRes.put("dog" + i,"dog21_25");
                    this.dogsRes.put("shop" + i,"shop21_25");
                }
                else if(i >= 26 && i <= 30)
                {
                    this.dogsRes.put("pet" + i,"pet26_30");
                    this.dogsRes.put("dog" + i,"dog26_30");
                    this.dogsRes.put("shop" + i,"shop26_30");
                }
                else if(i >= 31 && i <= 37)
                {
                    this.dogsRes.put("pet" + i,"pet31_37");
                    this.dogsRes.put("dog" + i,"dog31_37");
                    this.dogsRes.put("shop" + i,"shop31_37");
                }
                // else if(i >= 38 && i <= 42)
                // {
                //     this.dogsRes.put("pet" + i,"pet38_42");
                //     this.dogsRes.put("shop" + i,"shop38_42");
                // }
                else
                {
                    this.dogsRes.put("pet" + i,"pet" + i);
                    this.dogsRes.put("dog" + i,"dog" + i);
                    this.dogsRes.put("shop" + i,"shop" + i);
                }
            }
            // this.shopDB = new ShopDB();
            // this.shopDB.init();
        }
        addDogConfig(config:DogConfigureVo):void
        {
            this.dogConfigMap.put(config.gradeId,config);
        }
        getDogConfig(dogLv:number):DogConfigureVo
        {
            return this.dogConfigMap.get(dogLv);
        }
        /**
         * 修改每5秒产出
         */
        updateDogGold(dogLv:number,isAdd:boolean):void
        {
            //重新
            let dogVo:DogConfigureVo = this.dogConfigMap.get(dogLv);
            //先除5
            // let petOnline = DecimalUtils.div(dogVo.onlineProduceValue,"5");
            if(dogVo)
            {
                if(isAdd)
                    this.currentDogGold = DecimalUtils.add(this.currentDogGold,dogVo.onlineProduceValue);
                else
                    this.currentDogGold = DecimalUtils.sub(this.currentDogGold,dogVo.onlineProduceValue);
            }
            // this.currentDogGold = DecimalUtils.goldChange(this.currentDogGold);
        }
        dogsRes:asf.HashMap<string,string>;
        /**
         * 主页的相关服务器数据信息
         */
        mainInfoVo:MainInfoVo;
        /**
         * 超市里狗的信息
         */
        shopDogVoList:ShopPetVo[];
        
        getBuyBogLocal():number
        {
            //位置1-12，狗1-44
            //检索一下，空白数据的就是没有狗
            for(let i:number = 1; i <= 12; i++)
            {
                if(this.mainInfoVo["position" + i] == 0)
                    return i;
            }
            return 0;
        }
    }
}