/**
 * @AryBinaryCoder.ts
 * @author sodaChen mail:asframe#qq.com
 * @version 1.0
 * <br> Copyright (c) 2012-present, asframe.com
 * <br>Program Name:ASFrameTS
 * <br>Date:2017/2/24
 */
namespace game
{
    /**
     * 二进制数组解析器
     * @author sodaChen
     * Date:2017/2/24
     */
    export class BinaryCodec extends BasicMsgCodec implements IMsgCodec
    {
        /** 回调函数的this对象 **/
        recthis:Object;
        /** 解码函数集合,由外部设置 **/
        recFun: Object;

        constructor(recFun: Object,recthis:Object)
        {
            super();
            this.recthis = recthis;
            this.recFun = recFun;
        }
        /**
         * 编码
         * @param bytes
         */
        code(args: any): egret.ByteArray
        {
            var bytes: egret.ByteArray = new egret.ByteArray();
            this.writeArgs(bytes, args);
            return bytes;
        }
        private writeArgs(bytes: egret.ByteArray, args: any[]): void
        {
            //强制转换成参数数组
            var len: number = args.length;
            var value: any;
            for (var j: number = 0; j < len; j++)
            {
                value = args[j];
                if (typeof value == 'number')
                {
                    NetUtils.writeVaryNum(bytes, value);
                } else if (typeof value == 'string')
                {
                    var byteArray:egret.ByteArray = new egret.ByteArray();
                    byteArray.writeUTFBytes(value);
                    NetUtils.writeVaryNum(bytes, byteArray.length);
                    bytes.writeBytes(byteArray);
                } else if (typeof value == 'boolean')
                {
                    bytes.writeBoolean(value);
                } else if (value instanceof Array)
                {
                    // bytes.writeInt(value.length);
                    var aryLen:number = value.length;
                    NetUtils.writeVaryNum(bytes, aryLen);
                    this.writeArgs(bytes, value);
                    // for(var i:number = 0; i < aryLen; i++)
                    // {
                    //     this.writeArgs(bytes, [value[i]]);
                    // }
                }
                else if (value instanceof Function)
                {
                    //遇到函数，可以直接退出了，后面有数据也是this对象
                    return;
                }
                else if (typeof value == 'object')
                {
                    //不需要发送object对象到服务器去，抛出异常
                    throw new Error("发送给服务器的参数不需要有object:" + value);
                }
            }
        }
        /**
         * 解码
         * @param bytes
         */
        decode(backCmd: number, bytes: egret.ByteArray): any
        {
            if (this.isCheckout(bytes))
            {
                if (!this.recFun[backCmd])
                {
                    console.log("协议号不存在 : " + backCmd);
                    return null;
                }
                var backFun: Function = this.recFun[backCmd];
                return backFun.call(this.recthis,bytes);
            }
            return null;
        }
    }
}