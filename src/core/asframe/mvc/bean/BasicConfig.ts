/**
 * @BasicConfig.as
 *
 * @author sodaChen mail:sujun10@qq.com
 * @version 1.0
 * <br>Program Name:DoEasy
 * <br>Date:2016-9-8
 */
namespace mvc
{
    /**
     * 基础配置信息，包含view、helper以及moduleads
     */
    export class BasicConfig
    {
        /** 唯一ID **/
        id: number = 0;
        /** 是否延迟初始化 **/
        lazy: boolean = true;
        /** 是否一直保持实例化（即不被销毁） **/
        keep: boolean = false;
        /**
         *是否销毁
         */
        destroy: boolean = true;
        /** 资源列表 **/
        resList			    :ResBean[];
    }
}