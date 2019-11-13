namespace game
{
    /**
     * 游戏常量和mvc事件类
     */
    export class JSBrigd
    {
        private static instance:JSBrigd = new JSBrigd();


        static getInstance():JSBrigd
        {
            return this.instance;
        }
        /**
         * 调用app的看广告接口
         * 1.转盘 2.开宝箱  3 摇一摇  4.喂狗粮食 5.加速 6.金币不足看视频 7普通,8离线看视频
         */
        openShowAd(adtype:string):void
        {
            console.info("调用广告接口:" + adtype);
            if(!this.win.callNativeOpenShowAd)
            {
                console.info("windows没有初始化js桥接信息，无法调用广告api");
                //这里是否模拟发会信息
                return ;
            }
            this.win.callNativeOpenShowAd({
                data: adtype,
                callback:function(responseData:any)
                {
                    console.info("调用广告的回调参数:" + responseData);
                }
            })
        }
        /**
         * 调动app的跳转方法
         */
        jumpClick(url:string,title:string):void
        {
            console.info("调用app的jumpClick方法:" + url + " " + title);
            this.win.jumpClick(url,title);
        }
        /**
         * 跳转到原生邀请
         */
        jumpInvitation():void
        {
            //原生跳转界面
            let data = {
                method: "jumpInvitation",
                data: "",
                callback: function (responseData)
                {
                    console.info("调用jumpInvitation的回调参数:" + responseData);
                }
            };
            window["bridgeCallHandler"](data);
        }
        /**
         * 跳转到原生邀请
         */
        jumpShiMing():void
        {
            //原生跳转界面
            let data = {
                method: "jumpAuthen",
                data: "",
                callback: function (responseData)
                {
                    console.info("调用jumpShiMing的回调参数:" + responseData);
                }
            };
            window["bridgeCallHandler"](data);
        }

        getToken()
        {
            try{
                this.win.getLoginToken();
            }
            catch(e)
            {
                console.error("获取token报错");
            }
        }

        private win:any;

        init()
        {
            /**
             * 北极心:
            openShowAd('1') 1.转盘 2.开宝箱  3 摇一摇  4.喂狗粮食 5.加速 6.金币不足看视频 7普通

            北极心:
            这里看转盘次数不够看激励视频，openShowAd('1') 方法，记得传1

            */
            console.info("初始化app的桥");
            //重新对win进行赋值
            let win:any = window;
            this.win = win;

            console.info("初始化app的桥:" + win);
            console.info("win.navigator:" + navigator);
            console.info("win.jsbridge:" + win.jsbridge);
            // if(win.navigator)

            var u = navigator.userAgent;
            win.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            win.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

            win.jsbridge = function (callback) 
            {
                if (win.WebViewJavascriptBridge) 
                {
                    return callback(win.WebViewJavascriptBridge);
                } else 
                {
                    document.addEventListener(
                        'WebViewJavascriptBridgeReady',
                        function () {
                            callback(win.WebViewJavascriptBridge)
                        },
                        false
                    );
                }
                
                if (win.isIOS) 
                {
                    console.info("ios初始化");
                    if (win.WKWebViewJavascriptBridge) { return callback(win.WKWebViewJavascriptBridge); }
                    if (win.WKWVJBCallbacks) { return win.WKWVJBCallbacks.push(callback); }
                    win.WKWVJBCallbacks = [callback];

                    var WVJBIframe = document.createElement('iframe');
                    WVJBIframe.style.display = 'none';
                    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
                    document.documentElement.appendChild(WVJBIframe);
                    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)

                    win.webkit.messageHandlers.iOS_Native_InjectJavascript.postMessage(null)

                    
                    console.info("ios初始化完成");
                }
            }

            if (!win.isIOS) {
                win.jsbridge(function (bridge) {
                    bridge.init(function (message, responseCallback) {
                        var data = {};
                        responseCallback(data);
                    });
                })
            }

            /**
             * @param  {option对象}
             * method: 调用的方法
             * data: 传递的参数
             * callback: 回掉方法
             * @return {[type]}
             */
            win.bridgeCallHandler = function(option) 
            { 
                win.jsbridge(function (bridge) {
                    bridge.callHandler(
                        option.method,
                        option.data || {},
                        function (responseData) {
                            if (option.callback) {
                                option.callback(responseData)
                            }
                        }
                    );
                })
            }

            //原生调js
            win.bridgeRegisterHandler = function (option) {
                win.jsbridge(function (bridge) {
                    bridge.registerHandler(
                        option.method,
                        function (data, responseCallback) {
                            if (option.callback) {
                                option.callback(data);
                            }
                            console.info("registerHandler ",data);
                            console.info("registerHandler ",responseCallback);
                            responseCallback(option.data || {});
                        }
                    );
                })
            }
            //------------------------------------上面方法不要做修改-----------------------------------
            //获取token注册方法
            win.callNativePageToken= function (option) {
                win.bridgeCallHandler({
                    method: 'getLoginToken',
                    data: option.data,
                    callback: function (responseData) {
                        if (option.callback) {
                            option.callback(responseData);
                        }
                    }
                })
            }
            //获取token注册方法 提供js调用
            win.getLoginToken = function(){
                win.callNativePageToken({
                    data:'',
                    callback:function(responseData){
                        //byId("dogmsg").innerText="token:"+responseData;
                        console.info("app返回token：" + responseData);
                        mvc.send(NC.Update_Token,responseData);
                    }
                })
            }

            //---------------------------------------------

            //获取跳转页面返回方法(注册)
            win.callNativePageOnFinish = function (option) {
                win.bridgeCallHandler({
                    method: 'onFinish',
                    data: option.data,
                    callback: function (responseData) {
                        if (option.callback) {
                            option.callback(responseData);
                        }
                    }
                })
            }
            //获取跳转页面返回方法,提供js调用
            win.onFinish = function(){
                win.callNativePageOnFinish({
                    data: '',
                    callback:function(responseData){
                        //byId("dogmsg").innerText="返回方法调用成功:"+responseData;
                    }
                })
            }

            //---------------------------------------------
            //获取跳转页面方法(注册)
            win.callNativePage = function (option) {
                win.bridgeCallHandler({
                    method: 'jumpview',
                    data: option.data,
                    callback: function (responseData) {
                        if (option.callback) {
                            option.callback(responseData);
                        }
                    }
                })
            }

            //获取跳转页面方法，提供js调用 urlprams指定的调整路径
            win.jumpClick = function(urlprams,title) {
                win.callNativePage({
                    data: {"urlprams":urlprams,"title":title},
                    callback:function(responseData){
                        //console.log('来源于原生的反馈信息',responseData);
                        //var div=document.getElementById('msgshow');
                        //div.innerText=responseData;
                    }
                })
            }
            //---------------------------------------------

            //code=401 跳登陆(注册)
            win.callNativePageJumpLogin = function (option) {
                win.bridgeCallHandler({
                    method: 'notLoginJumpLogin',
                    data: option.data,
                    callback: function (responseData) {
                        if (option.callback) {
                            option.callback(responseData);
                        }
                    }
                })
            }

            //notLoginJumpLogin登录
            win.notLoginJumpLogin = function() {
                win.callNativePageJumpLogin({
                    data: '',
                    callback:function(responseData){
                        //byId("dogmsg").innerText="notLoginJumpLogin调用成功:"+responseData;
                    }
                })
            }
            //---------------------------------------------
            //1.转盘 2.开宝箱  3 摇一摇  4.喂狗粮食 5.加速 6.金币不足看视频 7普通,8,9喂水
            //打开激励视频广告(注册)
            win.callNativeOpenShowAd = function (option) {
                win.bridgeCallHandler({
                    method: 'openShowAd',
                    data: option.data,
                    callback: function (responseData) {
                        if (option.callback) {
                            option.callback(responseData);
                        }
                    }
                })
            }
            //原生跳转界面
            win.callNativeJumpInvitation = function (option) {
                win.bridgeCallHandler({
                    method: 'jumpInvitation',
                    data: option.data,
                    callback: function (responseData) {
                        if (option.callback) {
                            option.callback(responseData);
                        }
                    }
                })
            }
            //1.转盘 2.开宝箱  3 摇一摇  4.喂狗粮食 5.加速 6.金币不足看视频 7普通,8是离线
            //打开激励视频广告，JS调用
            win.openShowAd = function(adtype) {
                win.callNativeOpenShowAd({
                    data: adtype,
                    callback:function(responseData){
                        //byId("dogmsg").innerText="openShowAd调用成功:"+responseData;
                    }
                })
            }
            //notLoginJumpLogin登录
            // win.vidioGainGold = function() {
            //     win.callVidioGainGold({
            //         data: '',
            //         callback:function(responseData){
            //             if(responseData && responseData != "")
            //                 CommonAlertView.showGainGold(responseData);
            //         }
            //     })
            // }

            win.bridgeRegisterHandler({
                method:"adCallBack",
                callback:function(responseData)
                {
                    console.info("adCallBack responseData:" + responseData);
                    //事件派发出去
                    mvc.send(NC.AD_CallBack,responseData);
                    //1.转盘 2.开宝箱  3 摇一摇  4.喂狗粮食 5.加速 6.金币不足看视频 7普通,8是离线
                    // if(responseData && responseData != "")
                    //         CommonAlertView.showGainGold(responseData);
                }
            });

            //App_Update_Gold
            win.bridgeRegisterHandler({
                method:"appUpdateGold",
                callback:function(data)
                {
                    console.info("appUpdaeGold data:" + data);
                    //事件派发出去
                    mvc.send(NC.App_Update_Gold,data);
                }
            });
        }
    }
}