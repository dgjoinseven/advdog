/**
 * @BasicCore.as
 *
 * @author sodaChen mail:asframe@qq.com
 * @version 1.0
 * <br>Copyright (C), 2013 asFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:DoEasy
 * <br>Date:2016-12-13
 */
namespace mvc
{
	/**
	 *
	 * @author sodaChen
	 * Date:2016-12-13
	 */
	export class BasicCore<D> extends asf.Subjects implements IBasicCore<D>
	{
		/** 额外附加数据 **/
		extra					:any;
		/** 唯一ID **/
		id						:number;
		/** 名称 **/
		name					:string;
		/** mvc内的共享数据对象 **/
		mvcSession				:MvcSession;
		/**
		 * 项目中的自身模块的数据缓存对象
		 */
		seflDB					:D;	
		/**
		 * 获取到Core的配置数据，其中属性是和CoreConfig属性保持一直，
		 * 当需要重置CoreConfig的对应属性时，则在这object里增加对应的属性
		 * @return 包含相关属性的object对象
		 *
		 * @see com.asframe.doeasy.bean.ViewConfig,ModuleConfig,HelperConfig
		 */
		config					:any;
		/** 是否已经销毁了 **/
		isDestroy				:boolean;
		/** 存放在mvc注册的通知事件，用于销毁时进行自动清除 **/
		// private $mvcNotices		:asf.ObjectMap<string | number, asf.NoticeData[]>;
		private $mvcNotices		:asf.NoticeData[];



		/**
		 * 初始化方法
		 */
		constructor(name:string)
		{
		    super();
		    //统一首字母小写
			if(name && name != "")
				this.name = asf.StringUtils.uncapitalize(name);
			this.mvcSession = MvcSession.getInstance();
		}
		/**
		 * 添加一个观察者通知。注意这里添加之后，调用销毁方法时会自动清除掉内部对他的引用。
		 * 无法手动删除，使用请注意
		 * @param notice 通知名称
		 * @param listener 通知监听函数
		 * @param thisObj 绑定的this对象
		 */
		mvcOn(notice:string | number,listener:Function,thisObj:Object):void
		{
			var result:asf.NoticeData = Context.subjects.on(notice, listener, thisObj);
			if(result)
			{
				if(!this.$mvcNotices)
					this.$mvcNotices = [];
				//添加新的
				result.notice = notice;
				this.$mvcNotices.push(result);
			}
		}
		init():void
		{

		}
		destroy(o:any = null):void
		{
			if(this.isDestroy)
				return;
			this.isDestroy = true;
			delete this.mvcSession;
			//清除所有的mvc事件引用
			if(this.$mvcNotices)
			{
				var len:number = this.$mvcNotices.length;
				var data:asf.NoticeData;
				var subjects: asf.Subjects = Context.subjects;
				for(var i:number = 0; i < len; i++)
				{
					data = this.$mvcNotices[i];
					subjects.off(data.notice,data.listener,data.thisObj);
				}
				delete this.$mvcNotices;
			}
			this.onDestroy();
		}
		onDestroy():void
		{

		}
	}
}