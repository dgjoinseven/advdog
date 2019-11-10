/**
 * @IModule.as
 *
 * @author sodaChen mail:sujun10#21cn.com
 * @version 1.0
 * <br>Copyright (C), 2013 asFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:DoEasy
 * <br>Date:2015-6-20
 */
namespace mvc
{
	/**
	 * 定义了模块的基础接口，所以的模块都必须实现该接口
	 * 相当于一个大的控制器，可以控制模块下所有的view
	 * @author sodaChen
	 * #Date:2015-6-20
	 */
	export interface IModule<D> extends IBasicCore<D>
	{
		// /** 是否已经调用过初始化的init方法了，这个方法由框架调用，外部不可调用 **/
		// $isInit:boolean;
		/** 是否已经执行了 **/
		isTakeServer:boolean;
		/**
		 * 拉取服务器数据
		 */
		takeServer():void;
		// /**
		//  * 是否已经初始化了
		//  */
		// isInit:boolean;
		/**
		 * 模块的启动方法，框架内部调用的方法。响应这个方法的时候，表示系统所有已经init的模块都准备好了
		 * 可以直接调用其他模块
		 */
		start():void;
		/**
		 * 框架私有方法，外部不能强行调用。添加一个View的实例，这个主要是让用户手动初始化view和helper实例对象
		 * @param view 实现IView接口的对象
		 * @param helper 辅助view对象的helper，可多个helper
		 */
		$addView(view:IView<Object,any,any>):void;
		// /**
		//  * 框架私有方法，外部不能强行调用。删除view对象,让模块不对再view保持引用(会删除module子类对view的引用处理)
		//  * @param view
		//  * @param isDestory 是否同时销毁view,默认是false
		//  */
		// $removeView(view:IView<Object>):void;
		/**
		 * 关闭当前模块的所有页面
		 */
		closes():void;
	}
}