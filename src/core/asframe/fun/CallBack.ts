/**
 * @CallBack.ts
 * @author sodaChen mail:asframe@qq.com
 * @version 1.0
 * <br> Copyright (c) 2012-present, asframe.com
 * <br>Program Name:ASFrameTS
 * <br>Date:2017/2/6
 */
namespace asf
{
    /**
     * 回调函数对象，主要是增加了对this对象和参数的引用
     * @author sodaChen
     */
    export class CallBack
    {
        /** 池对象 **/
        // static pool: Pool<CallBack> = new Pool<CallBack>(CallBack, 1000);
        static pool: Pool<CallBack>;

        /** 是否自动释放回池了 **/
        autoRelesea: boolean;
        inPool: boolean;
        /** 回调函数 **/
        fun: Function;
        /** 执行回调函数时需要返回的参数 **/
        param: any;
        /** 回调函数需要的执行环境对象 **/
        thisObj: Object;

        // static createAuto():void
        // {
        //
        // }
        /**
         * 通过对象池获得或者创建CallBack对象
         * @param fun 函数
         * @param thisObj this对象
         * @param param 可选参数z
         * @param autoRelese 是否执行完execute就主动放回对象池
         * @returns {CallBack} 实例
         */
        static create(fun: Function, thisObj: Object, param?: any, autoRelesea: boolean = false): CallBack
        {
            if (this.pool == null)
                this.pool = new Pool<CallBack>(CallBack, 1000);
            var callBack: CallBack = this.pool.create();
            callBack.autoRelesea = autoRelesea;
            callBack.inPool = false;
            callBack.init(fun, thisObj, param);
            return callBack;
        }

        /**
         * 释放对象
         * @param callBack
         */
        static relesea(callBack: CallBack): void
        {
            //return;
            callBack.destroy();
            callBack.inPool = true;
            callBack.autoRelesea = false;
            this.pool.release(callBack);
        }
        /**
         *
         * @param fun 回调函数
         * @param thisObj 调函数需要的执行环境对象
         * @param param 执行回调函数时需要返回的参数。如果有参数。会是回调函数的第一个参数
         */
        public constructor(fun: Function = null, thisObj: Object = null, param?: any)
        {
            if (fun != null)
                this.init(fun, thisObj, param);
        }

        /**
         * 初始化，如果放入了对象池，可以使用这个方法来重新初始化
         * @param fun 回调函数
         * @param thisObj 调函数需要的执行环境对象
         * @param param 执行回调函数时需要返回的参数
         */
        init(fun: Function, thisObj: Object, param?: any): void
        {
            this.fun = fun;
            this.param = param;
            this.thisObj = thisObj;
        }

        /**
         * 执行回调函数
         * @param args 不定参数，这里输入的参数必须和回调函数保持相同的顺序
         */
        execute(...args): any
        {
            if (!this.fun) return
            // var a: any[] = [];
            if (this.param != null)
            {
                //附带的参数加在最前面
                args.unshift(this.param);
            }
            var value: any = this.fun.apply(this.thisObj, args);
            //进行回调
            if (this.autoRelesea)
            {
                if (this.inPool)
                    throw new Error("需要多次调用CallBack的execute方法的，不能设置为自动释放autoRelese");
                this.destroy();
                CallBack.relesea(this);
            }

            return value;
        }

        destroy(): void
        {
            this.fun = null;
            this.param = null;
            this.thisObj = null;
            this.autoRelesea = false;
        }
    }
}
