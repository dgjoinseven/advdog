/**
 * @Dictionary.ts
 * @author sodaChen mail:asframe@qq.com
 * @version 1.0
 * <br> Copyright (c) 2012-present, asframe.com
 * <br>Program Name:ASFrameTS
 * <br>Date:2017/1/19
 */
namespace asf
{
    /**
     * number作为key的字典对象，支持数字和value的绑定，只支持number对象作为key。内部使用了Array来实现。每个数字key是下标。
     * 使用这个数组的容器对象必须注意，容器是数组，但是有的下表下面可能是null或者undefind
     */
    export class NumberKeyMap<V> implements IMap< Number, V>
    {
        /** 集合的长度(非内部数组长度) **/
        public length:number;
        /**
         *  numberey是数组的下标，对应的是value
         */
        private $keyValues: V[];


        public constructor()
        {
            this.clear();
        }
        put(k:number, v: V): void
        {
            let value:V = this.$keyValues[k];
            if (!value)
            {
                //key下表没有对应的vule，长度才增加
                this.length++;
            }
            //直接存放
            this.$keyValues[k] = v;
        }
        get(k:number): V
        {
            return this.$keyValues[k];
        }
        remove(k:any): V
        {
            var v: V = this.$keyValues[k];
            if(v)
            {
                this.$keyValues.splice(k, 1);
                this.length--;
            }
            return v;
        }
        indexOf(key:number):  number
        {
            if(this.$keyValues[key])
                return key;
            return -1;
        }
        /**
         * 如果此映射未包含键-值映射关系，则返回 true.
         * @return 如果此映射未包含键-值映射关系，则返回 true.
         */
        isEmpty(): boolean
        {
            return this.length == 0;
        }

        /**
         * 如果此映射包含指定键的映射关系，则返回 true.
         * @param  numberey  测试在此映射中是否存在的键.
         * @return 如果此映射包含指定键的映射关系，则返回 true.
         */
        hasKey(key:number): boolean
        {
            if(this.$keyValues[key])
                return true;
            return false;
        }
        /**
         * 如果该映射将一个或多个键映射到指定值，则返回 true.
         * @param  numberey 测试在该映射中是否存在的值
         * @return 如果该映射将一个或多个键映射到指定值，则返回 true.
         */
        hasValue(value: V):boolean
        {
            return this.$keyValues.indexOf(value) != -1;
        }
        size():  number
        {
            return this.length;
        }
        keys(copy: boolean = true):number[]
        {
            let keyValues:V[] = this.$keyValues;
            let len: number = keyValues.length;
            let ary:number[] = [];
            for(let i: number = 0; i < len; i++)
            {
                if(keyValues[i])
                    ary.push(i);
            }
            return ary;
        }
        values(copy: boolean = true): V[]
        {
            let keyValues:V[] = this.$keyValues;
            let len: number = keyValues.length;
            let values:V[] = [];
            for(let i: number = 0; i < len; i++)
            {
                if(keyValues[i])
                    values.push(keyValues[i]);
            }
            return values;
        }
        forEach(fun:Function,thisObj:Object): void
        {
            let keyValues:V[] = this.$keyValues;
            let len: number = keyValues.length;
            for (let i:  number = 0; i < len; i++)
            {
                if(keyValues[i])
                fun.call(thisObj,keyValues[i]);
            }
        }
        forKeyValue(fun:Function,thisObj:Object): void
        {
            let keyValues:V[] = this.$keyValues;
            let len: number = keyValues.length;
            for (let i:  number = 0; i < len; i++)
            {
                if(keyValues[i])
                    fun.call(thisObj,i,keyValues[i]);
            }
        }
        /**
         * @inheritDoc
         */
        getContainer(): Object
        {
            return this.$keyValues;
        }
        clear(): void
        {
            this.length = 0;
            this.$keyValues = [];
        }
        destroy(o?: any): void
        {
            let keyValues:V[] = this.$keyValues;
            let len: number = keyValues.length;
            for (let i:  number = 0; i < len; i++)
            {
                if(keyValues[i])
                    DestroyUtils.destroy(keyValues[i]);
            }
            delete this.$keyValues;
        }
    }
}
