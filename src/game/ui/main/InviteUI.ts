namespace ui 
{
	export class InviteUI extends morn.View
	{
		public closeBtn:morn.Button;
		public pyqBtn:morn.Button;
		public qqBtn:morn.Button;
		public wbBtn:morn.Button;
		public wxBtn:morn.Button;
		public zoneBtn:morn.Button;
		public inviteBtn:morn.Button;
		
		public constructor()
		{
			super();
			//t.initVisible = false;
			//App.stage.addEventListener(UIEvent.RENDER_COMPLETED,onRenderComplete);
		}

		protected createChildren():void
		{
			super.createChildren();
			//initObject();
			//t.initNewObject();
			var t = t;
			t.width = 750
			t.height = 1400
			var n1:morn.Image = new morn.Image
			t.t.addChild(n1)
			n1.skin = "main_json.alert_bg"
			n1.x = 62
			n1.y = 358
			t.closeBtn = new morn.Button
			t.t.addChild(t.closeBtn)
			t.closeBtn.skin = "main_json.btn_close"
			t.closeBtn.x = 645
			t.closeBtn.y = 281
			t.closeBtn.stateNum = 1
			var n2:morn.Image = new morn.Image
			t.t.addChild(n2)
			n2.skin = "main_json.title_invite"
			n2.x = 154
			n2.y = 314
			t.pyqBtn = new morn.Button
			t.t.addChild(t.pyqBtn)
			t.pyqBtn.skin = "main_json.btn_invite_pyq"
			t.pyqBtn.x = 230
			t.pyqBtn.y = 739
			t.pyqBtn.stateNum = 1
			t.pyqBtn.visible = false
			t.qqBtn = new morn.Button
			t.t.addChild(t.qqBtn)
			t.qqBtn.skin = "main_json.btn_invite_qq"
			t.qqBtn.x = 426
			t.qqBtn.y = 738
			t.qqBtn.stateNum = 1
			t.qqBtn.visible = false
			t.wbBtn = new morn.Button
			t.t.addChild(t.wbBtn)
			t.wbBtn.skin = "main_json.btn_invite_wb"
			t.wbBtn.x = 327
			t.wbBtn.y = 739
			t.wbBtn.stateNum = 1
			t.wbBtn.visible = false
			t.wxBtn = new morn.Button
			t.t.addChild(t.wxBtn)
			t.wxBtn.skin = "main_json.btn_invite_wx"
			t.wxBtn.x = 139
			t.wxBtn.y = 739
			t.wxBtn.stateNum = 1
			t.wxBtn.visible = false
			t.zoneBtn = new morn.Button
			t.t.addChild(t.zoneBtn)
			t.zoneBtn.skin = "main_json.btn_invite_zone"
			t.zoneBtn.x = 524
			t.zoneBtn.y = 739
			t.zoneBtn.stateNum = 1
			t.zoneBtn.visible = false
			t.inviteBtn = new morn.Button
			t.t.addChild(t.inviteBtn)
			t.inviteBtn.label = "邀请"
			t.inviteBtn.skin = "main_json.btn_syellow"
			t.inviteBtn.x = 317
			t.inviteBtn.y = 563
			t.inviteBtn.stateNum = 1
			t.inviteBtn.labelSize = 25
			t.inviteBtn.labelColors = "0xffffff"
			var n3:morn.Label = new morn.Label
			t.t.addChild(n3)
			n3.text = "微信"
			n3.x = 140
			n3.y = 815
			n3.color = 0xd6d6d6
			n3.width = 69
			n3.height = 22
			n3.align = "center"
			n3.mouseEnabled = false
			n3.size = 20
			n3.visible = false
			var n4:morn.Label = new morn.Label
			t.t.addChild(n4)
			n4.text = "朋友圈"
			n4.x = 232
			n4.y = 815
			n4.color = 0xd6d6d6
			n4.width = 69
			n4.height = 22
			n4.align = "center"
			n4.mouseEnabled = false
			n4.size = 20
			n4.visible = false
			var n5:morn.Label = new morn.Label
			t.t.addChild(n5)
			n5.text = "微博"
			n5.x = 330
			n5.y = 815
			n5.color = 0xd6d6d6
			n5.width = 69
			n5.height = 22
			n5.align = "center"
			n5.mouseEnabled = false
			n5.size = 20
			n5.visible = false
			var n6:morn.Label = new morn.Label
			t.t.addChild(n6)
			n6.text = "QQ"
			n6.x = 430
			n6.y = 815
			n6.color = 0xd6d6d6
			n6.width = 69
			n6.height = 22
			n6.align = "center"
			n6.mouseEnabled = false
			n6.size = 20
			n6.visible = false
			var n7:morn.Label = new morn.Label
			t.t.addChild(n7)
			n7.text = "QQ空间"
			n7.x = 525
			n7.y = 815
			n7.color = 0xd6d6d6
			n7.width = 79
			n7.height = 22
			n7.align = "center"
			n7.mouseEnabled = false
			n7.size = 20
			n7.visible = false
			
			
			
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