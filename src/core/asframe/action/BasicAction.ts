namespace asf
{
	/***
	 * 表演代理者，支持aciton的队列、并发、同名排斥模式
	 */
	export class BasicAction implements IAction
	{
		public static NAME: string = "BasicAction";
		/** 附加的额外数据 **/
		public extra: any;
		/** 动作类型 **/
		protected mType: string;
		/** 动作名称 **/
		protected mName: string;
		//		/** 可以替换的类型数据 **/
		//		protected var repList		:Array;
		//		/** 代替动作 **/
		//		protected var replaceRole	:IAction;			//代替动作
		/**  **/
		protected mThisObj: any;
		protected mActor: IActor;
		/** 默认结束的时候调用的回调函数 **/
		protected mCallBack: Function
		protected mParam: any;

		/** 是否已经启动了（防止重复调用start方法） **/
		protected mIsStart: boolean;
		/** 是否已经释放的标记 **/
		protected isDestory: boolean;
		public constructor()
		{
			this.mType = ActionConsts.SAME;
			this.mName = BasicAction.NAME;
		}

		/**
		 * 初始化方法
		 * @param callBack 销毁前的回调函数
		 * @param param 参数
		 *
		 */
		public initAction(callBack: Function, thisObj: any, param: any = null): void
		{
			this.mCallBack = callBack;
			this.mThisObj = thisObj;
			this.mParam = param;
		}

		public setName(name: string): void
		{
			this.mName = name;
		}

		public setType(type: string): void
		{
			this.mType = type;
		}

		public getType(): string
		{
			return this.mType;
		}

		public getName(): string
		{
			return this.mName;
		}

		/**
		 * 开始执行具体的动作逻辑，BasicAction做了一些基础处理，一般不建议子类重写。如果重写了，请调用super.start();
		 *
		 * @param actor 动作的服务对象(表演者)
		 */
		public start(actor: IActor): void
		{
			if (this.mIsStart)
				throw new Error("重复调用start了" + this);

			this.isDestory = false;
			this.mIsStart = true;
			this.mActor = actor;
			//拥有公共的actor属性，则可以直接给子类赋值。这里有可能报错,其实用Type可以做出精准分析的
			if (this.hasOwnProperty(ActionConsts.INJECT_ACTOR))
			{
				this[ActionConsts.INJECT_ACTOR] = actor;
			}
			if (this.hasOwnProperty(ActionConsts.INJECT_PARAM))
			{
				this[ActionConsts.INJECT_PARAM] = this.mParam;
			}
			else if (this.hasOwnProperty(ActionConsts.INJECT_SET_PARAMS))
			{
				this[ActionConsts.INJECT_PARAM].call(this, this.mParam);
			}
			this.onStart();
		}

		/**
		 * 子类必须重写该方法
		 */
		protected onStart(): void
		{

		}

		public destroy(o: any = null): void
		{
			//防止重复销毁引起错误
			if (this.isDestory)
				return;
			this.isDestory = true;
			this.mIsStart = false;
			//手动自己从actor中清除自己
			this.mActor.delAction(this, false);
			this.onDestory();
			if (this.mCallBack)
			{
				if (this.mCallBack.length == 1)
					this.mCallBack.call(this.mThisObj, this.mActor);
				else
					this.mCallBack.call(this.mThisObj);
				this.mCallBack = null;
			}
			this.mActor = null;
		}

		protected onDestory(): void
		{

		}
	}
}