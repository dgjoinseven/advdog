namespace asf
{
	/**
	 * 队列动作代理器，代理所有类型为ActionConstants.QUEUE类型的动作,进行队列播放<br>
	 * 当代理器里的所有动作都播放完时，则该代理器从动作管理器中删除
	 * 
	 * @author soda.C
	 */
	export class QueueActionProxy extends BasicAction
	{
		/** 队列里的action **/
		private actions: IAction[]
		/** 当前执行的动作 **/
		private currAction: IAction;

		public constructor()
		{
			super();
			this.actions = [];
			this.mType = ActionConsts.QUEUE;
			this.mName = "QueueProxyAction";
		}

		public destroy(o: any = null): void
		{
			if (this.currAction != null)
			{
				this.overAction(this.currAction);
				this.currAction = null;
			}
			if (this.actions != null && this.actions.length > 0)
			{
				for (var i: number = 0; i < this.actions.length; i++)
				{
					this.overAction(this.actions[i]);
				}
			}
			this.actions = null;
		}

		protected onStart(): void
		{
			//直接选择一个action进行处理
			this.actAction();
		}

		/**
		 * 结束一个action，同时会调用action的overAction方法
		 * @param action
		 * 
		 */
		private overAction(action: IAction): void
		{
			if (action)
			{
				action.destroy();
				// try
				// {
				// 	action.destroy();
				// }
				// catch (e: Error)
				// {
				// 	// trace(action + "强行结束出错:" + e.getStackTrace());
				// }
			}
		}

		/**
		 * 添加一个新的action 
		 * @param action
		 * 
		 */
		public addAction(action: IAction): void
		{
			this.actions.push(action);
		}

		/**
		 * 选择一个新的action来处理 
		 */
		public actAction(): void
		{
			if (this.actions.length == 0)
			{
				this.destroy();
			}
			//更新新的动作
			this.currAction = this.actions.shift();
			if (!this.currAction)
			{
				//出现空的，继续选择
				this.actAction();
			}
			else
			{
				this.currAction.start(this.mActor);
				// try
				// {
				// 	this.currAction.start(this.mActor);
				// }
				// catch (error: Error)
				// {
				// 	// trace("代理器执行currAction.start出错. currAction" + currAction);
				// 	// trace("错误打印:" + error.getStackTrace());
				// 	//执行错误，强制关闭，继续选择新的
				// 	this.overAction(this.currAction);
				// 	this.actAction();
				// }
			}
		}
	}
}