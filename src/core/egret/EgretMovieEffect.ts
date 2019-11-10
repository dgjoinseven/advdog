
namespace game
{
    /**
     * 播放动画特效对象
     */
    export class EgretMovieEffect extends egret.Sprite
    {
        private mc:egret.MovieClip;
        private url:string;
        private frameRate:number = 12;
        constructor(frameRate?:number)
        {
            super();
        }
        playOnce(url:string):void
        {
            this.url = url;
            game.MovieMgr.getInstance().load("mc", Session.instance.config.assets + url, new asf.CallBack(this.onLoadMove,this));
        }

        private onLoadMove(mcData: egret.MovieClipData, name: string, url: string):void
        {
            this.mc = new egret.MovieClip(mcData);
            this.addChild(this.mc);
            this.mc.frameRate = this.frameRate;
            //监听播放事件
            this.mc.addEventListener(egret.Event.COMPLETE,this.onPlayComplete,this);
            // this.mc.play(9999);
            this.mc.play();
        }
        private onPlayComplete():void
        {
            console.log(this.url + "播放完成");
            this.mc.stop();
            this.mc.removeEventListener(egret.Event.COMPLETE,this.onPlayComplete,this);
            this.removeChild(this.mc);
            if(this.parent)
                this.parent.removeChild(this);
        }
    }
}