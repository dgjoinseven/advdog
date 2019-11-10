/**
 * @IActivate.as
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
	export interface IActivate
	{
		/**
		 * 激活(被借出的时候调用的方法) ，该方法是对象池内部调用，外面使用不需要调用该方法。
		 * 以免引起不必要的bug
		 */		
		activate():void;
	}
}
