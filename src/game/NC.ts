namespace game
{
    /**
     * 游戏常量和mvc事件类
     */
    export class NC
    {
        /**
         * 查询转盘数据
         */
        static Transter_Info_Url:string = "api/queryPrize";
        static Transter_start_Url:string = "api/turntable";
        /**
         * 查询金币值
         */
        static Select_Gold_Url:string = "api/selectGoldCoin";
        /**
         * 领取水晶
         */
        static ReceiveGoldTlbc_Url:string = "api/receiveGoldTlbc";
        /**
         * 加速
         */
        static AddSpeedGoldCoin_Url:string = "api/addSpeedGoldCoin";
        /**
         * 间隔领取金币值
         */
        static ReceiveGold_Url:string = "api/receiveGoldCoin";
        /**
         * 商店
         */
        static Shop_Url:string = "api/getSupermarketData";
        /**
         * 购买狗
         */
        static BuyDog_Url:string = "api/buyDog";
        /**
         * 合成狗
         */
        static Merge_Dog_Url:string = "api/dogMerge";
        /**
         * 5碎片合成狗，五福狗  5个狗碎片 合成 分红狗或者红包狗
         */
        static SeparateDogMerge:string = "api/separateDogMerge";
        /**
         * 回收狗
         */
        static RecoveryDog_Url:string = "api/recoveryDog";
        /**
         * 狗交换位置
         */
        static Change_Dog_Position_Url:string = "api/changeDogPosition";
        /**
         * 钻石买购买狗
         */
        static BuyGemDog_Url:string = "api/tlbcBuyDog";
        /**
         * 获取狗狗的配置信息
         */
        static GetDogConfigure_Url:string = "/api/getDogConfigure";
        /**
         * 更改狗的头像
         */
        static UpdateHomeDogAvatar_Url:string = "/api/updateHomeDogAvatar";
        /**
         * 回收红包狗
         */
        static RecoveryRedPacketDog_Url:string = "/api/recoveryRedPacketDog";
        /**
         * 喂水
         */
        static Feedingwater_Url:string = "/api/feedingwater";

        /**
         * 看视频之前请求获取剩余次数
         * 4.喂狗粮食 5.加速 是全局的次数(每天15次) 6.金币不足看视频 商品点击购买次数每天3次
         * 1.转盘 2.开宝箱  3 摇一摇  4.喂狗粮食 5.加速 6.金币不足看视频 7普通  8离线双倍
         */
        static LookVideoCount_Url:string = "api/lookVideoCount";



        //////////////////看视频常量/////////////////////
        /**
         * 喂狗粮
         */
        static Dog_Food_Video:string = "4";
        /**
         * 转盘
         */
        static Transter_Video:string = "1";
        /**
         * 商店金币不足
         */
        static Shop_Video:string = "6";
        /**
         * 加速200秒
         */
        static Speed_Video:string = "5";
        /**
         * 离线
         */
        static OffLine_Video:string = "8";
        /**
         * 喂水
         */
        static Water_Video:string = "9";
        /**
         * 转盘插广告
         */
        static Transter_AD_Video:string = "10";



       
       /////////////////////内部通讯事件/////////////////////////////
       /**
        * 初始化水晶
        */
       static Init_Gem:string = "Init_Gem";
       /**
        * 更新玩家的当前金币
        */
       static Update_Gold:string = "updateGold";
       static Update_Tlbc:string = "updateTlbc";
       /**
        * 合并狗事件
        */
       static Merger_Dog:string = "mergerDog";
       static Add_Gog:string = "addGod";
       /**
        * 广告回调事件
        */
       static AD_CallBack:string = "AD_CallBack";
       /**
        * 加速事件
        */
       static Add_Speed_Gold:string = "Add_Speed_Gold";
       /**
        * App过来的金币更新事件（5秒更新一次）
        */
       static App_Update_Gold:string = "App_Update_Gold";
       /**
        * 结束加速事件
        */
       static End_Add_Speed_Gold:string = "End_Add_Speed_Gold";
       /**
        * 更新token
        */
       static Update_Token:string = "OpenShowAd_Token";


       /////////////////////游戏中的一些常量/////////////////////////////
       /**
        * loading的旋转速度
        */
       static LoadingSpeed:number = 5;
       /**
        * 首页宠物的基础位置，检测范围等都以来这个基数(默认是500)
        */
       static Main_Pet_Pos:number = 500;
       /**
        * 游戏动画的帧频
        */
       static Movie_Rate = 12;

       
    }
}