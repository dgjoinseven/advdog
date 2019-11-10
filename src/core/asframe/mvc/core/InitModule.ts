/**
 * @InitModule.as
 *
 * @author sodaChen mail:sujun10#21cn.com
 * @version 1.0
 * <br>Copyright (C), 2013 asFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:DoEasy
 * <br>Date:2015-6-22
 */
namespace mvc
{
	/**
	 * 初始化模块对象
	 * @author sodaChen
	 * Date:2015-6-22
	 */
	export class InitModule
	{
		/** 是否正初始化 **/
		isIniting:boolean = false;
		/** 是否正初始化完毕 **/
		isComplete:boolean = false;
		/** 初始化view的数量 **/
		viewCount:number = 0;
		/** 初始化完成的回调函数 **/
		callBack:asf.CallBack;
		// loader:LoadRes;
        /** 模块数据结构 **/
		moduleBean:ModuleBean;

		initModule(moduleBean:ModuleBean,callBack:asf.CallBack):void
		{
			this.callBack = callBack;
			this.moduleBean = moduleBean;


			//目前假设都需要立即启动
			var module:IModule<any> = MvcUtils.createCore(moduleBean);
			MvcUtils.setIdName(module,moduleBean);
			//尝试自动注入模块
			if(Context.$moduleMgrClass)
			{
				if(Context.$moduleMgrClass.hasOwnProperty(module.name))
					Context.$moduleMgrClass[module.name] = module;
			}
			//检测是否有
			if(moduleBean.dbClass)
			{
				let model:IModel = MvcUtils.createModel(moduleBean.dbClass);
				module.seflDB = model;
				//防止重复初始化
				moduleBean.selfDB = model;
				
				// //注入到DB管理器中
				// let mName:string = moduleBean.dbClass["NAME"];
				// if(Context.$dbClass && mName)
				// {
				// 	mName = asf.StringUtils.uncapitalize(mName);
				// 	Context.$dbClass[mName] = model;
				// }
			}
			//模块自己初始化
            try
            {
                module.init();
            }
            catch (e)
            {
                console.error(moduleBean.name + "initModule报错:",e);
            }
			//模块监听mvc框架全局的事件派发(主要是其他模块)
			// var notices:Array = module.getNotices();
			// if(notices != null && notices.length > 0)
			// {
			// 	for (var i:int = 0; i < notices.length; i++)
			// 	{
			// 		DoEasySession.getInstance().subjects.addObserver(notices[i],module);
			// 	}
			// }
			//生成view和helper
			this.isIniting = true;
            this.isComplete = false;
			if(this.callBack)
			{
				this.callBack.execute(moduleBean);
				this.callBack = null;
			}
			//暂时屏蔽掉资源加载了
			// if(moduleBean.resList != null && moduleBean.resList.length > 0)
			// {
			// 	Global.getInstance().addRef(this);
			// 	loader = new LoadRes();
			// 	loader.load(moduleBean.resList,onInit);
			// }
			// else
			// {
			// 	onInit();
			// }
            // this.onInit();

		}
		onInit():void
		{
		    var viewBean:ViewBean;
		    var viewBeans:Array<ViewBean> = this.moduleBean.viewBeans;
		    var len:number = viewBeans.length;
		    for(var i:number = 0; i < len; i++)
            {
                viewBean = viewBeans[i];
				//过滤掉已经初始化的view对象
				if(viewBean.instance)
					continue;
				//不延迟生成或者是打开view
				if(!viewBean.config.lazy)
				{
					this.viewCount++;
					//view监听事件是全局，所以不用担心被回收的问题
					new InitView(false,viewBean,new asf.CallBack(this.onViewComplete,this));
				}
			}
			this.isIniting = false;
			//循环结束，发现view的初始化数量已经为0了，如果还有callBack，则表示回调那里都没有执行
			if(this.viewCount == 0 && !this.isComplete)
			{
				this.initComplete(this.moduleBean);
			}
			else if(this.callBack)
			{
				asf.Global.addRef(this);
			}
		}
		onViewComplete(viewBean:ViewBean):void
		{
			this.viewCount--;
			//必须不是处于循环中(防止回调函数全部立刻执行的情况)
			if(this.viewCount == 0 && !this.isIniting)
			{
				this.initComplete(viewBean.moduleBean);
			}
		}
		initComplete(moduleBean:ModuleBean):void
		{
			if(this.isComplete)
				return ;

			this.isComplete = true;
			//调用所有的view的start方法和open方法
			// var viewBean:ViewBean;
			// var viewBeans:Array<ViewBean> = this.moduleBean.viewBeans;
			// var len:number = viewBeans.length;
			// for(var i:number = 0; i < len; i++)
			// {
			// 	viewBean = viewBeans[i];
			// 	//过滤掉没初始化的view对象
			// 	if(viewBean.instance == null)
			// 		continue;
			// 	viewBean.instance.start();
			// }

			if(this.callBack)
			{
				this.callBack.execute(moduleBean);
				this.callBack = null;
			}
			asf.Global.removeRef(this);
		}
	}
}