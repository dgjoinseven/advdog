/**
 * 游戏app中的模拟对象，游戏中所有的假对象都在这里进行声明，然后使用
 * Global.creatAny()进行创建
 */
declare module game
{
    /**
     * 游戏的配置文件，一些基础的配置参数都写在这里
     * @author sodaChen
     * Date:2017/3/31
     */
    export class ConfigBean 
    {
        /** 是否处于调试状态。只有debug为false的时候，才会加载debug.json配置文件 **/
        debug: boolean;
        /** 动态更新列表，这里资源是会动态更具版本号号的。0是版本号，后面是url列表 **/
        updates: string[];
        /**
         * 显示日志的等级
         */
        showLog: number;
        /** 是否在平台上 **/
        isPlatform: boolean;
        /** 是否启动全版本控制 **/
        isVersion: boolean;
        /** 策划数据的版本  */
        cfgVersion: string;
        /** 热更数据的版本号  */
        hotRes: string;
        /** 公告版本控制 **/
        placard: string;
        /** 公告版的URL **/
        placardURL: string;
        /** 平台模拟数据 **/
        mockPlatform: string;
        /** 游戏版本号 **/
        version: string;
        /** 服务器地址 **/
        server: string;
        /** assets目录 **/
        assets: string;
        /**
         * 消息
         */
        msgUrl:string[];
        /**
         * 活动
         */
        activeUrl:string[];
        /**
         * 分红跳转
         */
        howGameUrl:string[];
        /**
         * 首页底板偏移的Y值
         */
        mainBottomY:number;
        /**
         * 分红
         */
        fenHongUrl:string[];
        openVConsole:boolean;
        token:string;
        httpVer:string;
        loadingSpeed:number;
    }
    /**
     * View的按钮事件
     */
    export class ViewButtonEventBean
    {
        /**
         * 按钮
         */
        button:morn.Button;
        onClick:Function;
        that:any;
    }
}