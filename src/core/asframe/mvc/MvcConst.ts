/**
 * Created by soda on 2017/1/26.
 */
namespace mvc
{
    export class MvcConst
    {
        /////////////mvc view、module、heper的独立事件，只有监听具体的对象才能接受到这些方法//////////
        /** 界面初始化完毕抛出的事件 **/
        static VIEW_COMPLETE: string = "viewComplete";
        /** view打开事件，参数是view的name或者id **/
        static VIEW_OPEN: string = "viewOpen";
        /** view事关闭件，参数是view的name或者id **/
        static VIEW_CLOSE: string = "viewClose";
        /** view销毁事件，参数是view的name或者id **/
        static VIEW_DESTORY: string = "viewDestory";

        ///////////////////////关于的view事件通知///////////////////
        /** 打开view事件 **/
        static OPEN_VIEW: string = "openView";
        /** 关闭view事件 **/
        static CLOSE_VIEW: string = "openView";
        /** 销毁view事件 **/
        static DESTORY_VIEW: string = "openView";


        /**
         * view的层
         * @type {string}
         */
        static BG_LAYER: number = 1;
        static SCENE_LAYER: number = 2;
        static VIEW_BG_LAYER: number = 3;
        static MAIN_LAYER: number = 4;
        static VIEW_BOTTOM_LAYER: number = 5;
        static VIEW_LAYER: number = 6;
        static VIEW_TOP_LAYER: number = 7;
        static TIP_LAYER: number = 8;
        static TOP_LAYER: number = 9;
        static LAYER_NAME_ARRAY: string[] = ["bgLayer", "sceneLayer", "viewBgLayer", "mainLayer", "viewBottomLayer", "viewLayer", "viewTopLayer", "tipLayer", "topLayer"];

        /////////////View的级别。1级，2级，3级，-1是没有级别
        /** 不受排斥的界面级别 **/
        static VIEW_LV: number = -1;
        static VIEW_LV_MAX: number = 3;
        static VIEW_LV_0: number = 0;
        static VIEW_LV_1: number = 1;
        static VIEW_LV_2: number = 2;
        static VIEW_LV_3: number = 3;
    }
}