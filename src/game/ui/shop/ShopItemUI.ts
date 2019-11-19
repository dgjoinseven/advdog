namespace ui 
{
	export class ShopItemUI extends morn.View
	{
		public dogImg:morn.Image;		public bugBtn:morn.Button;		public nameLabel:morn.Label;		public starLabel:morn.Label;		public indexLabel:morn.Label;		
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
			this.width = 502
			this.height = 154
			var n1:morn.Image = new morn.Image
			this.addChild(n1)
			n1.skin = "main_json.shop_item_bg"
			n1.x = 0
			n1.y = 0
			t.dogImg = new morn.Image
			this.addChild(t.dogImg)
			t.dogImg.x = -50
			t.dogImg.y = -73
			var n2:morn.Image = new morn.Image
			this.addChild(n2)
			n2.skin = "main_json.shop_point"
			n2.x = -27
			n2.y = 49
			n2.width = 56
			n2.height = 56
			t.bugBtn = new morn.Button
			this.addChild(t.bugBtn)
			t.bugBtn.skin = "main_json.btn_shop_close"
			t.bugBtn.x = 248
			t.bugBtn.y = 92
			t.bugBtn.stateNum = 1
			t.bugBtn.pointX = 0
			t.bugBtn.pointY = 0
			t.bugBtn.labelSize = 30
			t.bugBtn.labelColors = "0x301900"
			t.nameLabel = new morn.Label
			this.addChild(t.nameLabel)
			t.nameLabel.text = "小土狗"
			t.nameLabel.x = 175
			t.nameLabel.y = 26
			t.nameLabel.width = 271
			t.nameLabel.height = 44
			t.nameLabel.align = "left"
			t.nameLabel.size = 40
			t.nameLabel.mouseEnabled = false
			t.nameLabel.selectable = false
			t.nameLabel.color = 0xffffff
			t.starLabel = new morn.Label
			this.addChild(t.starLabel)
			t.starLabel.text = "1星"
			t.starLabel.x = 174
			t.starLabel.y = 91
			t.starLabel.width = 72
			t.starLabel.height = 44
			t.starLabel.align = "left"
			t.starLabel.size = 35
			t.starLabel.mouseEnabled = false
			t.starLabel.selectable = false
			t.starLabel.color = 0xffffff
			t.indexLabel = new morn.Label
			this.addChild(t.indexLabel)
			t.indexLabel.text = "1"
			t.indexLabel.x = -18
			t.indexLabel.y = 59
			t.indexLabel.width = 40
			t.indexLabel.height = 37
			t.indexLabel.align = "center"
			t.indexLabel.size = 32
			t.indexLabel.mouseEnabled = false
			t.indexLabel.selectable = false
			
			
			
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