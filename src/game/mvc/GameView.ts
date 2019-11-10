namespace mvc
{
    /**
     * 基础Laya创建的mvc框架对象
     */
	export class GameView<C extends morn.Component,D,M> extends game.View<C,D,M>
	{
		/** 界面打开 **/
		static View_onOpen: string = "View_onOpen"
		/** 界面关闭 **/
		static View_onClose: string = "View_onClose";

		// /** 界面级别 **/
		// level: number = 0;
		/** 底图 **/
		bg: morn.Image;
		/** 是否显示BG **/
		isShowBg: boolean = false;
	}
}