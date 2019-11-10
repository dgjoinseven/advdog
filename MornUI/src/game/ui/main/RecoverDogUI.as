/**Created by the Morn,do not modify.*/
package game.ui.main {
	import morn.core.components.*;
	public class RecoverDogUI extends View {
		public var goldBgImg:Image = null;
		public var gainLabel:Label = null;
		public var goldImg:Image = null;
		public var closeBtn:Button = null;
		public var tipLabel:Label = null;
		public var cancelBtn:Button = null;
		public var sureBtn:Button = null;
		protected static var uiXML:XML =
			<View width="750" height="1400">
			  <Image skin="png.main.alert_bg" x="65" y="356"/>
			  <Image skin="png.main.gold_effect_bg" x="186" y="406" var="goldBgImg"/>
			  <Image skin="png.main.window_gold_bg" x="240" y="701"/>
			  <Label text="1700、0t" x="238" y="713" width="299" height="40" bold="true" size="40" var="gainLabel" align="center"/>
			  <Image skin="png.main.gold_1" x="262" y="485" var="goldImg"/>
			  <Image skin="png.main.title_recover" x="154" y="311"/>
			  <Button skin="png.main.btn_close" x="643" y="283" stateNum="1" var="closeBtn"/>
			  <Label text="您当前回收二哈犬，可获取：" x="110" y="426" width="522" height="40" align="center" size="30" var="tipLabel"/>
			  <Button label="取消" skin="png.main.btn_blue" x="183" y="776" stateNum="1" var="cancelBtn" labelBold="true" labelSize="30"/>
			  <Button label="确定" skin="png.main.btn_yellow" x="396" y="775" stateNum="1" var="sureBtn" labelBold="true" labelSize="30"/>
			</View>;
		public function RecoverDogUI(){}
		override protected function createChildren():void {
			super.createChildren();
			createView(uiXML);
		}
	}
}