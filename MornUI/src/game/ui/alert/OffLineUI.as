/**Created by the Morn,do not modify.*/
package game.ui.alert {
	import morn.core.components.*;
	public class OffLineUI extends View {
		public var effectImg:Image = null;
		public var gainLabel:Label = null;
		public var tipLabel:Label = null;
		public var titleImg:Image = null;
		public var closeBtn:Button = null;
		public var videoBtn:Button = null;
		protected static var uiXML:XML =
			<View width="750" height="1400">
			  <Image skin="png.main.alert_bg" x="65" y="357"/>
			  <Image skin="png.main.bg.gold_effect_bg" x="357" y="607" anchorX="0.5" anchorY="0.5" var="effectImg"/>
			  <Image skin="png.main.window_gold_bg" x="217" y="722"/>
			  <Label text="1700.0t" x="221" y="736" width="299" height="40" bold="true" size="40" var="gainLabel" align="center"/>
			  <Label text="恭喜获得" x="119" y="14" width="133" height="32" bold="true" size="25"/>
			  <Label x="177" y="886" width="397" height="24" size="20" color="0xffffff" align="center" var="tipLabel" visible="false"/>
			  <Image skin="png.main.title_gain_gold" x="157" y="314" var="titleImg"/>
			  <Button skin="png.main.btn_close" x="647" y="279" stateNum="1" var="closeBtn"/>
			  <Image skin="png.main.gold_2" x="231" y="462"/>
			  <Button skin="png.main.btn_offline" x="174" y="801" stateNum="1" var="videoBtn"/>
			</View>;
		public function OffLineUI(){}
		override protected function createChildren():void {
			super.createChildren();
			createView(uiXML);
		}
	}
}