namespace ui 
{
	export class MyDogUI extends morn.View
	{
		public dogPanel:morn.Panel;
		public dogContainer:morn.Image;
		public closeBtn:morn.Button;
		
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
			t.width = 750
			t.height = 1400
			var n1:morn.Image = new morn.Image
			t.addChild(n1)
			n1.skin = "main_json.alert_bg"
			n1.x = 63
			n1.y = 202
			n1.sizeGrid = "200,200,200,200"
			n1.width = 599
			n1.height = 694
			var n2:morn.Image = new morn.Image
			t.addChild(n2)
			n2.skin = "main_json.my_dog_bg"
			n2.x = 124
			n2.y = 295
			t.dogPanel = new morn.Panel
			t.addChild(t.dogPanel)
			t.dogPanel.x = 103
			t.dogPanel.y = 667
			t.dogPanel.height = 142
			t.dogPanel.width = 505
			t.dogPanel.hScrollBarSkin = "null_json.null"
			t.dogContainer = new morn.Image
			t.addChild(t.dogContainer)
			t.dogContainer.x = 375
			t.dogContainer.y = 538
			t.closeBtn = new morn.Button
			t.addChild(t.closeBtn)
			t.closeBtn.skin = "main_json.btn_close"
			t.closeBtn.x = 644
			t.closeBtn.y = 123
			t.closeBtn.stateNum = 1
			var n3:morn.Image = new morn.Image
			t.addChild(n3)
			n3.skin = "main_json.title_myDog"
			n3.x = 154
			n3.y = 156
			
			
			
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