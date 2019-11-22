namespace ui 
{
	export class RamdomMergePetUI extends morn.View
	{
		public startBtn:morn.Button;		public closeBtn:morn.Button;		public effect392:morn.Image;		public effect391:morn.Image;		public effect382:morn.Image;		public effect381:morn.Image;		public effect42:morn.Image;		public effect40:morn.Image;		public effect41:morn.Image;		public img43:morn.Image;		public img44:morn.Image;		public effect44:morn.Image;		public effect43:morn.Image;		
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
			this.visible = true
			var n1:morn.Image = new morn.Image
			this.addChild(n1)
			n1.skin = morn.Morn.ResUrl + "main/bg/radomMergeBg.png"
			n1.x = 64
			n1.y = 277
			var n2:morn.Image = new morn.Image
			this.addChild(n2)
			n2.skin = "main_json.perfect_fuzi"
			n2.x = 201
			n2.y = 525
			var n3:morn.Image = new morn.Image
			this.addChild(n3)
			n3.skin = "main_json.perfect_meng"
			n3.x = 385
			n3.y = 683
			var n4:morn.Image = new morn.Image
			this.addChild(n4)
			n4.skin = "main_json.perfect_meng"
			n4.x = 244
			n4.y = 439
			var n5:morn.Image = new morn.Image
			this.addChild(n5)
			n5.skin = "main_json.perfect_zhong"
			n5.x = 219
			n5.y = 621
			var n6:morn.Image = new morn.Image
			this.addChild(n6)
			n6.skin = "main_json.perfect_zhong"
			n6.x = 432
			n6.y = 432
			var n7:morn.Image = new morn.Image
			this.addChild(n7)
			n7.skin = "main_json.perfect_yong"
			n7.x = 463
			n7.y = 619
			var n8:morn.Image = new morn.Image
			this.addChild(n8)
			n8.skin = "main_json.perfect_zhi"
			n8.x = 480
			n8.y = 519
			t.startBtn = new morn.Button
			this.addChild(t.startBtn)
			t.startBtn.skin = "main_json.btn_start"
			t.startBtn.x = 256
			t.startBtn.y = 941
			t.startBtn.stateNum = 1
			t.closeBtn = new morn.Button
			this.addChild(t.closeBtn)
			t.closeBtn.skin = "main_json.btn_close"
			t.closeBtn.x = 601
			t.closeBtn.y = 291
			t.closeBtn.stateNum = 1
			t.effect392 = new morn.Image
			this.addChild(t.effect392)
			t.effect392.x = 500
			t.effect392.y = 444
			t.effect392.anchorX = 0.5
			t.effect392.anchorY = 0.5
			t.effect392.visible = false
			t.effect391 = new morn.Image
			this.addChild(t.effect391)
			t.effect391.x = 225
			t.effect391.y = 681
			t.effect391.anchorX = 0.5
			t.effect391.anchorY = 0.5
			t.effect391.visible = false
			t.effect382 = new morn.Image
			this.addChild(t.effect382)
			t.effect382.x = 451
			t.effect382.y = 760
			t.effect382.visible = false
			t.effect382.anchorX = 0.5
			t.effect382.anchorY = 0.5
			t.effect381 = new morn.Image
			this.addChild(t.effect381)
			t.effect381.x = 264
			t.effect381.y = 447
			t.effect381.anchorX = 0.5
			t.effect381.anchorY = 0.5
			t.effect381.visible = false
			t.effect42 = new morn.Image
			this.addChild(t.effect42)
			t.effect42.x = 201
			t.effect42.y = 554
			t.effect42.anchorX = 0.5
			t.effect42.anchorY = 0.5
			t.effect42.visible = false
			t.effect40 = new morn.Image
			this.addChild(t.effect40)
			t.effect40.x = 569
			t.effect40.y = 552
			t.effect40.anchorX = 0.5
			t.effect40.anchorY = 0.5
			t.effect40.visible = false
			t.effect41 = new morn.Image
			this.addChild(t.effect41)
			t.effect41.x = 547
			t.effect41.y = 679
			t.effect41.anchorX = 0.5
			t.effect41.anchorY = 0.5
			t.effect41.visible = false
			t.img43 = new morn.Image
			this.addChild(t.img43)
			t.img43.skin = "main_json.dog43"
			t.img43.x = 274
			t.img43.y = 717
			t.img43.scale = 0.85
			t.img44 = new morn.Image
			this.addChild(t.img44)
			t.img44.skin = "main_json.dog44"
			t.img44.x = 331
			t.img44.y = 356
			t.img44.scale = 0.85
			var n9:morn.Image = new morn.Image
			this.addChild(n9)
			n9.skin = "main_json.title_perfect"
			n9.x = 152
			n9.y = 224
			t.effect44 = new morn.Image
			this.addChild(t.effect44)
			t.effect44.x = 381
			t.effect44.y = 401
			t.effect44.anchorX = 0.5
			t.effect44.anchorY = 0.5
			t.effect44.visible = false
			t.effect43 = new morn.Image
			this.addChild(t.effect43)
			t.effect43.x = 322
			t.effect43.y = 763
			t.effect43.anchorX = 0.5
			t.effect43.anchorY = 0.5
			t.effect43.visible = false
			
			
			
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