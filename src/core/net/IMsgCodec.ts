/**
 * @IMsgCoder.ts
 * @author sodaChen mail:asframe#qq.com
 * @version 1.0
 * <br> Copyright (c) 2012-present, asframe.com
 * <br>Program Name:ASFrameTS
 * <br>Date:2017/2/24
 */
namespace game
{
    /**
     * 消息的编码和解码接口
     * @author sodaChen
     * Date:2017/2/24
     */
    export interface IMsgCodec
    {
        /**
         * 编码
         * @param data
         */
        code(data:any):egret.ByteArray;
        /**
         * 解码
         * @param bytes
         */
        decode(backCmd:number,bytes:egret.ByteArray):any;
    }
}