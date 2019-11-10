/**
 * @Net.ts
 * @author sodaChen mail:asframe@qq.com
 * @version 1.0
 * <br> Copyright (c) 2012-present, asframe.com
 * <br>Program Name:ASFrameTS
 * <br>Date:2017/2/10
 */


namespace game
{
    /**
     * webScocket通讯类
     * @author sodaChen
     */
    export class Net
    {
        /** 默认socket，即主socket **/
        static DEFAULE:string = "default";
        // /** 消息头的长度 **/
        // static HEAD_LEN: number = 7;
        /**
         * 网络数据主题对象，notice都是cmd的数值
         */
        static cmds: asf.Subjects;
        /** 通讯接口 **/
        static socket: egret.WebSocket;
        /** 一次性回调函数集合 **/
        private static backFuns: asf.ObjectMap<number, NetFunData>;
        // /** 一次性错误回调函数集合 **/
        private static onceErrorFuns: asf.ObjectMap<number, NetFunData>;
        /** 服务器主动推送数据的回调函数集合 **/
        private static passiveFuns: asf.ObjectMap<number, NetFunData>;
        /** 错误函数回调 **/
        private static errorFuns: asf.ObjectMap<number, NetFunData>;
        /** 允许重复发送的指令集合 **/
        private static soloCmds: asf.ObjectMap<number, number>;
        /** 已经发送出去的指令，服务器返回时需要删除验证 **/
        private static sendCmds: asf.ObjectMap<number, number>;
        /** 编码解码接口的列表 **/
        private static codecList: IMsgCodec[];
        /** 服务器IP **/
        private static host: string;
        /** 错误回调接口 **/
        private static errorBack: INetError;
        /** 多socket的集合（key、value） **/
        private static socketMap:Object;
        /** cmd和对应的socket进行绑定 ***/
        private static cmdSocket:Object;

        static init(errorBack: INetError): void
        {
            this.errorBack = errorBack;
            this.cmds = new asf.Subjects();
            this.backFuns = new asf.ObjectMap<number, NetFunData>();
            this.onceErrorFuns = new asf.ObjectMap<number, NetFunData>();
            this.errorFuns = new asf.ObjectMap<number, NetFunData>();
            this.passiveFuns = new asf.ObjectMap<number, NetFunData>();
            this.soloCmds = new asf.ObjectMap<number, number>();
            this.sendCmds = new asf.ObjectMap<number, number>();
            this.codecList = new Array<IMsgCodec>();
            this.socketMap = {};
            this.cmdSocket = {};

            //初始化自动协议的回调处理,这两行代码放到外面去
            // MsgRecFun.init();
            //把自动生成的解析二进制函数集合放到解码器中来
            // this.addCodec(MsgType.Binary, new BinaryCodec(MsgRecFun.recFun, MsgRec));
            // this.addCodec(0, new BinaryCodec(MsgRecFun.recFun, MsgRec));

            this.errorBack.init();
        }

        static connected(key:string):boolean
        {
            var socket:egret.WebSocket = this.socketMap[key];
            if(socket)
            {
                return socket.connected;
            }
            return false;
        }

