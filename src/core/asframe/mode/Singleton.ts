/**
 * @Singleton.as
 *
 * @author sodaChen mail:asframe@qq.com
 * @version 1.0
 * <br>Copyright (C), 2010-2016 asFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:ASFrame
 * <br>Date:2012-10-29
 */
namespace asf
{
	/**
	 * 所有单例的基类，做了单例的基础检查。所有子类最好都写一个getInstance的静态方法来获取
	 * @author sodaChen
	 * Date:2012-10-29
	 */
	export class Singleton implements IDestory
	{
		/** 存放初始化过的构造函数 **/
		private static classMap: Dictionary<any, Object> = new Dictionary();

		constructor()
		{
			var clazz: any = clazz = ClassUtils.forInstance(this);
			//为空时，表示浏览器不支持这样读取构造函数
			if (!clazz)
				return;
			// 防止重复实例化
			if (Singleton.classMap.hasKey(clazz))
				throw new Error(this + " 只允许实例化一次！");
			else
				Singleton.classMap.put(clazz, this);
		}
		// 注意，Singleton是要替换成你自己实现的子类 这里没有实际的作用
		// private static instance:Singleton;
		// /**
		//  * 获取实例的静态方法实例
		//  * @return
		//  *
		//  */
		// public static getInstance():Singleton
		// {
		// 	if(this.instance == null)
		// 	{
		// 		this.instance = new Singleton();
		// 	}
		// 	return this.instance;
		// }

		/**
		 * 销毁方法。事实上单例是很少进行销毁的
		 */
		destroy(o: any = null): void
		{
			Singleton.classMap.remove(this["constructor"]);
			this.onDestroy();
		}
		protected onDestroy(): void
		{

		}
		/**
		 * 删除单例的实例（不对单例本身做任何的销毁，只是删除他的引用）
		 * @param clazz 单例的Class对象
		 *
		 */
		static removeInstance(clazz: any): void
		{
			this.classMap.remove(clazz);
		}
		/**
		 * 获取单例类，若不存在则创建.所有的单例创建的时候，都必须使用这个方法来创建，这样可以做到统一管理单例
		 * @param clazz	任意需要实现单例效果的类
		 * @return
		 *
		 */
		static getInstanceOrCreate(clazz: any): any
		{
			var obj: any = this.classMap.get(clazz);
			if (!obj)
			{
				obj = new clazz();
				//不是Singleton的子类，则手动添加Singleton构造器会自动添加到classMap
				if (!(obj instanceof Singleton))
					this.classMap.put(clazz, obj)
			}
			return obj;
		}
	}
}