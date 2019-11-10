namespace ui 
{
	export class SetupViewUI extends morn.View
	{
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
			n1.x = 65
			n1.y = 356
			var n2:SliderComUI = new SliderComUI
			t.addChild(n2)
			n2.x = 445
			n2.y = 559
			var n3:morn.Label = new morn.Label
			t.addChild(n3)
			n3.text = "音效"
			n3.x = 176
			n3.y = 552
			n3.width = 106
			n3.height = 49
			n3.size = 50
			t.closeBtn = new morn.Button
			t.addChild(t.closeBtn)
			t.closeBtn.skin = "main_json.btn_close"
			t.closeBtn.x = 645
			t.closeBtn.y = 281
			t.closeBtn.stateNum = 1
			var n4:morn.Image = new morn.Image
			t.addChild(n4)
			n4.skin = "main_json.title_setup"
			n4.x = 153
			n4.y = 314
			
			
			
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