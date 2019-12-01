/**
 * @RootContainer.ts
 * @author sodaChen mail:asframe@qq.com
 * @version 1.0
 * <br> Copyright (c) 2012-present, asframe.com
 * <br>Program Name:ASFrameTS
 * <br>Date:2017/2/7
 */
namespace mvc
{
    /**
     * 跟容器对象，存放了游戏中各种基层容器对象
     */
    export class RootContainer
    {
        private static instance: RootContainer;
        /** 根容器对象，游戏引擎中的根对象 **/
        private rootContainer: egret.DisplayObjectContainer;
        /** 容器集合 **/
        private containerMap: asf.Dictionary<number, egret.Sprite>;

        /**
         * 原始的宽
         */
        private originalWidth:number;
        /**
         * 原始的高
         */
        private originalHeight:number;

        stage: egret.Stage;
        /** 背景层 **/
        bgLayer: egret.Sprite;
        /** 场景层 **/
        sceneLayer: egret.Sprite;
        /** bg界面最低层 **/
        viewBgLayer: egret.Sprite;
        /** 主UI层 **/
        mainLayer: egret.Sprite;
        /** 界面最低层 **/
        viewBottomLayer: egret.Sprite;
        /** 界面层 **/
        viewLayer: egret.Sprite;
        /** 界面层 **/
        viewTopLayer: egret.Sprite;
        /** 提示层 **/
        tipLayer: egret.Sprite;
        /** 最顶层 **/
        topLayer: egret.Sprite;
        

        public constructor(rootContainer: egret.DisplayObjectContainer)
        {
            this.containerMap = new asf.Dictionary<number, egret.Sprite>();
            this.rootContainer = rootContainer;
            //添加相关的层
            this.createContainer(MvcConst.BG_LAYER);
            this.createContainer(MvcConst.SCENE_LAYER);
            this.createContainer(MvcConst.VIEW_BG_LAYER);
            this.createContainer(MvcConst.MAIN_LAYER);
            this.createContainer(MvcConst.VIEW_BOTTOM_LAYER);
            this.createContainer(MvcConst.VIEW_LAYER);
            this.createContainer(MvcConst.VIEW_TOP_LAYER);
            this.createContainer(MvcConst.TIP_LAYER);
            this.createContainer(MvcConst.TOP_LAYER);

            // asf.App.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
        }

        getRootContainer():egret.DisplayObjectContainer
        {
            return this.rootContainer;
        }

        onResize(e?: egret.Event): void
        {
            console.info("RootContainer onResize");
            var originalWidthRatio: number = this.originalWidth / this.originalHeight;
            var originalHeightRatio: number = asf.App.stage.stageWidth / asf.App.stage.stageHeight;

            var widthRatio: number = asf.App.stage.stageWidth / this.originalWidth;
            var heightRatio: number = asf.App.stage.stageHeight / asf.App.stage.stageHeight;

            var nowWidth: number = asf.App.stage.stageWidth;//this.originalWidth;
            var nowHeight: number = asf.App.stage.stageHeight;
            if (heightRatio < widthRatio)
            {
                /*this.viewBottomLayer.scaleY = */this.viewLayer.scaleY = heightRatio;
                /*this.viewBottomLayer.scaleX =*/ this.viewLayer.scaleX = heightRatio;
                nowWidth = this.originalWidth * heightRatio;
                nowHeight = asf.App.stage.stageHeight * heightRatio;
            }
            else
            {
                /*this.viewBottomLayer.scaleY = */this.viewLayer.scaleY = widthRatio;
               /* this.viewBottomLayer.scaleX = */this.viewLayer.scaleX = widthRatio;
                nowWidth = this.originalWidth * widthRatio;
                nowHeight = asf.App.stage.stageHeight * widthRatio;
            }

            console.log("widthRatio:" + widthRatio);
            console.log("heightRatio：" + heightRatio);
            // var newH: number = 1136 * blH;
            // var newW: number = 640

            /*this.viewBottomLayer.x = */this.viewLayer.x = (asf.App.stage.stageWidth - nowWidth) * 0.5;
          /*  this.viewBottomLayer.y = */this.viewLayer.y = (asf.App.stage.stageHeight - nowHeight) * 0.5
            // this.sceneLayer.x = (this.sceneLayer.width - asf.App.stage.stageWidth) * 0.5;
            // this.sceneLayer.y = asf.App.stage.stageHeight * 0.5;
            // this.viewLayer.scaleY = blH //* 1136 / 640;
            // this.viewLayer.scaleX = blW;

            // this.viewLayer.scaleY = blH;

            // console.log("asf.App.stageWidth:" + asf.App.stage.stageWidth, asf.App.stage.stageHeight);
            // console.log("asf.App.stage：" + asf.App.stage.width, asf.App.stage.height);
        }

        static getInstance(rootContainer?: egret.DisplayObjectContainer): RootContainer
        {
            if (this.instance == null)
                this.instance = new RootContainer(rootContainer);
            return this.instance;
        }

        public init():void
        {
            
        }

        /**
         * 创建一个指定层名称的容器对象
         * @param layer
         */
        private createContainer(layer: number): void
        {
            var sprite: egret.Sprite = new egret.Sprite();
            this.rootContainer.addChild(sprite);
            this.containerMap.put(layer, sprite);

            // this[layer] = sprite;
            this[MvcConst.LAYER_NAME_ARRAY[layer - 1]] = sprite;

        }

        /**
         * 根据层的名称返回相应的容器对象
         * @param layer
         * @returns {egret.Sprite}
         */
        getContainer(layer: number): egret.Sprite
        {
            return this.containerMap.get(layer);
        }

        /**
         * 添加child到指定层中
         * @param layer
         * @param child
         */
        addChild(layer: number, child: egret.DisplayObject): void
        {
            this.containerMap.get(layer).addChild(child);
        }

        /**
         * 从指定层中删除child
         * @param layer
         * @param child
         */
        removeChild(layer: number, child: egret.DisplayObject): void
        {
            if (child.parent == this.containerMap.get(layer))
            {
                // console.log(layer + "层的容器成功删除的子对象的容器:" + child);
                this.containerMap.get(layer).removeChild(child);
            }
            else
            {
                // console.log(layer + "层的容器不是需要删除的子对象的容器:" + child);
                // console.log("child的父容器:" + child.parent);
            }
        }
    }
}