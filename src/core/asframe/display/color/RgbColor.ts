/**
 * @RgbColor.as
 * 
 * @author sodaChen mail:asframe@qq.com
 * @version 1.0
 * <br>Copyright (C), 2012 ASFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:ASFrame Color
 * <br>Date:2012-9-6
 */
namespace asf
{
	/**
	 *
	 * @author sodaChen
	 * Date:2012-9-6
	 */
	export class RgbColor
	{
		/**
		 * 红色
		 */
		red:number = 0;
		
		/**
		 * 绿色
		 */
		green:number = 0;
		
		/**
		 * 蓝色
		 */
		blue:number = 0;
		
		/**
		 * 构造
		 */
		constructor(red:number = 0 ,
					green:number = 0,
					blue:number = 0)
		{
			this.red = red;
			this.green = green;
			this.blue = blue;
		}
		
		/**
		 * 获取3通道16进制值
		 * @return
		 */
		getHex24():number
		{
			return ((this.red << 16) | (this.green << 8) | this.blue);
		}
		
		
		clone():RgbColor
		{
			return new RgbColor(this.red, this.green, this.blue);
		}
		
		/**
		 * @return
		 */
		toString():String
		{
			return "red:" + this.red + "  " +
				"green:" + this.green + "  " +
				"blue:" + this.blue;
		}
	}
}
