/**
 * Created by sodaChen on 2017/3/15.
 */
namespace game
{
    export class EgretMovieUtils
    {
        /**
         * 专门放动画的容器
         */
        static mcContainer:egret.Sprite;

        /**
         * 缓存指定的影片数据，主要是缓存特效
         */
        static addCacheMovie(url:string):void
        {

        }

        static playOnce(mc:egret.MovieClip,callBack?:Function,that?:any):void
        {
            if(!mc.parent && this.mcContainer)
            {
                this.mcContainer.addChild(mc);
            }
        }
        static playOnceUrl(url:string):void
        {
            game.MovieMgr.getInstance().load("mc", Session.instance.config.assets + url, new asf.CallBack(this.onLoadMove,this));
        }

        private static onLoadMove(mcData: egret.MovieClipData, name: string, url: string):void
        {
            let mc = new egret.MovieClip(mcData);
        }
    }
}