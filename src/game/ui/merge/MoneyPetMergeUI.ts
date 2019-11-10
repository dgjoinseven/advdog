namespace ui 
{
	export class MoneyPetMergeUI extends morn.View
	{
		public img39:morn.Image;		public img41:morn.Image;		public img40:morn.Image;		public img38:morn.Image;		public img42:morn.Image;		public mergeBtn:morn.Button;		public closeBtn:morn.Button;		
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
			n1.skin = morn.Morn.ResUrl + "main/bg/money_bg.png"
			n1.x = 109
			n1.y = 344
			t.img39 = new morn.Image
			this.addChild(t.img39)
			t.img39.skin = "main_json.money_zhong"
			t.img39.x = 120
			t.img39.y = 437
			t.img41 = new morn.Image
			this.addChild(t.img41)
			t.img41.skin = "main_json.money_yong"
			t.img41.x = 169
			t.img41.y = 710
			t.img40 = new morn.Image
			this.addChild(t.img40)
			t.img40.skin = "main_json.money_zhi"
			t.img40.x = 538
			t.img40.y = 463
			t.img38 = new morn.Image
			this.addChild(t.img38)
			t.img38.skin = "main_json.money_meng"
			t.img38.x = 321
			t.img38.y = 323
			t.img42 = new morn.Image
			this.addChild(t.img42)
			t.img42.skin = "main_json.money_fu"
			t.img42.x = 472
			t.img42.y = 714
			t.mergeBtn = new morn.Button
			this.addChild(t.mergeBtn)
			t.mergeBtn.skin = "main_json.btn_money"
			t.mergeBtn.x = 316
			t.mergeBtn.y = 548
			t.mergeBtn.stateNum = 1
			t.closeBtn = new morn.Button
			this.addChild(t.closeBtn)
			t.closeBtn.skin = "main_json.btn_close"
			t.closeBtn.x = 600
			t.closeBtn.y = 289
			t.closeBtn.stateNum = 1
			var n2:morn.Image = new morn.Image
			this.addChild(n2)
			n2.skin = "main_json.title_money"
			n2.x = 155
			n2.y = 223
			
			
			
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