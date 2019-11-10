/**
 * @IPassivate.as
 * 
 * @author sodaChen mail:asframe@qq.com
 * @version 1.0
 * <br>Copyright (C), 2013 ASFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:ASFrame
 * <br>Date:2013-9-26
 */
namespace asf
{
	/**
	 *
	 * @author sodaChen
	 * #Date:2013-9-26
	 */
	export interface IPassivate
	{
		/**
		 * 进入待机状态(就是被还回的时候调用的方法) 
		 */		
		passivate():void;
	}
}
