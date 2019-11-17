/**Created by the Morn,do not modify.*/
package game.ui.main {
	import morn.core.components.*;
	public class MainViewUI extends View {
		public var imgDogBtn:Button = null;
		public var fenHongBtn:Button = null;
		public var howBtn:Button = null;
		public var transferBtn:Button = null;
		public var msgBtn:Button = null;
		public var activityBtn:Button = null;
		public var steupBtn:Button = null;
		public var dogBtn:Button = null;
		public var waterDogBtn:Button = null;
		public var myDogBtn:Button = null;
		public var timeGoldLabel:Label = null;
		public var goldLabel:Label = null;
		public var rateLabel:Label = null;
		public var gainMoneyLabel:Label = null;
		public var gemLabel:Label = null;
		public var foodBtn:Image = null;
		public var rateImg:Image = null;
		public var bottomBox:Box = null;
		public var inviteBtn:Button = null;
		public var jiaSuBtn:Button = null;
		public var shopBtn:Button = null;
		public var restBtn:Button = null;
		public var speedTimeLabel:Label = null;
		protected static var uiXML:XML =
			<View width="750" height="1500">
			  <Image skin="jpg.main.bg.bom" x="0" y="0"/>
			  <Box x="17" y="160">
			    <Image skin="png.main.apcc_bg"/>
			  </Box>
			  <Button skin="png.main.btn_dogImg" x="155" y="285" stateNum="1" var="imgDogBtn"/>
			  <Button skin="png.main.btn_goldGainBg" x="24" y="53" stateNum="1" var="fenHongBtn"/>
			  <Image skin="png.main.gold_bg" x="23" y="424"/>
			  <Button skin="png.main.btn_howgame" x="34" y="284" stateNum="1" var="howBtn"/>
			  <Button skin="png.main.btn_transfer" x="267" y="284" stateNum="1" var="transferBtn"/>
			  <Button skin="png.main.btn_msg" x="381" y="283" stateNum="1" var="msgBtn"/>
			  <Button skin="png.main.btn_activity" x="495" y="284" stateNum="1" var="activityBtn"/>
			  <Button skin="png.main.btn_steup" x="605" y="285" stateNum="1" var="steupBtn"/>
			  <Button skin="png.main.btn_dog" x="299" y="422" stateNum="1" var="dogBtn"/>
			  <Button skin="png.main.btn_water" x="516" y="422" stateNum="1" var="waterDogBtn"/>
			  <Button skin="png.main.btn_dog1_5" x="604" y="43" stateNum="1" var="myDogBtn"/>
			  <Label text="13233333.5t/秒" x="105" y="479" width="161" height="28" size="22" align="center" color="0xffffff" selectable="false" mouseEnabled="false" var="timeGoldLabel"/>
			  <Label x="90" y="436" width="187" height="36" size="32" align="center" color="0x0" bold="true" text="9881235.55t" selectable="false" mouseEnabled="false" var="goldLabel"/>
			  <Label text="40%" x="503" y="76" width="43" height="28" size="25" align="center" color="0xffffff" selectable="false" mouseEnabled="false" var="rateLabel"/>
			  <Label text="13.5t/秒" x="133" y="109" width="148" height="28" size="25" align="center" color="0xffffff" selectable="false" mouseEnabled="false" var="gainMoneyLabel"/>
			  <Label text="100.309" x="98" y="196" width="196" height="38" size="40" align="left" color="0xffffff" selectable="false" mouseEnabled="false" var="gemLabel" bold="true"/>
			  <Image skin="png.main.sh" x="297" y="423" var="foodBtn"/>
			  <Image skin="png.main.water" x="517" y="423"/>
			  <Image skin="png.main.goldGainPro" x="334" y="114" var="rateImg"/>
			  <Box x="41" y="1146" var="bottomBox">
			    <Button skin="png.main.btn_yqjuan" y="44" var="inviteBtn" stateNum="1"/>
			    <Button skin="png.main.btn_jiaSu" x="185" y="44" stateNum="1" var="jiaSuBtn"/>
			    <Button skin="png.main.btn_shop" x="372" y="43" stateNum="1" var="shopBtn"/>
			    <Button skin="png.main.btn_rest" x="580" y="36" stateNum="1" var="restBtn"/>
			    <Label text="200秒" x="194" width="157" height="40" size="30" color="0x333333" align="center" var="speedTimeLabel" visible="false" bold="true" y="9"/>
			  </Box>
			</View>;
		public function MainViewUI(){}
		override protected function createChildren():void {
			super.createChildren();
			createView(uiXML);
		}
	}
}