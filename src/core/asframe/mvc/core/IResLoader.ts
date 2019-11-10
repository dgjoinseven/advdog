/**
 * @IResLoader.ts
 *
 * @author sodaChen mail:asframe#qq.com
 * @version 1.0
 * <br>Copyright (C), 2012 ASFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:Collections
 * <br>Date:2017/4/11
 */
namespace mvc
{
    /**
     * mvc的资源加载器，如果不是使用mvc框架默认的资源加载器时，请重新实现这个接口
     * @author sodaChen
     * Date:2017/4/11
     */
    export interface IResLoader extends asf.IDestory
    {
        loadResList(resList:ResBean[],reser:IReser):void;
    }
}