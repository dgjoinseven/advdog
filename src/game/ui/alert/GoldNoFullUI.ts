namespace ui 
{
	export class GoldNoFullUI extends morn.View
	{
		public effectImg:morn.Image;		public goldImg2:morn.Image;		public gainLabel:morn.Label;		public tipLabel:morn.Label;		public videoBtn:morn.Button;		public titleImg:morn.Image;		public closeBtn:morn.Button;		
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
			this.visible = true
			var n1:morn.Image = new morn.Image
			this.addChild(n1)
			n1.skin = "main_json.alert_bg"
			n1.x = 63
			n1.y = 358
			t.effectImg = new morn.Image
			this.addChild(t.effectImg)
			t.effectImg.skin = morn.Morn.ResUrl + "main/bg/gold_effect_bg.png"
			t.effectImg.x = 357
			t.effectImg.y = 570
			t.effectImg.anchorX = 0.5
			t.effectImg.anchorY = 0.5
			t.goldImg2 = new morn.Image
			this.addChild(t.goldImg2)
			t.goldImg2.skin = "main_json.gold_2"
			t.goldImg2.x = 239
			t.goldImg2.y = 440
			t.goldImg2.visible = true
			var n2:morn.Image = new morn.Image
			this.addChild(n2)
			n2.skin = "main_json.window_gold_bg"
			n2.x = 217
			n2.y = 685
			t.gainLabel = new morn.Label
			this.addChild(t.gainLabel)
			t.gainLabel.x = 221
			t.gainLabel.y = 699
			t.gainLabel.width = 299
			t.gainLabel.height = 40
			t.gainLabel.bold = true
			t.gainLabel.size = 40
			t.gainLabel.align = "center"
			var n3:morn.Label = new morn.Label
			this.addChild(n3)
			n3.text = "恭喜获得"
			n3.x = 117
			n3.y = 15
			n3.width = 133
			n3.height = 32
			n3.bold = true
			n3.size = 25
			t.tipLabel = new morn.Label
			this.addChild(t.tipLabel)
			t.tipLabel.text = "每天晚上20点重置视频次数(剩余14次)"
			t.tipLabel.x = 184
			t.tipLabel.y = 848
			t.tipLabel.width = 397
			t.tipLabel.height = 24
			t.tipLabel.size = 20
			t.tipLabel.color = 0xffffff
			t.tipLabel.align = "center"
			t.tipLabel.visible = true
			t.videoBtn = new morn.Button
			this.addChild(t.videoBtn)
			t.videoBtn.skin = "main_json.btn_look"
			t.videoBtn.x = 172
			t.videoBtn.y = 767
			t.videoBtn.stateNum = 1
			t.videoBtn.visible = true
			t.titleImg = new morn.Image
			this.addChild(t.titleImg)
			t.titleImg.skin = "main_json.title_gain_more_gold"
			t.titleImg.x = 155
			t.titleImg.y = 315
			t.closeBtn = new morn.Button
			this.addChild(t.closeBtn)
			t.closeBtn.skin = "main_json.btn_close"
			t.closeBtn.x = 645
			t.closeBtn.y = 280
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