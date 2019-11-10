/**
 * @BasicBean.as
 *
 * @author sodaChen mail:sujun10#21cn.com
 * @version 1.0
 * <br>Copyright (C), 2013 asFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:DoEasy
 * <br>Date:2015-6-28
 */
namespace mvc
{
    /**
     * 基础的存放结构
     * @author sodaChen
     * Date:2015-6-28
     */
    export class BasicBean<C extends BasicConfig,T extends IBasicCore<any>>
    {
        get instance(): T{
            return this._instance;
        }
        set instance(value: T){
            this._instance = value;
        }
        /** view的ID，由框架自动赋值(通过view、heper、module的子类的实例的构造函数的ID) **/
        id:number;
        /** view的名字，由框架自动赋值(通过view、heper、module的子类的实例的构造函数的NAME)  **/
        name				:string;
        /** 类路径 **/
        clazz			    :any;
        /** 类的描述对象 **/
        type				:Object;
        /** 是否已经初始化了 **/
        needInit			:boolean = true;
        /** 配置文件 **/
        config              :C;
//		/** 是否一直保持实例化（即不被销毁） **/
//		isKeep			:Boolean;
        /** 对应的实例对象(唯一的时候，这个值才有效) **/
        private _instance			:T;

        constructor(clazz:any,config:C)
        {
            this.clazz = clazz;
            this.config = config;
        }
    }
}