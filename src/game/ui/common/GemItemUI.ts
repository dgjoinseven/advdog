namespace ui 
{
	export class GemItemUI extends morn.View
	{
		public effectImg:morn.Image;		public numLabel:morn.Label;		
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
			this.width = 85
			this.height = 85
			t.effectImg = new morn.Image
			this.addChild(t.effectImg)
			t.effectImg.skin = "main_json.apcc_effect"
			t.effectImg.x = 42
			t.effectImg.y = 42
			t.effectImg.anchorX = 0.5
			t.effectImg.anchorY = 0.5
			var n1:morn.Image = new morn.Image
			this.addChild(n1)
			n1.skin = "main_json.gem_small"
			n1.x = 27
			n1.y = 21
			t.numLabel = new morn.Label
			this.addChild(t.numLabel)
			t.numLabel.text = "0.3999"
			t.numLabel.x = 1
			t.numLabel.y = 63
			t.numLabel.color = 0xffffff
			t.numLabel.size = 20
			t.numLabel.width = 85
			t.numLabel.height = 22
			t.numLabel.align = "center"
			
			
			
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