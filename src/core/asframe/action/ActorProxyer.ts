namespace asf
{
	/***
	 * 表演代理者，支持aciton的队列、并发、同名排斥模式
	 */
	export class ActorProxyer
	{
		/** 表演者 **/
		private _actor: IActor;
		/** 动作集合 **/
		private _actionMap: HashMap<string, IAction>;
		/** 存放并发的id引用 **/
		private _sameIdMap: Dictionary<IAction, string>;
		/** 并发id增长值 **/
		private _sameIdCount: number;
		// private _actionDic: Dictionary;
		private _thisObj: any;

		public constructor(actor: IActor)
		{
			this._actor = actor;
			this._actionMap = new HashMap<string, IAction>();
			// this._actionDic = this._actionMap.getContainer();
			this._sameIdMap = new Dictionary<IAction, string>();
		}

		public setActor(actor: IActor): void
		{
			this._actor = actor;
		}

		public act(action: IAction, callBack: Function = null, thisObj: any = null, param: any = null): boolean
		{
			this._thisObj = thisObj;
			// if (callBack != null || param != null)
			// {
			// 	action.initAction(callBack, this._thisObj, param);
			// }
			action.initAction(callBack, this._thisObj, param);

			//查看是否有同名的,目前先不处理队列，只处理单独，并列以及替换3种情况
			var act: IAction = this._actionMap.get(action.getName());
			if (action.getType() == ActionConsts.QUEUE)
			{
				var queueProxy: QueueActionProxy = null;
				if (act == null)
				{
					//创建一个新的队列Action代理
					queueProxy = new QueueActionProxy();
					this._actionMap.put(action.getName(), queueProxy);
					queueProxy.addAction(action);
					queueProxy.start(this._actor);
				}
				else
				{
					queueProxy = <QueueActionProxy>act;
					queueProxy.addAction(action);
				}
				return true;
			}
			if (act != null)
			{
				//查看是否是独占，已经存在，就不可代替
				if (action.getType() == ActionConsts.ALONE)
				{
					//直接删除老的
					this.delAction(act);
				}
				else
				{
					//处理并发情况，生成新的索引作为name
					this._sameIdCount++;
					this._sameIdMap.put(action, action.getName() + this._sameIdCount);
					this._actionMap.put(action.getName() + this._sameIdCount, action);
				}
			}
			else
			{
				//单独排斥和第一次并发就直接添加
				this._actionMap.put(action.getName(), action);
			}
			action.start(this._actor);
			return true;
		}

		public delAction(action: IAction, isDestory: boolean = true): void
		{
			if (!action) return;
			//如果action是队列，并且不是队列代理本身销毁
			if (action.getType() == ActionConsts.QUEUE && action instanceof QueueActionProxy)
			{
				(action as QueueActionProxy).actAction();
				return;
			}
			//并发类型，并且是存放了并发索引新生成key的对象
			if (action.getType() == ActionConsts.SAME && this._sameIdMap.hasKey(action))
			{
				this._actionMap.remove(this._sameIdMap.get(action));
			}
			else
			{
				this._actionMap.remove(action.getName());
			}
			//执行销毁)
			if (isDestory)
				action.destroy();
		}
	}
}