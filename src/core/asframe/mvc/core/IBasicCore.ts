/**
 * @IBasicCore.as
 *
 * @author sodaChen mail:asframe@qq.com
 * @version 1.0
 * <br>Copyright (C), 2013 asFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:DoEasy
 * <br>Date:2016-12-13
 */
namespace mvc
{
	/**
	 * 框架的基础接口，mvc的接口和基类都是继承这个接口
	 * @author sodaChen
	 * #Date:2016-12-13
	 */
	export interface IBasicCore<D> extends asf.ISubjects,asf.IDestory
	{
		/** 唯一ID **/
		id:number;
		/** 唯一名字 **/
		name:string;
		// /**
		//  * 全局的主题对象，当需要派发出去的通知需要整个框架监听的时候，就使用整个对象
		//  */
		// subjects:asf.ISubjects;
		/**
		 * mvc框架内使用的共享数据对象
		 */
		mvcSession:MvcSession;
		/**
		 * 项目中的自身模块的数据缓存对象
		 */
		seflDB					:D;	
		/**
		 * 获取到View的配置数据，其中属性是和ViewConfig属性保持一直，
		 * 当需要重置ViewConfig的对应属性时，则在这object里增加对应的属性
		 * @return 包含相关属性的object对象
		 *
		 * @see com.asframe.doeasy.bean.ViewConfig,ModuleConfig,HelperConfig
		 */
		config:Object;
		/**
		 * 是否已经释放资源了
		 */
		isDestroy:boolean;
		/**
		 * 添加一个观察者通知。注意这里添加之后，调用销毁方法时会自动清除掉内部对他的引用。
		 * 无法手动删除，使用请注意
		 * @param notice 通知名称
		 * @param listener 通知监听函数
		 * @param thisObj 绑定的this对象
		 */
		mvcOn(notice:string | number,listener:Function,thisObj:Object):void;
		/**
		 * 初始化方法。建议在构造器里的数据都在这里初始化。
		 * 如果配置有相应的资源，会加载完资源之后再调用该方法。
		 */
		init():void;
		/**
		 * 调用释放方法destroy之后，会自动调用这个方法。所以子类需要在释放的时候进行处理时，重写这个发方法
		 * 尽量不要重写destroy方法
		 */
		onDestroy():void;
	}
}