namespace ui 
{
	export class LoadingUI extends morn.View
	{
		public dogImg:morn.Image;		public loadingLabel:morn.Label;		public blackDogImg:morn.Image;		public configLabel:morn.Label;		
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
			this.width = 750
			this.height = 1400
			var n1:morn.Image = new morn.Image
			this.addChild(n1)
			n1.skin = "loading_json.loading"
			n1.x = 0
			n1.y = 0
			var n2:morn.Label = new morn.Label
			this.addChild(n2)
			n2.text = "label"
			n2.x = 162
			n2.y = 937
			t.dogImg = new morn.Image
			this.addChild(t.dogImg)
			t.dogImg.skin = "loading_json.dog"
			t.dogImg.x = 236
			t.dogImg.y = 492
			t.loadingLabel = new morn.Label
			this.addChild(t.loadingLabel)
			t.loadingLabel.text = "0%"
			t.loadingLabel.x = 266
			t.loadingLabel.y = 951
			t.loadingLabel.align = "center"
			t.loadingLabel.backgroundColor = 0xffffff
			t.loadingLabel.color = 0xffffff
			t.loadingLabel.size = 70
			t.loadingLabel.width = 224
			t.loadingLabel.height = 86
			t.blackDogImg = new morn.Image
			this.addChild(t.blackDogImg)
			t.blackDogImg.skin = "loading_json.black_dog"
			t.blackDogImg.x = 236
			t.blackDogImg.y = 492
			t.configLabel = new morn.Label
			this.addChild(t.configLabel)
			t.configLabel.x = 263
			t.configLabel.y = 897
			t.configLabel.width = 351
			t.configLabel.height = 50
			t.configLabel.color = 0xffffff
			t.configLabel.align = "left"
			t.configLabel.size = 30
			
			
			
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