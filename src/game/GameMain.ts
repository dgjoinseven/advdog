namespace game
{
    /**
     * 游戏主类，这里开始和具体的项目有关了
     */
    export class GameMain
    {
        /**
         * 根显示对象
         */
        private root:egret.DisplayObjectContainer;
        /**
         * 游戏的configCfg配置对象
         */
        private configBean:ConfigBean;
        private session:Session;
        /**
         * 构造函数
         */
        constructor(configBean:ConfigBean,root:egret.DisplayObjectContainer)
        {
            this.session = Session.instance;
            this.configBean = configBean;
            this.root = root;
            this.session.config = configBean;
            this.session.root = root;
            this.session.stage = root.stage;
        }
        /**
         * 进行初始化游戏框架
         */
        public init():void
        {
            console.info("初始化GameMain");
        

            //初始化mvc框架机制
            var rootContainer: mvc.RootContainer = mvc.RootContainer.getInstance(this.root);
            this.session.mvcRoot = rootContainer;

            rootContainer.stage = this.root.stage;

            //初始化mvc框架，设置框架的view操作处理器
            mvc.init(new mvc.ViewHandler(rootContainer), new GameHoldupView(), game.MvcResLoader, Modules,game.DB.instance);
            //注册mvc框架配置好的模块和view相关对象
            new game.RegModule();

            //如果这个时候不需要其他额外的加载，可以启动mvc框架
            mvc.Context.startup(rootContainer, this.onMvcComplete, this);
        }
        /**
         * mvc框架初始化完成接口
         */
        private onMvcComplete():void
        {
            mvc.Context.takeServer();
            //默认也打开弹窗
            mvc.openView(AlertView);
            mvc.openView(TipView);
            mvc.openView(CommonAlertView);
            mvc.openView(MainView);

            //读取本地的音乐设置
            let isStopSound:string  = egret.localStorage.getItem("jia.pet.sound");
            if(!isStopSound)
                DB.ins.isStopSound = true;
            else
            {
                DB.ins.isStopSound = Boolean(isStopSound);
            }
            //游戏引擎初始化完毕
            window["isGameReady"] = true;
        }
    }
}