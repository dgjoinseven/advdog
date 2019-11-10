/**
 * @EgretContainer.ts
 *
 * @author sodaChen mail:asframe#qq.com
 * @version 1.0
 * <br>Copyright (C), 2012 ASFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:Collections
 * <br>Date:2017/6/19
 */
namespace game
{
    /**
     * Egret的容器，实现了网络加载机制，模拟了mvc.View
     * @author sodaChen
     * Date:2017/6/19
     */
    export class EgretContainer<C extends morn.Component> extends egret.DisplayObjectContainer
    {
        // /** 白鹭引擎的舞台对象 **/
        // stage: egret.Stage;
        /** 容器显示对象 **/
        container: C;

        private groupName: string;

        constructor(groupName: string)
        {
            super();
            //加载网络资源
            if(groupName)
            {
                RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                // RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
                RES.loadGroup(groupName);
            }
            else
            {
                this.init();
            }
        }
        /**
         * preload资源组加载完成
         * preload resource group is loaded
         */
        private onResourceLoadComplete(evt: RES.ResourceEvent): void
        {
            if (evt.groupName == this.groupName)
            {
                RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
                this.init();
            }
        }
        /**
         * 资源组加载出错
         *  The resource group loading failed
         */
        private onItemLoadError(event: RES.ResourceEvent): void
        {
            console.warn("Url:" + event.resItem.url + " has failed to load");
        }
        /**
         * 资源组加载出错
         * Resource group loading failed
         */
        private onResourceLoadError(event: RES.ResourceEvent): void
        {
            //TODO
            console.warn("Group:" + event.groupName + " has failed to load");
            //忽略加载失败的项目
            //ignore loading failed projects
            this.onResourceLoadComplete(event);
        }
        init(): void
        {

        }
        /**
         * 初始化容器对象，这里主要是由子类进行调用
         * @param container
         */
        protected initContainer(container: C): void
        {
            this.container = container;
        }
        close():void
        {
            if(this.container.parent)
                this.container.parent.removeChild(this.container);
            this.onClose();
        }
        onClose():void
        {

        }
    }
}