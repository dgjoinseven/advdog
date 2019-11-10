/**
 * @MvcResLoader.ts
 *
 * @author sodaChen mail:asframe#qq.com
 * @version 1.0
 * <br>Copyright (C), 2012 ASFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:Collections
 * <br>Date:2017/4/11
 */
namespace game {
    /**
     * mvc框架的资源加载器
     * @author sodaChen
     * Date:2017/4/11
     */
    export class MvcResLoader implements mvc.IResLoader {
        private reser: mvc.IReser;
        private loadCount: number;
        private groupDic: Object;
        // private resList: mvc.ResBean[];
        // private groupName: string;
        private static loadCompleteDic: asf.Dictionary<string, number>;

        static loadingViewClass: any;

        constructor() {
            if (MvcResLoader.loadCompleteDic == null) {
                MvcResLoader.loadCompleteDic = new asf.Dictionary<string, number>();
            }
            if (this.groupDic == null)
                this.groupDic = {};
        }
        destroy(o?: any): void {

            // RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            // RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            // RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            // RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            delete this.reser;
        }

        /**
         * 删除资源
         * @param group
         */
        static removeRes(path: string): void {
            var count: number = this.loadCompleteDic.get(path);
            if (count) {
                count--;
            }
            if (!count || count == 0)
                this.loadCompleteDic.remove(path);
            else
                MvcResLoader.loadCompleteDic.put(path, count);

            //将资源里的主纹理引用次数也加1
            var resArr: RES.ResourceInfo[] = RES.getGroupByName(path);
            for (var i: number = 0; i < resArr.length; i++) {
                asf.ResMgr.ins().removeCount(resArr[i].name)
            }
        }

        /**
         * 添加引用次数
         * @param path
         */
        private addRefCount(group: string): void {
            var count: number = MvcResLoader.loadCompleteDic.get(group);
            if (count || count == 0)
                count++;
            else
                count = 1;

            //将资源里的主纹理引用次数也加1
            var resArr: RES.ResourceInfo[] = RES.getGroupByName(group);
            for (var i: number = 0; i < resArr.length; i++) {
                asf.ResMgr.ins().addCount(resArr[i].name)
            }

            MvcResLoader.loadCompleteDic.put(group, count);
        }
        /**
         * 目前只是载入一个
         * @param resList
         * @param reser
         */
        loadResList(resList: mvc.ResBean[], reser: mvc.IReser): void {
            // this.resList = resList;
            let resource = RES;
            this.reser = reser;
            resource.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            resource.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            if (MvcResLoader.loadingViewClass) {
                resource.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            }
            resource.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);

            var tempArr: string[] = [];

            //如果已经存在，则直接回调
            this.loadCount = 0;
            for (var i: number = 0; i < resList.length; i++) {
                if (MvcResLoader.loadCompleteDic.hasKey(resList[i].path)) {
                    this.addRefCount(resList[i].path);
                }
                else {

                    this.loadCount++;
                    this.groupDic[resList[i].path] = true;
                    tempArr.push(resList[i].path);//先缓存需要加载的东西
                }
            }

            //没有加载，全部有缓存，则直接回调
            if (this.loadCount == 0 && this.reser) {
                reser.setResList(null, null);
            }
            else {
                //这时候再加载
                if (MvcResLoader.loadingViewClass) {
                    var needShowLoad: boolean = false;
                    for (var i: number = 0; i < tempArr.length; i++) {
                        resource.loadGroup(tempArr[i]);
                        if (!resource.isGroupLoaded(tempArr[i])) {
                            needShowLoad = true;
                        }
                    }

                    if (needShowLoad) {
                        mvc.openView(MvcResLoader.loadingViewClass)
                    }
                }
                else {
                    for (var i: number = 0; i < resList.length; i++) {
                        resource.loadGroup(resList[i].path);
                    }
                }
            }
        }
        /**
         * preload资源组加载完成
         * preload resource group is loaded
         */
        private onResourceLoadComplete(evt: RES.ResourceEvent): void {
            //有记录
            if (this.groupDic[evt.groupName]) {
                this.loadCount--;
                this.addRefCount(evt.groupName);
                if (this.loadCount == 0) {
                    this.reser.setResList(null, null);
                    if (MvcResLoader.loadingViewClass)
                        mvc.closeView(MvcResLoader.loadingViewClass)
                    delete this.reser;
                }
            }
        }
        /**
         * 资源组加载出错
         *  The resource group loading failed
         */
        private onItemLoadError(event: RES.ResourceEvent): void {
            console.warn("Url:" + event.resItem.url + " has failed to load");
        }
        /**
         * 资源组加载出错
         * Resource group loading failed
         */
        private onResourceLoadError(event: RES.ResourceEvent): void {
            //TODO
            console.warn("Group:" + event.groupName + " has failed to load");
            //忽略加载失败的项目
            //ignore loading failed projects
            this.onResourceLoadComplete(event);
        }
        /**
         * preload资源组加载进度
         * loading process of preload resource
         */
        private onResourceProgress(event: RES.ResourceEvent): void {
            if (MvcResLoader.loadingViewClass) {
                var view: any = mvc.getView(MvcResLoader.loadingViewClass);
                if (view) {
                    view.updateProgress(event.itemsLoaded / event.itemsTotal);
                }
            }

            // if (event.groupName == "preload")
            // {
            //     // mvc.send()
            //     var view: PanelLoadView = mvc.getView(PanelLoadView) as PanelLoadView;
            //     if (view)
            //     {
            //         view.updateProgress(event.itemsLoaded / event.itemsTotal);
            //     }
            // }
        }
    }
}