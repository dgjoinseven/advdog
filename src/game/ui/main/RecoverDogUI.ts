namespace ui 
{
	export class RecoverDogUI extends morn.View
	{
		public effectImg:morn.Image;		public gainLabel:morn.Label;		public goldImg:morn.Image;		public closeBtn:morn.Button;		public tipLabel:morn.Label;		public cancelBtn:morn.Button;		public sureBtn:morn.Button;		
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
			n1.x = 65
			n1.y = 356
			t.effectImg = new morn.Image
			this.addChild(t.effectImg)
			t.effectImg.skin = "main_json.gold_effect_bg"
			t.effectImg.x = 371
			t.effectImg.y = 598
			t.effectImg.anchorX = 0.5
			t.effectImg.anchorY = 0.5
			var n2:morn.Image = new morn.Image
			this.addChild(n2)
			n2.skin = "main_json.window_gold_bg"
			n2.x = 240
			n2.y = 701
			t.gainLabel = new morn.Label
			this.addChild(t.gainLabel)
			t.gainLabel.x = 238
			t.gainLabel.y = 713
			t.gainLabel.width = 299
			t.gainLabel.height = 40
			t.gainLabel.bold = true
			t.gainLabel.size = 40
			t.gainLabel.align = "center"
			t.goldImg = new morn.Image
			this.addChild(t.goldImg)
			t.goldImg.skin = "main_json.gold_1"
			t.goldImg.x = 262
			t.goldImg.y = 485
			var n3:morn.Image = new morn.Image
			this.addChild(n3)
			n3.skin = "main_json.title_recover"
			n3.x = 154
			n3.y = 311
			t.closeBtn = new morn.Button
			this.addChild(t.closeBtn)
			t.closeBtn.skin = "main_json.btn_close"
			t.closeBtn.x = 643
			t.closeBtn.y = 283
			t.closeBtn.stateNum = 1
			t.tipLabel = new morn.Label
			this.addChild(t.tipLabel)
			t.tipLabel.text = "您当前回收二哈犬，可获取："
			t.tipLabel.x = 110
			t.tipLabel.y = 426
			t.tipLabel.width = 522
			t.tipLabel.height = 40
			t.tipLabel.align = "center"
			t.tipLabel.size = 30
			t.cancelBtn = new morn.Button
			this.addChild(t.cancelBtn)
			t.cancelBtn.label = "取消"
			t.cancelBtn.skin = "main_json.btn_blue"
			t.cancelBtn.x = 183
			t.cancelBtn.y = 776
			t.cancelBtn.stateNum = 1
			t.cancelBtn.labelBold = true
			t.cancelBtn.labelSize = 30
			t.sureBtn = new morn.Button
			this.addChild(t.sureBtn)
			t.sureBtn.label = "确定"
			t.sureBtn.skin = "main_json.btn_yellow"
			t.sureBtn.x = 396
			t.sureBtn.y = 775
			t.sureBtn.stateNum = 1
			t.sureBtn.labelBold = true
			t.sureBtn.labelSize = 30
			
			
			
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