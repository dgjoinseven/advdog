/**
 * @URLParameter.ts
 *
 * @author sodaChen mail:asframe#qq.com
 * @version 1.0
 * <br>Copyright (C), 2012 ASFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:Collections
 * <br>Date:2017/6/8
 */
namespace asf
{
    /**
     * url参数列表
     * @author sodaChen
     * Date:2017/6/8
     */
    export class URLParameter
    {
        private url:string;
        private keys:string[];
        private values:Array<string | number>;
        constructor(url:string)
        {
            this.url = url;
        }
        addParam(key:string,value:string | number):void
        {
            this.keys.push(key);
            this.values.push(value);
        }
        toURL():string
        {
            var str:string = this.url + "?";
            let len:number = this.keys.length;
            for(let i:number = 0; i < len; i++)
            {
                if(i == 0)
                    str += "&" ;
                str += this.keys[i] + "=" + this.values[i];
            }
            return str;
        }
    }
}