/**
 * @InitView.as
 *
 * @author sodaChen mail:asframe@qq.com
 * @version 1.0
 * <br>Copyright (C), 2010-2016 asFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:DoEasy
 * <br>Date:2016-5-30
 */
namespace mvc
{
	/**
	 * 初始化界面的类
	 * @author sodaChen
	 * Date:2016-5-30
	 */
	export class InitView implements IReser
	{
		viewBean: ViewBean;
		callBack: asf.CallBack;
		view: IView<Object,any,any>;
		/** 是否打开当前view **/
		isOpen: boolean;
		/** view打开的时候传递的参数 **/
		openParam: any;
		urlPaths: Array<String>;

		private resLoader: IResLoader;

		constructor(isOpen: boolean, viewBean: ViewBean, callBack?: asf.CallBack, openParam?: any)
		{
			this.viewBean = viewBean;
			this.callBack = callBack;
			this.isOpen = isOpen;
			this.openParam = openParam;
			this.view = MvcUtils.createCore(viewBean);
			this.view.openFlag = true;//wangning
			//Context监听界面的销毁事件
			this.view.once(MvcConst.VIEW_DESTORY, Context.$destroyViewEvent, Context);
			MvcUtils.setIdName(this.view, viewBean);
			//对名字和viewid进行注册
			if (this.view.name && this.view.name != "" && !viewBean.viewBeanMap.hasKey(this.view.name))
			{
				//处理没有NAME的情况
				if (!viewBean.OPEN_VIEW)
				{
					viewBean.name = this.view.name;
					//名字的首字母变大写
					viewBean.OPEN_VIEW = "open" + asf.StringUtils.capitalize(this.view.name);
				}
				viewBean.viewBeanMap.put(this.view.name, viewBean);
			}
			//存进集合中
			if (!this.view.id && this.view.id != 0 && !viewBean.viewBeanMap.hasKey(this.view.id))
				viewBean.viewBeanMap.put(this.view.id, viewBean);

			let selfDB:IModel;
			var moduleBean: ModuleBean = viewBean.moduleBean;
			if (moduleBean)
			{
				let module: IModule<any> = moduleBean.instance;
				//模块注入view实例
				if (module.hasOwnProperty(this.viewBean.name))
					module[this.viewBean.name] = this.view;
				//view注入模块对象
				if (this.view.hasOwnProperty(moduleBean.name))
					this.view[moduleBean.name] = module;
				//设置molue
				this.view.module = module;
				//添加进模块里进行方便管理
				module.$addView(this.view);
				selfDB = moduleBean.selfDB;
			}
			//检测没有module。但是有db的情况
			if(!selfDB && viewBean.dbClass)
			{
				if(viewBean.selfDB)
					selfDB = viewBean.selfDB;
				else
				{
					selfDB = new viewBean.dbClass();
					selfDB = MvcUtils.createModel(moduleBean.dbClass);
					viewBean.selfDB = selfDB;
					// selfDB.init();
				}
			}
			if(selfDB)
				this.view.seflDB = selfDB;
			//初始化view的config
			MvcUtils.copyConfig(this.view, viewBean.config);
			viewBean.isLoading = true;
			//自动初始化或者是属于打开的界面
			if (viewBean.config.resList && viewBean.config.resList.length > 0)
			{
				this.resLoader = new Context.$resLoaderClass();
				this.resLoader.loadResList(viewBean.config.resList, this);
			}
			else
			{
				// this.hasInit();
				this.initLayoutJson();
			}
		}
		private initLayoutJson(): void
		{
			this.view.initLayoutJson(asf.CallBack.create(this.hasInit, this));
		}
		private hasInit(): void
		{
			//调用初始化方法
			this.view.init();
			if (this.viewBean.config.auto)
			{
				//没有异步，直接调用完成事件，进行相关初始化
				this.onViewComplete();
			}
			else
			{
				asf.Global.addRef(this);
				//监听完成事件(注意，有些界面如果没有加载资源，没有异步，则会立刻返回时间，得注意避免)
				this.view.once(MvcConst.VIEW_COMPLETE, this.onViewComplete, this);
			}
		}
		/**
		 * 用来接受资源加载器加载完成资源
		 * @param values 实际的资源
		 * @param urls 原来加载资源路径
		 */
		setResList(values: any[], resList: mvc.ResBean[]): void
		{
			this.resLoader.destroy();
			delete this.resLoader;
			// this.hasInit();
			this.initLayoutJson();
		}
		onViewComplete(): void
		{
			this.viewBean.isLoading = false;
			asf.Global.removeRef(this);
			//初始化对应的helper，helper一定是随着view初始化而设置的（这里有可能helper上次实例化了，目前还不做这个处理）
			var helperBean: HelperBean;
			var helperBeans: Array<HelperBean> = this.viewBean.helperBeans;
			var helper: IHelper<IView<Object,any,any>,any>;
			for (var i: number = 0; i < helperBeans.length; i++)
			{
				helperBean = helperBeans[i];
				helper = helperBean.instance;
				if (!helper)
				{
					helper = MvcUtils.createCore(helperBean);
					MvcUtils.setIdName(helper, helperBean);
					if (helperBean.clazz.hasOwnProperty("NAME"))
						this.viewBean.helperMap.put(helperBean.clazz["NAME"], helper);
				}
				//框架强制规定设置的view对象
				helper.view = this.view;

				//查看是否有view的引用，有的话，则自动注入,固定名字，helper类名称 heper注册view对象，如果有约定命名的话}
				MvcUtils.eachInject(this.view, helper);

				//具备模块数据
				if (this.viewBean.moduleBean)
				{
					// //herper注册进模块里  模块反注册到helper里面去
					MvcUtils.eachInject(helper, this.viewBean.moduleBean.instance);
				}
			}
			if (this.viewBean.helperMap.size() > 0)
			{
				//helper互相注入
				for (var j: number = 0; j < helperBeans.length; j++)
				{
					helper = helperBeans[j].instance;
					for (var key in helper)
					{
						if (this.viewBean.helperMap.hasKey(key))
						{
							helper[key] = this.viewBean.helperMap.get(key);
						}
					}
				}
			}
			//init
			for (var k: number = 0; k < helperBeans.length; k++)
			{
				helperBeans[k].instance.init();
			}

			//所有的在初始化完成之后，都会自动调用start方法。通知外部知道已经完成了全部初始化
			// if(this.viewBean.moduleBean == null || this.isOpen)
			//不具备模块的view，则马上调用start方法，否则是在模块初始化那里调用start方法(这里有可能考虑统一在这里调用start方法)
			this.view.start();

			//外部打开或者内部配置了打开的属性值
			if (this.isOpen || this.viewBean.config.open)
			{
				if (this.viewBean.instance && this.viewBean.instance.openFlag)
				{
					this.viewBean.openView(this.openParam);
				}
				// console.log(this.viewBean.name + " ==========initView open===============");
			}


			if (this.callBack)
			{
				this.callBack.execute(this.viewBean);
				delete this.callBack;
			}
		}
	}
}