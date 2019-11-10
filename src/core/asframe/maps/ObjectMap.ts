/**
 * @HashMap.ts
 *
 * @author sodaChen mail:asframe#qq.com
 * @version 1.0
 * <br>Copyright (C), 2012-present ASFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:Collections
 * <br>Date:2012-1-7
 */
namespace asf
{
    /**
     * 底层使用Object作为容器的对象，只支持Key为String和Number的集合对象，效率会比较高，直接利用了Object作为容器
     * @author sodaChen
     * Date:2012-1-7
     */
    export class ObjectMap<K, V> extends ASFObject implements IMap<K, V>
    {
        /** 长度 **/
        private _length: number;
        private obj: Object;
        constructor()
        {
            super();
            this.obj = new Object();
            this._length = 0;
        }

        /**
         * 将指定的值与此映射中的指定键相关联.
         * @param key 与指定值相关联的键.
         * @param value 与指定键相关联的值.
         */
        put(key: K, value: V)
        {
            if (this.obj[key as any] != null)
            {
                this._length--;
            }
            this.obj[key as any] = value;
            this._length++;
        }

        /**
         * 返回此映射中映射到指定键的值.
         * @param key 与指定值相关联的键.
         * @return 此映射中映射到指定值的键，如果此映射不包含该键的映射关系，则返回 null.
         */
        get(key: K): V
        {
            return this.obj[key as any];
        }

        /**
         * 从此映射中移除所有映射关系
         */
        clear()
        {
            this.obj = new Object();
            this._length = 0;
        }

        /**
         * 如果存在此键的映射关系，则将其从映射中移除
         * @param key 从映射中移除其映射关系的键
         * @return 以前与指定键相关联的值，如果没有该键的映射关系，则返回 null
         */
        remove(key: K): V
        {
            var temp: V = this.obj[key as any];
            if (temp != null)
            {
                delete this.obj[key as any];
                this._length--;
            }
            return temp;
        }

        /**
         * 返回此映射中的键-值映射关系数.
         * @return 此映射中的键-值映射关系的个数.
         */
        size(): number
        {
            return this._length;
        }

        /**
         * 如果此映射未包含键-值映射关系，则返回 true.
         * @return 如果此映射未包含键-值映射关系，则返回 true.
         */
        isEmpty(): boolean
        {
            return this._length == 0;
        }

        /**
         * 如果此映射包含指定键的映射关系，则返回 true.
         * @param key  测试在此映射中是否存在的键.
         * @return 如果此映射包含指定键的映射关系，则返回 true.
         */
        hasKey(key: K): boolean
        {
            return this.obj[key as any] != null;
        }

        /**
         * 如果该映射将一个或多个键映射到指定值，则返回 true.
         * @param key 测试在该映射中是否存在的值
         * @return 如果该映射将一个或多个键映射到指定值，则返回 true.
         */
        hasValue(value: V): boolean
        {
            for (var key in this.obj)
            {
                if (this.obj[key] == value)
                {
                    return true;
                }
            }
            return false;
        }

        /**
         * 返回此映射中包含的所有值.
         * @return 包含所有值的数组
         */
        values(): Array<V>
        {
            var ary: Array<V> = [];
            if (this._length != 0)
            {
                for (var key in this.obj)
                {
                    ary.push(this.obj[key]);
                }
                return ary;
            }
            return ary;
        }

        /**
         * 返回此映射中包含的所有key值.
         * @return 包含所有key的数组
         */
        keys<K>(): Array<K>
        {
            var ary: Array<K> = [];
            if (this._length != 0)
            {
                for (var key in this.obj)
                {
                    ary.push(key as any);
                }
                return ary;
            }
            return ary;
        }
        /**
         * @inheritDoc
         */
        getContainer(): Object
        {
            return this.obj;
        }
        forEach(fun: Function, thisObj: Object): void
        {
            for (var key in this.obj)
            {
                fun.call(thisObj, this.obj[key]);
            }
        }
        forKeyValue(fun: Function, thisObj: Object): void
        {
            for (var key in this.obj)
            {
                fun.call(thisObj, key, this.obj[key]);
            }
        }
        destroy(o?: any): void
        {
            for (var key in this.obj)
            {
                DestroyUtils.destroy(this.obj[key]);
            }
            this.obj = null;
        }
    }
}
