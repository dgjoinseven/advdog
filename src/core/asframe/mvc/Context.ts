/**
 * @Context.as
 *
 * @author sodaChen mail:asframe@qq.com
 * @version 1.0
 * <br>Copyright (C), 2010-2016 asFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:DoEasy
 * <br>Date:2016-5-25
 */
namespace mvc
{
	/**
	 * DoEasy控制中心，上下文，负责管理所有的Bean、Module和View、Helper
	 * @author sodaChen
	 * Date:2016-5-25
	 */
	export class Context
	{
		//static defModuleConfig:ModuleConfig = new ModuleConfig();
		//static defViewConfig:ViewConfig = new ViewConfig();

		/** 拦截openView方法的实现类，通用的，所有的openView都会经过这个接口 **/
		static $holdupView: IHoldupView;
		/** 界面操作对象，由外部实际使用的时候扩展 **/
		static $viewHanlder: IViewHandler;
		/** 外部的资源管理器的构造对象 **/
		static $resLoaderClass: any;
		/** 外部的模块管理器的构造对象，静态对象 **/
		static $moduleMgrClass: any;
		/** 外部的数据管理器的实例,静态对象 **/
		static $dbClass: any;
		/** mvc框架的全局共享数据对象 **/
		static mvcSession: MvcSession;
		/** mvc框架内通讯的全局主题对象 **/
		static subjects: asf.Subjects;

		/** 存放模块的配置信息 **/
		private static moduleBeanMap: asf.Dictionary<string | Function, ModuleBean>;
		/** 存放view的配置信息 **/
		private static viewBeanMap: asf.Dictionary<number | string | Function, ViewBean>;
		// /** 用IView实例作key的viewBean集合 **/
		// private static viewMap: asf.Dictionary<IView<Object>, ViewBean>;
		/** 存放bean的数据结构 **/
		private static beanMap: asf.Dictionary<any, any>;


		/**
		 * 初始化mvc框架的Context容器
		 */
		static init()
		{
			this.moduleBeanMap = new asf.Dictionary<string | Function, ModuleBean>();
			this.viewBeanMap = new asf.Dictionary<number | string | Function, ViewBean>();
			// this.viewMap = new asf.Dictionary<IView<Object>, ViewBean>();
			this.beanMap = new asf.Dictionary<any, any>();

			this.mvcSession = MvcSession.getInstance();
			this.subjects = this.mvcSession.subjects;
			MvcReg.init(this.moduleBeanMap, this.viewBeanMap, this.beanMap);
			//注册mvcsession和gloab对象到容器中
			MvcReg.regBean("mvcSession", this.mvcSession);
			MvcReg.regBean("subjects", this.subjects);
		}
		/**
		 * 初始化指定的某个DB
		 */
		static initDB(view:string):void
		{
			let viewBean = this.viewBeanMap.get(view);
			if(!viewBean)
				throw new Error(view + "初始化配套db错误，没有对应的viewBean");

			let model;
			if(viewBean.moduleBean && viewBean.moduleBean.dbClass)
			{
				if(viewBean.moduleBean.selfDB)
					return ;
				model = new viewBean.moduleBean.dbClass();
				viewBean.moduleBean.selfDB = model;
				viewBean.selfDB = model;
			}
			else if(viewBean.dbClass)
			{
				if(viewBean.selfDB)
					return ;
				model = new viewBean.dbClass();
				viewBean.selfDB = model;
			}
			else
			{
				throw new Error(view + "没有配套的DB对象");
			}
		}

		/**
		 * 初始化所有的模块
		 */
		static initModule(): void
		{

		}

