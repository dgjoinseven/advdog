/**Created by the Morn,do not modify.*/
package game.ui.alert {
	import morn.core.components.*;
	public class GainViewUI extends View {
		public var effectImg:Image = null;
		public var goldImg1:Image = null;
		public var goldImg2:Image = null;
		public var goldImg3:Image = null;
		public var gainLabel:Label = null;
		public var tipLabel:Label = null;
		public var videoBtn:Button = null;
		public var titleImg:Image = null;
		public var closeBtn:Button = null;
		protected static var uiXML:XML =
			<View width="750" height="1400" visible="true">
			  <Image skin="png.main.alert_bg" x="63" y="358"/>
			  <Image skin="png.main.bg.gold_effect_bg" x="357" y="570" var="effectImg" anchorX="0.5" anchorY="0.5"/>
			  <Image skin="png.main.gold_3" x="239" y="438" var="goldImg1"/>
			  <Image skin="png.main.gold_2" x="241" y="467" var="goldImg2" visible="false"/>
			  <Image skin="png.main.gold_1" x="262" y="481" var="goldImg3" visible="false"/>
			  <Image skin="png.main.window_gold_bg" x="217" y="685"/>
			  <Label text="1700、0t" x="221" y="699" width="299" height="40" bold="true" size="40" var="gainLabel" align="center"/>
			  <Label text="恭喜获得" x="117" y="15" width="133" height="32" bold="true" size="25"/>
			  <Label text="每天晚上20点重置视频次数(剩余14次)" x="184" y="848" width="397" height="24" size="20" color="0xffffff" align="center" var="tipLabel" visible="false"/>
			  <Button skin="png.main.btn_look" x="172" y="767" stateNum="1" var="videoBtn"/>
			  <Image skin="png.main.title_gain_gold" x="155" y="315" var="titleImg"/>
			  <Button skin="png.main.btn_close" x="645" y="280" stateNum="1" var="closeBtn"/>
			  <Button skin="png.main.btn_sure" x="261" y="759" stateNum="1"/>
			</View>;
		public function GainViewUI(){}
		override protected function createChildren():void {
			super.createChildren();
			createView(uiXML);
		}
	}
}