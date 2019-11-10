namespace ui 
{
	export class GainRegardViewUI extends morn.View
	{
		
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
			this.width = 345
			this.height = 328
			var n1:morn.Image = new morn.Image
			this.addChild(n1)
			n1.skin = "main_json.setup_bg"
			n1.x = 0
			n1.y = 0
			var n2:morn.Label = new morn.Label
			this.addChild(n2)
			n2.text = "免费宝箱"
			n2.x = 118
			n2.y = 19
			n2.width = 106
			n2.height = 30
			n2.size = 25
			
			
			
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