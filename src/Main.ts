//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {


    /**
     * 配置文件的加载器
     */
    private gameCfgLoader: egret.URLLoader;
    private configBean:game.ConfigBean;
    private gameMain:game.GameMain;
    private loadingView:LoadingView;
    private urlParams:any;

    public constructor() 
    {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) 
    {
        //图片跨域
        egret.ImageLoader.crossOrigin = "anonymous";

        // egret.lifecycle.addLifecycleListener((context) => {
        //     // custom lifecycle plugin

        //     context.onUpdate = () => {

        //     }
        // })

        // egret.lifecycle.onPause = () => {
        //     egret.ticker.pause();
        // }

        // egret.lifecycle.onResume = () => {
        //     egret.ticker.resume();
        // }

        try
        {
            var url = location.search; //获取url中"?"符后的字串
            //创建mvc框架的根容器对象
            if (url && url.indexOf("?") != -1) 
            {
                url = decodeURIComponent(url);
                //生成url参数
                this.urlParams = this.getUrlkey(url);
            }
        }
        catch(e)
        {
            console.error("解析url参数报错",e);
        }

        // this.runGame().catch(e => {
        //     console.log(e);
        // })
        this.loadGameCfg();
    }

    private getUrlkey(url):any
    {
        var params = {};
        var urls = url.split("?");
        var arr = urls[1].split("&"); 
        for (var i = 0, l = arr.length; i < l; i++) {
            var a = arr[i].split("="); 
            params[a[0]] = a[1];
        } 
        return params;
    }
    /**
         * 是否暂时游戏
         */
    private isPauseGame:boolean;
    private pauseGameKey:number;
    private async runGame() 
    {
        //初始化游戏使用到的必须池库
        asf.PoolMgr.init();
        asf.ShakeUtil.init();
        //mornUi初始化
        asf.App.init(this);
        asf.ResMgr.ins();
        // game.HttpManager.urlHead = "http://liuwei.dev.linjiexian.cn/game/";
        await this.loadResource();
        // asf.ResMgr.ins().init(this.configBean.assets, this.configBean.assets, this.onInitResMgrComplete, this);
        asf.ResMgr.ins().init(this.configBean.assets, this.configBean.assets);
         //初始化游戏的正式内容
        this.gameMain = new game.GameMain(this.configBean,this);
        this.gameMain.init();
        game.Session.instance.main = this;

        egret.lifecycle.onPause = () =>
         {
            console.info("焦点离开");
            egret.ticker.pause();
            game.SoundMgr.stopAll();
            // game.Session.instance.isPauseGame = true;
            // game.Session.instance.pauseGameKey = asf.App.timeMgr.doOnce();
        }

        egret.lifecycle.onResume = () => 
        {
            console.info("焦点获得");
            egret.ticker.resume();
            game.SoundMgr.playAll();
        }

        // this.createGameScene();
        // const result = await RES.getResAsync("description_json");
        // this.startAnimation(result);
        // await platform.login();
        // const userInfo = await platform.getUserInfo();
        // console.log(userInfo);
        
    
        //测试一下动画看看吧
        // game.MovieMgr.getInstance().load("lvUp", this.configBean.assets + "effect/lvUp/lvUp", new asf.CallBack(this.testMovie,this));
    }
    pauseGame():void
    {
        this.isPauseGame = true;
        this.pauseGameKey = asf.App.timeMgr.doOnce(100,this.onPauseGame,this,this.pauseGameKey);
    }
    private onPauseGame():void
    {
        if(this.isPauseGame)
        {
            game.SoundMgr.stopAll();
        }
    }

    // protected mc: egret.MovieClip;
    // private testMovie(mcData: egret.MovieClipData, name: string, url: string):void
    // {
    //     this.mc = new egret.MovieClip(mcData);
    //     this.mc.x = 200;
    //     this.mc.y = 300;
    //     this.mc.frameRate = 24;
    //     this.stage.addChild(this.mc);
    //     this.mc.addEventListener(egret.Event.LOOP_COMPLETE,this.mcOver,this);
    //     this.mc.play(-1);
    // }

    // private mcOver(evt:egret.Event):void
    // {
    //     console.log("特效播放完成");
    // }

    private onInitResMgrComplete(event: egret.Event):void
    {
        console.info("资源加载初始化完成，egret配置加载完成");
    }
    /**
     * 加载游戏的配置文件
     */
    private loadGameCfg():void
    {
        //这个时候还没初始化egret框架，所以采用原生的资源加载进行加载
        console.time("加载gamecfg.json");
        var urlreq: egret.URLRequest = new egret.URLRequest();
        urlreq.url = "gamecfg.json?v=" + asf.RandomUtils.randomInt(1,99999999);
        this.gameCfgLoader = new egret.URLLoader();
        this.gameCfgLoader.addEventListener(egret.Event.COMPLETE, this.onGamecfg, this);
        this.gameCfgLoader.load(urlreq);
    }
    private loadJavaScript(src:string):void
    {
        var s = document.createElement('script');
        s.async = false;
        s.src = src;
        document.body.appendChild(s);
    }
    private onGamecfg(event: egret.Event): void 
    {
        this.gameCfgLoader.removeEventListener(egret.Event.COMPLETE, this.onGamecfg, this);
        this.configBean = JSON.parse(this.gameCfgLoader.data);
        game.Session.instance.config = this.configBean;
        //重新整合一下相关路径
        morn.Morn.ResUrl = this.configBean.assets + "mornui/";
        game.SoundMgr.init(this.configBean.assets + "sounds/");
        //http相关信息
        if(this.configBean.token && this.configBean.token != "")
            game.HttpManager.initHeaders(this.configBean.token);
            // game.HttpManager.token = this.configBean.token;
        if(this.configBean.httpVer && this.configBean.httpVer != "")
            game.HttpManager.ver = this.configBean.httpVer;
        if(this.configBean.server && this.configBean.server != "")
            game.HttpManager.urlHead = this.configBean.server;


        //是否需要显示手机查看控制
        if(this.configBean.openVConsole)
        {
            //进行加载查看
            try {
                this.loadJavaScript(this.configBean.assets + "vconsole/vconsole.min.js");
            } catch (error) {
                console.info("loadjs出错");
            }
        }


        //设置常量属性
        if(this.configBean.loadingSpeed)
            game.NC.LoadingSpeed = this.configBean.loadingSpeed;

        
        //如果不是处于debug状态，则根据登记来屏蔽输出
        if (!this.configBean.debug && this.configBean.showLog >= 0) {
            //设置日志等级
            asf.ConsolePlus.init();
            asf.ConsolePlus.setLevel(this.configBean.showLog);
        }
        console.timeEnd("加载gamecfg.json");

        //初始化和app通知的机制
        try {
            game.JSBrigd.getInstance().init();
        } catch (error) {
            console.error("初始化JSBrigd出错",error);
        }
        console.info("this.configBean.debug:" + this.configBean.debug);
        //更新token
        if(this.urlParams && this.urlParams["token"] && this.urlParams["token"] != "")
        {
            // game.HttpManager.token = this.urlParams["token"];
            game.HttpManager.initHeaders(this.urlParams["token"]);
            //正式跑游戏啦
            this.runGame().catch(e => 
            {
                console.log(e);
            })
            return ;
        }
        else if(!this.configBean.debug)
        {
            console.info("调用app的token");
            mvc.smallInit();
            //url没有传递token，则走调用app的方式
            mvc.once(game.NC.Update_Token,this.onUpdateToken,this);
            game.JSBrigd.getInstance().getToken();
        }
        else
        {
            this.runGame().catch(e => 
            {
                console.log(e);
            })
        }

        
        
    }
    private onUpdateToken(token:string):void
    {
        console.info("app传回的token：" + token);
        // game.HttpManager.token = token;
        game.HttpManager.initHeaders(token);
        //正式跑游戏啦
        this.runGame().catch(e => 
        {
            console.log(e);
        })
    }

    private async loadResource() {
        try {
            // const loadingView = new LoadingUI();
            // this.stage.addChild(loadingView);
            // await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadConfig(this.configBean.assets + "default.res.json?v=" + asf.RandomUtils.randomInt(1,99999999), this.configBean.assets);
            console.info("default.res.json加载完成，加载preload资源");
            //生成版本控制信息
            let versionController = new game.EgretVersion();
            RES.registerVersionController(versionController);
            versionController.setVersion(null, this.configBean.cfgVersion, this.configBean.version);

            //先加载loading资源
            // await RES.loadGroup("loading", 0);
            // this.loadingView = new LoadingView();
            // this.stage.addChild(this.loadingView);
            //关闭掉外面的loading
            window["isReadyOver"] = true;

            await RES.loadGroup("preload", 0, this.loadingView);
            this.stage.removeChild(this.loadingView);
            this.loadingView.closeLoading();
            console.info("preload加载完成");
        }
        catch (e) {
            console.error(e);
        }
    }
}