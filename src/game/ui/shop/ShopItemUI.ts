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
			this.width = 453
			this.height = 165
			var n1:morn.Image = new morn.Image
			this.addChild(n1)
			n1.skin = "main_json.item_bg"
			n1.x = 0
			n1.y = 0
			n1.sizeGrid = "20,20,20,20"
			n1.width = 453
			n1.height = 165
			t.dogImg = new morn.Image
			this.addChild(t.dogImg)
			t.dogImg.skin = "main_json.shop1_5"
			t.dogImg.x = 21
			t.dogImg.y = 6
			t.dogImg.width = 152
			t.dogImg.height = 143
			var n2:morn.Image = new morn.Image
			this.addChild(n2)
			n2.skin = "main_json.shop_point"
			n2.x = -27
			n2.y = 61
			n2.width = 56
			n2.height = 56
			t.bugBtn = new morn.Button
			this.addChild(t.bugBtn)
			t.bugBtn.skin = "main_json.btn_shop_close"
			t.bugBtn.x = 243
			t.bugBtn.y = 97
			t.bugBtn.stateNum = 1
			t.bugBtn.pointX = 0
			t.bugBtn.pointY = 0
			t.bugBtn.labelSize = 30
			t.bugBtn.labelColors = "0x000000"
			t.nameLabel = new morn.Label
			this.addChild(t.nameLabel)
			t.nameLabel.text = "小土狗"
			t.nameLabel.x = 162
			t.nameLabel.y = 31
			t.nameLabel.width = 271
			t.nameLabel.height = 44
			t.nameLabel.align = "left"
			t.nameLabel.size = 40
			t.starLabel = new morn.Label
			this.addChild(t.starLabel)
			t.starLabel.text = "1星"
			t.starLabel.x = 168
			t.starLabel.y = 96
			t.starLabel.width = 56
			t.starLabel.height = 44
			t.starLabel.align = "left"
			t.starLabel.size = 35
			t.indexLabel = new morn.Label
			this.addChild(t.indexLabel)
			t.indexLabel.text = "1"
			t.indexLabel.x = -18
			t.indexLabel.y = 71
			t.indexLabel.width = 40
			t.indexLabel.height = 37
			t.indexLabel.align = "center"
			t.indexLabel.size = 35
			
			
			
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