/**
 * 框架里自带的常量，供其他应用直接调用
 * @author sodaChen
 * Date:2018-9-20
 */
namespace game
{
    export class Session
    {
        private static _ins:Session = new Session();
        /**
         * 是否处于调试状态
         */
        public isDebug:boolean = true;
        /** root容器对象 **/
        root:egret.DisplayObjectContainer;
        /** mvc的root容器对象 **/
        mvcRoot: mvc.RootContainer;
        /** 白鹭引擎的舞台对象 **/
        stage: egret.Stage;
        /** 舞台高度偏移量 */
        /** 游戏配置数据 **/
        config: ConfigBean;
        /**
         * 主函数，不轻易使用
         */
        main:Main;
        /**
         * 是否暂时游戏
         */
        isPauseGame:boolean;
        pauseGameKey:number;
        

        /**游戏的图标 */
        public GAME_ICON: string = "http://cdnxjqxzh5.tisgame.com/icon.png";
        /**游戏的名字 */
        public GAME_NAME: string = "sango";
        /**游戏的描述 */
        public GAME_DESCRIBE: string = "sango";

        /**
         * 查看视频的加速度
         */
        speedLookVideoData:LookVideoCountVo

        /** 是否断线了 **/
        isBreak: boolean = false;
        /** 是否已经进入游戏，表示已经登录游戏，正式进入游戏了，可以使用游戏的任何功能了 */
        isEnterGame: boolean;
        /** 错误信息，登陆错误的时候的处理 **/
        errorMsg: string;
        /** 是否属于断线重连 **/
        isReload: boolean;
        /** 登录的token，debug时是用户名，平台是是没用的，平台存放userid在这里 **/
        token: any;
        /** 舞台高度偏移量 */
        hpx: number = 0;

        /**
         * 当前选中的狗UI
         */
        selectDogUI:MainPetShowView;
        /**
         * 拖动狗的索引
         */
        private dragDogIndex:number;
        dragDogContainer:egret.Sprite = new egret.Sprite();
        dragDog:egret.MovieClip;
        private dragX:number;
        private dragY:number;

        static get instance():Session
        {
            return this._ins;
        }

        constructor()
        {

        }

        /**
         * 移动拖动的狗狗
         */
        moveDragDog(dragDogIndex:number,dogLv:number,x:number,y:number):void
        {
            this.dragDogIndex = dragDogIndex;
            if(this.dragDog)
            {
                // this.dragDog.x = -190 + x;
                // this.dragDog.y = -240 + y;
                this.dragDogContainer.x = x;
                this.dragDogContainer.y = y;
            }
            else
            {
                this.dragX = x;
                this.dragY = y;
                let res = DB.instance.dogsRes.get("pet" + dogLv);
                // if(!this.dragDogContainer.parent)
                //     this.root
                game.MovieMgr.getInstance().load(res, this.config.assets + "pet/" + res, new asf.CallBack(this.onLoadMove,this));
            }
        }
        closeDragDog():void
        {
            if(this.dragDog)
            {
               if(this.dragDog.parent)
                    this.dragDog.parent.removeChild(this.dragDog)
                this.dragDog = null;
            }
        }

        private onLoadMove(mcData: egret.MovieClipData, name: string, url: string):void
        {
            this.dragDog = new egret.MovieClip(mcData);
            this.dragDog.scaleX = this.dragDog.scaleY = 1.2;
            this.dragDogContainer.x = this.dragX;
            this.dragDogContainer.y = this.dragY;
            this.dragDog.frameRate = 10;
            this.root.addChild(this.dragDogContainer);
            this.dragDogContainer.addChild(this.dragDog);
            // this.dragDog.x = -190;
            // this.dragDog.y = -240;
            this.dragDog.x = -165;
            this.dragDog.y = -220;
            // this.mc.addEventListener(egret.Event.LOOP_COMPLETE,this.mcOver,this);
            this.dragDog.play(-1);
        }
    }
}