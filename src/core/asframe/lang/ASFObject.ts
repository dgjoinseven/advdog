/**
 * @ASFrame.ts
 *
 * @author sodaChen mail:asframe#qq.com
 * @version 1.0
 * <br>Copyright (C), 2012-present ASFrame.com
 * <br>This program is protected by copyright laws.
 * <br>Program Name:Collections
 * <br>Date:2012-1-7
 */
namespace asf
{
	/**
	 * @private
	 * 哈希计数，全局使用，外部不可更改
	 */
	export let $hashCount:number = 1;


	/**
	 * @language zh_CN
	 * Egret顶级对象。框架内所有对象的基类，为对象实例提供唯一的hashCode值。
	 * @version Egret 2.4
	 * @platform Web,Native
	 */
	export class ASFObject implements IHashObject,ICloneable
	{
		/**
		 * @private
		 */
		_hashCode: number;

		/**
		 * @language zh_CN
		 * 创建一个 HashObject 对象
		 * @version Egret 2.4
		 * @platform Web,Native
		 */
		public constructor() {
			this._hashCode = $hashCount++;
		}

		/**
		 * @language zh_CN
		 * 返回此对象唯一的哈希值,用于唯一确定一个对象。hashCode为大于等于1的整数。
		 */
		public get hashCode(): number
		{
			return this._hashCode;
		}

		// public equals(object:ASFObject):boolean
		// {
		// 	return this._hashCode == object.hashCode;
		// }
        //
		// public getClass():Object
		// {
		// 	return ASFObject;
		// }
		public clone():any
		{
			return new ASFObject();
		}
	}
}

