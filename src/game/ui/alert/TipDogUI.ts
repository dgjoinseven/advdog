namespace ui 
{
	export class TipDogUI extends morn.View
	{
		public sureBtn:morn.Button;		public videoBtn:morn.Button;		public closeBtn:morn.Button;		public tipLabel:morn.Label;		
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
			n1.y = 356
			var n2:morn.Image = new morn.Image
			this.addChild(n2)
			n2.skin = "main_json.title_tip"
			n2.x = 153
			n2.y = 313
			var n3:morn.Image = new morn.Image
			this.addChild(n3)
			n3.skin = "main_json.item_bg"
			n3.x = 131
			n3.y = 470
			n3.width = 476
			n3.height = 153
			n3.sizeGrid = "20,20,20,20"
			t.sureBtn = new morn.Button
			this.addChild(t.sureBtn)
			t.sureBtn.skin = "main_json.btn_sure"
			t.sureBtn.x = 251
			t.sureBtn.y = 662
			t.sureBtn.stateNum = 1
			t.videoBtn = new morn.Button
			this.addChild(t.videoBtn)
			t.videoBtn.skin = "main_json.btn_look"
			t.videoBtn.x = 183
			t.videoBtn.y = 795
			t.videoBtn.stateNum = 1
			t.closeBtn = new morn.Button
			this.addChild(t.closeBtn)
			t.closeBtn.skin = "main_json.btn_close"
			t.closeBtn.x = 649
			t.closeBtn.y = 280
			t.closeBtn.stateNum = 1
			t.tipLabel = new morn.Label
			this.addChild(t.tipLabel)
			t.tipLabel.text = "您没狗粮，请观看视频获得"
			t.tipLabel.x = 134
			t.tipLabel.y = 524
			t.tipLabel.width = 471
			t.tipLabel.height = 43
			t.tipLabel.color = 0x0
			t.tipLabel.size = 30
			t.tipLabel.multiline = false
			t.tipLabel.align = "center"
			
			
			
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