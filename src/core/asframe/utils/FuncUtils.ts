/**
 * @FunctionUtils.as
 *
 * @author sodaChen mail:asframe#163.com
 * @version 1.0
 * <br>Copyright (C), 2012 ASFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:ASFrame
 * <br>Date:2012-2-1
 */
namespace asf
{
	/**
	 *
	 * @author sodaChen
	 * Date:2012-2-1
	 */
	export class FuncUtils
	{
		/**
		 * 执行回调函数
		 * @param fun
		 * @param thisObj
		 * @param param 可选参数
		 */
		static execute(fun:Function,thisObj:Object,param:any = null):void
		{
			if(fun == null)
				return ;
			if(param == null)
				fun.call(thisObj);
			else
				fun.call(thisObj,param);

		}

		/**
		 * 执行具有数组参数的回调函数
		 * @param fun
		 * @param thisObj
		 * @param params 可选参数
		 */
		static executeAry(fun:Function,thisObj:Object,params:any[] = null):void
		{
			if(fun == null)
				return ;
			if(params == null)
			{
				fun.call(thisObj);
				return ;
			}
			fun.apply(thisObj,params);
		}
	}
}
