
namespace game
{
    /**
     * 播放动画特效对象
     */
    export class AutoRotationEffect //extends egret.Sprite
    {
        speed:number = 1;
        private image:morn.Image;
        private url:string;
        private timeKey:number;  
        private isLoop:boolean;
        private frameRate:number;
        constructor(image?:morn.Image,frameRate?:number)
        {
            if(frameRate)
                this.frameRate = frameRate;
            else
                this.frameRate = 33;
            //super();
            if(image)
            {
                this.image = image;
                //立刻开始旋转
                this.timeKey = asf.App.timer.doLoop(this.frameRate,this.onLoop,this);
                this.isLoop = true;
            }
        }
        /**
         * 改变控制对象
         */
        changeImage(image:morn.Image):void
        {
            this.image = image;
            // if(!this.isLoop)
            //     this.timeKey = asf.App.timer.doLoop(33,this.onLoop,this);
        }
        clear():void
        {
            this.isLoop = false;
            asf.App.timer.clearTimer(this.timeKey);
        }
        play():void
        {
            if(!this.isLoop)
            {
                this.isLoop = true;
                this.timeKey = asf.App.timer.doLoop(this.frameRate,this.onLoop,this);
            }
                
        }
        private onLoop():void
        {
            if(this.image)
                this.image.rotation += this.speed;
        }
    }
}