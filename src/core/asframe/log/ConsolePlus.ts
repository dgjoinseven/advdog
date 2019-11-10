/**
 * Created by sodaChen on 2017/3/1.
 */
namespace asf
{
    /**
     * 输出信息扩展类
     * @author sodaChen
     * Date:2017/2/15
     */
    export class ConsolePlus
    {
        /////////////////日志级别////////////////
        /** 调试级别，trace函数路径 **/
        static TRACE:number = 0;
        /** 普通日志级别 **/
        static DEBUG:number = 1;
        /** 普通日志级别 **/
        static LOG:number = 2;
        /** 信息日志级别 console.info() **/
        static INFO:number = 3;
        /** 警告日志级别 console.warn() **/
        static WARN:number = 4;
        /** 错误日志级别 console.error() **/
        static ERROR:number = 5;

        /** 默认是最初的日志级别，改变这个值。可以改变日志输出的结果 **/
        private static $level:number = ConsolePlus.LOG;
        /** 是否开启扩展模式 **/
        private static isPlusMode:boolean;
        /** 需要屏蔽覆盖的方法名 **/
        private static funNames:string[] = ["trace","debug","log","info","warn","error"];
        /** console最初的方法缓存 **/
        private static funList:Function[];
        /** 扩展后的方法级别 **/
        private static funPulsList:Function[];
        /** 空方法 **/
        private static emptyFun:Function;

        static init(isPlusMode:boolean = false):void
        {
            this.funList = [];
            this.funPulsList = [];
            this.emptyFun = function(){};

            //存放原来的方法
            for(var i:number = 0; i < this.funNames.length; i++)
            {
                this.funList.push(console[this.funNames[i]]);
            }
            //生成新的扩展方法
            for(var i:number = 0; i < this.funNames.length; i++)
            {
                this.createPlusFun(this.funList[i],this.funNames[i]);
            }
            this.setConsoleMode(isPlusMode);
        }

        /**
         * 设置日志等级，所有大于等于这个日志级别的输出都可以正常输出，小于的则不能进行输出
         * @param level
         */
        static setLevel(level:number):void
        {
            this.$level = level;
            this.openConsole();
        }
        /**
         * 设置输出模式
         * @param isPlusMode 是否为扩展模式
         */
        static setConsoleMode(isPlusMode:boolean):void
        {
            this.isPlusMode = isPlusMode;
            if(isPlusMode)
                this.openConsolePlus();
            else
                this.openConsole();
        }

        /**
         * 打开日志
         */
        static openConsole():void
        {
            this.closeConsole();
            //扩展默认，则调用扩展方法
            if(this.isPlusMode)
            {
                this.openConsolePlus();
                return ;
            }
            for(var i:number = this.$level; i < this.funNames.length; i++)
            {
                //还原成最初的方法
                console[this.funNames[i]] = this.funList[i];
            }
        }

        /**
         * 关闭所有的日志输出
         */
        static closeConsole():void
        {
            //设置回最初的方法
            for(var i:number = 0; i < this.funNames.length; i++)
            {
                //定义个空方法屏蔽掉
                console[this.funNames[i]] = this.emptyFun;
            }
        }

        /**
         * 开启日志输出的扩展模式
         */
        static openConsolePlus():void
        {
            this.isPlusMode = true;
            //扩展console的所有方法
            for(var i:number = this.$level; i < this.funNames.length; i++)
            {
                console[this.funNames[i]] = this.funPulsList[i];
            }
        }
        /**
         * 关闭日志输出的扩展模式
         */
        static closeConsolePlus():void
        {
            this.isPlusMode = false;
            //还原成原来的方法
            this.openConsole();
        }
        /**
         * 创建扩展函数
         * @param oldFun 原有的函数
         * @param funName 函数名称
         */
        private static createPlusFun(oldFun:Function,funName:string):void
        {
            var fun:Function = function (message?: any, ...optionalParams: any[]):void
            {
                console.group("[" + funName + "][" + new Date() + "]");
                oldFun.apply(console,arguments);
                console.groupEnd();
            }
            this.funPulsList.push(fun);
        }
    }
}