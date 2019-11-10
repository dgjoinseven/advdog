/**
 * @IMediator.as
 *
 * @author sodaChen mail:asframe#163.com
 * @version 1.0
 * <br>Copyright (C), 2012 ASFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:ASFrame AStruts2
 * <br>Date:2012-4-1
 */
namespace mvc
{
	/**
	 * View的辅助对象，实现View相关的逻辑和操作，以及和外部通讯等等
	 * 相当于一个针对单个View的控制器
	 * @author sodaChen
	 * Date:2012-4-1
	 */
	export interface IHelper<V extends IView<Object,D,any>,D> extends IBasicCore<D>
	{
		// /**
		//  * 设置配置属性，主要是用于框架底层使用
		//  * @param bean
		//  */
		// setHelperBean(bean:HelperBean):void;
		/**
		 * 设置控制的显示对象。框架底层自动调用，一般也是框架内部使用，外部推荐使用直接声明相关View的属性
		 * @param view 实现了View接口的实例
		 */
		view:V;
		// /**
		//  * 初始化helper，一般实现从这里开始。该方法是由框架内部主动调用
		//  */
		// init():void;

		/**
		 * view每次打开时都会调用整个方法
		 */
		viewOpen():void;
		/**
		 * view每次关闭或者销毁时都会调用整个方法
		 */
		viewClose():void;

		// /**
		//  * 是否已经初始化
		//  * @return
		//  *
		//  */
		// get isInint():Boolean;
		// /**
		//  * 设置初始化
		//  * @param v
		//  *
		//  */
		// function set isInint(v:Boolean):void;
	}
}