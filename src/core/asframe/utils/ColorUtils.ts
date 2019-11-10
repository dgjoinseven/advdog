/*
	CASA Lib for ActionScript 3.0
	Copyright (c) 2011, Aaron Clinger & Contributors of CASA Lib
	All rights reserved.
	
	Redistribution and use in source and binary forms, with or without
	modification, are permitted provided that the following conditions are met:
	
	- Redistributions of source code must retain the above copyright notice,
	  this list of conditions and the following disclaimer.
	
	- Redistributions in binary form must reproduce the above copyright notice,
	  this list of conditions and the following disclaimer in the documentation
	  and/or other materials provided with the distribution.
	
	- Neither the name of the CASA Lib nor the names of its contributors
	  may be used to endorse or promote products derived from this software
	  without specific prior written permission.
	
	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
	AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
	IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
	ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
	LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
	CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
	SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
	INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
	CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
	ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
	POSSIBILITY OF SUCH DAMAGE.
*/
namespace asf
{

	/**
		Provides utility functions for dealing with color.
		@author Aaron Clinger
		@version 03/29/10
	*/
	export class ColorUtil
	{


		/**
			Converts a series of individual RGB(A) values to a 32-bit ARGB color value.
			
			@param r: A uint from 0 to 255 representing the red color value.
			@param g: A uint from 0 to 255 representing the green color value.
			@param b: A uint from 0 to 255 representing the blue color value.
			@param a: A uint from 0 to 255 representing the alpha value. Default is <code>255</code>.
			@return Returns a hexidecimal color as a String.
			@example
				<code>
					var hexColor:string = ColorUtil.getHexStringFromARGB(128, 255, 0, 255);
					trace(hexColor); // Traces 80FF00FF
				</code>
		*/
		static getColor(r: number, g: number, b: number, a: number = 255): number
		{
			return (a << 24) | (r << 16) | (g << 8) | b;
		}

		/**
			Converts a 32-bit ARGB color value into an ARGB object.
			
			@param color: The 32-bit ARGB color value.
			@return Returns an object with the properties a, r, g, and b defined.
			@example
				<code>
					var myRGB:Object = ColorUtil.getARGB(0xCCFF00FF);
					trace("Alpha = " + myRGB.a);
					trace("Red = " + myRGB.r);
					trace("Green = " + myRGB.g);
					trace("Blue = " + myRGB.b);
				</code>
		*/
		static getARGB(color: number): Object
		{
			var c: any = {};
			c.a = color >> 24 & 0xFF;
			c.r = color >> 16 & 0xFF;
			c.g = color >> 8 & 0xFF;
			c.b = color & 0xFF;
			return c;
		}

		/**
			Converts a 24-bit RGB color value into an RGB object.
			
			@param color: The 24-bit RGB color value.
			@return Returns an object with the properties r, g, and b defined.
			@example
				<code>
					var myRGB:Object = ColorUtil.getRGB(0xFF00FF);
					trace("Red = " + myRGB.r);
					trace("Green = " + myRGB.g);
					trace("Blue = " + myRGB.b);
				</code>
		*/
		static getRGB(color: number): Object
		{
			var c: any = {};
			c.r = color >> 16 & 0xFF;
			c.g = color >> 8 & 0xFF;
			c.b = color & 0xFF;
			return c;
		}

		/**
			Converts a 32-bit ARGB color value into a hexidecimal String representation.
			
			@param a: A uint from 0 to 255 representing the alpha value.
			@param r: A uint from 0 to 255 representing the red color value.
			@param g: A uint from 0 to 255 representing the green color value.
			@param b: A uint from 0 to 255 representing the blue color value.
			@return Returns a hexidecimal color as a String.
			@example
				<code>
					var hexColor:string = ColorUtil.getHexStringFromARGB(128, 255, 0, 255);
					trace(hexColor); // Traces 80FF00FF
				</code>
		*/
		static getHexStringFromARGB(a: number, r: number, g: number, b: number): string
		{
			var aa: string = a.toString(16);
			var rr: string = r.toString(16);
			var gg: string = g.toString(16);
			var bb: string = b.toString(16);
			aa = (aa.length == 1) ? '0' + aa : aa;
			rr = (rr.length == 1) ? '0' + rr : rr;
			gg = (gg.length == 1) ? '0' + gg : gg;
			bb = (bb.length == 1) ? '0' + bb : bb;
			return (aa + rr + gg + bb).toUpperCase();
		}

		/**
			Converts an RGB color value into a hexidecimal String representation.
			
			@param r: A uint from 0 to 255 representing the red color value.
			@param g: A uint from 0 to 255 representing the green color value.
			@param b: A uint from 0 to 255 representing the blue color value.
			@return Returns a hexidecimal color as a String.
			@example
				<code>
					var hexColor:string = ColorUtil.getHexStringFromRGB(255, 0, 255);
					trace(hexColor); // Traces FF00FF
				</code>
		*/
		static getHexStringFromRGB(r: number, g: number, b: number): string
		{
			var rr: string = r.toString(16);
			var gg: string = g.toString(16);
			var bb: string = b.toString(16);
			rr = (rr.length == 1) ? '0' + rr : rr;
			gg = (gg.length == 1) ? '0' + gg : gg;
			bb = (bb.length == 1) ? '0' + bb : bb;
			return (rr + gg + bb).toUpperCase();
		}

		/**
		 * 输入一个颜色,将它拆成三个部分:
		 * 红色,绿色和蓝色
		 */
		static retrieveRGB(color: number): number[]
		{
			var r: number = color >> 16;
			var g: number = (color >> 8) & 0xff;
			var b: number = color & 0xff;

			return [r, g, b];
		}

		/**
		 * 红色,绿色和蓝色三色组合
		 */
		static generateFromRGB(rgb: number[]): number
		{
			if (rgb == null || rgb.length != 3 ||
				rgb[0] < 0 || rgb[0] > 255 ||
				rgb[1] < 0 || rgb[1] > 255 ||
				rgb[2] < 0 || rgb[2] > 255)
			{
				return 0xFFFFFF;
			}
			return rgb[0] << 16 | rgb[1] << 8 | rgb[2];
		}

		/**
		 * color1是浅色,color2是深色,实现渐变
		 * steps是指在多大的区域中渐变,
		 */
		static generateTransitionalColor(color1: number, color2: number, steps: number): number[]
		{
			if (steps < 3)
			{
				return [];
			}

			var color1RGB: number[] = this.retrieveRGB(color1);
			var color2RGB: number[] = this.retrieveRGB(color2);

			var colors: number[] = [];
			colors.push(color1);
			steps = steps - 2;

			var redDiff: number = color2RGB[0] - color1RGB[0];
			var greenDiff: number = color2RGB[1] - color1RGB[1];
			var blueDiff: number = color2RGB[2] - color1RGB[2];
			for (var i: number = 1; i < steps - 1; i++)
			{
				var tmpRGB: number[] = [
					color1RGB[0] + redDiff * i / steps,
					color1RGB[1] + greenDiff * i / steps,
					color1RGB[2] + blueDiff * i / steps
				];
				colors.push(this.generateFromRGB(tmpRGB));
			}
			colors.push(color2);

			return colors;
		}
		// //白 绿 蓝 紫 橙 红
		// static colorVlaue: number[] = [0x804102, 0x4bf000, 0x00d5f7, 0xef21df, 0xf47b00, 0xf8412f];
		// /**根据品质获取对应品质颜色信息 */
		// static getValueColor(type: number): number
		// {
		// 	return ColorUtil.colorVlaue[type];
		// }
	}
}