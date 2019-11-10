/**
 * Created by sodaChen on 2017/3/14.
 */
namespace mvc
{

    /**
     * 注册mvc框架的类
     */
    export class MvcReg
    {
        /** 存放模块的配置信息 key:name && class **/
        private static moduleBeanMap:asf.Dictionary<any,ModuleBean>;
        /** 存放view的配置信息 key:name && class **/
        private static viewBeanMap:asf.Dictionary<any,ViewBean>;
        // /** 用IView实例作key的viewBean集合 **/
        // private static viewMap:asf.Dictionary<IView<Object>,ViewBean>;
        /** 存放bean的数据结构 **/
        private static beanMap:asf.Dictionary<string,any> ;

        static init(moduleBeanMap:asf.Dictionary<any,ModuleBean>,
                    viewBeanMap:asf.Dictionary<any,ViewBean>,
                    beanMap:asf.Dictionary<any,any>):void
        {
            this.moduleBeanMap = moduleBeanMap;
            this.viewBeanMap = viewBeanMap;
            this.beanMap = beanMap;
        }

        /**
         * 注册一个Bean.Bean的Class对象会自动成为一个Key
         * @param bean
         * @param name name为空时，用Bean的Class对象作为key
         */
        static regBean(name:string,bean:any):void
        {
            this.beanMap.put(name,bean);
        }
        // static getBean(key:string):any
        // {
        //     return this.beanMap.get(key);
        // }
        // static removeBean(key:any):any
        // {
        //     return this.beanMap.remove(key);
        // }

        /**
         * 同时注册模块、View、Helper
         * @param module 模块构造函数
         * @param view view构造函数
         * @param config view的配置
         * @param helpers 多Helper的构造函数
         * @returns {ModuleConfig} 模块的配置类
         */
        static reg(module:Function,viewClass:Function, dbClass?:Function, ...helpers):ModuleConfig
        {
            var moduleConf:ModuleConfig = this.regModule(module,dbClass,viewClass);
            this.regView(viewClass,dbClass,module);
            for(var i:number = 0; i < helpers.length; i++)
            {
                if(!helpers[i])
                    continue;
                this.regHelper(viewClass,helpers[i]);
            }
            return moduleConf;
        }

        /**
         * 删除注册的模块，同时会删除相关的view和heper
         * @param module
         * @param view
         */
        static del(module:Function):void
        {
            var bean:ModuleBean = this.moduleBeanMap.remove(module);
            if(bean)
            {
                //如果有view，把所有的view给删除掉
                if(bean.viewBeans.length > 0)
                {
                    for(var i:number = 0; i < bean.viewBeans.length; i++)
                    {
                        this.delView(bean.viewBeans[i].clazz);
                    }
                }
                if(bean.instance)
                {
                    bean.instance.destroy();
                    bean.instance = null;
                }
                //进行多重删除
                if(bean.name)
                    this.moduleBeanMap.remove(bean.name);
                if(bean.id)
                    this.moduleBeanMap.remove(bean.id);
            }
        }

        /**
         * 删除注册的view以及模块
         * @param view
         */
        static delView(view:Function):void
        {
            var bean:ViewBean = this.viewBeanMap.remove(view);
            
            if(bean)
            {
                 if(bean.name)
                    this.viewBeanMap.remove(bean.name);
                if(bean.id)
                    this.viewBeanMap.remove(bean.id);
            }
                //先清除相关的helper
                // if(bean.helperBeans.length > 0)
                // {
                //     for(var i:number = 0; i < bean.helperBeans.length; i++)
                //     {
                //
                //     }
                // }
                // if(bean.instance)
                // {
                //     bean.instance.destroy();
                //     bean.instance = null;
                // }
            // }
        }

        /**
         * 只注册Module和多个View的绑定关系
         * @param clazz 模块的构造函数
         * @param config 可选，模块的配置
         * @param name 可选，模块的名字
         */
        static regModule(clazz: Function, dbClass?: Function, ...views):ModuleConfig
        {
            if(!clazz)
                throw new Error("注册module的时候，构造函数不能为空");
            // asf.Assert.notNull(clazz,"注册module的时候，构造函数不能为空");
            //先判断是否已经注册了模块了
            var moduleBean:ModuleBean = this.moduleBeanMap.get(clazz);
            if(!moduleBean)
            {
                let config = new ModuleConfig();
                moduleBean = new ModuleBean(clazz,config);
                moduleBean.dbClass = dbClass;
                //name和clazz都存放
                this.moduleBeanMap.put(clazz,moduleBean);
                //检测固定静态ID 名字"NAME"，并且存放起来
                MvcUtils.regIdName(this.moduleBeanMap,clazz,moduleBean,false);
            }
            if(views && views.length > 0)
            {
                for(var i:number = 0; i < views.length; i++)
                {
                    //注册view
                    this.regView(views[i],dbClass,clazz);
                }
            }
            return moduleBean.config;
        }

        /**
         * 注册单个View的信息
         * @param clazz view的构造函数
         * @param config view的配置信息
         * @param module 可选，module的构造函数
         * @param viewName 可选，view的名字
         */
        static regView(clazz:Function,dbClass?:Function,module?:Function):ViewBean
        {
            //检测view是否已经注册了
            var viewBean:ViewBean = this.viewBeanMap.get(clazz);
            if(!viewBean)
            {
                //生成一个默认的View配置对象
                let config = new ViewConfig();
                var viewBean:ViewBean = new ViewBean(clazz,config);
                viewBean.dbClass = dbClass;
                viewBean.viewBeanMap = this.viewBeanMap;
                this.viewBeanMap.put(clazz,viewBean);
                //检测固定静态ID 名字"NAME"，并且存放起来
                MvcUtils.regIdName(this.viewBeanMap,clazz,viewBean,true);
            }
            //绑定view和module的关系
            if(module)
            {
                var moduleBean:ModuleBean = this.moduleBeanMap.get(module);
                if(!moduleBean)
                {
                    moduleBean = new ModuleBean(module,new ModuleConfig());
                    this.moduleBeanMap.put(module,moduleBean);
                }
                //绑定相互之间的关系
                moduleBean.viewBeans.push(viewBean);
                viewBean.moduleBean = moduleBean;
            }
            return viewBean;
        }

        /**
         * 注册跟指定view绑定的helper对象
         * @param view
         * @param clazz
         * @param config
         */
        static regHelper(view:Function,clazz:Function,config?:HelperConfig):void
        {
            var viewBean:ViewBean = this.viewBeanMap.get(view);
            if(!viewBean)
                throw new Error(view + "没找到对应的ViewBean对象，请先注册View对象");
            var bean:HelperBean = new HelperBean(clazz,config,viewBean);
            //检测固定静态ID 名字"NAME"，并且存放起来
            MvcUtils.regIdName(null,clazz,bean,false);
            viewBean.helperBeans.push(bean);
        }
        static regModel():void
        {

        }
    }
}