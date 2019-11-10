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
	 * 主题接口对象，设定主题的唯一字符串，然后添加相应的监听。
	 * @author sodaChen
	 * #Date:2016-9-19
	 */
	export interface ISubject
	{
		/**
		 * 设置一个通知主题
		 * @param notice
		 */
		setNotice(notice:string):void;
		/**
		 * 发起一个通知
		 * @param param 参数是数字
		 */
		notice(param?:Array<any>):void;
		/**
		 * 发起一个通知
		 * @param args 观察者接受的参数
		 */
		send(...args):void;
		/**
		 * 添加一个观察者通知
		 * @param listener 通知监听函数
		 *
		 */
		on(listener:Function,thisObj:Object):void;
		/**
		 * 添加一个观察者到指定通知的主题中
		 * @param notcie 指定的通知
		 * @param observer 观察者接口
		 *
		 */
		onObserver(observer:IObserver,isOnce:boolean):void;
		/**
		 * 删除一个观察者通知
		 * @param notice 通知名称
		 * @param listener 删除指定监听函数
		 *
		 */
		off(listener:Function):void;
		/**
		 * 根据指定通知删除一个观察者
		 * @param notcie 指定的通知
		 * @param observer 观察者接口
		 *
		 */
		offObserver(observer:IObserver):void
		/**
		 * 监听主题，只监听一次
		 * @param notice
		 * @param listener
		 */
		once(listener:Function,thisObj:Object):void;
	}
}