/**
 * @GameFilter.ts
 *
 * @author zhangfl
 * @version 1.0
 * <br>Copyright (C), 2012 ASFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:Collections
 * <br>Date:2017/4/14
 */
namespace asf
{
    /**
     *
     * @author zhangfl
     * Date:2017/4/14
     */
    export class GameFilter
    {
         //灰色滤镜
       public static GrayFilter:egret.ColorMatrixFilter = new egret.ColorMatrixFilter([0.3,0.6,0,0,0,0.3,0.6,0,0,0,0.3,0.6,0,0,0,0,0,0,1,0]) ;
       /**
        * 金色发光描边滤镜
        */
       public static GlodFilter:egret.GlowFilter = new egret.GlowFilter(0xf8d274, 1.0);



       public  static createGradientGlowFilter(): egret.GlowFilter[] {         /// 
                
                var color: number = 0xf8d274;        /// 光晕的颜色，十六进制，不包含透明度
                var alpha: number = 1;             /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
               var blurX: number = 10;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
                var blurY: number = 10;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
                 var strength: number = 2;            /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
                 var quality: number = egret.BitmapFilterQuality.LOW;        /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
                 var inner: boolean = true;            
                 var knockout: boolean = false;           
                 var glowFilter = new egret.GlowFilter(color, alpha, blurX, blurY,
                strength, quality, inner, knockout);
                return [glowFilter];
        }

           public  static createFilter(color:number,alpha:number=1,blurX:number=6.0,blurY:number = 6.0,strength:number=2,quality:number=1): egret.GlowFilter[] {         /// 
                
             //   var color: number = 0xf8d274;        /// 光晕的颜色，十六进制，不包含透明度
             //   var alpha: number = 1;             /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
             //  var blurX: number = 10;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
             //   var blurY: number = 10;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
             //    var strength: number = 2;            /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
              //   var quality: number = egret.BitmapFilterQuality.LOW;        /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
               //  var inner: boolean = true;            
               //  var knockout: boolean = false;           
                 var glowFilter = new egret.GlowFilter(color, alpha, blurX, blurY,
                strength, quality);
                return [glowFilter];
        }

        
   


        constructor()
        {

        }
    }
}