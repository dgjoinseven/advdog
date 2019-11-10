/**
 * @Startup.as
 *
 * @author sodaChen mail:sujun10#21cn.com
 * @version 1.0
 * <br>Copyright (C), 2013 asFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:DoEasy
 * <br>Date:2016-5-29
 */
namespace mvc
{
	/**
	 * 启动框架的核心部分，只有刚开始启动框架时才会初始化
	 * @author sodaChen
	 * Date:2016-5-29
	 */
	export class StartupCore
	{
		moduleMap: asf.Dictionary<string | Function, ModuleBean>;
		viewMap: asf.Dictionary<number | string | Function, ViewBean>;
		complete: asf.CallBack;
		isStartup: boolean;
		moduleCount: number;

		constructor(moduleMap: asf.Dictionary<string | Function, ModuleBean>,
			viewMap: asf.Dictionary<number | string | Function, ViewBean>,
			complete: asf.CallBack)
		{
			this.moduleMap = moduleMap;
			this.viewMap = viewMap;
			this.complete = complete;
		}
		startup(): void
		{
			this.isStartup = true;
			this.moduleCount = 0;
			//遍历所有的模块，然后对需要立刻初始化的进行初始化处理
			// var module: IModule;
			var moduleBean: ModuleBean;
			var initModule: InitModule = null;
			var moduleAry: ModuleBean[] = this.moduleMap.values();
			var initDic: asf.Dictionary<Object, Object> = new asf.Dictionary();
			for (var i: number = 0; i < moduleAry.length; i++)
			{
				moduleBean = moduleAry[i];
				//默认都是lazy = false
				if (!moduleBean.config.lazy && !moduleBean.instance)
				{
					//表示已经在初始化了，主要是防止一个module里的两个view都是需要立刻初始化的
					if (initDic.hasKey(moduleBean))
						continue;
					initDic.put(moduleBean, moduleBean);
					this.moduleCount++;
					initModule = new InitModule();

					initModule.initModule(moduleBean, new asf.CallBack(this.onInitModule, this));
					// //temp
					if (asf.ObjectUtils.strNoNull(moduleBean.instance, "name"))
					// if (moduleBean.instance.name != null && moduleBean.instance.name != "")
					{
						if (!this.moduleMap.hasKey(moduleBean.instance.name))
							this.moduleMap.put(moduleBean.instance.name, moduleBean);
					}
				}
			}
			//单独处理view需要初始化的情况
			this.isStartup = false;
			if (this.moduleCount == 0)
			{
				this.startupView();
			}
		}
		onInitModule(bean: ModuleBean): void
		{
			this.moduleCount--;
			if (!this.isStartup && this.moduleCount == 0)
			{
				this.startupView();
			}
		}
		// finishModule():void
		// {
		//
		// }
		startupView(): void
		{
			this.isStartup = true;
			this.moduleCount = 0;
			//遍历所有的view，然后对需要立刻初始化的进行初始化处理
			var initDic: asf.Dictionary<Object, Object> = new asf.Dictionary();
			//这里有个问题，只检测模块的lazy，但是有些view是设置lazy = false的，目前是无法处理，得优化处理
			var views: Array<ViewBean> = this.viewMap.values();
			var bean: ViewBean;
			for (var i: number = 0; i < views.length; i++)
			{
				bean = views[i];
				//延迟初始化
				if (bean.config.lazy)
					continue;

				if (bean.instance)
					continue;

				//已经初始化过的
				if (initDic.hasKey(bean))
					continue;
				initDic.put(bean, bean);
				this.moduleCount++;
				new InitView(false, bean, asf.CallBack.create(this.onInitView, this, true))
			}
			//处理view需要初始化的情况
			//单独处理view需要初始化的情况
			this.isStartup = false;
			if (this.moduleCount == 0 && this.complete)
			{
				this.finish();
			}
			else
			{
				asf.Global.addRef(this);
			}
		}
		onInitView(bean: Object): void
		{
			this.moduleCount--;
			if (!this.isStartup && this.moduleCount == 0)
			{
				this.finish();
			}
		}
		finish(): void
		{
			this.complete.execute();
			this.complete = null;
			//自我删除全局引用
			asf.Global.removeRef(this);
		}
	}
}