		/**
		 * 所有的模块拉取服务端的数据
		 */
		static takeServer(): void
		{
			this.moduleBeanMap.forEach(function (bean: ModuleBean)
			{
				if (bean.instance && !bean.instance.isTakeServer)
				{
					bean.instance.isTakeServer = true;
					try
					{
						bean.instance.takeServer();
					}
					catch (e)
					{
						console.error(bean.name + "takeServer报错:", e);
					}
				}
			}, this);
		}
		/**
		 * 单独启动初始化传入的module
		 */
		static startModule(module: Function, view?: Function): void
		{
			var moduleBean: ModuleBean = this.moduleBeanMap.get(module);
			asf.Assert.notNull(moduleBean, module + "必须需提前注册");
			if (moduleBean.instance)
				return;
			//目前简单处理模块的单独初始化
			moduleBean.instance = new moduleBean.clazz();
			moduleBean.instance.init();

			var imodule: IModule<any> = MvcUtils.createCore(moduleBean);
			MvcUtils.setIdName(imodule, moduleBean);
			//尝试自动注入模块
			if (Context.$moduleMgrClass)
			{
				if (Context.$moduleMgrClass.hasOwnProperty(imodule.name))
					Context.$moduleMgrClass[imodule.name] = imodule;
			}
			// this.moduleBeanMap.forEach(function(bean:ModuleBean)
			// {
			// 	if(bean.instance)
			// 		bean.instance.start();
			// },this);
		}
		/**
		 * 释放view的方法法的事件，内部函数
		 * @param view
		 */
		static $destroyViewEvent(view: IView<Object,any,any>): void
		{
			var bean: ViewBean = this.viewBeanMap.get(MvcUtils.getViewKey(view));
			if (!bean)
				return;
			bean.isOpen = false;
			// asf.Assert.notNull(bean, view.name + "没有配置成ViewBean");
			bean.instance = null;
			//所有的heplerbean也进行处理
			for (var i: number = 0; i < bean.helperBeans.length; i++)
			{
				//这里有可能需要做一些策略性的处理，目前纯粹设置为空(销毁在view的那里已经调用销毁方法了)
				bean.helperBeans[i].instance = null;
			}
		}
		/**
		 * 根据模块名称或者class构造函数获取到模块的实例
		 * @param module 名称或者class构造函数
		 * @returns {IModule} 模块的实例
		 */
		static $getModule(module: string | Function): IModule<any>
		{
			return this.moduleBeanMap.get(module).instance;
		}
		static $getViewBean(view: number | string | Function): ViewBean
		{
			return this.viewBeanMap.get(view);
		}
		/**
		 * 打开一个view界面。必须是通过注册的view才能使用这个方法。不然会抛出异常
		 * @param view 唯一ID、名字和构造函数之一
		 * @param callBack view完成打开之后回调
		 * @param thisObj this对象，如果callBack
		 * @param param 打开view时传入view的open方法的参数
		 */
		static $openView(view: number | string | Function, callBack: Function, thisObj: Object, param: any, isEnforce: boolean): void
		{
			if (callBack && !thisObj)
				throw new Error("openView方法如果有callBack方法，thisObj则不能为空");
			var bean: ViewBean = this.viewBeanMap.get(view);
			if (!bean)
				throw new Error(view + "openView方法必须通过MvcReg进行注册");

			//如果正在loading中，则不进行任何——操作
			if (bean.isLoading)
				return;

			//进行拦截
			if (this.$holdupView.openViewHold(bean, param, callBack, thisObj))
			{
				//被拦截掉了
				if (DEBUG)
					console.log("view.id:" + bean.id + " name:" + bean.name + " 被拦截掉了");
				return;
			}

			//目前所有的模块都是一开始初始化的，所以暂时不判断模块是否已经初始化了
			if (!bean.instance)
			{
				bean.isOpen = true;
				//重新实例化
				if (callBack)
					new InitView(true, bean, asf.CallBack.create(callBack, thisObj, null, true), param);
				else
					new InitView(true, bean, null, param);
				return;
			}
			//没强制显示，则进行是否存在判断
			if (!isEnforce && this.$viewHanlder.hasView(bean))
			{
				//关闭掉
				bean.instance.close();
				return;
			}
			bean.instance.openFlag = true;//wangning
			bean.openView(param);
			//直接打开view并且add到舞台
			asf.FuncUtils.execute(callBack, thisObj);
		}

		/**
		 * 获取一个view
		 * 
		 * @static
		 * @param {(number | string | Function)} view
		 * @param {*} [param]
		 * @returns {ViewBean}
		 * 
		 * @memberOf Context
		 */
		static $getView(view: number | string | Function, param?: any): IView<Object,any,any>
		{
			var bean: ViewBean = this.viewBeanMap.get(view);
			return bean.instance;
		}

