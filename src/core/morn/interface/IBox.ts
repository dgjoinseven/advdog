/**
 * @IBox.ts
 *
 * @author sodaChen mail:asframe#qq.com
 * @version 1.0
 * <br>Copyright (C), 2012 ASFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:Collections
 * <br>Date:2017/3/28
 */
namespace morn
{
    /**
     *
     * @author sodaChen
     * Date:2017/3/28
     */
    export interface IBox extends IComponent
    {
        /**删除子显示对象，子对象为空或者不包含子对象时不抛出异常*/
        removeElement(element: egret.DisplayObject): void;
        /**删除所有子显示对象
         * @param except 例外的对象(不会被删除)*/
        removeAllChild(except: egret.DisplayObject): void;
    }
}