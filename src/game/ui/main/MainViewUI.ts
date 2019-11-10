namespace ui 
{
	export class MainViewUI extends morn.View
	{
		public imgDogBtn:morn.Button;		public fenHongBtn:morn.Button;		public howBtn:morn.Button;		public transferBtn:morn.Button;		public msgBtn:morn.Button;		public activityBtn:morn.Button;		public steupBtn:morn.Button;		public dogBtn:morn.Button;		public waterDogBtn:morn.Button;		public inviteBtn:morn.Button;		public jiaSuBtn:morn.Button;		public shopBtn:morn.Button;		public restBtn:morn.Button;		public myDogBtn:morn.Button;		public timeGoldLabel:morn.Label;		public goldLabel:morn.Label;		public rateLabel:morn.Label;		public gainMoneyLabel:morn.Label;		public gemLabel:morn.Label;		public foodBtn:morn.Image;		public speedTimeLabel:morn.Label;		
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
			this.height = 1500
			var n1:morn.Image = new morn.Image
			this.addChild(n1)
			n1.skin = morn.Morn.ResUrl + "main/bg/bom.jpg"
			n1.x = 0
			n1.y = 0
			var n2:morn.Image = new morn.Image
			this.addChild(n2)
			n2.skin = "main_json.blank"
			n2.x = 0
			n2.y = 0
			n2.width = 752
			n2.height = 543
			var n3:morn.Image = new morn.Image
			this.addChild(n3)
			n3.skin = "main_json.blank"
			n3.x = 0
			n3.y = 0
			n3.width = 752
			n3.height = 543
			var n4:morn.Box = new morn.Box
			this.addChild(n4)
			n4.x = 17
			n4.y = 160
			var n5:morn.Image = new morn.Image
			n4.addChild(n5)
			n5.skin = "main_json.apcc_bg"
			t.imgDogBtn = new morn.Button
			this.addChild(t.imgDogBtn)
			t.imgDogBtn.skin = "main_json.btn_dogImg"
			t.imgDogBtn.x = 155
			t.imgDogBtn.y = 285
			t.imgDogBtn.stateNum = 1
			t.fenHongBtn = new morn.Button
			this.addChild(t.fenHongBtn)
			t.fenHongBtn.skin = "main_json.btn_goldGainBg"
			t.fenHongBtn.x = 24
			t.fenHongBtn.y = 47
			t.fenHongBtn.stateNum = 1
			var n6:morn.Image = new morn.Image
			this.addChild(n6)
			n6.skin = "main_json.gold_bg"
			n6.x = 23
			n6.y = 424
			t.howBtn = new morn.Button
			this.addChild(t.howBtn)
			t.howBtn.skin = "main_json.btn_howgame"
			t.howBtn.x = 34
			t.howBtn.y = 284
			t.howBtn.stateNum = 1
			t.transferBtn = new morn.Button
			this.addChild(t.transferBtn)
			t.transferBtn.skin = "main_json.btn_transfer"
			t.transferBtn.x = 267
			t.transferBtn.y = 284
			t.transferBtn.stateNum = 1
			t.msgBtn = new morn.Button
			this.addChild(t.msgBtn)
			t.msgBtn.skin = "main_json.btn_msg"
			t.msgBtn.x = 381
			t.msgBtn.y = 283
			t.msgBtn.stateNum = 1
			t.activityBtn = new morn.Button
			this.addChild(t.activityBtn)
			t.activityBtn.skin = "main_json.btn_activity"
			t.activityBtn.x = 495
			t.activityBtn.y = 284
			t.activityBtn.stateNum = 1
			t.steupBtn = new morn.Button
			this.addChild(t.steupBtn)
			t.steupBtn.skin = "main_json.btn_steup"
			t.steupBtn.x = 605
			t.steupBtn.y = 285
			t.steupBtn.stateNum = 1
			t.dogBtn = new morn.Button
			this.addChild(t.dogBtn)
			t.dogBtn.skin = "main_json.btn_dog"
			t.dogBtn.x = 299
			t.dogBtn.y = 422
			t.dogBtn.stateNum = 1
			t.waterDogBtn = new morn.Button
			this.addChild(t.waterDogBtn)
			t.waterDogBtn.skin = "main_json.btn_water"
			t.waterDogBtn.x = 516
			t.waterDogBtn.y = 422
			t.waterDogBtn.stateNum = 1
			t.inviteBtn = new morn.Button
			this.addChild(t.inviteBtn)
			t.inviteBtn.skin = "main_json.btn_yqjuan"
			t.inviteBtn.x = 41
			t.inviteBtn.y = 1190
			t.inviteBtn.stateNum = 1
			t.jiaSuBtn = new morn.Button
			this.addChild(t.jiaSuBtn)
			t.jiaSuBtn.skin = "main_json.btn_jiaSu"
			t.jiaSuBtn.x = 226
			t.jiaSuBtn.y = 1190
			t.jiaSuBtn.stateNum = 1
			t.shopBtn = new morn.Button
			this.addChild(t.shopBtn)
			t.shopBtn.skin = "main_json.btn_shop"
			t.shopBtn.x = 413
			t.shopBtn.y = 1189
			t.shopBtn.stateNum = 1
			t.restBtn = new morn.Button
			this.addChild(t.restBtn)
			t.restBtn.skin = "main_json.btn_rest"
			t.restBtn.x = 621
			t.restBtn.y = 1182
			t.restBtn.stateNum = 1
			t.myDogBtn = new morn.Button
			this.addChild(t.myDogBtn)
			t.myDogBtn.skin = "main_json.btn_dog1_5"
			t.myDogBtn.x = 605
			t.myDogBtn.y = 47
			t.myDogBtn.stateNum = 1
			t.timeGoldLabel = new morn.Label
			this.addChild(t.timeGoldLabel)
			t.timeGoldLabel.text = "13.5t/秒"
			t.timeGoldLabel.x = 109
			t.timeGoldLabel.y = 478
			t.timeGoldLabel.width = 148
			t.timeGoldLabel.height = 28
			t.timeGoldLabel.size = 25
			t.timeGoldLabel.align = "center"
			t.timeGoldLabel.color = 0xffffff
			t.timeGoldLabel.selectable = false
			t.timeGoldLabel.mouseEnabled = false
			t.goldLabel = new morn.Label
			this.addChild(t.goldLabel)
			t.goldLabel.x = 101
			t.goldLabel.y = 435
			t.goldLabel.width = 170
			t.goldLabel.height = 36
			t.goldLabel.size = 35
			t.goldLabel.align = "center"
			t.goldLabel.color = 0x0
			t.goldLabel.bold = true
			t.goldLabel.text = "1235.5 t"
			t.goldLabel.selectable = false
			t.goldLabel.mouseEnabled = false
			t.rateLabel = new morn.Label
			this.addChild(t.rateLabel)
			t.rateLabel.text = "40%"
			t.rateLabel.x = 503
			t.rateLabel.y = 70
			t.rateLabel.width = 43
			t.rateLabel.height = 28
			t.rateLabel.size = 25
			t.rateLabel.align = "center"
			t.rateLabel.color = 0xffffff
			t.rateLabel.selectable = false
			t.rateLabel.mouseEnabled = false
			t.gainMoneyLabel = new morn.Label
			this.addChild(t.gainMoneyLabel)
			t.gainMoneyLabel.text = "13.5t/秒"
			t.gainMoneyLabel.x = 133
			t.gainMoneyLabel.y = 103
			t.gainMoneyLabel.width = 148
			t.gainMoneyLabel.height = 28
			t.gainMoneyLabel.size = 25
			t.gainMoneyLabel.align = "center"
			t.gainMoneyLabel.color = 0xffffff
			t.gainMoneyLabel.selectable = false
			t.gainMoneyLabel.mouseEnabled = false
			t.gemLabel = new morn.Label
			this.addChild(t.gemLabel)
			t.gemLabel.text = "100.309"
			t.gemLabel.x = 98
			t.gemLabel.y = 196
			t.gemLabel.width = 196
			t.gemLabel.height = 38
			t.gemLabel.size = 40
			t.gemLabel.align = "left"
			t.gemLabel.color = 0xffffff
			t.gemLabel.selectable = false
			t.gemLabel.mouseEnabled = false
			t.gemLabel.bold = true
			t.foodBtn = new morn.Image
			this.addChild(t.foodBtn)
			t.foodBtn.skin = "main_json.sh"
			t.foodBtn.x = 297
			t.foodBtn.y = 423
			var n7:morn.Image = new morn.Image
			this.addChild(n7)
			n7.skin = "main_json.water"
			n7.x = 517
			n7.y = 423
			var n8:morn.Image = new morn.Image
			this.addChild(n8)
			n8.skin = "main_json.goldGainPro"
			n8.x = 334
			n8.y = 108
			t.speedTimeLabel = new morn.Label
			this.addChild(t.speedTimeLabel)
			t.speedTimeLabel.text = "200"
			t.speedTimeLabel.x = 233
			t.speedTimeLabel.y = 1146
			t.speedTimeLabel.width = 157
			t.speedTimeLabel.height = 40
			t.speedTimeLabel.size = 30
			t.speedTimeLabel.color = 0xffffff
			t.speedTimeLabel.align = "center"
			t.speedTimeLabel.visible = false
			
			
			
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