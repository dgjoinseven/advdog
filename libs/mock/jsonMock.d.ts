/**
 * 游戏app中的模拟对象，游戏中所有的假对象都在这里进行声明，然后使用
 * Global.creatAny()进行创建
 */
declare module game
{
    /**
     * 首页获取数据、回收狗、更改狗的位置、狗合成 都是使用 GameHomePageDTO这个实体类
     */
    export class MainInfoVo
    {
        /**
         * 用户id
         */
        userId:number;

        /**
         * 金币数量 带单位
         */
        goldCoin:string;
        /**
         * 当前金币的实际数值
         */
        goldCoinValue:string;

        /**
         * TLBC
         */
        tlbc:number;

        /**
         * 开始时间
         */
        startTime:string;

        /**
         * 服务器时间
         */
        serverTime:string;

        /**
         * 金币时间间隔 单位小时
         */
        intervalTime:number;

        /**
         * tlbc 时间间隔 单位小时
         */
        tlbcIntervalTime:number;

        /**
         * tlbc 时间间隔 单位小时
         */
        //BigDecimal tlbcRate;

        /**
         * tlbc开始时间
         */
        tlbcStartTime:string;

        /**
         * 排位1狗id
         */
        position1:number;

        /**
         * 排位2狗id
         */
        position2:number;

        /**
         * 排位3狗id
         */
        position3:number;

        /**
         * 排位4狗id
         */
        position4:number;

        /**
         * 排位5狗id
         */
        position5:number;

        /**
         * 排位6狗id
         */
        position6:number;

        /**
         * 排位7狗id
         */
        position7:number;

        /**
         * 排位8狗id
         */
        position8:number;

        /**
         * 排位9狗id
         */
        position9:number;

        /**
         * 排位10狗id
         */
        position10:number;

        /**
         * 排位11狗id
         */
        position11:number;

        /**
         * 排位12狗id
         */
        position12:number;

        /**
         * 狗级别
         */
        dogGradeId:number;

        /**
         * 当前购买价格
         */
        currentPrice:number;

        /**
         * 离线收益,若小于等于0 不显示弹框
         */
        offlineGoldCoin:string;
        /**
         * 上次离线收益值,若小于等于0 不显示弹框(后来加的，有什么用)
         */
        lastOfflineGoldCoin:string;
        /**
         * tlbc 量
         */
        tlbcDTO:TlbcDTOVo;

        /**
         * 最高等级宠物名称
         */
        maxLevelName:string;
        /**
         * 最高宠物等级
         */
        maxLevel:number;
        /**
         * 狗粮总值
         */
        dogFoodCount:number;

        /**
         * 分红总金额
         */
        shareTotalAmount:string;
        /**
         * 显示宠物名称
         */
        showLevelName:string;
        /**
         * 显示宠物等级
         */
        showLevel:number;
    }
    export class TlbcDTOVo 
    {
        /**
         * 进度,下一个完成进度
         */
        progress:number;
        /**
         * 已经完成的矿石
         */
        tlbcList:number[];
    }
    /**
     * 图鉴返回的数据
     */
    export class DiagramVo 
    {
        /**
         * 图鉴名称
         */
        plateName:string;

        /**
         * 技能描述
         */
        skill:string;

        /**
         * 图鉴描述 &符号换行
         */
        description:string;

        /**
         * 图鉴图片
         */
        plateImage:string;

        /**
         * 标识 文字 比如：限量
         */
        mark:string;
    }
    /**
     * 转盘返回的数据
     */
    export class TransferVo 
    {
        prizeCount: string  //剩余可转 转盘次数
        /**
         * 可以看广告的次数，小于等于0时没有
         */
        advideoCount:number;
    }
    export class TransferItemVo 
    {
        
    }
    /**
     * 抽奖转盘返回的数据
     */
    export class TransferStartVo 
    {
        id:string;
        gtype: number //中奖大类型  1.金币   2.宝箱  3.钻石
        /**
         * 奖品类型
         * 1.少量金币 25%
         * 2.中量金币 15%
         * 3.大量金币 10%
         * 4.海量金币 5%
         * 5.宝箱X5  13%
         * 6.宝箱X10  9%
         * 7.TLBCX5  13%
         * 8.TLBCX10 10%
        * */
        prizeType: string //中奖类型
        prizeName: string  //中奖奖品名称
        prize: string //中奖 奖品值品
        prizeyesimg: string  //中奖奖品图片
        prizeCount: string  //剩余可转 转盘次数
    }
    export class GetDogConfigureVo
    {
        
    }
    export class DogConfigureVo
    {
       /**
     * id
     */
    id:number;

    /**
     * 等级id
     */
    gradeId:number;

    /**
     * 等级name
     */
    gradeName:string;

    /**
     * 开始购买价格
     */
    lowBuyPrice:number;

    /**
     * 购买叠加率
     */
    buyRate:number;

    /**
     * 最高购买价格
     */
    hightBuyPrice:number;

    /**
     * 最高购买次数
     */
    hightBuyNum:number;

    /**
     * tlbc购买值
     */
    tlbcValue:number;

    /**
     * tlbc是否可以购买
     */
    isTlbc:number;

    /**
     * 回收值
     */
    recoveryValue:number;

    /**
     * 回收率
     */
    recoveryRate:number;

