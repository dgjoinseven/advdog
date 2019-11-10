/**
 * @ASFrameSession.as
 *
 * @author sodaChen mail:asframe@qq.com
 * @version 1.0
 * <br>Copyright (C), 2013 ASFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:ASFrame
 * <br>Date:2013-8-22
 */
namespace asf
{
	/**
	 * ASFrame框架的共享对象(ASFrameSession)，一些需要跨框架使用的实例，一般存放在这里。
	 * 需要对框架的一些默认实现时，可以覆盖这里的接口对象。
	 * 一般可以通过动态设置这里属性，达到调节框架性能的目的。
	 * @author sodaChen
	 * #Date:2013-8-22
	 */
	export class ASF
	{
		/**
		 * 资源解析的时间，指的是在一帧的时间里，可以用多少时间来进行解析资源（默认是15毫秒）
		 * 注意，解析时间消耗多，则会影响其他程序运行，有可能会掉帧。时间少，解析又慢。
		 * 可以根据实际情况来动态调节这个值。
		 **/
		static resParseTime:number = 15;
		/**
		 * 共享池的引用完毕之后的延迟销毁时间。默认是30秒
		 * @see com.asframe.share.SharingPool
		 */
		static sharingPoolDelay:number = 30000;
		/** 是否启动共享缓存策略（一般用于工具开发） **/
		static isResSharing:Boolean = true;
		/** 是否使用内存缓存二进制字节 **/
		static isCacheBytes:Boolean = true;
	}
}
