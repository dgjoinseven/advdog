/**
 * @(#)ViewBean.as
 * @author soda.C
 * @version  1.0
 * <br>Copyright (C), 2007 soda.C
 * <br>This program is protected by copyright laws.
 * <br>Program Name:DoEasy
 * @data 2008-1-10
 */
namespace mvc
{
	/**
	 * View的数据结构
	 * @author soda.C
	 * Date:2008-1-10
	 */
	export class ViewBean extends BasicBean<ViewConfig, IView<Object,any,any>>
	{
		/** 框架生成的固定相应，打开view时调用module的方法 **/
		OPEN_VIEW: string;
		
		/** 自身的数据模块实力 */
		selfDB:IModel;
		/** 数据对象 */
        dbClass:any;
		/** 正在加载资源中 **/
		isLoading: boolean;
		// openParam:any;
		moduleBean: ModuleBean;
		// moudle:IModule;
		helperBeans: Array<HelperBean> = new Array<HelperBean>();
		helperMap: asf.Dictionary<string, IHelper<IView<Object,any,any>,any>>;
		/** 存放view数据的集合 **/
		viewBeanMap: asf.Dictionary<number | string | Function, ViewBean>;
		/**记录这个面板的开关状态 */
		isOpen: boolean = false;

		public constructor(clazz: any, config: ViewConfig)
		{
			super(clazz, config);
			this.helperBeans = [];
			this.helperMap = new asf.Dictionary<string, IHelper<IView<Object,any,any>,any>>();
		}

		/**
		 * 打开view界面
		 * @param param
		 */
		openView(param: any): void
		{
			let canOpen: boolean = true;
			if (this.moduleBean != null)
			{
				let module: IModule<any> = this.moduleBean.instance;
				//尝试自动注入到模块里面去
				if (module.hasOwnProperty(this.name))
					module[this.name] = this.instance;
				//优先检测独特view的算法
				if (module[this.OPEN_VIEW])
				{
					canOpen = module[this.OPEN_VIEW](this.instance);
				}
				else if (module["openView"])
				{
					//调用模块固有监听打开界面的方法
					canOpen = module["openView"](this.instance);
				}
			}
			//能否打开，则进行打开事件，如果没有返回值，则默认为可打开
			if (canOpen || canOpen == null)
			{
				this.instance.open(param);
				if (this.helperBeans != null && this.helperBeans.length > 0)
				{
					for (var i: number = 0; i < this.helperBeans.length; i++)
					{
						if (this.helperBeans[i].instance)
						{
							this.helperBeans[i].instance.viewOpen();
						}
					}
				}
			}
		}
	}
}