        static initSocket(key:string):void
        {
            var socket:egret.WebSocket = this.socketMap[key];
            if(socket)
            {
                socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceive, this);
                socket.removeEventListener(egret.Event.CONNECT, this.onConnect, this);
                socket.removeEventListener(egret.Event.CLOSE, this.onSocketClose, this);
                socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
            }
            //websocket进行初始化
            socket = new egret.WebSocket();
            //绑定key标识
            socket["key"] = key;
            //设置数据格式为二进制，默认为字符串
            socket.type = egret.WebSocket.TYPE_BINARY;
            //添加收到数据侦听，收到数据会调用此方法
            socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceive, this);
            //添加链接打开侦听，连接成功会调用此方法
            socket.addEventListener(egret.Event.CONNECT, this.onConnect, this);
            //添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
            socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
            //添加异常侦听，出现异常会调用此方法
            socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
            //存
            this.socketMap[key] = socket;
            //设置为默认socket
            if(key == this.DEFAULE)
                this.socket = socket;
        }

        /**
         * 注册属于单独属于指定socket的key的cmd数组
         * @param {string} key
         * @param {number[]} cmds
         */
        static regSocketCmd(key:string,cmds:number[]):void
        {
            //注意，一个cmd不可能同时对应有两个socket，所以是唯一的
            var len:number = cmds.length;
            var socket:egret.WebSocket = this.socketMap[key];
            for(var i:number = 0; i < len; i++)
            {
                this.cmdSocket[cmds[i]] = socket;
            }
        }

        /**
         * 删除掉cmd数组绑定的socket
         * @param {number[]} cmds
         */
        static delSocketCmd(cmds:number[]):void
        {
            //注意，一个cmd不可能同时对应有两个socket，所以是唯一的
            var len:number = cmds.length;
            for(var i:number = 0; i < len; i++)
            {
                delete this.cmdSocket[cmds[i]];
            }
        }
        /**
         * 连接
         * 
         * @static
         * 
         * @memberOf Net
         */
        static connect(host: string,key:string = "default"): void
        {
            //websocket进行初始化
            this.initSocket(key);
            this.host = host;
            console.info(key + "链接服务器:" + host);
            this.socketMap[key].connectByUrl(host);
        }

        static close(key:string = "default"): void
        {
            console.info("客户端自己中断服务器");
            // this.socketMap[]
            if(this.socketMap[key])
                this.socketMap[key].close();
        }

        // private static getSocket(key?:string):egret.WebSocket
        // {
        //
        // }

        // /**
        //  * 删除callback回调函数
        //  * @param cmd
        //  */
        // static delCallBack(cmd: number): void
        // {
        //     this.backFuns.remove(cmd);
        // }

        /**
         * 注册不允许连续重复发送的指令cmd。只能等只能有返回结果之后才允许下一次发送
         * @param cmd
         */
        static regSoloCmd(cmd: number): void
        {
            this.soloCmds.put(cmd, cmd);
        }
        static delSoloCmd(cmd: number): void
        {
            this.soloCmds.remove(cmd);
        }

        /**
         * 注册监听错误码
         * @param cmd 错误指令
         * @param fun 回调函数
         * @param thisObj this对象
         */
        static regError(cmd: number, fun: Function, thisObj: Object, isOnce: boolean = true): void
        {
            if (isOnce)
                this.onceErrorFuns.put(cmd, new NetFunData(fun, thisObj));
            else
                this.errorFuns.put(cmd, new NetFunData(fun, thisObj));
        }
        /**
         * 注册服务端主动推送的回调函数
         * @param backCmd 返回指令
         * @param backFun 回调函数
         * @param thisObj this对象,如果backFun是闭包函数，则不需要
         */
        static regPassive(backCmd: number, backFun: Function, thisObj: Object): void
        {
            this.passiveFuns.put(backCmd, new NetFunData(backFun, thisObj));
        }
        /**
         * 添加一个解码器
         * @param type 解码类型
         * @param msgCodec 解码器
         */
        private static addCodec(type: number, msgCodec: IMsgCodec): void
        {
            this.codecList[type] = msgCodec;
        }

        private static onReceive(evt: egret.Event): void
        {
            // return;
            let bytes: egret.ByteArray = new egret.ByteArray();
            //直接根据目标socket对象进行处理（有可能同时存在多个socket）
            var socket:egret.WebSocket = evt.target as egret.WebSocket;
            socket.readBytes(bytes);
            let cmd: number = bytes.readShort();
            let type: number = bytes.readByte();
            let code: number = bytes.readShort();
            let netData: NetFunData;
            //注册过才删除，返回是比发送多10000（存的是发送指令，所以减）
            if (this.soloCmds.hasKey(cmd - 10000))
                this.sendCmds.remove(cmd - 10000);

            //10000是请求服务端操作成功 0
            if (code != 0)
            {
                netData = this.onceErrorFuns.remove(cmd);
                if (!netData)
                {
                    netData = this.errorFuns.get(cmd);
                }
                //没有isDestroy属性或者isDestroy为false
                if (netData && !netData.thisObj["isDestroy"])
                {
                    console.log("有错误回调函数处理的cmd:" + cmd + " errCode:" + code + " this:" + netData.thisObj);
                    netData.fun.call(netData.thisObj, code, cmd);
                }
                //所有没有处理的都走统一处理接口
                this.errorBack.errorBack(cmd, code);
                return;
            }

            // if (game.CoreConst.config.gameType == "xj")
            // {
            // if (cmd != 20100 && cmd != 20104 && cmd != 20105 && cmd != 20102)
            //     console.log("cmd:" + cmd);
            // }

            //根据类型解码数据
            let data = this.codecList[type].decode(cmd, bytes);
            //先看有没有回到函数
            netData = this.backFuns.remove(cmd);
            //查看是否有主动推送的消息
            if (!netData)
                netData = this.passiveFuns.get(cmd);


            //先判断是否有回调函数，有的话，则先抛出给回调函数
            if (netData && !netData.thisObj["isDestroy"])
            {
                let callFun: Function = netData.fun;
                let thisObj: Object = netData.thisObj;
                //长度为3时，表示需要接收cmd参数
                if (callFun.length == 3)
                    callFun.call(thisObj, data, code, cmd);
                else
                    callFun.call(thisObj, data, code);

                //todo 这里还有点bug，错误和正确接受函数得统一处理，不然会出现无法回收的情况
                //如果有错误回调函数，也进行清除

            }
            else
            {
                //抛出数据，目前是只有没有回调函数的时候才全局广播，减少性能的损耗
                this.cmds.send(cmd, data, code);
            }
        }
        private static onConnect(evt:egret.Event): void
        {
            var socket:egret.WebSocket = evt.target as egret.WebSocket;
            console.info("onSocketOpen:" + socket["key"]);
            this.cmds.send(game.CoreNotice.SOCEKT_OPEN,socket["key"]);
        }

        private static onSocketClose(evt:egret.Event): void
        {
            var socket:egret.WebSocket = evt.target as egret.WebSocket;
            console.info("onSocketClose:" + socket["key"]);
            this.cmds.send(game.CoreNotice.SOCEKT_CLOSE,socket["key"]);
            if(socket["key"] == this.DEFAULE)
                this.errorBack.onSocketClose();
        }

        private static onSocketError(evt: egret.IOErrorEvent): void
        {
            var socket:egret.WebSocket = evt.target as egret.WebSocket;
            console.error("onSocketError:" + socket["key"]);
            // console.error("" + e.to);
            this.cmds.send(game.CoreNotice.SOCEKT_CLOSE,socket["key"]);
            // this.cmds.send(game.CoreNotice.SOCEKT_ERROR,socket["key"]);

            if(socket["key"] == this.DEFAULE)
                this.errorBack.onSocketError();
        }
        /**
         * 发送网络数据
         * @param cmd 消息的cmd唯一值
         * @param data 任意消息体
         * @param type 指定消息体的类型，为空则是按照默认值
         */
        static send(cmd: number, data: any, type: number, callBack?: Function, thisObj?: Object): void
        {
            if (data == null)
            {
                //没有任何参数
                this.sendBinary(cmd, type, null);
                return;
            }
            //对应类型的编码函数
            // var bytes: egret.ByteArray = this.codecList[type].code(data);
            var bytes: egret.ByteArray = this.codecList[0].code(data);
            this.sendBinary(cmd, type, bytes);
        }
        static sendBytes(cmd: number, bytes: egret.ByteArray, callBack: Function, thisObj: Object, errorFun: Function): void
        {
            if (callBack)
                this.backFuns.put(cmd + 10000, new NetFunData(callBack, thisObj));
            if (errorFun)
                this.onceErrorFuns.put(cmd + 10000, new NetFunData(errorFun, thisObj));
            //0是二进制
            this.sendBinary(cmd, 0, bytes);
        }

        /**
         * 协议工具生成的发送代码时调用的代码
         * @param cmd 发送唯一指令
         * @param args 参数列表
         * @param type 编码类型
         */
        static autoMsg(cmd: number, args: any, type: number): void
        {
            if(cmd == 22206)
            {
                console.log("检查一下");
            }
            try{
            //只有开启了单独发送的指令才会做这个检测，提高发送性能
            if (this.soloCmds.hasKey(cmd))
            {
                if (this.sendCmds.hasKey(cmd))
                {
                    console.log("cmd:" + cmd + " 重复发送了！");
                    return;
                }
                //对指令进行检测，已经发送过了，并且不能重复发送指令，则返回不处理
                this.sendCmds.put(cmd, cmd);
            }
            var len: number = args.length - 1;
            if (len >= 0)
            {
                let callBack: Function;
                let thisObj: Object;
                //最后一个参数是函数的处理，没有this对象，最后一个函数
                if (args[len] instanceof Function)
                {
                    //最后一个function肯定是错误的回调函数，往前两个分别是thisObj和succfun
                    if (args[len - 1] == null)
                        throw new Error(cmd + "如果有回调函数，必须带thisObj参数");
                    //必定是回调函数
                    if (args[len - 2] != null && !(args[len - 2] instanceof Function))
                    {
                        throw new Error(cmd + "如果有回调函数，必须带thisObj参数");
                    }
                    thisObj = args[len - 1];
                    this.onceErrorFuns.put(cmd + 10000, new NetFunData(args[len], thisObj));
                    callBack = args[len - 2];
                }
                //看倒数第二个是不是函数
                else if (len >= 1 && args[len - 1] instanceof Function)
                {
                    callBack = args[len - 1];
                    //最后一个一定是this对象，不然请报错
                    thisObj = args[len];
                }
                // if (thisObj == null)
                //     throw new Error(cmd + "如果有回调函数，必须带thisObj参数");
                //加载返回cmd的通用值,回调函数缓存起来.这里存的是一次性的回调函数
                if (callBack)
                    this.backFuns.put(cmd + 10000, new NetFunData(callBack, thisObj));
            }

            if (len < 0)
            {
                //没有任何参数
                this.sendBinary(cmd, type, null);
                return;
            }
            //对应类型的编码函数
            var bytes: egret.ByteArray = this.codecList[type].code(args);
            this.sendBinary(cmd, type, bytes);
            }
            catch(e)
            {
                alert(e)
            }
        }

        private static sendBinary(cmd: number, type: number, data: egret.ByteArray): void
        {
            // return;
            try
            {
            var bytes: egret.ByteArray = new egret.ByteArray();
            bytes.writeShort(cmd);
            bytes.writeByte(type);
            if (data == null)
            {
                bytes.writeShort(0);
            }
            else
            {
                bytes.writeShort(data.length);
                bytes.writeBytes(data);
            }
            //查看该cmd是否有绑定其他socket，有的话则直接用，否则用默认的
            var temp:egret.WebSocket = this.cmdSocket[cmd];
            if(!temp)
                temp = this.socket;
            temp.writeBytes(bytes);
            temp.flush();
            }
            catch(e)
            {
                alert(e)
            }
        }

    }

    export class NetFunData
    {
        /** 回调函数 **/
        fun: Function;
        errorFun: Function;
        /** this对象 **/
        thisObj: Object;
        /** 是否只使用一次 **/
        isOnce: boolean;
        constructor(fun: Function, thisObj: Object)
        {
            this.fun = fun;
            this.thisObj = thisObj;
        }
    }
}