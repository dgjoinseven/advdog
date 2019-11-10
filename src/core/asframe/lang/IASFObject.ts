/**
 * @IASFObject.ts
 * @author sodaChen mail:asframe@qq.com
 * @version 1.0
 * <br> Copyright (c) 2012-present, asframe.com
 * <br>Program Name:ASFrameTS
 * <br>Date:2017/1/19
 */
namespace asf
{
    /**
     * 顶级对象。框架内所有对象的基类，为对象实例提供唯一的hashCode值。
     */
    export interface IHashObject
    {
        /**
         * 返回此对象唯一的哈希值,用于唯一确定一个对象。hashCode为大于等于1的整数。
         * @readOnly
         */
        hashCode: number;
    }

    // export interface IDestory
    // {
    //     /**
    //      * 释放对象相关资源
    //      * @param o:释放时需要的参数（不是必须的）
    //      *
    //      */
    //     destroy(o?: any): void;
    // }
    /**
     * 返回此 Object 的运行时类，用于new Class出新的对象
     */
    export interface IClass
    {
        /**
         * 返回此对象唯一的哈希值,用于唯一确定一个对象。hashCode为大于等于1的整数。
         * @readOnly
         */
        getClass(): Object;
    }
    /**
     * 指示其他某个对象是否与此对象“相等”。
     * equals 方法在非空对象引用上实现相等关系：
     * 自反性：对于任何非空引用值 x，x.equals(x) 都应返回 true。
     * 对称性：对于任何非空引用值 x 和 y，当且仅当 y.equals(x) 返回 true 时，x.equals(y) 才应返回 true。
     * 传递性：对于任何非空引用值 x、y 和 z，如果 x.equals(y) 返回 true，并且 y.equals(z) 返回 true，那么 x.equals(z) 应返回 true。
     * 一致性：对于任何非空引用值 x 和 y，多次调用 x.equals(y) 始终返回 true 或始终返回 false，
     * 前提是对象上 equals 比较中所用的信息没有被修改。
     * 对于任何非空引用值 x，x.equals(null) 都应返回 false。
     * Object 类的 equals 方法实现对象上差别可能性最大的相等关系；即，对于任何非空引用值 x 和 y，当且仅当 x 和 y 引用同一个对象时，
     * 此方法才返回 true（x == y 具有值 true）。
     *（模仿java语言的equals功能）
     * @author sodaChen
     * Date:2011-5-4
     */
    export interface IEquals
    {
        /**
         * 返回此对象唯一的哈希值,用于唯一确定一个对象。hashCode为大于等于1的整数。
         * @readOnly
         */
        equals(object: ASFObject): boolean;
    }
    /**
     * 复制一个新的对象
     */
    export interface ICloneable
    {
        clone(): any;
    }

    export interface IASFObject extends IHashObject, IEquals, IClass, ICloneable
    {

    }
}
