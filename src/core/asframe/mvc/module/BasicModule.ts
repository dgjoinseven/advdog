/**
 * @BasicModule.as
 *
 * @author sodaChen mail:sujun10#21cn.com
 * @version 1.0
 * <br>Copyright (C), 2013 asFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:DoEasy
 * <br>Date:2015-6-20
 */
namespace mvc
{
	/**
	 * 基础模块，大部分模块都应该继承这个基类，实现了一些基本和简单的功能
	 * @author sodaChen
	 * Date:2015-6-20
	 */
	export class BasicModule<D> extends BasicCore<D> implements IModule<D>
	{
		isTakeServer:boolean;
		/** 具有的view列表 **/
		mViews			:IView<Object,D,any>[];

		constructor(name?:string)
		{
			super(name);
			this.mViews = [];
		}
		/**
		 * 模块的启动方法，框架内部调用的方法。响应这个方法的时候，表示系统所有已经init的模块都准备好了
		 * 可以直接调用其他模块
		 * 子类需要出的话，在这里进行覆盖重写
		 */
		start():void
		{

		}
		/**
		 * 拉取服务器数据
		 */
		takeServer():void
		{
			
		}
		/**
		 * 添加一个View的实例，这个主要是让用户手动初始化view和helper实例对象
		 * @param view 实现IView接口的对象
		 * @param helper 辅助view对象的helper，可多个helper
		 */
		$addView(view:IView<Object,any,any>):void
		{
			if(this.mViews.indexOf(view) != -1)
				throw new Error("不能添加重复的view");
			this.mViews.push(view);
			view.once(MvcConst.VIEW_DESTORY,this.viewDestroyEvent,this);
			// //添加到context中
			// Context.addView(view,helpers,this);
		}

		/**
		 * view的销毁事件
		 * @param view
		 */
		private viewDestroyEvent(view:IView<Object,any,any>):void
		{
			asf.ArrayUtils.removeItem(this.mViews,view);
			//清除module对view的引用
			if(this[view.name])
				this[view.name] = null;
			// var value:any;
			// //检测是否有相关引用
			// for(var pro in this)
			// {
			// 	value = this[pro];
			// 	if(value == view)
			// 	{
			// 		this[pro] = null;
			// 	}
			// }
		}
		// /**
		//  * 删除view对象
		//  * @param view
		//  */
		// private removeView(view:IView<Object>,isRemoveRef:boolean = false):void
		// {
		// 	asf.ArrayUtils.removeItem(this.mViews,view);
		// 	//检测是否有相关引用
		// 	if(isRemoveRef)
		// 	{
		// 		for(var pro in this)
		// 		{
		// 			if(this[pro] == view)
		// 			{
		// 				this[pro] = null;
		// 			}
		// 		}
		// 	}
		// }

		/**
		 * 关闭当前模块的所有界面
		 */
		closes():void
		{
			let len =  this.mViews.length;
			for(var i:number = len-1; i >=0; i--)
			{
				this.mViews[i].close();
			}
		}
		destroy(o:any = null)
		{
			//这里之所以复制出数组，是因为view的close方法会对mViews数组进行操作
			var tempAry:IView<Object,any,any>[] = this.mViews.concat();
			for(var i:number = 0; i < tempAry.length; i++)
			{
				if(!tempAry[i].isDestroy)
					tempAry[i].destroy();
			}
			super.destroy(o);
			delete this.mViews;
		}
	}
}