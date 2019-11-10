namespace ui 
{
	export class MainPetUI extends morn.View
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
			this.width = 100
			this.height = 100
			var n1:morn.Image = new morn.Image
			this.addChild(n1)
			n1.skin = "main_json.petBottom"
			n1.x = -1
			n1.y = -27
			
			
			
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