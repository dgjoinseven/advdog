namespace asf
{
	export class RenderManager
	{
		private _isNext: boolean = false;
		private _methods: asf.Dictionary<Function, asf.Dictionary<any, any[]>> = new asf.Dictionary<Function, asf.Dictionary<any, any[]>>();
		public constructor()
		{
		}

		private invalidate(): void
		{
			// if (App.stage)
			// {
			// 	// _isNext = false;
			// 	//render有一定几率无法触发，这里加上保险处理
			// 	App.stage.addEventListener(egret.Event.ENTER_FRAME, this.onValidate, this);
			// 	App.stage.addEventListener(egret.Event.RENDER, this.onValidate, this);
			// 	App.stage.invalidate();
			// }
			egret.callLater(this.renderAll, this);
		}

		// private onValidate(e: egret.Event): void 
		// {
		// 	if (this._isNext)
		// 	{
		// 		App.stage.removeEventListener(egret.Event.RENDER, this.onValidate, this);
		// 		App.stage.removeEventListener(egret.Event.ENTER_FRAME, this.onValidate, this);
		// 		this.renderAll();
		// 		// App.stage.dispatchEvent(new egret.Event(UIEvent.RENDER_COMPLETED));
		// 	}
		// 	this._isNext = true;
		// }

		/**执行所有延迟调用*/
		public renderAll(): void
		{
			var methods: Function[] = this._methods.keys();
			var method: Function;
			for (method of methods)
			{
				var thisDic: asf.Dictionary<any, any[]> = this._methods.get(method);
				if (thisDic)
				{
					var thisObj: any;
					var thisArr: any[] = thisDic.keys();
					for (thisObj of thisArr)
					{
						this.exeCallLater(method, thisObj);
					}
				}
			}

			for (method of methods)
			{
				return this.renderAll();
			}
		}

		/**延迟调用*/
		public callLater(method: Function, thisObj: any, args: any[] = null): void
		{
			var thisDic: asf.Dictionary<any, any[]> = this._methods.get(method);
			if (thisDic == null)
			{
				thisDic = new asf.Dictionary<any, any[]>();
				this._methods.put(method, thisDic);
			}

			if (!thisDic.hasKey(thisObj))
			{
				if (!thisObj)
				{
					console.log("disW:" + asf.App.stage.stageWidth);
				}
				thisDic.put(thisObj, args || []);
				this.invalidate();
			}
		}

		/**执行延迟调用*/
		public exeCallLater(method: Function, thisObj: any): void
		{
			var thisDic: asf.Dictionary<any, any[]> = this._methods.get(method);
			if (thisDic)
			{
				var args: any[] = thisDic.get(thisObj);
				thisDic.remove(thisObj);
				if (thisDic.size() == 0)
				{
					this._methods.remove(method);
				}
				method.apply(thisObj, args);
			}
			else
			{
				this._methods.remove(method);
			}
		}

		/**
		 * 删除延迟 
		 * @param method
		 * 
		 */
		public removeLater(method: Function, thisObj: any): void
		{
			var thisDic: asf.Dictionary<any, any[]> = this._methods.get(method);
			if (thisDic)
			{
				thisDic.remove(thisObj);
				if (thisDic.size() == 0)
				{
					this._methods.remove(method);
				}
			}
		}
	}
}