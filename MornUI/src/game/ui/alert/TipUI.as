/**Created by the Morn,do not modify.*/
package game.ui.alert {
	import morn.core.components.*;
	public class TipUI extends View {
		public var sureBtn:Button = null;
		public var closeBtn:Button = null;
		public var tipLabel:Label = null;
		protected static var uiXML:XML =
			<View width="750" height="1400">
			  <Image skin="png.main.alert_bg" x="63" y="356"/>
			  <Image skin="png.main.title_tip" x="153" y="313"/>
			  <Image skin="png.main.bg.item_bg" x="131" y="470" width="476" height="153" sizeGrid="20,20,20,20"/>
			  <Button skin="png.main.btn_sure" x="248" y="713" stateNum="1" var="sureBtn"/>
			  <Button skin="png.main.btn_close" x="649" y="280" stateNum="1" var="closeBtn"/>
			  <Label text="这个功能暂时没有开放，请稍微等，我们会继续做下去，会约略略好的，你真的好呀" x="134" y="524" width="471" height="93" color="0x0" size="30" multiline="true" align="center" var="tipLabel"/>
			</View>;
		public function TipUI(){}
		override protected function createChildren():void {
			super.createChildren();
			createView(uiXML);
		}
	}
}