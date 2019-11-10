/**
 * @RegModule.ts
 * @author sodaChen mail:asframe@qq.com
 * @version 1.0
 * <br> Copyright (c) 2012-present, asframe.com
 * <br>Program Name:ASFrameTS
 * <br>Date:2017/2/9
 */
namespace game {
    export class RegModule {
        public constructor() {
            this.init();
        }
        private init() {

            // mvc.MvcReg.reg(MJCopyModule, MJBuyView);
            // mvc.MvcReg.reg(MJCopyModule, MJRankView);
            // /**福利界面 */
            // mvc.MvcReg.reg(FuLiModule, FuLiMainView);
            //主界面    
            mvc.MvcReg.reg(MainModule,MainView);
            mvc.MvcReg.regHelper(MainView,MainBackstageHelper);
            mvc.MvcReg.regHelper(MainView,MainDogHelper);
            // mvc.MvcReg.reg(MainModule,SetupView);
            //设置            
            mvc.MvcReg.regView(SetupView);
            //图鉴            
            mvc.MvcReg.reg(MainModule,DiagramView);
            //商店
            mvc.MvcReg.regView(ShopView);
            //转盘
            mvc.MvcReg.regView(TransterView);
            //弹窗
            mvc.MvcReg.regView(AlertView);
            //通用弹窗
            mvc.MvcReg.regView(CommonAlertView);
            //我的狗狗
            mvc.MvcReg.regView(MyDogView);
            //邀请
            mvc.MvcReg.regView(InviteView);
            //加速
            mvc.MvcReg.regView(SpeedUpView);
            //回收金币狗狗
            mvc.MvcReg.regView(RecoverDogView);
            //随机生成完美狗狗
            mvc.MvcReg.regView(RandomMergeView);
            //离线收益
            mvc.MvcReg.regView(OfflineView);
            //提示信息
            mvc.MvcReg.regView(TipView);
            //狗粮提示信息
            mvc.MvcReg.regView(TipDogView);
            //商店买狗金币不足看广告
            mvc.MvcReg.regView(GoldNoFullView);
            //合成红包狗
            mvc.MvcReg.regView(MoneyPetMergeView);
        }
    }
}
