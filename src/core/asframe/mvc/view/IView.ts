/**
 * @IView.as
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
	 * 显示对象接口,View对象一般都是要实现该接口
	 * @author sodaChen
	 * Date:2012-4-1
	 */
	export interface IView<C,D,M> extends IBasicCore<D>
	{
		/**
		 * 界面级别
		 */
		lv: number;
		/**
		 * 界面是否打开
		 */
		isOpen: boolean;

		openFlag: boolean;
		/**
		 * 返回需要添加到的容器层
		 * @return
		 *
		 */
		// getLayer():string;
		layer: number;
		/**不关闭互斥界面 */
		noCloseIds: string[];
		// /**
		//  * 初始化view的容器对象
		//  */
		// initContainer(container: C):void
		/**
		 * 初始化完成函数。内个view完成自己的内部初始化之后，必须得强制调用该方法。
		 * @param mContainer 界面的容器对象，必须有
		 *
		 */
		initCompelete(): void;
		/**
		 * 返回显示对象容器
		 * 由于实现引擎的版本的问题，所以这里采用任意返回值
		 * @return
		 */
		/**初始化布局的json文件,在init前调用
		 * callback 处理完后回调这个函数
		 * thisObj 回函函数的域this
		 */
		// initLayoutJson(callback: Function, thisObj: any): void;
		initLayoutJson(completeCallback: asf.CallBack): void;

		/**
		 * 属于这个view的模块对象
		 */
		module:M;

		/**UI */
		container: C;
		// getContainer():C;
		/**
		 * 添加一个当前辅助view的helper
		 * @param helper
		 *
		 */
		addHelper(helper: IHelper<IView<Object,D,M>,D>): void;
		/**
		 * 删除一个helper
		 * @param helper
		 *
		 */
		removeHelper(helper: IHelper<IView<Object,D,M>,D>): void;
		// /**
		//  * 当面view是否已经关闭了
		//  * @return
		//  *
		//  */
		// isClose():Boolean;
		/**
		 * 框架自动调用方法。当view和他的helper等依赖关系建立好之后，才会自动调用，慢于init方法
		 */
		start(): void;
		/**
		 * 系统自动调用的私有方法。打开并显示view对象，一般是这个方法是系统调用的，所以要重写，请重写onOpen方法
		 * @param param
		 *
		 */
		open(param?: any): void;
		/**
		 * 需要对打开界面进行一些操作时，请重写这个方法
		 * @param param
		 */
		onOpen(param?: any): void;
		/**
		 * 关闭view对象（不等于销毁，默认是不在显示列表或者隐藏起来了）
		 * @param isDestroy 是否释放掉界面，默认为false
		 */
		close(): void;
		// /**
		//  * view对象进行更新。这里会根据model来进行刷新页面
		//  */
		// update():void;
		// /**
		//  * 去关闭view对象，会调用ViewMgr.closeView(ClassUtils.forInstance(this));
		//  *
		//  */
		// closeView():void;
	}
}