/**
 * @Assert.as
 * 
 * @author sodaChen mail:asframe#163.com
 * @version 1.0
 * <br>Copyright (C), 2012 ASFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:Collections
 * <br>Date:2012-1-7
 */
namespace asf
{
	/**
	 * 断言对象 
	 * @author sodaChen
	 * 
	 */	
	export class Assert
	{
		/**
		 * 断言值是为<code>true</code>.
		 * <pre class="code">Assert.isTrue(value, "该表达式必须是为真");</pre>
		 * @param expression 一个布尔值表达式
		 * @param message 当表达式不对时给出的提示信息
		 * @param isThrowError 是否抛出异常，默认为false。传true时抛出异常
		 */
		static isTrue(expression:boolean, message:string = ""):void 
		{
			if (!expression) 
			{
				this.isThrowIllegalArgumentError(message,"[Assert.isTrue] - 该表达式必须是为真。");
			}
		}
		
		/**
		 * 断言该对象不为 <code>null</code>.
		 * <pre class="code">Assert.notNull(value, "参数不能为空");</pre>
		 * @param object 检测对象
		 * @param message 错误时的提示信息
		 * @param isThrowError 是否抛出异常，默认为false。传true时抛出异常
		 * @throws com.asframe.lang.error.IllegalArgumentError 如果表达式的值为<code>null</code>
		 */
		static notNull(object:Object, message:string = ""):void 
		{
			if (!object)
			{
				this.isThrowIllegalArgumentError(message,"[Assert.notNull] - 参数不能为空。");
			}
		}
		/**
		 * 断言该对象是属于type类
		 * <pre class="code">Assert.isInstanceOf(value, type, "vlaue必须type类或者他的子类");</pre>
		 * @param object 检测对象
		 * @param message 错误时的提示信息
		 * @param isThrowError 是否抛出异常，默认为false。传true时抛出异常
		 * @throws com.asframe.lang.error.IllegalArgumentError 如果value不属于type时抛出
		 */
		static isInstanceOf(object:any, type:any, message:string = ""):void
		{
			// if(!(object is type))
			// {
			// 	isThrowIllegalArgumentError(message,"[Assert.isInstanceOf] - vlaue必须type类或者他的子类。");
			// }
		}
		/**
		 * 检测对象是否为抽象类，抽象是不能进行实例化的 
		 * @param object
		 * @param clazz
		 * 
		 */		
		static isAbstractClass(object:Object,clazz:string):void
		{
			// if (getQualifiedClassName(object) == clazz)
			// {
			// 	throw new AbstractClassError(clazz + "是抽象类，不能实例化!");
			// }
		}
		/**
		 * 是否索引越界了，小于等0或者i大于等于len 
		 * @param i
		 * @param len
		 * @param message
		 * 
		 */		
		static isIndexOutOfBounds(i:number, len:number,message:string = ""):void
		{
			if (i < 0 || i >= len)
			{
				throw new Error(message + "越界了，传入的是:" + i + "，实际长度是:" + len);
			}
		}
		
		private static isThrowIllegalArgumentError(message:string,defMessage:string):void
		{
			if (!message || message.length == 0)
			{
				message = defMessage;
			}
			throw new Error(message);
		}
	}
}
