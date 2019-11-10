namespace morn
{
	export class View extends Box
	{
		/**已经完成的子UI的数量 */
		private childUICompleteNum: number;
		/**需要等待布局完成的子UI数量 */
		private childUINum: number;
		/**布局json文件是否解析完成 */
		private layoutJsonParse: boolean;
		/**布局文件路径 */
		private layoutJsonPath: string;


		/**本UI和子UI是否已经全部布局完成 */
		public layoutComolete: boolean;


		/**子UI的数组 */
		protected childUIArr: morn.View[];

		public layoutCallback: asf.CallBack;


		public constructor()
		{
			super();
		}

		protected preinitialize(): void
		{
			this.touchEnabled = this.touchChildren = true;
			this.layoutJsonParse = false;
			this.layoutComolete = false;
		}
		/**在此创建组件子对象*/
		protected createChildren(): void
		{
			super.createChildren();

			this.childUIArr = [];
			this.childUINum = 0;
		}
		protected initialize(): void
		{
			super.initialize();

			this.childUICompleteNum = 0;
			for (var child of this.childUIArr)
			{
				if (!child.layoutComolete)//可能子UI json文件已经加载过 或者其他原因 ,new出来就已经完成了,所以这里要检测,没完成的才PUSH进数组
				{
					if (child.layoutCallback)
					{
						// game.NoticeModule.ins.showAlert("子UI不应该有除了他父级以外的完成回调函数");
						console.error("子UI不应该有除了他父级以外的完成回调函数");
					}
					child.layoutCallback = asf.CallBack.create(this.childComplete, this, child);

					this.childUINum++;
				}
			}


			if (this.layoutJsonPath && this.layoutJsonPath.length > 0)
			{
				// console.log("@@开始加载json> " + this.layoutJsonPath);
				RES.getResByUrl(this.layoutJsonPath, this.layoutJsonLoaded, this, RES.ResourceItem.TYPE_JSON);
			}
			else
			{
				this.layoutJsonParse = true;
				this.checkComplete();
			}
		}
		public destroy(): void
		{
			this.layoutCallback = null;

			this.childUIArr = null;

			super.destroy();
		}

		protected setLayoutJsonPath(url: string): void
		{
			this.layoutJsonPath = url;
		}
		private childComplete(childUI: morn.View): void
		{
			var index: number = this.childUIArr.indexOf(childUI);
			if (index != -1)
			{
				this.childUIArr.splice(index, 1);
			}

			this.childUICompleteNum++;
			// console.log("@@子UI完成> " + this.childUICompleteNum + "/" + this.childUINum);

			this.checkComplete();
		}
		private layoutJsonLoaded(json, url): void
		{
			// console.log("@@布局文件加载完成");
			if (this.isDestroy)
			{
				return;
			}
			morn.LayoutJsonParse.parse(json, this);
			this.layoutJsonParse = true;
			// console.log("@@布局文件解析完成");

			this.checkComplete();
		}
		private checkComplete()
		{
			if (this.childUICompleteNum >= this.childUINum && this.layoutJsonParse)
			{
				// console.log("@@本UI全部布局完成---------");
				this.layoutComolete = true;
				if (this.layoutCallback)
				{
					this.layoutCallback.execute();
				}
			}
		}
	}
}