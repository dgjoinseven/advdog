/**
 * @ICallBack.ts
 * @author sodaChen mail:asframe@qq.com
 * @version 1.0
 * <br> Copyright (c) 2012-present, asframe.com
 * <br>Program Name:ASFrameTS
 * <br>Date:2017/2/7
 */
namespace asf
{
    /**
     * 回调函数接口对象，主要是为了不用再额外绑定对象
     */
    export interface ICallBack
    {
        /**
         * 执行回调函数接口
         * @param args 任意参数，根据需要指定
         */
        execute(...args): void;
    }
}
