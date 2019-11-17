namespace ui 
{
	export class SetupViewUI extends morn.View
	{
		public closeBtn:morn.Button;
		public soundBtn:morn.Button;
		
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
			var n2:morn.Label = new morn.Label
			t.addChild(n2)
			n2.text = "音效"
			n2.x = 173
			n2.y = 549
			n2.width = 106
			n2.height = 49
			n2.size = 50
			n2.bold = true
			t.closeBtn = new morn.Button
			t.addChild(t.closeBtn)
			t.closeBtn.skin = "main_json.btn_close"
			t.closeBtn.x = 645
			t.closeBtn.y = 281
			t.closeBtn.stateNum = 1
			var n3:morn.Image = new morn.Image
			t.addChild(n3)
			n3.skin = "main_json.title_setup"
			n3.x = 153
			n3.y = 314
			t.soundBtn = new morn.Button
			t.addChild(t.soundBtn)
			t.soundBtn.skin = "main_json.btn_sound"
			t.soundBtn.x = 444
			t.soundBtn.y = 546
			t.soundBtn.stateNum = 2
			
			
			
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