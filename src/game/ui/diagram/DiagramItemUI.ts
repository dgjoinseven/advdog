namespace ui 
{
	export class DiagramItemUI extends morn.View
	{
		public dogImg:morn.Image;		public skillLabel:morn.Label;		public desLabel:morn.Label;		public nameLabel:morn.Label;		
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
			this.width = 599
			this.height = 230
			var n1:morn.Image = new morn.Image
			this.addChild(n1)
			n1.skin = "main_json.deam_samll_bg"
			n1.x = 0
			n1.y = 0
			n1.width = 599
			n1.height = 230
			n1.alpha = 0
			var n2:morn.Image = new morn.Image
			this.addChild(n2)
			n2.skin = "main_json.deam_line"
			n2.x = 43
			n2.y = 225
			t.dogImg = new morn.Image
			this.addChild(t.dogImg)
			t.dogImg.x = 18
			t.dogImg.y = -10
			t.dogImg.mouseEnabled = false
			t.dogImg.scale = 0.75
			var n3:morn.Label = new morn.Label
			this.addChild(n3)
			n3.text = "技能"
			n3.x = 214
			n3.y = 20
			n3.width = 59
			n3.height = 32
			n3.size = 22
			n3.mouseEnabled = false
			n3.selectable = false
			n3.backgroundColor = 0xbc9520
			n3.bold = true
			n3.color = 0x532007
			t.skillLabel = new morn.Label
			this.addChild(t.skillLabel)
			t.skillLabel.x = 215
			t.skillLabel.y = 54
			t.skillLabel.width = 347
			t.skillLabel.height = 38
			t.skillLabel.size = 20
			t.skillLabel.multiline = true
			t.skillLabel.color = 0x634d0b
			t.skillLabel.mouseEnabled = false
			t.skillLabel.selectable = false
			t.skillLabel.backgroundColor = 0x0
			var n4:morn.Label = new morn.Label
			this.addChild(n4)
			n4.text = "获取途径"
			n4.x = 214
			n4.y = 91
			n4.width = 105
			n4.height = 29
			n4.size = 22
			n4.selectable = false
			n4.mouseEnabled = false
			n4.bold = true
			n4.color = 0x532007
			t.desLabel = new morn.Label
			this.addChild(t.desLabel)
			t.desLabel.x = 215
			t.desLabel.y = 125
			t.desLabel.width = 317
			t.desLabel.height = 85
			t.desLabel.size = 20
			t.desLabel.multiline = true
			t.desLabel.color = 0x634d0b
			t.desLabel.mouseEnabled = false
			t.desLabel.selectable = false
			t.desLabel.backgroundColor = 0x0
			t.nameLabel = new morn.Label
			this.addChild(t.nameLabel)
			t.nameLabel.text = "分红狗"
			t.nameLabel.x = 16
			t.nameLabel.y = 161
			t.nameLabel.width = 224
			t.nameLabel.height = 44
			t.nameLabel.size = 38
			t.nameLabel.align = "center"
			t.nameLabel.backgroundColor = 0x0
			t.nameLabel.color = 0xffea88
			t.nameLabel.mouseEnabled = false
			t.nameLabel.selectable = false
			t.nameLabel.bold = true
			
			
			
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