/**
 * @MvcUtils.ts
 * @author sodaChen mail:asframe#qq.com
 * @version 1.0
 * <br> Copyright (c) 2012-present, asframe.com
 * <br>Program Name:ASFrameTS
 * <br>Date:2017/2/13
 */
namespace mvc
{
    /**
     * mvc框架的工具方法集合,主要是处理view、helper、module公共的处理方法
     * @author sodaChen
     * Date:2017/2/13
     */
    export class MvcUtils
    {
        /**
         * 注册的时候添加固有的ID和NAME
         * @param map 存放bean的集合
         * @param clazz 构造函数实例
         * @param bean bean结构
         * @param isView 是否为view的构造函数
         */
        static regIdName(map:asf.IMap<any,any>,clazz:Function,bean:BasicBean<any,any>,isView:boolean):void
        {
            //检测固定静态名字"NAME"，并且存放起来
            if(clazz.hasOwnProperty("NAME"))
            {
                //名字自动变为首字母小写
                clazz["NAME"] = asf.StringUtils.uncapitalize(clazz["NAME"]);
                bean.name = clazz["NAME"];
                if(map)
                {
                    //如果名字相同，抛出异常，应该是重复注册，或者别的模块名了一样的名字
                    if(map.hasKey(bean.name))
                        throw new Error(bean.name + "已经注册过，出现相同名字！" + clazz);
                    map.put(bean.name,bean);
                }

                //生成openView
                if(isView)
                    bean["OPEN_VIEW"] = "open" + asf.StringUtils.capitalize(clazz["NAME"]);
            }
            if(clazz.hasOwnProperty("ID"))
            {
                bean.id = clazz["ID"];
                if(map)
                {
                    if(map.hasKey(bean.id))
                    {
                        throw new Error(map.get(bean.id)["name"] + "已经注册过，出现相同ID！" + clazz + " class2:" + clazz);
                    }
                    map.put(bean.id,bean);
                }

            }
        }

        /**
         * 设置mvc核心实例的id和name
         * @param core view、helper、module之一的实例
         * @param bean 对应的bean结构
         */
        static setIdName(core:IBasicCore<any>,bean:BasicBean<any,any>):void
        {
            if(bean.name && bean.name != "")
                if(!core.name || core.name == "")
                    core.name = bean.name;
            if(bean.id && bean.id != 0 && core.id == 0)
                core.id = bean.id;
        }
        static createCore(bean:BasicBean<BasicConfig,IBasicCore<any>>):any
        {
            var core:IBasicCore<any> = new bean.clazz();
            //这里名字复制有点奇快，主要是实例的名字复制给bean
            if(core.name)
            {
                if(!bean.name || bean.name == "")
                    bean.name = core.name;
            }
            bean.instance = core;
            return core;
        }

        /**
         * 获取能找到ViewBean的唯一Key
         * @param view view实例
         * @returns {any} id或者名字或者class（构造函数）
         */
        static getViewKey(view:IView<Object,any,any>):number | string | Function
        {
            if(view.id && view.id != 0)
                return view.id;
            else if(view.name && view.name != "")
                return view.name;
            else
                return asf.ClassUtils.forInstance(view);
        }
        /**
         * mvc对象互相注入
         * @param view
         * @param helper
         * @param module
         */
        static mvcInject(view:IView<Object,any,any>,helper:IHelper<IView<Object,any,any>,any>,module?:IModule<any>):void
        {
            //查看是否有view的引用，有的话，则自动注入,固定名字，helper类名称
            //heper注册view对象，如果有约定命名的话
            this.eachInject(view,helper);
            //有模块则注入模块
            if(module)
            {
                this.eachInject(view, module);
                this.eachInject(helper, module);
            }
        }
        /**
         * 模块的注入
         */
        static createModel(modelClass):IModel
        {
            let model:IModel = new modelClass();
            if(model["init"])
					model.init();
            //注入到DB管理器中
            let mName:string = modelClass["NAME"];
            if(Context.$dbClass && mName)
            {
                mName = asf.StringUtils.uncapitalize(mName);
                Context.$dbClass[mName] = model;
            }
            return model;
        }

        /**
         * 两个对象互相自动注入属性
         * @param core1
         * @param core2
         */
        static eachInject(core1:IBasicCore<any>,core2:IBasicCore<any>):void
        {
            if(core1.hasOwnProperty(core2.name))
                core1[core2.name] = core2;
            if(core2.hasOwnProperty(core1.name))
                core2[core1.name] = core1;
        }

        /**
         * 根据实例创建对应的配置文件对象
         * @param core 核心对象
         * @param confClass 配置类的构造函数
         * @returns {any} 配置实例
         */
        static createConfig(core:IBasicCore<any>,confClass:any):any
        {
            var config:any;
            //取得实例自带的配置对象
            var tempC:Object = core.config;
            if(tempC)
            {
                //直接是配置对象本身
                if(tempC instanceof confClass)
                    config = tempC;
                else
                {
                    //创建新实例，并复制实例的配置参数
                    config = new confClass();
                    MvcUtils.copyConfig(core,config);
                }
            }
            return config;
        }
        static copyConfig(core:IBasicCore<any>,config:BasicConfig):void
        {
            var tempC:Object = core.config;
            if(tempC)
            {
                for(var name in tempC)
                {
                    // if(config[name] == null || config.resList)
                    //     throw new Error(core + "配置的Config的" + name + "属性设置错误。没有参考对应的Config的属性配置");
                    //重置ViewConfig的属性值
                    config[name] = tempC[name];
                }
            }
        }
    }
}