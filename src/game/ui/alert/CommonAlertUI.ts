namespace ui 
{
	export class CommonAlertUI extends morn.View
	{
		public effectImg:morn.Image;		public titleImg:morn.Image;		public closeBtn:morn.Button;		public videoImg:morn.Image;		public videoBtn:morn.Button;		public tipLabel:morn.Label;		public gainLabel:morn.Label;		
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
			n1.x = 62
			n1.y = 356
			t.effectImg = new morn.Image
			this.addChild(t.effectImg)
			t.effectImg.x = 367
			t.effectImg.y = 582
			t.effectImg.anchorX = 0.5
			t.effectImg.anchorY = 0.5
			t.effectImg.skin = morn.Morn.ResUrl + "main/bg/gold_effect_bg.png"
			var n2:morn.Label = new morn.Label
			this.addChild(n2)
			n2.text = "恭喜获得"
			n2.x = 127
			n2.y = 25
			n2.width = 133
			n2.height = 32
			n2.bold = true
			n2.size = 25
			t.titleImg = new morn.Image
			this.addChild(t.titleImg)
			t.titleImg.skin = "main_json.title_gain_gold"
			t.titleImg.x = 156
			t.titleImg.y = 312
			t.closeBtn = new morn.Button
			this.addChild(t.closeBtn)
			t.closeBtn.skin = "main_json.btn_close"
			t.closeBtn.x = 646
			t.closeBtn.y = 281
			t.closeBtn.stateNum = 1
			var n3:morn.Image = new morn.Image
			this.addChild(n3)
			n3.skin = "main_json.window_gold_bg"
			n3.x = 207
			n3.y = 692
			t.videoImg = new morn.Image
			this.addChild(t.videoImg)
			t.videoImg.skin = "main_json.gem_big"
			t.videoImg.x = 363
			t.videoImg.y = 564
			t.videoImg.anchorX = 0.5
			t.videoImg.anchorY = 0.5
			t.videoBtn = new morn.Button
			this.addChild(t.videoBtn)
			t.videoBtn.label = "确定"
			t.videoBtn.skin = "main_json.btn_yellow"
			t.videoBtn.x = 169
			t.videoBtn.y = 766
			t.videoBtn.stateNum = 1
			t.videoBtn.sizeGrid = "20,20,20,20"
			t.videoBtn.width = 394
			t.videoBtn.height = 77
			t.videoBtn.labelSize = 40
			t.videoBtn.visible = false
			t.tipLabel = new morn.Label
			this.addChild(t.tipLabel)
			t.tipLabel.text = "每天晚上20点重置视频次数(剩余14次)"
			t.tipLabel.x = 186
			t.tipLabel.y = 847
			t.tipLabel.width = 397
			t.tipLabel.height = 24
			t.tipLabel.size = 20
			t.tipLabel.color = 0xffffff
			t.tipLabel.align = "center"
			t.tipLabel.visible = false
			t.gainLabel = new morn.Label
			this.addChild(t.gainLabel)
			t.gainLabel.text = "1700、0t"
			t.gainLabel.x = 219
			t.gainLabel.y = 707
			t.gainLabel.width = 284
			t.gainLabel.height = 40
			t.gainLabel.bold = true
			t.gainLabel.size = 40
			t.gainLabel.align = "center"
			
			
			
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