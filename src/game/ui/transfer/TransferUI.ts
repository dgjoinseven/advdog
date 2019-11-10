namespace ui 
{
	export class TransferUI extends morn.View
	{
		public closeBtn:morn.Button;
		public pecksLabel:morn.Label;
		public tipLabel:morn.Label;
		public startBtn:morn.Button;
		public pointerImg:morn.Image;
		public videoBtn:morn.Button;
		
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
			t.width = 750
			t.height = 1400
			var n1:morn.Image = new morn.Image
			t.addChild(n1)
			n1.skin = "main_json.tan_bg"
			n1.x = 101
			n1.y = 318
			t.closeBtn = new morn.Button
			t.addChild(t.closeBtn)
			t.closeBtn.skin = "main_json.btn_close"
			t.closeBtn.x = 598
			t.closeBtn.y = 292
			t.closeBtn.stateNum = 1
			t.pecksLabel = new morn.Label
			t.addChild(t.pecksLabel)
			t.pecksLabel.text = "转盘卷 x 5"
			t.pecksLabel.x = 240
			t.pecksLabel.y = 892
			t.pecksLabel.width = 266
			t.pecksLabel.height = 56
			t.pecksLabel.size = 50
			t.pecksLabel.color = 0x331e00
			t.tipLabel = new morn.Label
			t.addChild(t.tipLabel)
			t.tipLabel.text = "消耗完每天凌晨赠送5张转盘卷"
			t.tipLabel.x = 233
			t.tipLabel.y = 975
			t.tipLabel.width = 289
			t.tipLabel.height = 22
			t.tipLabel.size = 20
			t.tipLabel.color = 0xffffff
			t.startBtn = new morn.Button
			t.addChild(t.startBtn)
			t.startBtn.skin = "main_json.btn_start"
			t.startBtn.x = 256
			t.startBtn.y = 1099
			t.startBtn.stateNum = 1
			t.pointerImg = new morn.Image
			t.addChild(t.pointerImg)
			t.pointerImg.skin = "main_json.tan_pointer"
			t.pointerImg.x = 372
			t.pointerImg.y = 590
			t.pointerImg.anchorX = 0.5
			t.pointerImg.anchorY = 0.652
			t.pointerImg.rotation = 0
			var n2:morn.Image = new morn.Image
			t.addChild(n2)
			n2.skin = "main_json.tan_titile"
			n2.x = 153
			n2.y = 227
			t.videoBtn = new morn.Button
			t.addChild(t.videoBtn)
			t.videoBtn.skin = "main_json.btn_video"
			t.videoBtn.x = 504
			t.videoBtn.y = 898
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