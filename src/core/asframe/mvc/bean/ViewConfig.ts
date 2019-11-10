/**
 * @ViewBean.as
 *
 * @author sodaChen mail:sujun10#21cn.com
 * @version 1.0
 * <br>Copyright (C), 2013 asFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:DoEasy
 * <br>Date:2015-6-27
 */
namespace mvc
{
	/**
	 *
	 * @author sodaChen
	 * Date:2015-6-27
	 */
	export class ViewConfig extends BasicConfig
	{
		/**
		 * 是否需要框架自动调用init方法(一般init方法都是加载资源之类的)
		 * 不需要监听View的完成通知，直接调用view的init方法
		 **/
		auto				:boolean = true;
		/** 是否会自动在init之后，自动调用open方法 **/
		open				:boolean = false;
		/** y坐标 **/
		x					:number = 0;
		/** x坐标 **/
		y					:number = 0;
		/** 复位设定，决定每次view被add进去（打开的）时候，是否读取配置文件里的配置的坐标(也就是还原刚开始的坐标) **/
		reset				:boolean = false;
		/**  是否具有交换的属性，该属性可以让view有焦点时处于最顶层 **/
		swap				:boolean = true;
		/**  是否支持tab键  **/
		tab					:boolean = true;
		/** 是否拖动  **/
		drag				:boolean = false;
		/** 始终在顶层的view  **/
		topView				:boolean = false;
		/** 是否独占该组(如果独占，则同组的其他view都会被移除容器)  **/
		alone				:boolean = false;
		// /** ui级别，0表示没级别。同一级别 **/
		// lv					:number = 0;

		constructor()
		{
			super();
		}
//		/** 源 **/
//		source			:String;
//		/** 界面的深度，具备深度时，会按照指定的深度和其他界面进行排序 **/
//		depth			:int;

//		/** view所在的组 **/
//		group			:String;

//		/** 互斥界面，当该view出现时，这里的界面必须移除 **/
//		mutexViews		:String;
//		/** 互斥界面组 **/
//		mutexGroups		:String;

		// function clone():ViewConfig
		// {
		// 	var cofnig:ViewConfig = new ViewConfig();
		// 	return cofnig;
		// }
	}
}