/**
 * @ShapeMc.ts
 *
 * @author liwenlong
 * @version 1.0
 * <br>Copyright (C), 2012 ASFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:Collections
 * <br>Date:2017/4/10
 */
namespace morn
{
    /**
     *
     * @author liwenlong
     * Date:2017/4/10
     */
    export class ShapeMc extends Component
    {
        private __alpha: number = 1;
        private _color: number = 0xFFFFFF;

        constructor()
        {
            super();
        }

        /**预初始化，在此可以修改属性默认值*/
        protected preinitialize(): void
        {
            super.preinitialize();
            this.mouseEnabled = this.mouseChildren = true;
            this.width = 30;
            this.height = 30;
        }

        /**执行影响宽高的延迟函数*/
        public commitMeasure(): void
        {
            this.exeCallLater(this.draw, this)
        }

        public set width(value: number)
        {
            egret.superSetter(ShapeMc, this, "width", value)
            this.callLater(this.draw, this);
        }

        public set height(value: number)
        {
            egret.superSetter(ShapeMc, this, "height", value)
            this.callLater(this.draw, this);
        }

        public get width(): number
        {
            return egret.superGetter(ShapeMc, this, "width")
        }

        public get height(): number
        {
            return egret.superGetter(ShapeMc, this, "height")
        }

        private draw(): void
        {
            var g: egret.Graphics = this.graphics;
            g.clear();
            g.lineStyle(0, 0, 0);
            g.beginFill(this._color, this.__alpha);
            g.drawRect(0, 0, this.width, this.height);
            g.endFill();
        }

        public set alpha(value: number)
        {
            this.__alpha = value;
            this.draw();
        }

        public get alpha(): number
        {
            return this.__alpha;
        }

        public get color(): number
        {
            return this._color;
        }

        public set color(value: number)
        {
            this._color = value;
            this.draw();
        }
    }
}