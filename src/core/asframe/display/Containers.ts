/**
 * IViewContainer接口的实现类
 * @author suving.ke
 * #date 2008年12月10日
 */
namespace asf
{
	export class Containers extends egret.Sprite implements IContainers
	{
		/** 附加的额外数据 **/
		extra: any;

		protected containerMap: HashMap<string, egret.Sprite>;

		constructor()
		{
			super();
			this.containerMap = new HashMap<string, egret.Sprite>();
		}
		/**
		 * 添加监听事件
		 */
		on(type: string, listener: Function, thisObject: any, useCapture?: boolean, priority?: number): any
		{
			this.addEventListener(type,listener,thisObject,useCapture,priority);
		}
		/**
		 * 删除监听事件
		 */
		off(type: string, listener: Function, thisObject: any, useCapture?: boolean): void
		{
			this.removeEventListener(type,listener,thisObject,useCapture);
		}

		isEmptyContainer(layer: string): Boolean
		{
			return this.containerMap.hasKey(layer);
		}
		/**
		 *
		 */
		setContainers(names: string[]|number[]): void
		{
			for (var i: number = 0; i < names.length; i++)
			{
				var container: egret.Sprite = new egret.Sprite();
				container.name = String(names[i]);
				this.addChild(container);
				this.containerMap.put(String(names[i]), container);
			}
		}
		getChildContainer(names: string|number, isEmptyCreate: Boolean = false): egret.Sprite
		{
			names = String(names);

			if (this.containerMap.hasKey(names))
				return this.containerMap.get(names) as egret.Sprite;

			var container: egret.Sprite = new egret.Sprite();
			this.addChild(container);
			this.containerMap.put(names, container);
			return container;
		}
		addContainerChild(containerName: string, child: egret.DisplayObject, depth: number = -1): number
		{
			var container: egret.Sprite = this.containerMap.get(containerName);
			if (!container)
			{
				throw new Error("容器" + containerName + "出现为空");
			}
			container.addChild(child);
			return container.getChildIndex(child);
		}

		removeContainerChild(child: egret.DisplayObject, containerName: string): void
		{
			if (containerName != null)
			{
				var container: egret.Sprite = this.containerMap.get(containerName) as egret.Sprite;
				if (child)
				{
					if (child.parent == container)
					{
						container.removeChild(child);
					}
				}
				else
				{
					var j: number = 0;
					//遍历指定容器的所有子项
					while (j >= 0)
					{
						try
						{
							container.removeChild(container.getChildAt(j));
							j++;
						}
						catch (e)
						{
							// Log.error(this,"removeContainerChild超出范围: " + j);
							break;
						}
					}
				}
			}
			else
			{
				var ary: Array<egret.Sprite> = this.containerMap.values();
				for (var i: number = 0; i < ary.length; i++)
				{
					if (child.parent == ary[i])
					{
						ary[i].removeChild(child);
						break;
					}
				}
			}
		}

		addContainer(names: string, container: egret.Sprite = null, depth: number = -1): void
		{
			if (this.containerMap.get(names) == null)
			{
				if (!container)
				{
					container = new egret.Sprite();
				}
				if (depth == -1)
				{
					this.addChild(container);
				}
				else
				{
					this.addChildAt(container, depth);
				}
				this.containerMap.put(names, container);
			}
		}

		removeContainer(names: string): egret.Sprite
		{
			var container: egret.Sprite = this.containerMap.get(names);
			if (container)
			{
				this.containerMap.remove(names);
				return this.removeChild(container) as egret.Sprite;
			}
			return null;
		}

		// orderContainer(namess:Array<egret.Sprite>):void
		// {
		// 	var containers:Array = namess;
		// 	for(var i:int = 0;i < containers.length;i++)
		// 	{
		// 		//对原有的child进行排序
		// 	}
		// }

		// removeContainerChildAt(depth:int, containerName:String=null):DisplayObject
		// {
		// 	return null;
		// }

		getContainer(): egret.Sprite
		{
			return this;
		}

		destroy(o?: any): void
		{
			//删除所有容器的显示对象
			var containerAry: Array<egret.Sprite> = this.containerMap.values();
			for (var i: number = 0; i < containerAry.length; i++)
			{
				//对原有的child进行排序
				var container: egret.Sprite = containerAry[i];
				for (var j: number = 0; j < container.numChildren; j++)
				{
					container.removeChildAt(j);
				}
			}
		}

	}
}
