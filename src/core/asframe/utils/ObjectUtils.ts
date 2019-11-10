/**
 * @ObjectUtils.ts
 * @author sodaChen mail:asframe@qq.com
 * @version 1.0
 * <br> Copyright (c) 2012-present, asframe.com
 * <br>Program Name:ASFrameTS
 * <br>Date:2017/1/18
 */
namespace asf
{
    export class ObjectUtils
    {
        static hasProperty(target:Object,property:string):boolean
        {
            if(target.hasOwnProperty(property))
                return true;
            //主要是继承来的
            if(target[property] == undefined)
                return false;
            return true;
        }

        /**
         * 字符串的属性不为空
         * @param target
         * @param property
         * @returns {boolean}
         */
        static strNoNull(target:Object,property:string):boolean
        {
            if(target[property] == undefined)
                return false;
            if(target[property] == null)
                return false;
            if(target[property] == "")
                return false;

            return true;
        }
        static copyObject(target:Object,obj?:Object):any
        {
            if(!obj)
                obj = {};
            for(var key in target)
            {
                //不管3721，全部给他
                obj[key] = target[key];
            }
            return obj;
        }
        // /**
        //  * object对象转换成指定的Bean数据结构
        //  * @param object
        //  * @param bean
        //  */
        // static objectToBean(object:Object,bean:Object):void
        // {
        //     for(var key in object)
        //     {
        //         //不管3721，全部给他，如果要做错误验证，则必须增加一些Type的标签识别了，通过构造函数来识别(反射技术)
        //         bean[key] = object[key];
        //     }
        // }
    }
}