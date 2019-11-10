/**
 * @ArrayUtils.ts
 * @author sodaChen mail:asframe@qq.com
 * @version 1.0
 * <br> Copyright (c) 2012-present, asframe.com
 * <br>Program Name:ASFrameTS
 * <br>Date:2017/1/23
 */
namespace asf
{
    export class ArrayUtils
    {
        public static removeItem(array: Array<any>, item: any): void
        {
            var i: number = array.length;
            while (i > 0)
            {
                i--;
                if (array[i] === item)
                {
                    array.splice(i, 1);
                    return;
                }
            }

            console.log("removeItem");
        }

        /**新随机数组*/
        public static randomAry(arr: any[]): any[]
        {
            var outputArr: any[] = arr.slice();
            var i: number = outputArr.length;
            var temp: any;
            var indexA: number;
            var indexB: number;

            while (i)
            {
                indexA = i - 1;
                indexB = Math.floor(Math.random() * i);
                i--;

                if (indexA == indexB) continue;
                temp = outputArr[indexA];
                outputArr[indexA] = outputArr[indexB];
                outputArr[indexB] = temp;
            }

            return outputArr;
        }

        /**
         * 拷贝一个字典
         */
        public static copyDict(dict, isDeepCopy?)
        {
            if (!dict)
            {
                return dict;
            }
            var newDict = (dict instanceof Array) ? [] : {};
            for (var i in dict)
            {
                if (typeof dict[i] == "function")
                {
                    continue;
                }
                if (isDeepCopy)
                {
                    newDict[i] = (typeof dict[i] == "object") ? ArrayUtils.copyDict(dict[i]) : dict[i];
                } else
                {
                    newDict[i] = dict[i];
                }
            }
            return newDict;
        }

    }
}