    /**
     * 在线产生的值/秒
     */
    onlineProduceValue:string;

    /**
     * 离线产生的值/秒
     */
    offlineProduceValue:string;

    /**
     * 预留字段1
     */
    reserved1:string;

    /**
     * 预留字段2
     */
    reserved2:string;

    /**
     * 预留字段3
     */
    reserved3:string;

    /**
     * tlbc 加速
     */
    addSpeedTlbc:number;

    /**
     * 狗粮 加速
     */
    addSpeedDogfood:number;

    
    }
    export class ShopPetVo
    {
        /**
         * 狗级别
         */
        dogGradeId:number;

        /**
         * 狗宠物名称
         */
        dogLevelName:string;

        /**
         * 开始购买价格
         */
        lowBuyValue:string;

        /**
         * 购买叠加率
         */
        buyRate:number;

        /**
         * 最高购买价格
         */
        hightBuyValue:string;

        /**
         * 购买次数
         */
        buyNum:number;

        /**
         * 当前购买价格
         */
        currentPrice:string;

        /**
         * tlbc是否可购买
         */
        isBuyTlbc:number;

        /**
         * 是否可金币购买
         */
        isBuyGoldcoin:number;

        /**
         * 是否解锁,1:已解锁,0:未解锁
         */
        isLock:number;
    }

    /**
     * 狗超市(商店) 是返回实体类 DogSupermarketDTO 下面包含List<DogSupermarketDetailDTO>。
     */
    export class DogSupermarketDTOVo
    {
        /**
         * 用户id
         */
        userId:number;

        /**
         * 金币数量 带单位
         */
        goldCoin:string;

        /**
         * 当前最大级别
         */
        maxGradeId:number;

        /**
         * 狗级别信息
         */
        lists:ShopPetVo[];
    }

    export class BuyDogByTlbcVo
    {
        /**
         * 狗级别id 1-44
         */
        dogGradeId:number;
        /**
         * 这只狗的当前价格
         */
        currentPrice:string;

        /**
         * 当前剩余tlbc的值
         */
        tlbcValue:number;
        /**
         * 当前的总金币
         */
        goldCoin:string
        /**
         * 当前金币的实际数值
         */
        goldCoinValue:string;
        /**
         * 位置id（购买狗存放位置id）
         */
        positionId:number;
    }

    export class DogMergeDTOVo
    {
        /**
         * 最高等级宠物名称
         */
        maxLevelName:string;

        /**
         * 最高宠物等级
         */
        maxLevel:number;

        /**
         * 合并后狗等级
         */
        mergeLevel:number;

        /**
         * 开始 位置id 后端置位0，前端为空格
         */
        fromPositionId:number;
        /**
         * 5福狗合成返回的其他狗的位置
         */
        strfromPositionId:string;

        /**
         * 目的 位置id
         */
        toPositionId:number;

        /**
         * 狗级别 屏幕中间的狗级别
         */
        dogGradeId:number;

        /**
         *  屏幕中间狗 当前购买价格
         */
        currentPrice:string;
    }
    export class DogChangePositionVo
    {
        /**
         * 开始 狗级别id 1-44
         */
        fromDogGradeId:number;

        /**
         * 目的 狗级别id 1-44
         */
        toDogGradeId:number;

        /**
         * 开始 位置id
         */
        fromPositionId:number;

        /**
         * 目的 位置id
         */
        toPositionId:number;

    }
    /**
     * 查看视频的返回次数
     */
    export class LookVideoCountVo
    {
        /**
         * 1.转盘 2.开宝箱  3 摇一摇  4.喂狗粮食 5.加速 6.金币不足看视频 7普通  8离线双倍
         */
        lookType:number;

        /**
         * 看视频剩余次数 4.喂狗粮食 5.加速 是全局的次数(每天15次) 6.金币不足看视频 商品点击购买次数每天3次
         */
        remainingTimes:number;

        /**
         * 当前端传入6的时候返回 看视频获取金币数量
         */
        getGoldCoin:string;
        /**
         * 金币产生速率
         */
        speedGoldCoin:string;
        /**
         * 多小秒
         */
        speedTime:string;
    }
    /**
     * 卖狗的返回结果
     */
    export class DogBuySellDTOVo
    {
        /**
         * 当前金币数量 带单位
         */
        goldCoin:string;

        /**
         * 狗级别id 1-44
         */
        dogGradeId:number;
        /**
         * 钻石
         */
        tlbcValue:number;
        /**
         * 回收金币
         */
        recoveryGoldCoin:string;

        /**
         * 位置id（购买狗存放位置和销毁狗的位置id）
         */
        positionId:number;

        /**
         * 下次购买狗价格
         */
        tcurrentPrice:string;
    }
    /**
     * 刷新当前金币
     * 
     */
    export class SelectGoldCoinVo
    {
        /**
         * 当前金币的实际数值
         */
        goldCoinValue:string;
        /**
         * 当前金币的显示
         */
        goldCoin:string;
        //收集tlbc进度
        progress:number;
    }
    /**
     * 加速返回结果
     */
    export class SpeedGoldCoinVo
    {  
        /*
        * 金币产生速率
        */
        speedGoldCoin:string;

        /**
         * 多小秒
         */
        speedTime:string; 
    }
}