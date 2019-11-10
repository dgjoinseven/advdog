/**
 * @IReser.ts
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
     * 资源接收器
     * @author sodaChen
     * Date:2017/4/11
     */
    export interface IReser
    {
        /**
         * 用来接受资源加载器加载完成资源
         * @param values 实际的资源
         * @param resList 原来加载资源路径
         */
        setResList(values:any[],resList:mvc.ResBean[]):void;
    }
}