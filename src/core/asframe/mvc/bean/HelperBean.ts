/**
 * @MediatorBean.as
 *
 * @author sodaChen mail:asframe#163.com
 * @version 1.0
 * <br>Copyright (C), 2010 asFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:AStruts2
 * <br>Date:2012-4-9
 */
namespace mvc
{
	/**
	 * HelperBean的相关配置信息
	 * @author sodaChen
	 * Date:2012-4-9
	 */
	export class HelperBean extends BasicBean<HelperConfig,IHelper<IView<Object,any,any>,any>>
	{
		// /** 感兴趣主题数组 **/
		// public notices			:Array;
		// /** 存放事件名称和类型的绑定 **/
		// public noticeTypes		:Dictionary;
		/** 绑定的View结构数据 **/
		viewBean				:ViewBean;

		// public function HelperBean(clazz:Class)
		// {
		// 	this.clazz = clazz;
		// 	notices = [];
		// 	noticeTypes = new Dictionary();
		// }
		constructor(clazz:Function,config:HelperConfig,viewBean:ViewBean)
		{
			super(clazz,config);
			this.viewBean = viewBean;
		}
	}
}
