namespace ui 
{
	export class ShopUI extends morn.View
	{
		public goldLabel:morn.Label;		public closeBtn:morn.Button;		public panel:morn.Panel;		
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
			n1.y = 202
			n1.sizeGrid = "200,200,200,200"
			n1.height = 995
			var n2:morn.Image = new morn.Image
			this.addChild(n2)
			n2.skin = "main_json.window_gold_bg"
			n2.x = 126
			n2.y = 290
			n2.sizeGrid = "50,50,50,50"
			n2.width = 358
			n2.height = 68
			var n3:morn.Image = new morn.Image
			this.addChild(n3)
			n3.skin = "main_json.gold"
			n3.x = 163
			n3.y = 303
			t.goldLabel = new morn.Label
			this.addChild(t.goldLabel)
			t.goldLabel.x = 202
			t.goldLabel.y = 299
			t.goldLabel.width = 276
			t.goldLabel.height = 51
			t.goldLabel.size = 40
			t.goldLabel.bold = true
			t.goldLabel.align = "center"
			var n4:morn.Image = new morn.Image
			this.addChild(n4)
			n4.skin = "main_json.shop_title"
			n4.x = 155
			n4.y = 158
			t.closeBtn = new morn.Button
			this.addChild(t.closeBtn)
			t.closeBtn.skin = "main_json.btn_close"
			t.closeBtn.x = 644
			t.closeBtn.y = 127
			t.closeBtn.stateNum = 1
			t.panel = new morn.Panel
			this.addChild(t.panel)
			t.panel.x = 112
			t.panel.y = 384
			t.panel.width = 486
			t.panel.height = 712
			t.panel.vScrollBarSkin = "null_json.null"
			
			
			
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