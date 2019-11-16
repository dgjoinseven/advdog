namespace game
{
    /**
     * 特效工具类
     */
    export class ImageUtils
    {
        private static dogColors:any;
        /**
         * 尝试改变狗的颜色
         */
        static tryDogColor(sprite:egret.DisplayObject,dogLv:number):void
        {
            if(dogLv >= 31 && dogLv <= 36)
            {
                //生成对应的颜色
                this.dogColor(sprite,dogLv);
            }

        }
        /**
         * 狗的颜色
         */
        static dogColor(sprite:egret.DisplayObject,dogLv:number):void
        {
            if(!this.dogColors)
            {
                this.dogColors = {};
                // this.dogColors["31"] = 0xffffff;
                // this.dogColors["32"] = 0x33ff00;
                // this.dogColors["33"] = 0x0000ff;
                // this.dogColors["34"] = 0x66ffff;
                // this.dogColors["35"] = 0x9900ff;
                // this.dogColors["36"] = 0xffcc00;
                // this.dogColors["37"] = 0xff0000;
                //白色
                this.dogColors["31"] = [0.546040942391183,0.229338043805888,0.224621013802929,0,30,0.205905883755551,0.799778924177114,-0.00568480793266551,0,30,0.0290401412170684,0.501292895236028,0.469666963546904,0,30,0,0,0,1,0];
                //绿
                this.dogColors["32"] = [-0.133425167215474,0.135020903628126,0.998404263587348,0,0,0.390814570523802,0.803383354786634,-0.194197925310436,0,0,-0.525056639777552,1.54329599043558,-0.0182393506580324,0,0,0,0,0,1,0];
                //青
                this.dogColors["33"] = [-0.574,1.43,0.144,0,0,0.426,0.43,0.144,0,0,0.426,1.43,-0.856,0,0,0,0,0,1,0];
                //蓝
                this.dogColors["34"] = [-0.252963215871403,1.72231491775594,-0.469351701884542,0,0,0.284248838199167,0.406687068354976,0.309064093445857,0,0,0.882041315207649,0.803128635904193,-0.685169951111842,0,0,0,0,0,1,0];
                //紫
                this.dogColors["35"] = [0.6823243810247,1.14233582138407,-0.824660202408771,0,0,0.00577366469924764,0.680918773937788,0.313307561362964,0,0,0.879687802030142,-0.201424626339778,0.321736824309635,0,0,0,0,0,1,0];
                //橙
                this.dogColors["36"] = [0.678963215871403,-0.292314917755945,0.613351701884542,0,0,0.141751161800833,1.02331293164502,-0.165064093445857,0,0,-0.456041315207649,0.626871364095806,0.829169951111842,0,0,0,0,0,1,0];
                //红不需要，原生的
                // this.dogColors["37"] = 0xff0000;
            }
            if(this.dogColors[dogLv.toString()])
            {
                // this.changeImageColor(sprite,this.dogColors[dogLv.toString()]);
                let colorFilter = new egret.ColorMatrixFilter(this.dogColors[dogLv.toString()]);
                sprite.filters = [colorFilter]; 
            }
            
        }
        /**
         * 改变图像的颜色
         */
        static changeImageColor(image:egret.DisplayObject, color: number) 
        {
            // 将16进制颜色分割成rgb值
            // let spliceColor = (color) => {
                
            // }
            let result = this.spliceColor(color);
            let colorMatrix = [
                1, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0
            ];
            colorMatrix[0] = result.r / 255;
            colorMatrix[6] = result.g / 255;
            colorMatrix[12] = result.b / 255;
            let colorFilter = new egret.ColorMatrixFilter(colorMatrix);
            image.filters = [colorFilter];
        }
        private static spliceColor(color: number):any
        {
            let result = {r: -1, g: -1, b: -1};
            result.b = color % 256;
            result.g = Math.floor((color / 256)) % 256;
            result.r = Math.floor((color / 256) / 256);
            return result;
        }
    }
}