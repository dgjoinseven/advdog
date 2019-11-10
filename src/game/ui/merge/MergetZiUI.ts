namespace ui 
{
	export class MergetZiUI extends morn.View
	{
		public effectImg:morn.Image;		public ziImg:morn.Image;		
		public constructor()
		{
			super();
			//this.initVisible = false;
			//App.stage.addEventListener(UIEvent.RENDER_COMPLETED,onRenderComplete);
		}

		protected createChildren():void
		{
			super.createChildren();
			//initObject();
			//this.initNewObject();
			var t = this;
			this.width = 120
			this.height = 106
			t.effectImg = new morn.Image
			this.addChild(t.effectImg)
			t.effectImg.skin = "main_json.perfect_effect"
			t.effectImg.x = 0
			t.effectImg.y = 0
			t.ziImg = new morn.Image
			this.addChild(t.ziImg)
			t.ziImg.skin = "main_json.perfect_zhong"
			t.ziImg.x = 14
			t.ziImg.y = 10
			
			
			
			//createView(uiXML);
			//createViewByObject(_obj);
		}

		//private initNewObject():void
		//{
			//App.timer.doFrameOnce(1,nextFrame);
			//nextFrame();
		//}
		//public static uiXML:XML =
//{xm l};
	}
}