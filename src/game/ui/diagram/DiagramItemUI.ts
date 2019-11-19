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
			this.height = 250
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
			n2.skin = "main_json.deam_item_line"
			n2.x = 70
			n2.y = 245
			var n3:morn.Image = new morn.Image
			this.addChild(n3)
			n3.skin = "main_json.deam_item_bg"
			n3.x = 21
			n3.y = 8
			n3.width = 211
			n3.height = 227
			t.dogImg = new morn.Image
			this.addChild(t.dogImg)
			t.dogImg.x = 25
			t.dogImg.y = -10
			t.dogImg.mouseEnabled = false
			t.dogImg.scale = 0.75
			var n4:morn.Label = new morn.Label
			this.addChild(n4)
			n4.text = "技能"
			n4.x = 249
			n4.y = 20
			n4.width = 59
			n4.height = 32
			n4.size = 22
			n4.mouseEnabled = false
			n4.selectable = false
			n4.backgroundColor = 0xbc9520
			n4.bold = true
			n4.color = 0x3d1a00
			t.skillLabel = new morn.Label
			this.addChild(t.skillLabel)
			t.skillLabel.x = 250
			t.skillLabel.y = 54
			t.skillLabel.width = 347
			t.skillLabel.height = 38
			t.skillLabel.size = 20
			t.skillLabel.multiline = true
			t.skillLabel.color = 0xffffff
			t.skillLabel.mouseEnabled = false
			t.skillLabel.selectable = false
			t.skillLabel.backgroundColor = 0x0
			var n5:morn.Label = new morn.Label
			this.addChild(n5)
			n5.text = "获取途径"
			n5.x = 249
			n5.y = 91
			n5.width = 105
			n5.height = 29
			n5.size = 22
			n5.selectable = false
			n5.mouseEnabled = false
			n5.bold = true
			n5.color = 0x3d1a00
			t.desLabel = new morn.Label
			this.addChild(t.desLabel)
			t.desLabel.x = 250
			t.desLabel.y = 125
			t.desLabel.width = 317
			t.desLabel.height = 85
			t.desLabel.size = 20
			t.desLabel.multiline = true
			t.desLabel.color = 0xffffff
			t.desLabel.mouseEnabled = false
			t.desLabel.selectable = false
			t.desLabel.backgroundColor = 0x0
			t.nameLabel = new morn.Label
			this.addChild(t.nameLabel)
			t.nameLabel.text = "分红狗"
			t.nameLabel.x = 23
			t.nameLabel.y = 161
			t.nameLabel.width = 224
			t.nameLabel.height = 44
			t.nameLabel.size = 38
			t.nameLabel.align = "center"
			t.nameLabel.backgroundColor = 0x0
			t.nameLabel.color = 0xffffff
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