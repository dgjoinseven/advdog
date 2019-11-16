/**Created by the Morn,do not modify.*/
package game.ui.main {
	import morn.core.components.*;
	public class InviteUI extends View {
		public var btn_invite_:View = null;
		public var closeBtn:Button = null;
		public var pyqBtn:Button = null;
		public var qqBtn:Button = null;
		public var wbBtn:Button = null;
		public var wxBtn:Button = null;
		public var zoneBtn:Button = null;
		public var inviteBtn:Button = null;
		protected static var uiXML:XML =
			<View width="750" height="1400" var="btn_invite_">
			  <Image skin="png.main.alert_bg" x="62" y="358"/>
			  <Button skin="png.main.btn_close" x="645" y="281" stateNum="1" var="closeBtn"/>
			  <Image skin="png.main.title_invite" x="154" y="314"/>
			  <Button skin="png.main.btn_invite_pyq" x="230" y="739" stateNum="1" var="pyqBtn" visible="false"/>
			  <Button skin="png.main.btn_invite_qq" x="426" y="738" stateNum="1" var="qqBtn" visible="false"/>
			  <Button skin="png.main.btn_invite_wb" x="327" y="739" stateNum="1" var="wbBtn" visible="false"/>
			  <Button skin="png.main.btn_invite_wx" x="139" y="739" stateNum="1" var="wxBtn" visible="false"/>
			  <Button skin="png.main.btn_invite_zone" x="524" y="739" stateNum="1" var="zoneBtn" visible="false"/>
			  <Button label="邀请" skin="png.main.btn_syellow" x="317" y="563" stateNum="1" var="inviteBtn" labelSize="25" labelColors="0xffffff"/>
			  <Label text="微信" x="140" y="815" color="0xd6d6d6" width="69" height="22" align="center" mouseEnabled="false" size="20" visible="false"/>
			  <Label text="朋友圈" x="232" y="815" color="0xd6d6d6" width="69" height="22" align="center" mouseEnabled="false" size="20" visible="false"/>
			  <Label text="微博" x="330" y="815" color="0xd6d6d6" width="69" height="22" align="center" mouseEnabled="false" size="20" visible="false"/>
			  <Label text="QQ" x="430" y="815" color="0xd6d6d6" width="69" height="22" align="center" mouseEnabled="false" size="20" visible="false"/>
			  <Label text="QQ空间" x="525" y="815" color="0xd6d6d6" width="79" height="22" align="center" mouseEnabled="false" size="20" visible="false"/>
			</View>;
		public function InviteUI(){}
		override protected function createChildren():void {
			super.createChildren();
			createView(uiXML);
		}
	}
}