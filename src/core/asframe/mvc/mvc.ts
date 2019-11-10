/**
 * Created by sodaChen on 2017/3/14.
 */
namespace mvc {
    declare var mvc_subjects: asf.Subjects;


    export function smallInit():void
    {
        let mvcSession = MvcSession.getInstance();
        mvc_subjects = mvcSession.subjects;
    }
    /**
     * 初始化mvc框架，传入必要的mvc内部使用到的对象
     */
    export function init(viewHandler: IViewHandler, holdView: IHoldupView, resLoaderClass: Function, moduleMgrClass?: Function,dbClass?:any): void {
        console.info("初始化mvc框架");
        Context.$holdupView = holdView;
        Context.$viewHanlder = viewHandler;
        Context.$resLoaderClass = resLoaderClass;
        Context.$moduleMgrClass = moduleMgrClass;
        Context.$dbClass = dbClass;
        Context.init();
        mvc_subjects = Context.subjects;
    }
    /**
     * 直接打开一个View对象，如果view没有初始化，则会进行初始化。同时会进行相关的依赖注入
     * @param view
     * @param callBack
     * @param thisObj
     * @param param
     */
    export function openView(view: number | string | Function, callBack?: Function,
        thisObj?: Object, param?: any, isEnforce?: boolean): void {
        // console.log("==============mvc.openView================");
        Context.$openView(view, callBack, thisObj, param, isEnforce);
    }

    /**
     * 简化打开view的方法
     * @param {number | string | Function} view
     * @param param
     * @param {boolean} isEnforce
     */
    export function open(view: number | string | Function, param?: any, isEnforce?: boolean): void {
        Context.$openView(view, null, null, param, isEnforce);
    }

    /**
     * 销毁界面
     * @param view 界面的标识
     */
    export function destroyView(view: number | string | Function): void {
        this.closeView(view, true);
    }

    /**
     * 关闭指定等级的view
     * @param lv
     */
    export function closeViewByLv(lv: number = -1): void {
        Context.$viewHanlder.closeViewByLv(lv);
    }

    /**
     * 关闭View对象
     * @param view view 唯一ID、名字和构造函数之一
     * @param isDestroy 是否销毁界面，默认是false
     */
    export function closeView(view: number | string | Function, isDestroy: boolean = false): void {
        var bean: ViewBean = Context.$getViewBean(view);
        if (!bean)
            return;
        // throw new Error(view + "mvc.closeView方法必须通过MvcReg进行注册");
        if (!bean.instance) {
            //实例不存在,不需要关闭
            return;
        }
        //如果还没有初始化完毕,则直接发出销毁事件
        if (isDestroy && !bean.instance.isOpen) {
            Context.$destroyViewEvent(bean.instance);
            return;
        }
        if (isDestroy)
            bean.instance.destroy();
        else
            bean.instance.close();
    }

    /**
     * 获得一个view
     * 
     * @export
     * @param {(number | string | Function)} view
     * @param {*} [param]
     */
    export function getView(view: number | string | Function, param?: any): IView<Object,any,any> {
        return Context.$getView(view, param);
    }

    /** 判断当前曾经是否有view */
    export function hasViewByLayer(layer: number): boolean {
        return Context.$viewHanlder.hasViewByLayer(layer);
    }

    // /**
    //  * 清除外部对view实例的各种引用，这里只能由view对象本身调用
    //  * @param view
    //  */
    // export function $clearViewRef(view:number | string | Function):void
    // {
    //     if(this.caller instanceof BasicView)
    //     {
    //         console.log("调用者是BasicView的子类");
    //     }
    //     Context.$getViewBean(view).instance = null;
    //     //模块清除对view的引用
    //  }
    /**
    * 根据模块名称或者class构造函数获取到模块的实例
    * @param module 名称或者class构造函数
    * @returns {IModule} 模块的实例
    */
    export function getModule(module: string | Function): IModule<any> {
        return Context.$getModule(module);
    }
    /**
     * 发起一个通知事件
     * @param notice 通知名称
     * @param param 参数数组
     */
    export function notice(notice: string | number, param?: Array<any>): void {
        // Context.subjects.notice(notice, param);
        mvc_subjects.notice(notice, param);
    }
    /**
     * 发送一个mvc框架的全局通知
     * @param notice 通知主题
     * @param args 相关参数
     */
    export function send(notice: string | number, ...args): void {
        // Context.subjects.notice(notice, args);
        mvc_subjects.notice(notice, args);
    }
    /**
     * 添加一个观察者通知
     * @param notice 通知名称
     * @param listener 通知监听函数
     *
     */
    export function on(notice: string | number, listener: Function, thisObj: Object): asf.NoticeData {
        // return Context.subjects.on(notice, listener, thisObj);
        return mvc_subjects.on(notice, listener, thisObj);
    }
    /**
     * 监听主题，只监听一次
     * @param notice 通知
     * @param listener 监听函数
     * @param thisObj listener的类对象
     */
    export function once(notice: string | number, listener: Function, thisObj: Object): asf.NoticeData {
        // return Context.subjects.once(notice, listener, thisObj);
        return mvc_subjects.once(notice, listener, thisObj);
    }
    /**
     * 删除一个观察者通知
     * @param notice 通知名称
     * @param listener 删除指定监听函数
     *
     */
    export function off(notice: string | number, listener: Function, thisObj: Object): void {
        // Context.subjects.off(notice, listener, thisObj);
        mvc_subjects.off(notice, listener, thisObj);
    }
    export function offs(thisObj?: Object): void {
        // Context.subjects.offs(thisObj);
        mvc_subjects.offs(thisObj);
    }
}