/**
 * @LayaView.ts
 * @author sodaChen mail:asframe@qq.com
 * @version 1.0
 * <br> Copyright (c) 2012-present, asframe.com
 * <br>Program Name:ASFrameTS
 * <br>Date:2017/2/7
 */
namespace game {
    /**
     * 基础的mvc框架对象
     */
    export class View<C extends morn.Component,D,M> extends mvc.BasicView<C,D,M>
    {
        /** 本地数据服务对象 **/
        db: DB;
        /** 本地共享对象 **/
        session: Session;
        /** 白鹭引擎的舞台对象 **/
        stage: egret.Stage;

        /** 是否需要自动监听界面的关闭事件，默认是true **/
        protected autoCloseEvent: boolean = true;
        /** 打开页面的时候是否关闭场景，默认是false **/
        protected isCloseScene: boolean;
        // private group: string;
        // /** 所有关闭按钮的列表 **/
        // private closeBtns: morn.Button[];
        /**打开时的表现方式 */
        protected openType: number = 0;
        /**打开原点 */
        protected openPoint: number[] = [0, 0];


        protected grayBg:egret.Shape;
        /**
         * 按钮事件的集合
         * 后面可以分两种，一种是初始化就一直存在，直到销毁
         * 一种是open和close的时候才会移除事件，但是open还会自动添加的（某些页面关闭不销毁的机制，可以通过底层来进行判断）
         */
        private buttonEventMap:asf.Dictionary<morn.Button,ViewButtonEventBean>;
        constructor(name?: string) {
            super(name);
            this.initialize();                                                                                    
        }

        /**
         * 添加按钮事件，通过这个指令添加的，是支持销毁的时候自动释放事件的
         */
        protected addButtonEvent(button:morn.Button,onClick:Function,that:any):void
        {
            let buttonBean:ViewButtonEventBean = asf.Global.createAny();
            buttonBean.button = button;
            buttonBean.onClick = onClick;
            buttonBean.that = that;
            button.addEventListener(egret.TouchEvent.TOUCH_BEGIN,onClick,that);
            if(!this.buttonEventMap)
                this.buttonEventMap = new asf.Dictionary<morn.Button,ViewButtonEventBean>();
            this.buttonEventMap.put(button,buttonBean);
        }
        /**
         * 清除相关事件的引用
         */
        protected removeButtonEvent(button:morn.Button,onClick:Function,that:any):void
        {
            button.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,onClick,that);
            this.buttonEventMap.remove(button);
        }

        /**
         * vie为初始化一些基础数据
         */
        initialize() {
            this.session = Session.instance;
            this.stage = this.session.stage;
            this.db = DB.ins;
        }

        showGrayBg():void
        {
            if(!this.grayBg)
            {
                this.grayBg = new egret.Shape();
                this.grayBg.graphics.beginFill( 0x000000, 1);
                this.grayBg.graphics.drawRect( 0, 0, this.stage.stageWidth, this.stage.stageHeight);
                this.grayBg.graphics.endFill();
                this.grayBg.alpha = 0.5;
                //放在最底下
                this.container.addChildAt(this.grayBg,0);
            }
        }
        

        /**
         * 界面居中
         */
        centerView():void
        {
            this.container.x = (this.stage.stageWidth - this.container.width) / 2;
            // this.container.y = this.stage.stageHeight / 2;
            this.container.y = (this.stage.stageHeight - this.container.height) / 2;
        }
        /**
         * 设置UI的资源，所在组的名字
         * @param group
         */
        setUIRes(group: string): void {
            let resBean: mvc.ResBean = new mvc.ResBean();
            if (!this.config.resList)
                this.config.resList = [];
            resBean.path = group;
            this.config.resList.push(resBean);
        }

        destroy(o: any = null): void {
            if (this.isDestroy)
                return;
            // console.info("销毁:" + this.name);
            super.destroy(o);
            // if (this.closeBtns) {
            //     for (var i: number = 0; i < this.closeBtns.length; i++) {
            //         this.closeBtns[i].removeEventListener(egret.Event.RESIZE, this.close, this);
            //     }
            // }
            //释放的时候进行清除
            if (this.config.resList) {
                for (var j: number = 0; j < this.config.resList.length; j++) {
                    game.MvcResLoader.removeRes(this.config.resList[j].path);
                }
            }

            //关闭页面自动释放相关事件
            if(this.buttonEventMap && this.buttonEventMap.size() > 0)
            {
                let viewBeans:ViewButtonEventBean[] = this.buttonEventMap.getContainer() as ViewButtonEventBean[];
                let bean:ViewButtonEventBean;
                for(let i:number = 0; i < viewBeans.length; i++)
                {
                    bean = viewBeans[i];
                    bean.button.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,bean.onClick,bean.that);
                }
            }
            
