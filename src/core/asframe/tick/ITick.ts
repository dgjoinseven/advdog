/**
 * @ITick.as
 * 
 * @author sodaChen mail:asframe#163.com
 * @version 1.0
 * <br>Copyright (C), 2010 asFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:ASFrame
 * <br>Date:2011-5-4
 */
namespace asf
{
	/**
	 * 心跳接口，以一定的频率执行tick方法.最基本，简单的心跳接口,提供纯粹的心跳功能。所以基于心跳的功能都实现了该接口
	 * @author sodaChen
	 * Date:2011-5-4
	 */
	export interface ITick
	{
		/**
		 * 心跳
		 */		
		tick():void;
	}
}
