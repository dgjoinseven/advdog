/**Created by the Morn,do not modify.*/
package game.ui.alert {
	import morn.core.components.*;
	public class TipDogUI extends View {
		public var sureBtn:Button = null;
		public var videoBtn:Button = null;
		public var closeBtn:Button = null;
		public var tipLabel:Label = null;
		protected static var uiXML:XML =
			<View width="750" height="1400">
			  <Image skin="png.main.alert_bg" x="63" y="356"/>
			  <Image skin="png.main.title_tip" x="153" y="313"/>
			  <Image skin="png.main.item_bg" x="131" y="470" width="476" height="153" sizeGrid="20,20,20,20"/>
			  <Button skin="png.main.btn_sure" x="251" y="662" stateNum="1" var="sureBtn"/>
			  <Button skin="png.main.btn_look" x="183" y="795" stateNum="1" var="videoBtn"/>
			  <Button skin="png.main.btn_close" x="649" y="280" stateNum="1" var="closeBtn"/>
			  <Label text="您没狗粮，请观看视频获得" x="134" y="524" width="471" height="43" color="0x0" size="30" multiline="false" align="center" var="tipLabel"/>
			</View>;
		public function TipDogUI(){}
		override protected function createChildren():void {
			super.createChildren();
			createView(uiXML);
		}
	}
}