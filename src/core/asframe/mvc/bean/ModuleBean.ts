/**
 * Created by soda on 2017/1/27.
 */
namespace mvc
{
    export class ModuleBean extends BasicBean<ModuleConfig,IModule<any>>
    {
        /** 自身的数据模块实力 */
		selfDB:IModel;
        /** 数据对象 */
        dbClass:any;
        // /** 模块实例对象 **/
        // module:IModule;
        viewBeans:Array<ViewBean>;
        constructor(clazz:any,config?:ModuleConfig)
        {
            super(clazz,config);
            this.viewBeans = [];
        }
    }
}