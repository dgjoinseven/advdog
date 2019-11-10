/**
 * Created by sodaChen on 2017/3/14.
 */
namespace asf
{
    export class TypeofUtils
    {
        static isNumber(value: any): boolean
        {
            return typeof value === "number";
        }

        static isString(value: any): boolean
        {
            return typeof value === "string";
        }

        static isArray(value: any): boolean
        {
            var str: string = typeof value;
            return str === "array";
            // return typeof value === "array";
        }

        static isBoolean(value: any): boolean
        {
            return typeof value === "boolean";
        }

        static createAny(): any
        {
            var a: any = {}
            return a
        }

        static asAny(b: any): any
        {
            return b
        }
    }
}