namespace ui 
{
	export class OffLineUI extends morn.View
	{
		public effectImg:morn.Image;		public gainLabel:morn.Label;		public tipLabel:morn.Label;		public titleImg:morn.Image;		public closeBtn:morn.Button;		public videoBtn:morn.Button;		
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
			n1.y = 357
			t.effectImg = new morn.Image
			this.addChild(t.effectImg)
			t.effectImg.skin = morn.Morn.ResUrl + "main/bg/gold_effect_bg.png"
			t.effectImg.x = 357
			t.effectImg.y = 607
			t.effectImg.anchorX = 0.5
			t.effectImg.anchorY = 0.5
			var n2:morn.Image = new morn.Image
			this.addChild(n2)
			n2.skin = "main_json.window_gold_bg"
			n2.x = 217
			n2.y = 722
			t.gainLabel = new morn.Label
			this.addChild(t.gainLabel)
			t.gainLabel.text = "1700.0t"
			t.gainLabel.x = 221
			t.gainLabel.y = 736
			t.gainLabel.width = 299
			t.gainLabel.height = 40
			t.gainLabel.bold = true
			t.gainLabel.size = 40
			t.gainLabel.align = "center"
			var n3:morn.Label = new morn.Label
			this.addChild(n3)
			n3.text = "恭喜获得"
			n3.x = 119
			n3.y = 14
			n3.width = 133
			n3.height = 32
			n3.bold = true
			n3.size = 25
			t.tipLabel = new morn.Label
			this.addChild(t.tipLabel)
			t.tipLabel.x = 177
			t.tipLabel.y = 886
			t.tipLabel.width = 397
			t.tipLabel.height = 24
			t.tipLabel.size = 20
			t.tipLabel.color = 0xffffff
			t.tipLabel.align = "center"
			t.tipLabel.visible = false
			t.titleImg = new morn.Image
			this.addChild(t.titleImg)
			t.titleImg.skin = "main_json.title_gain_gold"
			t.titleImg.x = 157
			t.titleImg.y = 314
			t.closeBtn = new morn.Button
			this.addChild(t.closeBtn)
			t.closeBtn.skin = "main_json.btn_close"
			t.closeBtn.x = 647
			t.closeBtn.y = 279
			t.closeBtn.stateNum = 1
			var n4:morn.Image = new morn.Image
			this.addChild(n4)
			n4.skin = "main_json.gold_2"
			n4.x = 231
			n4.y = 462
			t.videoBtn = new morn.Button
			this.addChild(t.videoBtn)
			t.videoBtn.skin = "main_json.btn_offline"
			t.videoBtn.x = 174
			t.videoBtn.y = 801
			t.videoBtn.stateNum = 1
			
			
			
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