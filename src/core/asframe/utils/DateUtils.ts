namespace asf
{
    /**
     * 时间日期工具
     * 
     * @export
     * @class DateUtils
     */
	export class DateUtils
	{
		public constructor()
		{
		}

		// 	private static _date: Date = new Date();
		// 	private static _parserList: Array =
		// 	[
		// 		{ fun: yyyy, str: "yyyy" },	//4位年份
		// 		{ fun: yy, str: "yy" },		//2位年份
		// 		{ fun: y, str: "y" },		//1位年份
		// 		{ fun: MM, str: "MM" },		//含有前导零月份
		// 		{ fun: M, str: "M" },		//不含有前导零月份
		// 		{ fun: dd, str: "dd" },		//含有前导零日期
		// 		{ fun: d, str: "d" },		//不含有前导零日期
		// 		{ fun: hh, str: "hh" },		//含有前导零小时
		// 		{ fun: h, str: "h" },		//不含有前导零小时
		// 		{ fun: mm, str: "mm" },		//含有前导零分钟
		// 		{ fun: m, str: "m" },		//不含有前导零分钟
		// 		{ fun: ss, str: "ss" },		//含有前导零秒钟
		// 		{ fun: s, str: "s" }			//不含有前导零秒钟
		// 	];

		// 	public static parse(date: Date, str: String): String
		// 	{
		// 		_date = date;
		// 		for (i:int = 0; i < _parserList.length; i++)
		// 		{
		// 			obj: Object = _parserList[i];
		// 			str = str.replace(obj.str, (obj.fun as Function).call());
		// 		}
		// 		return str;
		// 	}

		// 	/**
		// 	 * 把字符串转成Date类型 
		// 	 * @param str 日期的字符串，eg:2010-01-01 00:00:00.000
		// 	 * @return 
		// 	 * 
		// 	 */
		// 	public static strToDate(str: String): Date 
		// 	{
		// 		//get each number in an array
		// 		match: Array = str.match(/\d+/g);

		// 		//if there were no miliseconds, add 0 to the end
		// 		if (match.length < 7) match.push('0');

		// 		return new Date(Number(match[0]), Number(match[1]), Number(match[2]), Number(match[3]), Number(match[4]), Number(match[5]), Number(match[6]));
		// 	}

		// 	/**
		// 	 * 把字符串转成Date类型 （字符串月份按01 02 --- 12正常传入）
		// 	 * @param str 日期的字符串，eg:2010-01-01 00:00:00.000
		// 	 * @return 
		// 	 * 
		// 	 */
		// 	public static strToDateNormal(str: String): Date 
		// 	{
		// 		//get each number in an array
		// 		match: Array = str.match(/\d+/g);

		// 		//if there were no miliseconds, add 0 to the end
		// 		if (match.length < 7) match.push('0');

		// 		return new Date(Number(match[0]), Number(match[1]) - 1, Number(match[2]), Number(match[3]), Number(match[4]), Number(match[5]), Number(match[6]));
		// 	}

		// 	private static yyyy(): String
		// 	{
		// 		return _date.fullYear.toString();
		// 	}

		// 	private static yy(): String
		// 	{
		// 		return _date.fullYear.toString().slice(2);
		// 	}

		// 	private static y(): String
		// 	{
		// 		return _date.fullYear.toString().slice(3);
		// 	}

		// 	private static MM(): String
		// 	{
		// 		return (_date.getMonth() + 1 < 10 ? "0" : "") + (_date.getMonth() + 1);
		// 	}

		// 	private static M(): String
		// 	{
		// 		return (_date.getMonth() + 1).toString();
		// 	}

		// 	private static dd(): String
		// 	{
		// 		return (_date.getDate() < 10 ? "0" : "") + _date.getDate();
		// 	}

		// 	private static d(): String
		// 	{
		// 		return _date.getDate().toString();
		// 	}

		// 	private static hh(): String
		// 	{
		// 		return (_date.getHours() < 10 ? "0" : "") + _date.getHours();
		// 	}

		// 	private static h(): String
		// 	{
		// 		return _date.getHours().toString();
		// 	}

		// 	private static mm(): String
		// 	{
		// 		return (_date.getMinutes() < 10 ? "0" : "") + _date.getMinutes();
		// 	}

		// 	private static m(): String
		// 	{
		// 		return _date.getMinutes().toString();
		// 	}

		// 	private static ss(): String
		// 	{
		// 		return (_date.getSeconds() < 10 ? "0" : "") + _date.getSeconds();
		// 	}

		// 	private static s(): String
		// 	{
		// 		return _date.getSeconds().toString();
		// 	}


		// 	/**
		// 	 * 
		// 	 * @param totalsec
		// 	 * @param showHour 是否显示小时
		// 	 * @param showAsChinese 是否显示成中文时分秒
		// 	 * @return 
		// 	 */
		// 	public static getRemainTimeBySeconds(totalsec: Number, showHour: Boolean = true, showAsChinese: Boolean = false): String
		// 	{
		// 		str: String = "";
		// 		hour: int = 0;//小时数
		// 		min: int = 0;//分钟数
		// 		sec: int = 0;//秒数
		// 		minR: Number;//去小时数后剩余的秒数

		// 		hour = totalsec / secondsPerHour;
		// 		hour = hour < 0 ? 0 : hour;
		// 		minR = totalsec % secondsPerHour;
		// 		min = minR / 60;
		// 		min = min < 0 ? 0 : min;
		// 		sec = minR % 60;
		// 		sec = sec < 0 ? 0 : sec;

		// 		if (!showAsChinese && showHour)
		// 		{
		// 			str = formatString(hour) + ":" + formatString(min) + ":" + formatString(sec);
		// 		}
		// 		else if (!showAsChinese)
		// 		{
		// 			str = formatString(min) + ":" + formatString(sec);
		// 		}
		// 		//			else if(showAsChinese)
		// 		//			{
		// 		//				if(hour>0)
		// 		//				{
		// 		//					str += Language.getStringByParam(90230,((hour == 0) ? "" : hour));
		// 		//				}
		// 		//				if(min>0)
		// 		//				{
		// 		//					str += Language.getStringByParam(90231,((hour == 0 && min == 0) ? "" : min));
		// 		//				}
		// 		//				
		// 		//				str += Language.getStringByParam(90232,sec.toString());
		// 		//			}

		// 		return str;
		// 	}

		// 	private static formatString(value: int): String
		// 	{
		// 		if (value < 0)
		// 		{
		// 			return "00";
		// 		}

		// 		str: String;
		// 		if (value <= 9)
		// 		{
		// 			str = "0" + value;
		// 		}
		// 		else
		// 		{
		// 			str = value.toString();
		// 		}

		// 		return str;
		// 	}
	}
}