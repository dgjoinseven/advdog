namespace ui 
{
	export class MoneyPetMergeUI extends morn.View
	{
		public imgBg:morn.Image;		public dog38:morn.Image;		public dog41:morn.Image;		public dog42:morn.Image;		public dog39:morn.Image;		public dog40:morn.Image;		public zi39:morn.Image;		public zi41:morn.Image;		public zi38:morn.Image;		public zi40:morn.Image;		public zi42:morn.Image;		public mergeBtn:morn.Button;		public closeBtn:morn.Button;		
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
			t.imgBg = new morn.Image
			this.addChild(t.imgBg)
			t.imgBg.skin = morn.Morn.ResUrl + "main/bg/money_bg.png"
			t.imgBg.x = 370
			t.imgBg.y = 604
			t.imgBg.anchorX = 0.5
			t.imgBg.anchorY = 0.5
			t.dog38 = new morn.Image
			this.addChild(t.dog38)
			t.dog38.skin = "main_json.shop38"
			t.dog38.x = 415
			t.dog38.y = 349
			t.dog38.width = 323
			t.dog38.height = 323
			t.dog38.mouseEnabled = false
			t.dog41 = new morn.Image
			this.addChild(t.dog41)
			t.dog41.skin = "main_json.shop41"
			t.dog41.x = 48
			t.dog41.y = 576
			t.dog41.width = 323
			t.dog41.height = 323
			t.dog41.mouseEnabled = false
			t.dog42 = new morn.Image
			this.addChild(t.dog42)
			t.dog42.skin = "main_json.shop42"
			t.dog42.x = 327
			t.dog42.y = 602
			t.dog42.width = 323
			t.dog42.height = 323
			t.dog42.mouseEnabled = false
			t.dog39 = new morn.Image
			this.addChild(t.dog39)
			t.dog39.skin = "main_json.shop39"
			t.dog39.x = -4
			t.dog39.y = 336
			t.dog39.width = 323
			t.dog39.height = 323
			t.dog39.mouseEnabled = false
			t.dog40 = new morn.Image
			this.addChild(t.dog40)
			t.dog40.skin = "main_json.shop40"
			t.dog40.x = 212
			t.dog40.y = 216
			t.dog40.width = 323
			t.dog40.height = 323
			t.dog40.mouseEnabled = false
			t.zi39 = new morn.Image
			this.addChild(t.zi39)
			t.zi39.skin = "main_json.money_zhong"
			t.zi39.x = 213
			t.zi39.y = 503
			t.zi39.width = 92
			t.zi39.height = 95
			t.zi41 = new morn.Image
			this.addChild(t.zi41)
			t.zi41.skin = "main_json.money_yong"
			t.zi41.x = 250
			t.zi41.y = 651
			t.zi41.width = 88
			t.zi41.height = 88
			t.zi38 = new morn.Image
			this.addChild(t.zi38)
			t.zi38.skin = "main_json.money_zhi"
			t.zi38.x = 446
			t.zi38.y = 506
			t.zi38.width = 91
			t.zi38.height = 94
			t.zi40 = new morn.Image
			this.addChild(t.zi40)
			t.zi40.skin = "main_json.money_meng"
			t.zi40.x = 324
			t.zi40.y = 428
			t.zi40.width = 90
			t.zi40.height = 89
			t.zi42 = new morn.Image
			this.addChild(t.zi42)
			t.zi42.skin = "main_json.money_fu"
			t.zi42.x = 400
			t.zi42.y = 650
			t.zi42.width = 97
			t.zi42.height = 92
			t.mergeBtn = new morn.Button
			this.addChild(t.mergeBtn)
			t.mergeBtn.skin = "main_json.btn_money"
			t.mergeBtn.x = 313
			t.mergeBtn.y = 547
			t.mergeBtn.stateNum = 1
			t.closeBtn = new morn.Button
			this.addChild(t.closeBtn)
			t.closeBtn.skin = "main_json.btn_close"
			t.closeBtn.x = 600
			t.closeBtn.y = 289
			t.closeBtn.stateNum = 1
			var n1:morn.Image = new morn.Image
			this.addChild(n1)
			n1.skin = "main_json.title_money"
			n1.x = 155
			n1.y = 223
			
			
			
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