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
     * 字典对象，支持key和value的绑定，支持任意对象作为key。内部使用了Array来实现
     */
    export class Dictionary<K, V> extends ASFObject implements IMap<K, V>
    {
        /**
         * 所有的key组合
         */
        private $keys: Array<K>;
        /**
         * 所有的vaule组合
         */
        private $values: Array<V>;

        public constructor()
        {
            super();
            this.clear();
        }
        put(k: K, v: V): void
        {
            var index: number = this.$keys.indexOf(k);
            if (index == -1)
            {
                this.$keys.push(k);
                this.$values.push(v);
            }
            else
            {
                this.$values[index] = v;
            }
        }
        get(k: K): V
        {
            var index: number = this.$keys.indexOf(k);
            if (index == -1)
            {
                return null;
            }
            return this.$values[index];
        }
        remove(k: K): V
        {
            var index: number = this.$keys.indexOf(k);
            if (index == -1)
            {
                return null;
            }

            var v: V = this.get(k);
            this.$keys.splice(index, 1);
            this.$values.splice(index, 1);

            return v;
        }
        indexOf(key: K): number
        {
            return this.$keys.indexOf(key);
        }
        /**
         * 如果此映射未包含键-值映射关系，则返回 true.
         * @return 如果此映射未包含键-值映射关系，则返回 true.
         */
        isEmpty(): boolean
        {
            return this.$keys.length == 0;
        }

        /**
         * 如果此映射包含指定键的映射关系，则返回 true.
         * @param key  测试在此映射中是否存在的键.
         * @return 如果此映射包含指定键的映射关系，则返回 true.
         */
        hasKey(key: K): boolean
        {
            return this.$keys.indexOf(key) != -1;
        }
        /**
         * 如果该映射将一个或多个键映射到指定值，则返回 true.
         * @param key 测试在该映射中是否存在的值
         * @return 如果该映射将一个或多个键映射到指定值，则返回 true.
         */
        hasValue(value: V): boolean
        {
            return this.$values.indexOf(value) != -1;
        }
        size(): number
        {
            return this.$keys.length;
        }
        keys(copy: boolean = true): Array<K>
        {
            if (copy)
                return this.$keys.concat();
            return this.$keys;
        }
        values(copy: boolean = true): Array<V>
        {
            if (copy)
                return this.$values.concat();
            return this.$values;
        }
        forEach(fun: Function, thisObj: Object): void
        {
            let values:V[] = this.$values;
            let len: number = values.length;
            for (let i: number = 0; i < len; i++)
            {
                fun.call(thisObj, values[i]);
            }
        }
        forKeyValue(fun: Function, thisObj: Object): void
        {
            let values:V[] = this.$values;
            let keys:K[] = this.$keys;
            let len: number = values.length;
            for (let i: number = 0; i < len; i++)
            {
                fun.call(thisObj, keys[i], values[i]);
            }
        }
        /**
         * @inheritDoc
         */
        getContainer(): Object
        {
            return this.$values;
        }
        clear(): void
        {
            this.$keys = [];
            this.$values = [];
        }
        destroy(o?: any): void
        {
            var len: number = this.$values.length;
            for (var i: number = 0; i < len; i++)
            {
                DestroyUtils.destroy(this.$values[i]);
            }
            delete this.$keys;
            delete this.$values;
        }
    }
}
