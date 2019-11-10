/**
 * Created by soda on 2017/2/2.
 */
namespace mvc
{
    export class ModuleConfig extends BasicConfig
    {
        constructor()
        {
            super();
            //模块默认全部是自动启动
            this.lazy = false;
        }
    }
}
