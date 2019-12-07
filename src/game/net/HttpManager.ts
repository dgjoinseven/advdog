namespace game
{
    /**
     * 拦截view
     * @author sodaChen
     * Date:2017/7/7
     */
    export class HttpManager
    {
        /**
         * 通用统一的token
         */
        // static token:string = "08c82a4b8d738b7cea3c8a837bb3ec13";
        // static token:string = "74b9300abcb1003f33f4744cb01b9a73";   //有高级狗
        // static token:string = "08c82a4b8d738b7cea3c8a837bb3ec13" //是有高级狗的，有2数组
        // static token:string = "3f115648ca388d4ba8d793e4db02cef6" //这个都是37只狗

        // 8da27ef77dbc5eed5d993bcd75bf0e5f
        // 2d64776c3c8e43266b911d38ecc5f21f
        // f1b5bd51310b27fd689c494a52e3e5a4
        // 917f5f6cc0547ed918f8c1cdff1e9ca6
        // e93cef05b57735689f3c821692a7dd0c
        
        private static token:string = "8252beaa12707e4c85a76596c487e3a8" //这个都是37只狗
        static urlHead:string;
        /**
         * 版本信息
         */
        static ver:string = "1.0";
        
        private static callBackMap:asf.HashMap<string,asf.CallBack> = new asf.HashMap<string,asf.CallBack>();

        private static checkRestUrlMap:asf.HashMap<string,number> = new asf.HashMap<string,number>();
        private static headers:egret.URLRequestHeader[] = [new egret.URLRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8")];
        /**
         * 设置token放到协议头
         */
        static initHeaders(token:string):void
        {
            this.token = token;
            this.headers.push(new egret.URLRequestHeader("token", token));
        }
        private static createURLLoader(url:string,params?:Object):string
        {
            let http:egret.URLLoader = new egret.URLLoader();
            let urlRequest:egret.URLRequest = new egret.URLRequest();
            urlRequest.method = egret.URLRequestMethod.POST;
            urlRequest.url = this.urlHead + url;
            urlRequest.requestHeaders = this.headers;
            let urlVariables:egret.URLVariables = new egret.URLVariables();
            if(!params)
            {
                params = {};
            }
            //todo 正式环境需要注释掉
            params["token"] = this.token;
            params["ver"] = this.ver;
            urlVariables.variables = params;
            urlRequest.data = urlVariables;
            console.info("请求data:",params);
            http.addEventListener(egret.Event.COMPLETE,this.httpResult,this)
            http.load(urlRequest);
            return urlRequest.url;
        }
        // /**
        //  * 请求首页
        //  */
        // static requestMain(fun:Function,that:Object):void
        // {
        //     let url = this.urlHead + "getHomePage";
        //     let http:egret.URLLoader = new egret.URLLoader();
        //     let urlRequest:egret.URLRequest = new egret.URLRequest();
        //     urlRequest.method = egret.URLRequestMethod.POST;
        //     urlRequest.url = url;
        //     let urlVariables:egret.URLVariables = new egret.URLVariables();
        //     urlVariables.variables = {};
        //     urlVariables.variables["token"] = this.token;
        //     urlVariables.variables["ver"] = this.ver;
        //     urlRequest.data = urlVariables;
        //     //回调方法存放起来
        //     this.callBackMap.put(url,new asf.CallBack(fun,that));
        //     http.addEventListener(egret.Event.COMPLETE,this.httpResult,this);
        //     http.addEventListener(egret.IOErrorEvent.IO_ERROR,this.httpResult,this);
        //     http.load(urlRequest);
        // }
        static clearUrl(url:string):void
        {
            this.checkRestUrlMap.remove(url);
        }
        /**
         * 通用的http请求，不需要特殊参数。或者参数在url屁股后面
         */
        static postHttp(url:string,fun:Function,that:Object)
        {
            if(this.checkUrl(url))
                return ;

            this.callBackMap.put(this.createURLLoader(url),new asf.CallBack(fun,that));
        }
        /**
         * 发送带有参数的请求
         */
        static postHttpByParam(url:string,param:Object,fun:Function,that:Object)
        {
            if(this.checkUrl(url))
                return ;
            this.callBackMap.put(this.createURLLoader(url,param),new asf.CallBack(fun,that));
        }
        private static checkUrl(url:string):boolean
        {
            if(this.checkRestUrlMap.hasKey(url))
            {
                let lastTime:number = this.checkRestUrlMap.get(url);
                let addTime:number = egret.getTimer() - lastTime;
                //200毫秒以内不再请求
                if(addTime < 200)
                {
                    console.log(url + "重复请求了");
                    return true;
                }
                else
                {
                    console.log(url + "距离上次请求超过200毫秒了，可以重新请求");
                }
            }
            this.checkRestUrlMap.put(url,egret.getTimer());
            return false;
        }
        private static onIoError(evt:egret.IOErrorEvent):void
        {
             let http:egret.URLLoader = evt.currentTarget as egret.URLLoader;
             http.removeEventListener(egret.Event.COMPLETE,this.httpResult,this);
             http.removeEventListener(egret.IOErrorEvent.IO_ERROR,this.httpResult,this);
             let callBack = this.callBackMap.remove(http._request.url);
             console.error(http._request.url + "无法请求到数据");
        }
        private static httpResult(evt:egret.Event):void
        {
             let http:egret.URLLoader = evt.currentTarget as egret.URLLoader;
             http.removeEventListener(egret.Event.COMPLETE,this.httpResult,this);
             http.removeEventListener(egret.IOErrorEvent.IO_ERROR,this.httpResult,this);
             let callBack = this.callBackMap.remove(http._request.url);
             //初步分析结果
            let result = JSON.parse(http.data);
            console.log(http._request.url + "返回结果:",result);
             if(callBack)
             {
                //  if(http._request.url.indexOf(NC.Shop_Url) != -1)
                //     {
                //         Modules.mainModule.upMainInfo();
                //     }
                 if(result.code == 0)
                 {
                    callBack.execute(result.data);
                 }
                 else
                 {
                     //拦截特定的错误码
                    if(http._request.url.indexOf(NC.BuyDog_Url) != -1)
                    {
                        //关闭掉商店
                        mvc.closeView(ShopView);
                        //商店购买错误信息，弹出钱不够看视频的提示
                        mvc.open(GoldNoFullView,NC.Shop_Video);
                        if(DB.instance.mainInfoVo && DB.instance.mainInfoVo.tagNum == "0")
                        {
                            //结束新手引导
                            NewHandHelper.closeNewHand();
                            NewHandHelper.newHandOver();
                        }
                        return ;
                    }
                    if(result.code == 1101)
                    {
                        //拖动或者交换出现位置错误。进行数据纠正
                        Modules.mainModule.upMainInfo();
                    }
                    else
                    {
                        //弹出错误码
                        //console.error(result);
                        if(result.msg && result.msg != "")
                        {
                            TipView.showTip(result.msg);
                        }
                    }
                    
                 }
             }
        }
    }
}