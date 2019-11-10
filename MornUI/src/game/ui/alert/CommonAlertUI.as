/**Created by the Morn,do not modify.*/
package game.ui.alert {
	import morn.core.components.*;
	public class CommonAlertUI extends View {
		public var effectImg:Image = null;
		public var titleImg:Image = null;
		public var closeBtn:Button = null;
		public var videoImg:Image = null;
		public var videoBtn:Button = null;
		public var tipLabel:Label = null;
		public var gainLabel:Label = null;
		protected static var uiXML:XML =
			<View width="750" height="1400">
			  <Image skin="png.main.alert_bg" x="62" y="356"/>
			  <Image skin="png.main.bg.gold_effect_bg" x="367" y="582" var="effectImg" anchorX="0.5" anchorY="0.5"/>
			  <Label text="恭喜获得" x="127" y="25" width="133" height="32" bold="true" size="25"/>
			  <Image skin="png.main.title_gain_gold" x="156" y="312" var="titleImg"/>
			  <Button skin="png.main.btn_close" x="646" y="281" stateNum="1" var="closeBtn"/>
			  <Image skin="png.main.window_gold_bg" x="207" y="692"/>
			  <Image skin="png.main.logo_apcc" x="347" y="538" var="videoImg"/>
			  <Button label="确定" skin="png.main.btn_yellow" x="169" y="766" stateNum="1" sizeGrid="20,20,20,20" width="394" height="77" labelSize="40" var="videoBtn" visible="false"/>
			  <Label text="每天晚上20点重置视频次数(剩余14次)" x="186" y="847" width="397" height="24" size="20" color="0xffffff" align="center" var="tipLabel" visible="false"/>
			  <Label text="1700、0t" x="219" y="707" width="299" height="40" bold="true" size="40" var="gainLabel" align="center"/>
			</View>;
		public function CommonAlertUI(){}
		override protected function createChildren():void {
			super.createChildren();
			createView(uiXML);
		}
	}
}