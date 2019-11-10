
/**
 * @Subjects.as
 *
 * @author sodaChen mail:sujun10@qq.com
 * @version 1.0
 * <br>Program Name:DoEasy
 * <br>Date:2016-9-7
 */
namespace asf
{
	/**
	 * 观察者主题，这里是集中多种主题
	 * @author sodaChen
	 * #Date:2016-9-7
	 */
	export class Subjects implements ISubjects
	{
		/** 存放监听函数的集合 **/
		private listenerMap: ObjectMap<string | number, NoticeList>;

		constructor()
		{
			this.listenerMap = new ObjectMap<string | number, NoticeList>();
			// //注册对象池,100灵活使用的对象，实际项目中会有大部分事件是一直监听不会删除的
			// this.listPool = asf.PoolMgr.regClass(NoticeList,100);
			// this.noticePool = asf.PoolMgr.regClass(NoticeData,500);
			// this.noticingMap = new ObjectMap<string | number, string | number>();
		}

		private addNoticeData(notice: string | number,
							  listener: Function,
							  thisObj: Object,
							  isOnce: boolean): NoticeData
		{
			if(thisObj == null)
				throw new Error("thisObj不能为空");
			let noticeList: NoticeList = this.listenerMap.get(notice);
			if (!noticeList)
			{
				//可以考虑采用对象池技术
				// noticeList = this.listPool.create();
				noticeList = new NoticeList();
				this.listenerMap.put(notice, noticeList);
			}
			let listeners: NoticeData[] = noticeList.listeners;
			let len: number = listeners.length;
			//去掉已经注册过的函数
			for (let i: number = 0; i < len; i++)
			{
				//必须监听方法和this相等才能决定是同一个监听
				if (listeners[i].listener == listener && listeners[i].thisObj == thisObj)
					return null;
			}
			//是否正在遍历中，如果正在遍历的是这个事件，则进行列表复制
			if(noticeList.isNoticing)
			{
				//重新赋值
				noticeList.listeners = listeners = listeners.concat();
			}
			//添加新的
			// let noticeData:NoticeData = new NoticeData(listener, thisObj, isOnce);
			let noticeData:NoticeData = new NoticeData(listener, thisObj, isOnce);
			listeners.push(noticeData);
			//判断是否一次的，只跑一次的预先添加到一次列表中
			if(isOnce)
			{
				if(!noticeList.onceList)
					noticeList.onceList = [];
				noticeList.onceList.push(noticeData);
			}
			return noticeData;
		}
		/**
		 * 删除一个观察者通知
		 * @param notice 通知名称
		 * @param listener 删除指定监听函数，为空则表示删除这个通知下的所有监听函数
		 *
		 */
		off(notice: string | number, listener: Function,thisObj:Object): void
		{
			let noticeList: NoticeList = this.listenerMap.get(notice);
			if(!noticeList)
				return ;
			let listeners:NoticeData[] = noticeList.listeners;
			//是否正在遍历中，如果正在遍历的是这个事件，则进行列表复制
			if(noticeList.isNoticing)
			{
				//重新赋值
				noticeList.listeners = listeners = listeners.concat();
			}
			let len: number = listeners.length;
			let data: NoticeData;
			for (let i: number = 0; i < len; i++)
			{
				data = listeners[i];
				if (data.listener == listener && data.thisObj == thisObj)
				{
					listeners.splice(i, 1);
					//因为添加的时候保证不重复了，所以找到删除之后就立马退出
					return;
				}
			}
		}
		private getObserverFun(notice: string | number, observer: IObserver): Function
		{
			let pro: string = String(notice);
			//默认是接口的通用接受通知的方法
			let listener: Function = observer.update;
			if (observer.hasOwnProperty(pro) && observer[pro] instanceof Function)
				listener = observer[pro];
			return listener;
		}
		notice(notice: string | number, params?:any[]): void
		{
			let noticeList: NoticeList = this.listenerMap.get(notice);
			if(!noticeList)
				return ;

			let listeners: NoticeData[] = noticeList.listeners;
			//函数注册的调用
			let length: number = listeners.length;
			//做个标记，防止外部修改原始数组导致遍历错误。这里不直接调用list.concat()因为dispatch()方法调用通常比on()等方法频繁。
			noticeList.isNoticing = true;
			let data: NoticeData;
			for (let i: number = 0; i < length; i++)
			{
				data = listeners[i];
				//这里如果data.listener.apply有操作这个主题，则有可能会出现data不存在的情况
				data.listener.apply(data.thisObj, params);
			}
			noticeList.isNoticing = false;
			if(noticeList.onceList)
			{
				let onceList:NoticeData[] = noticeList.onceList;
				while (onceList.length)
				{
					data = onceList.pop();
					this.off(notice,data.listener,data.thisObj);
				}
				delete noticeList.onceList; //del之后就会变为undiend
			}
			//没有监听者，则进行删除
			if(listeners.length == 0)
				this.listenerMap.remove(notice);
		}
		/**
		 * 发送一起通知
		 * @param notice 通知
		 * @param args 不定参数
		 *
		 */
		send(notice: string | number, ...args): void
		{
			this.notice(notice, args);
		}
		/**
		 * 添加一个观察者通知
		 * @param notice 通知名称
		 * @param listener 通知监听函数
		 *
		 */
		on(notice: string | number, listener: Function, thisObj:Object): NoticeData
		{
			return this.addNoticeData(notice, listener, thisObj, false);
		}
		onObserver(notice: string | number, observer: IObserver, isOnce: boolean): NoticeData
		{
			return this.addNoticeData(notice, this.getObserverFun(notice, observer), observer, isOnce);
		}

		/**
		 * 清除多个监听，不传thisObj时，表示清除所有的监听，否则只清除thisObj方法的on
		 * @param thisObj
		 */
		offs(thisObj?:Object):void
		{
			this.listenerMap.forKeyValue(function(notice:number | string,datas:asf.NoticeData[])
				{
					let len:number = datas.length;
					for(let i:number = 0; i < len; i++)
					{
						if(datas[i].thisObj == thisObj)
							//从中删除
							this.off(notice,datas[i].listener,datas[i].thisObj);
					}
				},this
			);
		}
		offObserver(notice: string | number, observer: IObserver): void
		{
			this.off(notice, this.getObserverFun(notice, observer),observer);
		}
		once(notice: string | number, listener: Function, thisObj: Object): NoticeData
		{
			return this.addNoticeData(notice, listener, thisObj, true);
		}
	}
}