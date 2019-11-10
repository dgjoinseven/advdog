namespace ui 
{
	export class RamdomMergePetUI extends morn.View
	{
		public startBtn:morn.Button;		public closeBtn:morn.Button;		public zhong1Effect:morn.Image;		public zhong2Effect:morn.Image;		public meng1Effect:morn.Image;		public meng2Effect:morn.Image;		public fuEffect:morn.Image;		public zhiEffect:morn.Image;		public yongEffect:morn.Image;		public fenhongImg:morn.Image;		
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
			n1.skin = morn.Morn.ResUrl + "main/bg/radomMergeBg.png"
			n1.x = 64
			n1.y = 277
			var n2:morn.Image = new morn.Image
			this.addChild(n2)
			n2.skin = "main_json.perfect_fuzi"
			n2.x = 155
			n2.y = 517
			var n3:morn.Image = new morn.Image
			this.addChild(n3)
			n3.skin = "main_json.perfect_meng"
			n3.x = 401
			n3.y = 724
			var n4:morn.Image = new morn.Image
			this.addChild(n4)
			n4.skin = "main_json.perfect_meng"
			n4.x = 220
			n4.y = 410
			var n5:morn.Image = new morn.Image
			this.addChild(n5)
			n5.skin = "main_json.perfect_zhong"
			n5.x = 174
			n5.y = 646
			var n6:morn.Image = new morn.Image
			this.addChild(n6)
			n6.skin = "main_json.perfect_zhong"
			n6.x = 451
			n6.y = 412
			var n7:morn.Image = new morn.Image
			this.addChild(n7)
			n7.skin = "main_json.perfect_yong"
			n7.x = 498
			n7.y = 644
			var n8:morn.Image = new morn.Image
			this.addChild(n8)
			n8.skin = "main_json.perfect_zhi"
			n8.x = 517
			n8.y = 516
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
			t.zhong1Effect = new morn.Image
			this.addChild(t.zhong1Effect)
			t.zhong1Effect.skin = "main_json.perfect_effect"
			t.zhong1Effect.x = 439
			t.zhong1Effect.y = 391
			t.zhong2Effect = new morn.Image
			this.addChild(t.zhong2Effect)
			t.zhong2Effect.skin = "main_json.perfect_effect"
			t.zhong2Effect.x = 164
			t.zhong2Effect.y = 628
			t.meng1Effect = new morn.Image
			this.addChild(t.meng1Effect)
			t.meng1Effect.skin = "main_json.perfect_effect"
			t.meng1Effect.x = 388
			t.meng1Effect.y = 707
			t.meng2Effect = new morn.Image
			this.addChild(t.meng2Effect)
			t.meng2Effect.skin = "main_json.perfect_effect"
			t.meng2Effect.x = 201
			t.meng2Effect.y = 392
			t.fuEffect = new morn.Image
			this.addChild(t.fuEffect)
			t.fuEffect.skin = "main_json.perfect_effect"
			t.fuEffect.x = 138
			t.fuEffect.y = 502
			t.zhiEffect = new morn.Image
			this.addChild(t.zhiEffect)
			t.zhiEffect.skin = "main_json.perfect_effect"
			t.zhiEffect.x = 505
			t.zhiEffect.y = 500
			t.yongEffect = new morn.Image
			this.addChild(t.yongEffect)
			t.yongEffect.skin = "main_json.perfect_effect"
			t.yongEffect.x = 483
			t.yongEffect.y = 624
			var n9:morn.Image = new morn.Image
			this.addChild(n9)
			n9.skin = "main_json.head_hongbao"
			n9.x = 274
			n9.y = 717
			n9.scale = 0.85
			n9.guide = "hongbaoImg"
			t.fenhongImg = new morn.Image
			this.addChild(t.fenhongImg)
			t.fenhongImg.skin = "main_json.hean_fenhong"
			t.fenhongImg.x = 331
			t.fenhongImg.y = 356
			t.fenhongImg.scale = 0.85
			var n10:morn.Image = new morn.Image
			this.addChild(n10)
			n10.skin = "main_json.title_perfect"
			n10.x = 152
			n10.y = 224
			
			
			
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