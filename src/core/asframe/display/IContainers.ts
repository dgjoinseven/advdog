namespace asf
{
	/**
	 * 显示对象容器接口，主要用途是被其他显示对象接口集成，这里只提供公共和基础的功能
	 *
	 * @author soda.chen
	 *
	 */
	export interface IContainers extends IDestory
	{
		isEmptyContainer(layer:string):Boolean;
		/**
		 * 根据数组初始化容器
		 * @param constainerNames
		 */
		setContainers(constainerNames:string[]):void;
		/**
		 * 增加一个容器
		 */
		addContainer(constainerName:string, container:egret.Sprite, depth:number):void;
		/**
		 * 获取一个容器
		 * @param constainerName
		 * @return
		 *
		 */
		getChildContainer(constainerName:string,isEmptyCreate:boolean):egret.Sprite;
		/**
		 * 删除容器
		 */
		removeContainer(constainerName:string):egret.Sprite;
		// /**
		//  * 从新对容器进行排序
		//  */
		// orderContainer(constainerNames:string[]):void;
		/**
		 * 添加一个显示对象到指定的容器中，说明该对象在该容器里的深度.深度只有三种情况(最后一个后面，始终最上层，始终最下层)
		 * (注意如果设置多个始终的child，最后一个中总会覆盖前面一个),默认是添加到子容器的最后一个
		 * @see com.asframe.engine.CoreConstants
		 * @param containerName	:指定的容器名称
		 * @param child			:添加的显示对象
		 * @param depth			:深度
		 * @return 				:返回child在该容器中的实际深度
		 *
		 */
		addContainerChild(containerName:string,child:egret.DisplayObject,depth:number):number;

		/**
		 * 删除一个角色容器里的一个显示对象，如果没有指定的容器名称，则在每一个容器里寻找该对象，并删除
		 * @param child:
		 * @param containerName
		 *
		 */
		removeContainerChild(child:egret.DisplayObject,containerName:string):void;

		// /**
		//  * 根据位置删除一个角色容器里的一个显示对象，如果没有指定的容器名称，则在每一个容器里寻找该对象，并删除
		//  * @param depth:
		//  * @param containerName
		//  *
		//  */
		// removeContainerChildAt(depth:number,containerName:string):egret.DisplayObject;
		/**
		 * 返回显示对象,通过操作此对象来移动角色，切换深度等
		 */
		getContainer():egret.Sprite;
	}
}
