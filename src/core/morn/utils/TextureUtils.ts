namespace morn {
	/**
	 * 纹理工具
	 */
	export class TextureUtils {
		public constructor() {
		}

		/**
		 * 根据纹理名字，纹理的长度，当前的下标 截取纹理
		 */
		static cut(texture: egret.Texture, name: string, index: number, num: number): egret.Texture {
			var sheetTexture: egret.SpriteSheet = new egret.SpriteSheet(texture);
			var textureName: string = name;
			var newTexture: egret.Texture = sheetTexture.getTexture(textureName);
			if (!newTexture) {
				var bottom: number = (texture.textureHeight - texture.$bitmapHeight - texture.$offsetY);//最下方给截图的透明度高度
				var oneHeight: number = (texture.$bitmapHeight - (num - 1) * (texture.$offsetY + bottom)) / num;//每1个图的实际高度
				var oneY: number = oneHeight * index + index * (texture.$offsetY + bottom) + texture.$offsetY;//每一个的其实坐标y

				newTexture = sheetTexture.createTexture(textureName,
					texture.$offsetX, oneY,
					texture.$bitmapWidth, oneHeight
				);
			}

			return newTexture
		}
		/**
		 * texture 要切割的纹理
		 * num 要切的数量
		 * hOrV 源图片的排列方向 true:横着排列的图片序列 false:竖着排列的图片序列
		 */
		static cut2(texture: egret.Texture, num: number, hOrV: boolean): egret.Texture[] {
			var result: egret.Texture[] = [];
			var sheetTexture: egret.SpriteSheet = new egret.SpriteSheet(texture);
			var newTexture: egret.Texture;

			if (hOrV) {//横的图片
				var right: number = texture.textureWidth - texture.$bitmapWidth - texture.$offsetX;//右边透明像素宽度
				var clipWidth: number = texture.textureWidth / num;//每个Texture宽度

				for (var index: number = 0; index < num; index++) {
					var oneX: number;//每个bitmapdata在sheetTexture中的起始值
					var bitmapWidth: number;//每个bitmapdata需要切的宽度
					var offsetX: number;//每个bitmapdata在切好的Texture中的偏移值

					if (index == 0) {
						oneX = texture.$offsetX;
						bitmapWidth = clipWidth - texture.$offsetX;
						offsetX = texture.$offsetX;
					}
					else if (index == num - 1) {
						oneX = clipWidth * index;
						bitmapWidth = clipWidth - right;
						offsetX = 0;
					}
					else {
						oneX = clipWidth * index;
						bitmapWidth = clipWidth;
						offsetX = 0;
					}

					newTexture = sheetTexture.createTexture(String(index),
						oneX, texture.$offsetY,
						bitmapWidth, texture.$bitmapHeight, offsetX, texture.$offsetY, clipWidth, texture.textureHeight
					);

					result.push(newTexture);
				}
			}
			else {//竖的图片
				var bottom: number = texture.textureHeight - texture.$bitmapHeight - texture.$offsetY;
				var clipHeight: number = texture.textureHeight / num;

				for (var index: number = 0; index < num; index++) {
					var oneY: number;
					var bitmapHeight: number;
					var offsetY: number;

					if (index == 0) {
						oneY = texture.$offsetY;
						bitmapHeight = clipHeight - texture.$offsetY;
						offsetY = texture.$offsetY;
					}
					else if (index == num - 1) {
						oneY = clipHeight * index;
						bitmapHeight = clipHeight - bottom;
						offsetY = 0;
					}
					else {
						oneY = clipHeight * index;
						bitmapHeight = clipHeight;
						offsetY = 0;
					}

					newTexture = sheetTexture.createTexture(String(index),
						texture.$offsetX, oneY,
						texture.$bitmapWidth, bitmapHeight, texture.$offsetX, offsetY, texture.textureWidth, clipHeight
					);

					result.push(newTexture);
				}
			}

			return result;
		}

		/**
		 * 创建新的纹理
		 * type 0 比源纹理亮一点
		 * 
		 */
		static create(sourece: egret.Texture, type: number = 0): egret.Texture {
			let newTexture;
			let bmp: egret.Bitmap = new egret.Bitmap(sourece);
			
			let render = new egret.RenderTexture();
			if (type == 0) {
				var color: number = 0x33CCFF;        /// 光晕的颜色，十六进制，不包含透明度
				var alpha: number = 0.8;             /// 光晕的颜色透明度，是对 color 参数的透明度设定。有效值为 0.0 到 1.0。例如，0.8 设置透明度值为 80%。
				var blurX: number = 35;              /// 水平模糊量。有效值为 0 到 255.0（浮点）
				var blurY: number = 35;              /// 垂直模糊量。有效值为 0 到 255.0（浮点）
				var strength: number = 2;            /// 压印的强度，值越大，压印的颜色越深，而且发光与背景之间的对比度也越强。有效值为 0 到 255。暂未实现
				var quality: number = egret.BitmapFilterQuality.HIGH;        /// 应用滤镜的次数，建议用 BitmapFilterQuality 类的常量来体现
				var inner: boolean = false;            /// 指定发光是否为内侧发光，暂未实现
				var knockout: boolean = false;            /// 指定对象是否具有挖空效果，暂未实现
				var glowFilter: egret.GlowFilter = new egret.GlowFilter(color, alpha, blurX, blurY,
					strength, quality, inner, knockout);
				 bmp.filters= [glowFilter];
				
				 return 
			}
			return newTexture;
		}


	}
}