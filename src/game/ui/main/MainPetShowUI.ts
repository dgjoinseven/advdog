namespace ui 
{
	export class MainPetShowUI extends morn.View
	{
		public bgBlankImg:morn.Image;		
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
			this.width = 10
			this.height = 10
			t.bgBlankImg = new morn.Image
			this.addChild(t.bgBlankImg)
			t.bgBlankImg.skin = "main_json.blank"
			t.bgBlankImg.x = -74
			t.bgBlankImg.y = -115
			t.bgBlankImg.width = 170
			t.bgBlankImg.height = 180
			var n1:morn.Image = new morn.Image
			this.addChild(n1)
			n1.skin = "main_json.dog_bom_effect"
			n1.x = -87
			n1.y = -23
			n1.mouseEnabled = false
			
			
			
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