/**
 * @Level.as.as
 *
 * @author sodaChen mail:asframe#163.com
 * @version 1.0
 * <br>Copyright (C), 2010 asFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:ASFrame
 * <br>Date:2011-9-4
 */
namespace asf
{
	/**
	 * 日志级别对象
	 * @author sodaChen
	 * Date:2011-9-4
	 */
	export class Level
	{
		public static TRACE:Level = new Level(1,"trace","#000000");
		public static DEBUG:Level = new Level(10,"debug","#000000");
		public static LOG:Level = new Level(100,"log","#0000FF");
		public static INFO:Level = new Level(1000,"info","#fffa55");
		public static WARN:Level = new Level(10000,"warn","#FF9900");
		public static ERROR:Level = new Level(100000,"error","#FF0000");
		/** 级别数值 **/
		level:number;
		/** 级别名称 **/
		name:string;
		/** 日志显示的颜色 **/
		color:string;

		constructor(level:number,name:string,color:string,)
		{
			this.level = level;
			this.name = name;
			this.color = color;
		}
		toString():string
		{
			return "[level=" + this.level + " levelName=" + this.name + "]";
		}
	}
}