		/**
		 * 关闭View对象
		 * @param view view 唯一ID、名字和构造函数之一
		 * @param isDestroy 是否销毁界面，默认是false
		 */
		static $closeView(view: IView<Object,any,any>): void
		{
			var bean: ViewBean = this.viewBeanMap.get(MvcUtils.getViewKey(view));
			if (!bean)
			{
				console.info("closeView关闭失败");
				throw new Error(view + "Context.$closeView方法必须通过MvcReg进行注册");
			}
			bean.instance.openFlag = false;//wangning
			this.$viewHanlder.delView(bean);
		}
		/**
		 * 不推荐使用。添加一个view实例，并且显示出来,这里一般是不走框架配置的view才在这里添加的.
		 * 如果传了helper和module实例，3者是会自动进行依赖注入的。
		 * @param view view实例
		 * @param helper 跟view绑定的helper对象，如果有，会自动进行相关的注入操作
		 * @param module 模块实例，如果有，会自动进行相关的注入操作
		 */
		static addView(view: IView<Object,any,any>, helpers?: IHelper<IView<Object,any,any>,any>[], module?: IModule<any>): void
		{
			//进行相关的以来注入
			if (module)
				MvcUtils.eachInject(module, view);

			if (helpers)
			{
				for (var i: number = 0; i < helpers.length; i++)
				{
					//进行关系注入
					MvcUtils.eachInject(view, helpers[i]);
					if (module)
						MvcUtils.eachInject(module, helpers[i]);
				}
			}
			//调用内容的添加方法
			this.$addView(view);
		}
		/**
		 * mvc框架内部添加一个view实例，并且显示出来(调用view的open方法)
		 */
		static $addView(view: IView<Object,any,any>): void 
		{
			var bean: ViewBean = this.viewBeanMap.get(MvcUtils.getViewKey(view));
			if (!bean)
			{
				//没有bean对象，表示没有走mvc框架的模块注册,第一次，自动生成一个ViewBean对象来存放
				bean = new ViewBean(view, MvcUtils.createConfig(view, ViewConfig));
				bean.name = view.name;
				this.viewBeanMap.put(view.name, bean);
				if (view.id && view.id != 0)
					this.viewBeanMap.put(view.id, bean);
			}
			bean.instance = view;
			this.$viewHanlder.addView(bean);
		}

		/**
		 * 移除掉view实例，从显示列表中删除
		 * @param view
		 */
		static $removeView(view: IView<Object,any,any>, module?: IModule<any>): void
		{
			var bean: ViewBean = this.viewBeanMap.get(MvcUtils.getViewKey(view));
			if (!bean)
			{
				console.error(view.name + "$removeView删除失败");
				return;
			}

			// asf.Assert.notNull(bean, view + "没有添加进入来，不能进行删除");
			this.$viewHanlder.delView(bean);
		}

		/**
		 * 直接通过框架启动一个View，可以配置view以及相关helper
		 * @param view
		 * @param viewConfig
		 * @param helpers
		 */
		static startView(view: Function, viewConfig?: ViewConfig, ...helpers): void
		{
			var viewBean: ViewBean = Context.$getViewBean(view);
			//如果已经存在，不在进行打开处理
			if (!viewBean)
			{
				//自动进行注册
				viewBean = MvcReg.regView(view);
				if (helpers && helpers.length > 0)
				{
					for (let i: number = 0; i < helpers.length; i++)
					{
						MvcReg.regHelper(view, helpers[i]);
					}
				}
			}
			//实例存在
			if (viewBean.instance)
			{
				//没打开，进行打开
				if (!viewBean.instance.isOpen)
					viewBean.instance.open();
			}
			else
			{
				//立刻进行初始化view
				new InitView(true, viewBean);
			}
		}

		/**
		 * 启动整个框架，会负责初始化
		 * @param complete 完成启动后的回调函数
		 */
		static startup(containers: Object, callBack: Function, thisObj: Object): void
		{
			new StartupCore(this.moduleBeanMap, this.viewBeanMap,
				asf.CallBack.create(callBack, thisObj)).startup();
		}
	}
}