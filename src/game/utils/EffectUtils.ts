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
    }

    export class EffectUtlBean
    {
        effectImg:egret.Sprite;
        speed:number;
        time:number;
    }
}