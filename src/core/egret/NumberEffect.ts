/**
 * Created by sodaChen on 2017/3/15.
 */
namespace game
{
    export class NumberEffect
    {
        /**
         * 字体飘动效果，目前就只处理一种，向上飘动，渐渐消失
         * @param display
         */
        static doAction(display: egret.DisplayObject, para: Object, speed: number = 100, ease?: Function, endCallBack: asf.CallBack = null, isAutoRemove: boolean = true): void
        {
            egret.Tween.get(display).to(para, speed, ease).call(NumberEffect.callback, null, [isAutoRemove, display, endCallBack]);
        }

        static callback(isAutoRemove: boolean, display: egret.DisplayObject, endCallBack: asf.CallBack): void
        {
            if (isAutoRemove && display.parent != null)
            {
                display.parent.removeChild(display);
            }
            if (endCallBack)
            {
                endCallBack.execute();
            }
        }
    }
}