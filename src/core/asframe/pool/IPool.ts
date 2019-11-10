/**
 * @IObjectPool.as
 *
 * @author sodaChen mail:asframe#163.com
 * @version 1.0
 * <br>Copyright (C), 2012 ASFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:Pool
 * <br>Date:2012-1-15
 */
namespace asf
{
    /**
     * 对象池接口，该接口可以用来存放任意对象的对象池接口
     * @author sodaChen
     *
     */
    export interface IPool<T> extends IDestory
    {
        /**
         * 借出一个对象
         * @return
         *
         */
         create():T;

        /**
         * 是否已满
         * @param obj
         *
         */
         isFull():boolean;

        /**
         * 归还对象
         * @param obj
         *
         */
         release(obj:T):void;

        /**
         * 返回池里的可用对象
         * @return
         *
         */
         getNumIdle() :number;

        /**
         * 清除池里的所有对象，恢复成最初状态
         */
         clear() :void;
    }
}