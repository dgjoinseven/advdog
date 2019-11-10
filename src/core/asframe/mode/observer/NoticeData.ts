/**
 * @NoticeData.ts
 * @author sodaChen mail:asframe@qq.com
 * @version 1.0
 * <br> Copyright (c) 2012-present, asframe.com
 * <br>Program Name:ASFrameTS
 * <br>Date:2017/1/23
 */
namespace asf
{
    export class NoticeData
    {
        /** 通知主题 **/
        notice:string | number;
        /** 监听函数 **/
        listener:Function;
        /** 执行域对象 **/
        thisObj:Object;
        /** 是否只执行一次就删除 **/
        isOnce:boolean;

        constructor(listener:Function,thisObj:Object,isOnce:boolean = false)
        {
            this.listener = listener;
            this.thisObj = thisObj;
            this.isOnce = isOnce;
        }
    }
}
