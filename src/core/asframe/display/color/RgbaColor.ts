/**
 * @RgbaColor.as
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
	export class RgbaColor extends RgbColor
	{
		/** 透明通道 **/
		alpha:number = 1;
		
		constructor(red:number = 0 , 
					green:number = 0,
					blue:number = 0,
					alpha:number = 1)
		{
			super(red,green,blue);
			this.alpha = alpha;
		}
		
		/**
		 * 获取4通道16进制值
		 * @return
		 */
		getHex32():number
		{
			var hex24:number = this.getHex24();
			var c:number = hex24 / 0x10000000;
			return (hex24 & 0xffffff) + Math.floor(this.alpha * c) * 0x10000000;
		}
		
		/**
		 * 应用一个alpha值 , 并返回一个32位通道值
		 * @param	a
		 * @return
		 */
		applyAlpha(alpha:number):number
		{
			this.alpha = alpha;
			return this.getHex32();
		}
		
		/**
		 * 克隆
		 * @return
		 */
		clone():RgbaColor
		{
			return new RgbaColor(this.red, this.green, this.blue, this.alpha);
		}
		
		/**
		 * 输出文本
		 * @return
		 */
		toString():String
		{
			return "red:" + this.red + "  " +
				"green:" + this.green + "  " +
				"blue:" + this.blue + "  " +
				"alpha:" + this.alpha;
		}
	}
}
