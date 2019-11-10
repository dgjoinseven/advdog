/**
 * @StringUtils.as
 *
 * @author sodaChen mail:asframe#163.com
 * @version 1.0
 * <br>Copyright (C), 2012 ASFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:ASFrame
 * <br>Date:2012-1-19
 */
namespace asf
{
    /**
     * 字符串工具类
     * @author sodaChen
     * Date:2012-1-19
     */
    export class StringUtils
    {
        /**
         * 字符串有内容
         * @param str
         * @returns {boolean}
         */
        static hasValue(str: string): boolean
        {
            if (str && str != "")
                return true;
            return false;
        }
        /**
         * string str1 = "杰卫，这里有{0}个苹果，和{1}个香蕉！{0}个苹果{3} 元，{1}个香蕉{4} 元，一共{2}钱";
         * string str2 = "Hei jave, there are {0} apples，and {1} banana！ {2} dollar all together";
         * Console.WriteLine(string.Format(str1, 5, 10, 20, 7, 13));
         * Console.WriteLine(string.Format(str2, 5, 10, 20));
         * //输出：
         * 杰卫，这里有5个苹果，和10个香蕉！5个苹果7 元，10个香蕉13 元，一共20钱
         * Hei jave, there are 5 apples，and 10 banana！ 20 dollar all together
         * @param str
         * @param args
         * @return
         *
         */
        static formate(str: string, ...args): string
        {
            for (var i: number = 0; i < args.length; i++)
            {
                str = str.replace(new RegExp("\\{" + i + "\\}", "gm"), args[i]);
            }
            return str;
        }
        static formateArys(str: string, args:any[]): string
        {
            for (var i: number = 0; i < args.length; i++)
            {
                str = this.formateOne(i,str,args[i]);
            }
            return str;
        }
        static formateOne(index:number,str: string,param:any):string
        {
            return str.replace(new RegExp("\\{" + index + "\\}", "gm"), param);
        }
        /**
         * <p>从字符串的末尾删除一个换行符，如果它在那里，
         *否则孤独。 换行符是“<code> \ n </ code>”
         *“<code> \ r </ code>”或“<code> \ r \ n </ code>”。</ p>
         *
         * <pre>
         * StringUtils.chomp(null)          = null
         * StringUtils.chomp("")            = ""
         * StringUtils.chomp("abc \r")      = "abc "
         * StringUtils.chomp("abc\n")       = "abc"
         * StringUtils.chomp("abc\r\n")     = "abc"
         * StringUtils.chomp("abc\r\n\r\n") = "abc\r\n"
         * StringUtils.chomp("abc\n\r")     = "abc\n"
         * StringUtils.chomp("abc\n\rabc")  = "abc\n\rabc"
         * StringUtils.chomp("\r")          = ""
         * StringUtils.chomp("\n")          = ""
         * StringUtils.chomp("\r\n")        = ""
         * </pre>
         *
         * @param str  the String to chomp a newline from, may be null
         * @return String without newline, <code>null</code> if null String input
         */
        static chomp(str: string): string
        {
            return this.chompString(str, '(\r\n|\r|\n)');
        }
        /**
         * <p>从末尾除去<code>分隔符</ code>
         * <code> str </ code>如果它在那里，否则孤独。</ p>
         *：
         * <p>现在更接近匹配Perl chomp。
         *对于以前的行为，使用#substringBeforeLast（String，String）。
         *此方法使用#endsWith（String）。</ p>
         *
         * <pre>
         * StringUtils.chompString(null, *)         = null
         * StringUtils.chompString("", *)           = ""
         * StringUtils.chompString("foobar", "bar") = "foo"
         * StringUtils.chompString("foobar", "baz") = "foobar"
         * StringUtils.chompString("foo", "foo")    = ""
         * StringUtils.chompString("foo ", "foo")   = "foo "
         * StringUtils.chompString(" foo", "foo")   = " "
         * StringUtils.chompString("foo", "foooo")  = "foo"
         * StringUtils.chompString("foo", "")       = "foo"
         * StringUtils.chompString("foo", null)     = "foo"
         * </pre>
         *
         * @param str将字符串转换为chomp，可以为null
         * @param分隔符分隔符String，可以为null
         * @return String无尾部分隔符，<code> null </ code>如果为空字符串输入
         */
        static chompString(str: string, separator: string): string
        {
            if (this.isEmpty(str) || separator == null)
            {
                return str;
            }
            return str.replace(new RegExp(separator + '$', ''), '');
        }
        /**
         * <p>从两者中删除控制字符（char <= 32）
         *这个String的结尾，通过返回处理<code> null </ code>
         * <code> null </ code>。</ p>
         *：
         * <p> Trim删除开始和结束字符＆lt; = 32。
         *要剥离空格，请使用#strip（String）。</ p>
         *：
         * <p>要修剪您选择的字符，请使用
         * #strip（String，String）methods。</ p>
         *
         * <pre>
         * StringUtils.trim(null)          = null
         * StringUtils.trim("")            = ""
         * StringUtils.trim("     ")       = ""
         * StringUtils.trim("abc")         = "abc"
         * StringUtils.trim("    abc    ") = "abc"
         * </pre>
         *
         * @param str要修剪的字符串，可以为null
         * @返回修剪后的字符串，<code> null </ code>如果为null String输入
         */
        static trim(str: string): string
        {
            if (str == null)
            {
                return null;
            }
            return str.replace(/^\s*/, '').replace(/\s*$/, '');
        }
        /**
         * <p>从字符串中删除所有空格。</p>
         *
         * <pre>
         * StringUtils.deleteWhitespace(null)         = null
         * StringUtils.deleteWhitespace("")           = ""
         * StringUtils.deleteWhitespace("abc")        = "abc"
         * StringUtils.deleteWhitespace("   ab  c  ") = "abc"
         * </pre>
         *
         * @param str要删除空格的String，可以为null
         * @返回无空格的字符串，<code> null </ code>如果为空字符串输入
         */
        static deleteWhitespace(str: string): string
        {
            return this.deleteFromString(str, /\s/g);
        }
        static deleteFromString(str: string, pattern: RegExp): string
        {
            if (this.isEmpty(str))
            {
                return str;
            }
            return str.replace(pattern, '');
        }
        /**
         * <p>替换另一个字符串中所有出现的字符串。</ p>
         * ：
         * <p>传递给此方法的<code> null </ code>引用是无操作。</ p>
         *
         * <pre>
         * StringUtils.replace(null, *, *)        = null
         * StringUtils.replace("", *, *)          = ""
         * StringUtils.replace("any", null, *)    = "any"
         * StringUtils.replace("any", *, null)    = "any"
         * StringUtils.replace("any", "", *)      = "any"
         * StringUtils.replace("aba", "a", null)  = "aba"
         * StringUtils.replace("aba", "a", "")    = "b"
         * StringUtils.replace("aba", "a", "z")   = "zbz"
         * </pre>
         *
         * @param文本文本要搜索和替换，可以为null
         * @param pattern要搜索的字符串，可以为null
         * @param repl将String替换为，可以为null
         * @返回带有任何替换处理的文本，
         * <code> null </ code>如果为null String输入
         */
        static replace(text: string, pattern: string, repl: string): string
        {
            if (text == null || this.isEmpty(pattern) || repl == null)
            {
                return text;
            }
            return text.replace(new RegExp(pattern, 'g'), repl);
        }
        /**
         * <p>返回在String中传递的值，或者返回String
         * empty或<code> null </ code>，<code> defaultStr </ code>的值。</ p>
         *
         * <pre>
         * StringUtils.defaultIfEmpty(null, "NULL")  = "NULL"
         * StringUtils.defaultIfEmpty("", "NULL")    = "NULL"
         * StringUtils.defaultIfEmpty("bat", "NULL") = "bat"
         * </pre>
         *
         * @param str要检查的String，可以为null
         * @param defaultStr返回的默认字符串.如果输入为空（“”）或<code> null </ code>，可以为null
         * @返回传入的String或默认值
         */
        static defaultIfEmpty(str: string, defaultStr: string): string
        {
            return this.isEmpty(str) ? defaultStr : str;
        }
        /**
         * <p>检查字符串是否为空（""）或null</p>
         *
         * <pre>
         * StringUtils.isEmpty(null)      = true
         * StringUtils.isEmpty("")        = true
         * StringUtils.isEmpty(" ")       = false
         * StringUtils.isEmpty("bob")     = false
         * StringUtils.isEmpty("  bob  ") = false
         * </pre>
         *
         * <p>注：此方法在Lang 2.0版中更改。
         * 它不再修剪字符串。
         * 该功能在isBlank（）中可用。</ p>
         * ：
         * @param str要检查的String，可以为null
         * @return <code> true </ code>如果String为空或为null
         */
        static isEmpty(str: string): boolean
        {
            if (!str)
            {
                return true;
            }
            return str.length == 0;
        }

