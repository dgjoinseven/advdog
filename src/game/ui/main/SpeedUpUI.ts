namespace ui 
{
	export class SpeedUpUI extends morn.View
	{
		public add60Btn:morn.Button;		public add200Btn:morn.Button;		public closeBtn:morn.Button;		
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
			n1.skin = "main_json.alert_bg"
			n1.x = 63
			n1.y = 358
			t.add60Btn = new morn.Button
			this.addChild(t.add60Btn)
			t.add60Btn.skin = "main_json.btn_addSpeed_apcc"
			t.add60Btn.x = 172
			t.add60Btn.y = 472
			t.add60Btn.stateNum = 1
			t.add200Btn = new morn.Button
			this.addChild(t.add200Btn)
			t.add200Btn.skin = "main_json.btn_addSpeed_video"
			t.add200Btn.x = 172
			t.add200Btn.y = 657
			t.add200Btn.stateNum = 1
			var n2:morn.Image = new morn.Image
			this.addChild(n2)
			n2.skin = "main_json.title_speedup"
			n2.x = 155
			n2.y = 315
			t.closeBtn = new morn.Button
			this.addChild(t.closeBtn)
			t.closeBtn.skin = "main_json.btn_close"
			t.closeBtn.x = 645
			t.closeBtn.y = 281
			t.closeBtn.stateNum = 1
			
			
			
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