/**Created by the Morn,do not modify.*/
package game.ui.main {
	import morn.core.components.*;
	public class MainViewUI extends View {
		public var imgDogBtn:Button = null;
		public var howBtn:Button = null;
		public var transferBtn:Button = null;
		public var msgBtn:Button = null;
		public var activityBtn:Button = null;
		public var steupBtn:Button = null;
		public var dogBtn:Button = null;
		public var waterDogBtn:Button = null;
		public var inviteBtn:Button = null;
		public var jiaSuBtn:Button = null;
		public var shopBtn:Button = null;
		public var restBtn:Button = null;
		public var myDogBtn:Button = null;
		public var timeGoldLabel:Label = null;
		public var goldLabel:Label = null;
		public var rateLabel:Label = null;
		public var gainMoneyLabel:Label = null;
		public var gemLabel:Label = null;
		public var foodBtn:Image = null;
		protected static var uiXML:XML =
			<View width="750" height="1500">
			  <Image skin="jpg.main.bg.bom" x="0" y="0"/>
			  <Box x="17" y="160">
			    <Image skin="png.main.apcc_bg"/>
			  </Box>
			  <Button skin="png.main.btn_dogImg" x="155" y="285" stateNum="1" var="imgDogBtn"/>
			  <Image skin="png.main.gold_bg" x="23" y="424"/>
			  <Image skin="png.main.goldGainBg" x="23" y="48"/>
			  <Button skin="png.main.btn_howgame" x="34" y="284" stateNum="1" var="howBtn"/>
			  <Button skin="png.main.btn_transfer" x="267" y="284" stateNum="1" var="transferBtn"/>
			  <Button skin="png.main.btn_msg" x="381" y="283" stateNum="1" var="msgBtn"/>
			  <Button skin="png.main.btn_activity" x="495" y="284" stateNum="1" var="activityBtn"/>
			  <Button skin="png.main.btn_steup" x="605" y="285" stateNum="1" var="steupBtn"/>
			  <Button skin="png.main.btn_dog" x="299" y="422" stateNum="1" var="dogBtn"/>
			  <Button skin="png.main.btn_water" x="516" y="422" stateNum="1" var="waterDogBtn"/>
			  <Button skin="png.main.btn_yqjuan" x="41" y="1190" var="inviteBtn" stateNum="1"/>
			  <Button skin="png.main.btn_jiaSu" x="226" y="1190" stateNum="1" var="jiaSuBtn"/>
			  <Button skin="png.main.btn_shop" x="413" y="1189" stateNum="1" var="shopBtn"/>
			  <Button skin="png.main.btn_rest" x="621" y="1182" stateNum="1" var="restBtn"/>
			  <Button skin="png.main.btn_dog1_5" x="605" y="47" stateNum="1" var="myDogBtn"/>
			  <Label text="13.5t/秒" x="109" y="478" width="148" height="28" size="25" align="center" color="0xffffff" selectable="false" mouseEnabled="false" var="timeGoldLabel"/>
			  <Label x="101" y="435" width="170" height="36" size="35" align="center" color="0x0" bold="true" text="1235.5 t" selectable="false" mouseEnabled="false" var="goldLabel"/>
			  <Label text="40%" x="509" y="71" width="43" height="28" size="25" align="center" color="0xffffff" selectable="false" mouseEnabled="false" var="rateLabel"/>
			  <Label text="13.5t/秒" x="133" y="103" width="148" height="28" size="25" align="center" color="0xffffff" selectable="false" mouseEnabled="false" var="gainMoneyLabel"/>
			  <Label text="100.309" x="98" y="196" width="196" height="38" size="40" align="left" color="0xffffff" selectable="false" mouseEnabled="false" var="gemLabel" bold="true"/>
			  <Image skin="png.main.sh" x="297" y="423" var="foodBtn"/>
			  <Image skin="png.main.water" x="517" y="423"/>
			</View>;
		public function MainViewUI(){}
		override protected function createChildren():void {
			super.createChildren();
			createView(uiXML);
		}
	}
}