        /**
         * <p>将字母改为首字母大写字母大写。
         * 没有其他字母更改。</ p>
         * ：
         * A <code> null </ code> input String返回<code> null </ code>。</ p>
         *
         * <pre>
         * StringUtils.capitalize(null)  = null
         * StringUtils.capitalize("")    = ""
         * StringUtils.capitalize("cat") = "Cat"
         * StringUtils.capitalize("cAt") = "CAt"
         * </pre>
         *
         * @param str将String转换为大写，可以为null
         * @返回大写字符串，<code> null </ code>如果为空字符串输入
         * @see titleize（String）
         * @see #uncapitalize（String）
         */
        static capitalize(str: string): string
        {
            if (this.isEmpty(str))
            {
                return str;
            }
            return str.charAt(0).toUpperCase() + str.substring(1);
        }

        /**
         * <p>取消资格将字符串更改为首字母到标题大小写。没有其他字母更改。</ p>
         *
         * <pre>
         * StringUtils.uncapitalize(null)  = null
         * StringUtils.uncapitalize("")    = ""
         * StringUtils.uncapitalize("Cat") = "cat"
         * StringUtils.uncapitalize("CAT") = "cAT"
         * </pre>
         *
         * @param str将String设置为uncapitalize，可以为null
         * @返回未资本化的字符串，<code> null </ code>如果为空字符串输入
         * @see #capitalize（String）
         */
        static uncapitalize(str: string): string
        {
            if (this.isEmpty(str))
            {
                return str;
            }
            return str.charAt(0).toLowerCase() + str.substring(1);
        }

