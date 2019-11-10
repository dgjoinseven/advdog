
/**
 * @LayaViewHandler.ts
 * @author sodaChen mail:asframe@qq.com
 * @version 1.0
 * <br> Copyright (c) 2012-present, asframe.com
 * <br>Program Name:ASFrameTS
 * <br>Date:2017/2/7
 */
namespace mvc {
    /**
     * Egret版本的View操作对象
     */
    export class ViewHandler implements IViewHandler {
        /** View的集合 **/
        private viewMap: asf.HashMap<Object, ViewBean>;
        /** 界面等级列表的集合 **/
        private lvList: ViewBean[];
        /** 根容器对象 **/
        private rootContainer: RootContainer;
        /** 最大的界面等级 **/
        private lvMax: number;
        // /** 是否正在执行打开的过程中 **/
        // private isOpening:boolean;

        public constructor(rootContainer: RootContainer) {
            this.rootContainer = rootContainer;
            this.viewMap = new asf.HashMap<Object, ViewBean>();
            this.lvMax = MvcConst.VIEW_LV_MAX;
            this.lvList = [];
            for (var i: number = 0; i < this.lvMax; i++) {
                this.lvList[i] = null;
            }
        }
        /**
         * 关闭指定等级的view
         * @param lv
         */
        closeViewByLv(lv: number): void {
            var start: number = lv;
            var len: number = start + 1;
            //-1关闭全部打开的界面
            if (lv == -1) {
                start = 1;
                len = this.lvList.length;
            }
            let viewMap = this.viewMap;
            for (var i: number = start; i < len; i++) {
                var lvBean: ViewBean = this.lvList[i];
                if (lvBean && lvBean.instance) {
                    lvBean.instance.close();
                    viewMap.remove(lvBean.instance);
                    //删除掉老的view
                    this.lvList[lv] = null;
                }
            }
        }
        /**
         * 是否已经添加了view对象
         * @param view
         */
        hasView(view: ViewBean): boolean {
            //目前只有1级界面才需要做重复判断
            if (view.instance.lv == 1) {
                return this.viewMap.hasKey(view.instance);
            }
            return false;
        }
        /**
         * 添加一个View对象
         * @param view
         */
        addView(view: ViewBean): boolean {
            let isSame: boolean = false;
            if (view.instance.lv == 1) {
                // //监听相关事件
                var lvBean: ViewBean = this.lvList[view.instance.lv];
                if (view == lvBean)
                    isSame = true;
                //如果是1级界面，则关闭其他所有的界面了
                for (var i: number = 1; i < 5; i++) {
                    lvBean = this.lvList[i];
                    //排除自己
                    if (lvBean && lvBean.instance && lvBean != view) {
                        if (!view.instance.noCloseIds || view.instance.noCloseIds.indexOf(lvBean.name) == -1) {
                            //删除掉老的view
                            lvBean.instance.close();
                            this.lvList[i] = null;
                        }

                    }
                }
            }
            //如果是打开同样的，则只是关闭，不再添加进来
            if (isSame)
                return false;
            //设置为最新级别的view
            this.lvList[view.instance.lv] = view;
            this.viewMap.put(view.instance, view);
            //进行类型转换0
            var container: egret.Sprite = view.instance.container as egret.Sprite;
            //根据层放到容器中去
            this.rootContainer.addChild(view.instance.layer, container);

            return true;
        }
        /**
         * 删除一个View对象
         * @param view
         */
        delView(view: ViewBean): void {
            // console.log(view.name + "ViewHander进行删除:" + view.instance);
            this.viewMap.remove(view.instance);
            this.lvList[view.instance.lv] = null;
            var container: egret.Sprite = view.instance.container as egret.Sprite;
            if (container)
                this.rootContainer.removeChild(view.instance.layer, container);
            else
                console.error(view.name + " delView出现没有container的情况");
            //删除相关事件
        }
        /**
         * 是否打开了指定级别的view
         * @param lv:number 界面级别
         * @return boolean 是否打开
         */
        hasViewByLv(lv: number): boolean {
            let view: ViewBean = this.lvList[lv];
            if (view && view.instance) return true;
            return false;
        }
        /**
         * 判断当前层级是否有显示View
         */
        hasViewByLayer(layer): boolean {
            let viewMap = this.viewMap;
            let values = viewMap.values();
            if (values) {
                for (let view of values) {
                    if (view.instance.layer == layer) {
                        return true;
                    }
                }
            }
            return false;
        }
    }
}