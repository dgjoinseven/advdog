
namespace game
{
    /**
     * 播放动画特效对象
     */
    export class AutoRotationEffect //extends egret.Sprite
    {
        private image:morn.Image;
        private url:string;
        private timeKey:number;
        private speed:number = 1;
        constructor(image?:morn.Image,frameRate?:number)
        {
            //super();
            if(image)
            {
                this.image = image;
                //立刻开始旋转
                this.timeKey = asf.App.timer.doLoop(33,this.onLoop,this);
            }
        }
        clear():void
        {
            asf.App.timer.clearTimer(this.timeKey);
        }
        play():void
        {
            this.timeKey = asf.App.timer.doLoop(33,this.onLoop,this);
        }
        private onLoop():void
        {
            this.image.rotation += this.speed;
        }
    }
}