        /**
         * 替换有颜色而替换对应的字符 
         * 
         * @static
         * @param {String} str
         * @param {Array} elementArr
         * @param {String} [symbol="&"]
         * @param {String} [color="#E2EAFB"]
         * @returns {String}
         * 
         * @memberOf StringUtils
         */
        static replaceStrColorAndStr(str: string, elementArr: any[], symbol: string = "&", color: string = null): string
        {
            return StringUtils.replaceString(StringUtils.replaceStrColor(str, color), elementArr, symbol);
            //			return replaceStrColor(replaceString(str,elementArr,symbol));
        }

        /**
		 * 替换字符 
		 * @param sourceStr 源字符串
		 * @param elementArr 要替换的元素
		 * @param symbol 分割符号
		 * @return 
		 * 
		 */
        static replaceString(sourceStr: string, elementArr: any[], symbol: string = "&"): string
        {
            var sourceArr: any[] = sourceStr.split(symbol);
            var str: string = "";
            for (var i: number = 0; i < sourceArr.length; i++)
            {
                if (elementArr && elementArr[i] != null)
                {
                    str += sourceArr[i] + elementArr[i];
                } else
                {
                    str += sourceArr[i];
                }
            }
            return str
        }

        /**
		 * 替代字符串的颜色，返回html
		 * 		注意：使用回默认颜色的都要加回默认颜色值
		 */
        static replaceStrColor(str: string, color: string = null, fontSize: number = null, isBold: boolean = false): string
        {
            var txtColor: string[] = str.match(/#[0-9,a-f,A-F]{6}/g);
            var arr: boolean[] = [];
            var tmp: String = "";
            if (fontSize)
            {
                tmp = "'size='" + fontSize;
            }

            var clr: string;
            if (txtColor)
            {
                for (clr of txtColor)
                {
                    if (arr[clr]) continue;
                    arr[clr] = true;
                    str = StringUtils.replaceGanN(str);
                    if (isBold)
                    {
                        str = str.split(clr).join("</b></font><font color='" + clr + tmp + "'><b>");
                    } else
                    {
                        str = str.split(clr).join("</font><font color='" + clr + tmp + "'>");
                    }
                }
            }

            str = str.split("#normal").join("</font><font color='#6992CD'>");
            str = str.split("#yellow").join("</font><font color='#F9E167'>");
            str = str.split("#white").join("</font><font color='#FFFFFF'>");
            str = str.split("#green").join("</font><font color='#00CB2B'>");
            str = str.split("#black").join("</font><font color='#000000'>");
            str = str.split("#blue").join("</font><font color='#6992CD'>");
            str = str.split("#purple").join("</font><font color='#C91CCD'>");
            str = str.split("#red").join("</font><font color='#E10000'>");
            str = str.split("#orange").join("</font><font color='#C46A00'>");

            str = str.replace(/\[#\]/g, "</font><font color='" + color + tmp + "'>");

            if (isBold)
            {
                if (color == null)
                {
                    return "<font><b>" + str + "<b></font>";
                }
                return "<font color='" + color + tmp + "'><b>" + str + "<b></font>";
            }
            if (color == null)
            {
                return str;
            }
            return "<font color='" + color + tmp + "'>" + str + "</font>";
        }

        /**
		 * 匹配替换\\n(用于xml里的\n)
		 * @param str
		 * 
		 */
        static replaceGanN(str: string): string
        {
            var newStr: string = str.replace(/\\n/g, "\n");
            return newStr;
        }

        /**获取带颜色的HTML字符串
         * str 字符串
         * color 颜色字符串 如f8d274
         */
        public static getColorHtmlString(str: string, color: string): string
        {
            return "<font color='#" + color + "'>" + str + "</font>";
        }

        /**获取带颜色的HTML字符串(不带#)
                * str 字符串
                * color 颜色字符串 如f8d274
                */
        public static getColorHtmlString2(str: string, color: string): string
        {
            return "<font color='" + color + "'>" + str + "</font>";
        }

        /**获取textLink字符串 */
        public static getLinkHtmlString(str: string, event: string, needUnderline: boolean = true): string
        {
            var underlineStr: string = needUnderline ? "<u>" : "";
            var underlineEndStr: string = needUnderline ? "</u>" : "";

            return "<a href='event:" + event + "'>" + underlineStr + str + underlineEndStr + "</a>";
        }


        /**数字转成带2位小数+1个中文字的格式
         * 可以是number或者string
         * 可以是带小数点的数值
         */
        public static numberToShortString(num: any, showDot: boolean = true): string
        {
            var result: string = String(num);
            var len: number;
            var dotLen: number;

            var dotIndex: number = result.indexOf(".");

            var dotStr: string = "";//小数部分的结果
            var word: string = "";//万/亿

            if (dotIndex != -1)
            {//有小数点情况下
                len = result.slice(0, dotIndex).length;
                dotLen = result.slice(dotIndex).length;//包括小数点 小数点以后的位数

                if (len > 8)
                {
                    dotStr = result.slice(-8 - dotLen, -6 - dotLen);
                    word = "亿";
                    result = result.slice(0, -8 - dotLen);
                }
                else if (len > 4)
                {
                    // dotStr = result.slice(-4 - dotLen, -2 - dotLen);
                    word = "万";
                    result = result.slice(0, -4 - dotLen);
                }
            }
            else
            {
                len = result.length;
                // dotLen = 0;

                if (len > 8)
                {
                    dotStr = result.slice(-8, -6);
                    word = "亿";
                    result = result.slice(0, -8);
                }
                else if (len > 4)
                {
                    // dotStr = result.slice(-4, -2);
                    word = "万";
                    result = result.slice(0, -4);
                }
            }
            if (dotStr.length > 0)
            {
                if (!showDot)
                {
                    dotStr = "00"
                }
                dotStr = (dotStr == "00" ? "" : "." + dotStr);//00就不显示小数后面2位了
            }

            return result + dotStr + word;
        }



        /**数字转汉字 */
        public static numToChn(_num: number): string
        {
            if (_num == 0) return "零";
            var chnNumChar: Object = { "0": "零", "1": "一", "2": "二", "3": "三", "4": "四", "5": "五", "6": "六", "7": "七", "8": "八", "9": "九" };
            var chnNameValue: Object = { "1": "十", "2": "百", "3": "千", "4": "万" };
            var resultStr: string = "";
            var numString: String = _num.toString();
            var nameIndex: number = numString.length;
            var len: number = numString.length;
            var lastZero: boolean = false;
            for (var i: number = 0; i < len; i++)
            {

                nameIndex--;
                var char: string = numString.charAt(i);
                //是否需要零
                if (char == "0" && _num % (Math.pow(10, nameIndex + 1)) == 0)
                {
                    continue;
                }
                //连着两个零
                if (char == "0" && lastZero) continue;
                if (char == "0") lastZero = true;
                resultStr += chnNumChar[char];

                //是否需要十
                if (char == "0" && nameIndex == 1) continue;
                //是否需要百
                if (char == "0" && nameIndex == 2) continue;
                if (chnNameValue[nameIndex])
                {
                    resultStr += chnNameValue[nameIndex];
                }
            }
            //修复“一十” 至 “十”
            if (_num >= 10 && _num < 20)
            {
                resultStr = resultStr.slice(1);
            }
            return resultStr;
        }


    }




}