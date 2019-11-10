/**
 * @BasicMsgCoder.ts
 * @author sodaChen mail:asframe#qq.com
 * @version 1.0
 * <br> Copyright (c) 2012-present, asframe.com
 * <br>Program Name:ASFrameTS
 * <br>Date:2017/2/24
 */
namespace game
{
    /**
     *
     * @author sodaChen
     * Date:2017/2/24
     */
    export class BasicMsgCodec
    {
        /** 消息长度 **/
        protected msgLen:number;

        public constructor()
        {
        }

        /**
         * 检测能否继续解析消息体
         * @param bytes
         * @returns {boolean}
         */
        protected isCheckout(bytes:egret.ByteArray):boolean
        {
            this.msgLen = bytes.readShort();
            if(this.msgLen == bytes.bytesAvailable)
                return true;
            return false;
        }
    }
}