            if(this.buttonEventMap)
                this.buttonEventMap.clear();
            this.container.destroy();
            this.container = null;
            delete this.container;
        }

        /**
         * 设置关闭按钮
         * @param closeBtn 响应关闭事件的按钮
         */
        protected setCloseBtn(closeBtn: morn.Button): void {
            if (closeBtn) {
                // this.container.addChild(closeBtn);
                closeBtn.setClickHandler(this.close, this);
                // if (!this.closeBtns)
                //     this.closeBtns = [];
                // this.closeBtns.push(closeBtn);
            }
        }

        /**
         * 设置返回按钮
         * @param btn
         */
        protected setBackBtn(btn: morn.Button): void {
            //目前返回的机制是和关闭一样的
            this.setCloseBtn(btn);
        }

        /**
         * 初始化容器对象，这里主要是由子类进行调用
         * @param container
         */
        protected initContainer(container: C, completeCallback: asf.CallBack = null): void {
            this.container = this.mContainer = container;

            if (this.container instanceof morn.View) {
                this.setBaseWin();
                if (this.container.layoutComolete && completeCallback) {
                    completeCallback.execute();
                }
                else {
                    // this.container.layoutCallback = completeCallback;
                    this.container.layoutCallback = asf.CallBack.create(this.layoutCallback, this, completeCallback);
                }
            }
            //检查容器有没有close按钮
            // if(this.container["closeBtn")
            // {
                
            // }
        }
        private layoutCallback(completeCallback: asf.CallBack): void {
            this.setBaseWin();
            if (completeCallback) {
                completeCallback.execute();
            }
        }

        /**初始化UI后才去调用,把某些UI弹到最顶层  */
        protected setBaseWin(): void {
            let _container: C = this.container;
            if (_container) {
                let baseWin = _container["baseWin"];
                this.setCloseBtn(_container["closeBtn"]);
                this.setCloseBtn(_container["backBtn"]);
                if (baseWin) {
                    this.setCloseBtn(baseWin["closeBtn"]);
                    this.setCloseBtn(baseWin["backBtn"]);
                    baseWin["closeBtn"] ? _container.addChild(baseWin["closeBtn"]) : "";
                    baseWin["backBtn"] ? _container.addChild(baseWin["backBtn"]) : "";
                    baseWin["winItem"] ? _container.addChild(baseWin["winItem"]) : "";
                    let bg: morn.Image = baseWin["blank_bg"];
                    if (bg) {
                        bg.height = this.stage.stageHeight;
                        bg.y = - this.session.hpx;
                    }
                } else {
                    let bg: morn.Image = _container["blank_bg"];
                    if (bg) {
                        bg.height = this.stage.stageHeight;
                        bg.y = - this.session.hpx;
                    }
                }
            }
        }

        open(param?: any): void {
            let c = this.container;
            super.open(param);
            //目前这里好像不需要使用到自动适应，先屏蔽掉
            // this.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
            // this.onResize(null);
            //关闭游戏层
            // if (this.isCloseScene)
            //     this.session.currentScene.visible = false;

            mvc.send(mvc.GameView.View_onOpen, this);
        }

        close(): void {
            this.openFlag = false;
            // if(this.isClose)
            //     return ;
            if (!this.isOpen)
                return;
            // console.log(this.name + "进行关闭");
            // if (this.stage)
            //     this.stage.removeEventListener(egret.Event.RESIZE, this.onResize, this);

            //关闭游戏层
            // if (this.isCloseScene)
            //     this.session.currentScene.visible = true;
            super.close();

            // mvc.send(GameView.View_onClose, this);
        }
        /**
         * view初始化完成，一般是由子类重写
         */
        protected onComplete(): void {

        }

        // /**
        //  * view初始化完成的接收函数
        //  * @param evt
        //  */
        // protected viewComplete(evt: egret.Event): void
        // {
        //     this.onComplete();
        //     this.initCompelete();
        // }
        protected onResize(e: egret.Event): void {
            //子类重写
        }
    }
}