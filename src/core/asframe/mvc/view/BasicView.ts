/**
 * @SpriteView.as
 *
 * @author sodaChen mail:sujun10@qq.com
 * @version 1.0
 * <br>Program Name:DoEasy
 * <br>Date:2016-9-20
 */
namespace mvc {
	/**
	 * mvc框架的基础View对象
	 * @author sodaChen
	 * #Date:2016-9-20
	 */
	export class BasicView<C,D,M> extends BasicCore<D> implements IView<C,D,M>
	{
		/**
		 * 界面级别,默认是0，也就是不做任何处理
		 */
		lv: number = 0;
		/**
		 * 界面是否打开
		 */
		isOpen: boolean;
		/**不关闭互斥界面 */
		noCloseIds: string[];
		/**
		 * 属于这个view的模块对象
		 */
		module:M;
		/** 容器显示对象 **/
		container: C;
		/** 等同上方的 */
		protected mContainer: C;
		/**
		 * 获取到View的配置数据，其中属性是和ViewConfig属性保持一直，
		 * 当需要重置ViewConfig的对应属性时，则在这object里增加对应的属性
		 * @return 包含相关属性的object对象
		 *
		 * @see com.asframe.doeasy.bean.ViewConfig,ModuleConfig,HelperConfig
		 */
		config: ViewConfig;
		/** 容器层名字， 默认是View容器层**/
		layer: number;
		/** 存放view的helper对象，用于统一管理 **/
		protected mHelpers: IHelper<IView<Object,D,M>,D>[];

		/** 自动释放，当关闭的时候就自动释放资源 **/
		protected isCloseDestroy: boolean = true;
		/**
		 * 打开时传递过来的参数
		 */
		protected openParam:any;

		public openFlag: boolean = false;

		constructor(name?: string) {
			super(name);
			this.mHelpers = [];
			this.layer = MvcConst.VIEW_LAYER;
			//采用欺骗编译器的做法，主要是保留ViewConfig的打点提示，不要默认属性。
			//因为这个对象的属性会copy给ViewBean的config，所以不能实际使用ViewConfig
			let temp: any = {}
			this.config = temp;
		}
		public initLayoutJson(completeCallback: asf.CallBack): void {
			if (completeCallback) {
				completeCallback.execute();//默认直接执行回调,子类如果要加载布局文件,就重写成加载并处理完再回调
			}
		}
		/**
		 * 获取到获取容器的方法
		 * @deprecated
		 * @returns {C}
		 */
		getContainer(): C {
			return this.container;
		}
		addHelper(helper: IHelper<IView<Object,D,any>,D>): void {
			if (this.mHelpers.indexOf(helper) != -1)
				throw new Error("不能添加重复的helper");
			this.mHelpers.push(helper);
		}

		removeHelper(helper: IHelper<IView<Object,D,any>,D>): void {
			asf.ArrayUtils.removeItem(this.mHelpers, helper);
		}

		start(): void {
			//			if(!_isInit)
			//				throw new Error(this + "View没有初始化或者没有调用initCompelete方法");
			//调用所有的helper的init
			//			for each (var helper:IHelper in mHelpers)
			//			{
			//				helper.init();
			//			}
			this.onStart();
		}
		onStart(): void {
		}

		open(param?: any): void {
			//添加一个view
			// this.isClose = false;
			this.isOpen = true;
			if(param)
				this.openParam = param;
			Context.$addView(this);
			this.onOpen(param);
		}
		onOpen(param?: any): void {

		}

		close(): void {
			this.openFlag = false;//wangning
			// console.log("关闭View:" + this);			
			if (!this.isOpen)
				return;
			// this.isOpen = false;
			// this.isClose = true;
			this.isOpen = false;
			if(this.openParam)
				this.openParam = null;
			this.onClose();
			mvc.Context.$closeView(this);
			//自动释放，并且还没释放
			if (this.isCloseDestroy && !this.isDestroy) {
				this.destroy();
			}
		}

		/**
		 * 发出界面初始化完成事件。由子类控制调用
		 */
		initCompelete(): void {
			// this.mContainer = mContainer;
			//发出完成初始化事件
			this.notice(MvcConst.VIEW_COMPLETE);
		}

		onClose(): void {

		}

		destroy(o: any = null): void {
			if (this.isDestroy)
				return;
			// //没有关闭，先执行关闭方法
			// if(!this.isClose)
			// 	this.close();
			// console.log("--------------destroy---------------");
			super.destroy(o);

			// console.log("--------------this.send(MvcConst.VIEW_DESTORY, this);---------------");
			//发出销毁事件
			this.send(MvcConst.VIEW_DESTORY, this);
			//释放自己的helper资源
			for (var i: number = 0; i < this.mHelpers.length; i++) {
				this.mHelpers[i].destroy(o);
			}
		}
	}
}