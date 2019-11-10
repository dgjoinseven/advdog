namespace game 
{
    /**
     * 主界面的后台执行程序，主要是定时器在定时向服务器拉去数据
     */
    export class GemItem
    {
        gemItem:ui.GemItemUI;
        private autoEffect:AutoRotationEffect;
        constructor(gemItem:ui.GemItemUI)
        {
            this.gemItem = gemItem;
            this.autoEffect = new AutoRotationEffect(gemItem.effectImg);
            this.autoEffect.play();
        }

        clear():void
        {
            this.gemItem.remove();
            this.autoEffect.clear();
        }
    }
}