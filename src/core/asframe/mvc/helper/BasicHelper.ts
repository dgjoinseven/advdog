/**
 * @BasicHelper.as
 *
 * @author sodaChen mail:asframe@qq.com
 * @version 1.0
 * <br>Copyright (C), 2010-2016 asFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:DoEasy
 * <br>Date:2016-5-24
 */
namespace mvc
{
	/**
	 * Helper的基础对象
	 * @author sodaChen
	 * Date:2016-5-24
	 */
	export class BasicHelper<V extends IView<Object,D,any>,D> extends BasicCore<D> implements IHelper<V,D>
	{
		/** helper指定的唯一辅助view对象 **/
		/**
		 * 设置控制的显示对象。框架底层自动调用，一般也是框架内部使用，外部推荐使用直接声明相关View的属性
		 * @param view 实现了View接口的实例
		 */
		view:V;

		constructor(name?:string)
		{
			super(name);
		}
		viewOpen():void
		{

		}
		viewClose():void
		{

		}
		// onDestroy():void
		// {
			//view对象是需要清掉的，有可能view有可能是会重新初始化
			// mView = null;
//			//判断该实例是否需要释放
//			if(_bean.v)
//				return ;
// 			onDestroy();

			// //清空掉嵌入的模块和view对象(module和helper接口的对象)
			// var length:int = _bean.type.variables.length;
			// var variable:Variable = null;
			// for (var i:int = 0; i < length; i++)
			// {
			// 	variable = _bean.type.variables[i];
			// }
		// }
	}
}