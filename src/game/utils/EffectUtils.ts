namespace game
{
    /**
     * 特效工具类
     */
    export class EffectUtls
    {
        private effectDic:asf.Dictionary<any,number> 
        /**
         * 根据够的等级获取到对应的星星
         */
        static rotationEffect(effectImg:egret.Sprite,speed:number):void
        {
            //启动一个循环，必须设置好自己的注册点
        }
        static autoRotation():void
        {
            
        }
        /**
         * 播放金钱特效
         */
        static playGoldEffect(x:number,y:number):void
        {
            let effect:EgretMovieEffect = new EgretMovieEffect(24);
            effect.x = x - 50;
            effect.y = y - 60;
            Session.instance.root.addChild(effect);
            effect.playOnce("effect/goldEffect/goldEffect");
            //播放音效
            SoundMgr.play("money");
        }
    }

    export class EffectUtlBean
    {
        effectImg:egret.Sprite;
        speed:number;
        time:number;
    }
}