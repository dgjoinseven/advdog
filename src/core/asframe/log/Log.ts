/**
 * @Logger.as.as
 *
 * @author sodaChen mail:asframe#163.com
 * @version 1.0
 * <br>Copyright (C), 2010 asFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:ASFrame
 * <br>Date:2011-8-12
 */
namespace asf
{
	/**
	 * Log使用对象,最主要和最基础的使用对象，一般情况下都是使用这个来进行日志的输入和输出。
	 * 带有默认的输出渠道，实际项目使用者。可以动态修改日志的输出格式
	 * @author sodaChen
	 * Date:2011-8-12
	 */
	export class Log
	{
		/** 是否开启日志系统 **/
		static isOpen:boolean = true;
		/** 默认是开启调试模式的 **/
		static level:Level = Level.DEBUG;

		/**
		 * 输出调试信息
		 * @param target:日志输出的源头
		 * @param arg0:输出参数
		 * @param arg1:输出参数
		 * @param arg2:输出参数
		 *
		 */
		public static debug(...logs):void
		{
			this.formatLog(Level.DEBUG,logs);
		}
		/**
		 * 输出提示信息
		 * @param msg
		 *
		 */
		public static info(...logs):void
		{
			this.formatLog(Level.INFO,logs);
		}
		/**
		 * 输出提示信息
		 * @param msg
		 *
		 */
		public static log(...logs):void
		{
			this.formatLog(Level.LOG,logs);
		}
		/**
		 * 输出警告的信息
		 * @param target:日志输出的源头
		 * @param arg0:输出参数
		 * @param arg1:输出参数
		 * @param arg2:输出参数
		 *
		 */
		public static warn(...logs):void
		{
			this.formatLog(Level.WARN,logs);
		}

		/**
		 * 输出错误的信息
		 * @param	msg:需要输出信息的对象
		 */
		public static error(...logs):void
		{
			this.formatLog(Level.ERROR,logs);
		}
		public static formatLog(logLevel:Level,logs:any):void
		{
			//当前等级小于或者等于日志输出等级
			if(this.isOpen && this.level.level <= logLevel.level)
			{
				var msg:string = "";
				for(var i:number = 0; i < logs.length; i++)
				{
					if (msg == "")
						msg = msg + logs[i];
					else
						msg = msg + "," + logs[i];
				}

				console[logLevel.name]("[" + logLevel.name + "]: " + msg);
			}
		}
		/**
		 * 设置日志等级
		 * @param level:日志等级描述对象
		 *
		 */
		public static setLevel(level:Level):void
		{
			Log.level = level;
		}
	}
}
