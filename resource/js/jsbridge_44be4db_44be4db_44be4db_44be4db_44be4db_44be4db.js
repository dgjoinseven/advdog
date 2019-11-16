function byId(id) {
    return document.getElementById(id);
}


var u = navigator.userAgent;
window.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
window.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

window.jsbridge = function (callback) {
    if (window.WebViewJavascriptBridge) {
        return callback(WebViewJavascriptBridge);
    } else {
        document.addEventListener(
            'WebViewJavascriptBridgeReady',
            function () {
                callback(WebViewJavascriptBridge)
            },
            false
        );
    }
    
    if (window.isIOS) {
        if (window.WKWebViewJavascriptBridge) { return callback(WKWebViewJavascriptBridge); }
        if (window.WKWVJBCallbacks) { return window.WKWVJBCallbacks.push(callback); }
        window.WKWVJBCallbacks = [callback];

        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)

        window.webkit.messageHandlers.iOS_Native_InjectJavascript.postMessage(null)

        
        
    }
}

if (!window.isIOS) {
    jsbridge(function (bridge) {
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
function bridgeCallHandler(option) {
    jsbridge(function (bridge) {
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
window.bridgeRegisterHandler = function (option) {
    jsbridge(function (bridge) {
        bridge.registerHandler(
            option.method,
            function (data, responseCallback) {
                if (option.callback) {
                    option.callback(data);
                }
                responseCallback(option.data || {});
            }
        );
    })
}
//------------------------------------上面方法不要做修改-----------------------------------
//获取token注册方法
window.callNativePageToken= function (option) {
    bridgeCallHandler({
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
function getLoginToken() {
    callNativePageToken({
        data:'',
        callback:function(responseData){
            //byId("dogmsg").innerText="token:"+responseData;
        }
    })
}

//---------------------------------------------

//获取跳转页面返回方法(注册)
window.callNativePageOnFinish = function (option) {
    bridgeCallHandler({
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
function onFinish() {
    callNativePageOnFinish({
        data: '',
        callback:function(responseData){
            //byId("dogmsg").innerText="返回方法调用成功:"+responseData;
        }
    })
}

//---------------------------------------------
//获取跳转页面方法(注册)
window.callNativePage = function (option) {
    bridgeCallHandler({
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
function jumpClick(urlprams,title) {
    callNativePage({
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
window.callNativePageJumpLogin = function (option) {
    bridgeCallHandler({
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
function notLoginJumpLogin() {
    callNativePageJumpLogin({
        data: '',
        callback:function(responseData){
            //byId("dogmsg").innerText="notLoginJumpLogin调用成功:"+responseData;
        }
    })
}
//---------------------------------------------
//1.转盘 2.开宝箱  3 摇一摇  4.喂狗粮食 5.加速 6.金币不足看视频 7普通
//打开激励视频广告(注册)
window.callNativeOpenShowAd = function (option) {
    bridgeCallHandler({
        method: 'openShowAd',
        data: option.data,
        callback: function (responseData) {
            if (option.callback) {
                option.callback(responseData);
            }
        }
    })
}
//1.转盘 2.开宝箱  3 摇一摇  4.喂狗粮食 5.加速 6.金币不足看视频 7普通
//打开激励视频广告，JS调用
function openShowAd(adtype) {
    callNativeOpenShowAd({
        data: adtype,
        callback:function(responseData){
            //byId("dogmsg").innerText="openShowAd调用成功:"+responseData;
        }
    })
}


bridgeRegisterHandler({
	method:"adCallBack",
	callback:function(responseData)
	{
		console.info("html jsbridge adCallBack responseData:" + responseData);
		//事件派发出去
		mvc.send(game.NC.AD_CallBack,responseData);
		//1.转盘 2.开宝箱  3 摇一摇  4.喂狗粮食 5.加速 6.金币不足看视频 7普通,8是离线
		// if(responseData && responseData != "")
		//         CommonAlertView.showGainGold(responseData);
	}
});
