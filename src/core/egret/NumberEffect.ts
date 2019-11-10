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
        static upAction(display: egret.DisplayObject, para: Object, speed: number = 100, ease?: Function, endCallBack: asf.CallBack = null, isAutoRemove: boolean = true): void
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

        /**
         * 字体飘动效果，目前就只处理一种，向上飘动，渐渐消失
         * @param display
         */
        static doAction(display: egret.DisplayObject, para: Object, speed: number = 100, ease?: Function, endCallBack: asf.CallBack = null, isAutoRemove: boolean = true): void
        {
            //结束删除的闭包函数
            // var endFunc = (): void =>
            // {
            //     if (display.parent != null)
            //         display.parent.removeChild(display);
            //     if (endCallBack)
            //     {
            //         endCallBack.execute();
            //     }
            // }
            var endFunc = function (): void
            {
                if (isAutoRemove && display.parent != null)
                    display.parent.removeChild(display);
                if (endCallBack)
                    endCallBack.execute();
            }

            // this.container.addChild(display);
            egret.Tween.get(display).to(para, speed, ease).call(endFunc);
        }

        /**
         * 伤害飘出后停顿一会儿然后向上飘动然后消失
         * @param display
         */
        static doAction2(display: egret.DisplayObject, toX: number, toY: number, endCallBack: asf.CallBack = null, isAutoRemove: boolean = true): void
        {
            var endFunc = function (): void
            {
                if (isAutoRemove && display.parent != null)
                    display.parent.removeChild(display);
                if (endCallBack)
                    endCallBack.execute();
            }

            var s0: number = 1.4;//scale初始值
            var s1: number = s0 * 0.7;
            var s2: number = s1 * 1.2;

            //display.scaleX = display.scaleY = s0;
            display.alpha = 1;
            //放大
            /*egret.Tween.get(display).
                to({ scaleX: s1, scaleY: s1 }, 700, egret.Ease.backInOut).
                to({ scaleX: s2, scaleY: s2 }, 200).
                to({ scaleX: s1, scaleY: s1 }, 200);*/
            /*egret.Tween.get(display).
                to({ scaleX: s2, scaleY: s2 }, 700);*/
            //移动
            /*egret.Tween.get(display).
                to({ x: toX, y: toY, alpha: 0.7 }, 600, egret.Ease.sineInOut).
                to({},1100).
                to({ y: toY - 100 }, 300, egret.Ease.sineOut).
                to({ alpha: 0 }, 1800).
                call(endFunc);*/
            egret.Tween.get(display).
                to({ y: toY - 100 }, 650).
                call(endFunc);
        }
    }
}