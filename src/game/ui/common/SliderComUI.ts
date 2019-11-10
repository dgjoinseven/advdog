namespace ui 
{
	export class SliderComUI extends morn.View
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
			this.width = 149
			this.height = 45
			var n1:morn.Image = new morn.Image
			this.addChild(n1)
			n1.skin = "main_json.sliderbg"
			n1.x = 0
			n1.y = 0
			var n2:morn.Image = new morn.Image
			this.addChild(n2)
			n2.skin = "main_json.sliderband"
			n2.x = 8
			n2.y = 5
			var n3:morn.Image = new morn.Image
			this.addChild(n3)
			n3.skin = "main_json.shop_point"
			n3.x = 78
			n3.y = -12
			
			
			
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