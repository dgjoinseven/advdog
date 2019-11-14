namespace ui 
{
	export class DiagramItemUI extends morn.View
	{
		public skillLabel:morn.Label;		public desLabel:morn.Label;		public nameLabel:morn.Label;		public dogImg:morn.Image;		
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
			this.height = 300
			var n1:morn.Image = new morn.Image
			this.addChild(n1)
			n1.skin = "main_json.dogimg_line"
			n1.x = 71
			n1.y = 291
			var n2:morn.Label = new morn.Label
			this.addChild(n2)
			n2.text = "技能"
			n2.x = 295
			n2.y = 33
			n2.width = 59
			n2.height = 32
			n2.size = 25
			n2.mouseEnabled = false
			n2.selectable = false
			t.skillLabel = new morn.Label
			this.addChild(t.skillLabel)
			t.skillLabel.text = "XXXXXXX看看"
			t.skillLabel.x = 291
			t.skillLabel.y = 69
			t.skillLabel.width = 197
			t.skillLabel.height = 48
			t.skillLabel.size = 20
			t.skillLabel.multiline = true
			t.skillLabel.color = 0xd8d5d4
			t.skillLabel.mouseEnabled = false
			t.skillLabel.selectable = false
			var n3:morn.Label = new morn.Label
			this.addChild(n3)
			n3.text = "获取途径"
			n3.x = 296
			n3.y = 121
			n3.width = 105
			n3.height = 29
			n3.size = 25
			n3.selectable = false
			t.desLabel = new morn.Label
			this.addChild(t.desLabel)
			t.desLabel.text = "获取途径"
			t.desLabel.x = 294
			t.desLabel.y = 158
			t.desLabel.width = 192
			t.desLabel.height = 116
			t.desLabel.multiline = true
			t.desLabel.size = 20
			t.desLabel.color = 0xd8d5d4
			t.desLabel.mouseEnabled = false
			t.desLabel.selectable = false
			t.nameLabel = new morn.Label
			this.addChild(t.nameLabel)
			t.nameLabel.text = "分红狗"
			t.nameLabel.x = 62
			t.nameLabel.y = 228
			t.nameLabel.width = 224
			t.nameLabel.height = 49
			t.nameLabel.size = 40
			t.nameLabel.align = "center"
			t.nameLabel.backgroundColor = 0x0
			t.nameLabel.color = 0xffffff
			t.nameLabel.mouseEnabled = false
			t.nameLabel.selectable = false
			t.dogImg = new morn.Image
			this.addChild(t.dogImg)
			t.dogImg.x = 169
			t.dogImg.y = 213
			t.dogImg.mouseEnabled = false
			
			
			
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