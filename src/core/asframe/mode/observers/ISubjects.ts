/**
 * @INotifys.as
 *
 * @author sodaChen mail:sujun10@qq.com
 * @version 1.0
 * <br>Program Name:ASFrame
 * <br>Date:2016-9-19
 */
namespace asf
{
	/**
	 * 主题集合对象，发起通知器，可以代替AS3自带的事件派发器
	 * @author sodaChen
	 * #Date:2016-9-19
	 */
	export interface ISubjects
	{
		/**
		 * 发起一个通知事件
		 * @param notice 通知名称
		 * @param param 参数数组
		 */
		notice(notice:string | number,param?:Array<any>):void;
		/**
		 * 发起一个通知
		 * @param notice 通知
		 * @param args 观察者接受的参数
		 */
		send(notice:string | number,...args):void;
		/**
		 * 添加一个观察者通知
		 * @param notice 通知名称
		 * @param listener 通知监听函数
		 *
		 */
		on(notice:string | number,listener:Function,thisObj:Object):NoticeData;
		/**
		 * 添加一个观察者到指定通知的主题中
		 * @param notcie 指定的通知
		 * @param observer 观察者接口
		 * @param thisObj listener的类对象
		 */
		onObserver(notice:string | number,observer:IObserver,isOnce:boolean):NoticeData;
		/**
		 * 删除一个观察者通知
		 * @param notice 通知名称
		 * @param listener 删除指定监听函数
		 *
		 */
		off(notice:string | number,listener:Function,thisObj:Object):void;
		/**
		 * 清除多个监听，不传thisObj时，表示清除所有的监听，否则只清除thisObj方法的on
		 * @param thisObj
		 */
		offs(thisObj?:Object):void;
		/**
		 * 根据指定通知删除一个观察者
		 * @param notice 指定的通知
		 * @param observer 观察者接口
		 *
		 */
		offObserver(notice:string | number,observer:IObserver):void
		/**
		 * 监听主题，只监听一次
		 * @param notice 通知
		 * @param listener 监听函数
		 * @param thisObj listener的类对象
		 */
		once(notice:string | number,listener:Function,thisObj:Object):NoticeData;
	}
}