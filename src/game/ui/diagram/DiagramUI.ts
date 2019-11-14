namespace ui 
{
	export class DiagramUI extends morn.View
	{
		public panel:morn.Panel;		public closeBtn:morn.Button;		
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
			n1.skin = morn.Morn.ResUrl + "main/bg/0_狗狗图鉴.png"
			n1.x = 0
			n1.y = 0
			var n2:morn.Image = new morn.Image
			this.addChild(n2)
			n2.skin = "main_json.alert_bg"
			n2.x = 63
			n2.y = 203
			n2.width = 600
			n2.height = 992
			n2.sizeGrid = "200,200,200,200"
			t.panel = new morn.Panel
			this.addChild(t.panel)
			t.panel.vScrollBarSkin = "null_json.null"
			t.panel.width = 599
			t.panel.height = 833
			t.panel.x = 74
			t.panel.y = 289
			t.closeBtn = new morn.Button
			this.addChild(t.closeBtn)
			t.closeBtn.skin = "main_json.btn_close"
			t.closeBtn.x = 645
			t.closeBtn.y = 125
			t.closeBtn.stateNum = 1
			var n3:morn.Image = new morn.Image
			this.addChild(n3)
			n3.skin = "main_json.title_dog_img"
			n3.x = 155
			n3.y = 157
			var n4:morn.Panel = new morn.Panel
			this.addChild(n4)
			n4.x = 0
			n4.y = 0
			var n5:morn.Image = new morn.Image
			n4.addChild(n5)
			n5.skin = "main_json.blank"
			
			
			
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