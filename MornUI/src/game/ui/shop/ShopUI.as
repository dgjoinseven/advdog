/**Created by the Morn,do not modify.*/
package game.ui.shop {
	import morn.core.components.*;
	public class ShopUI extends View {
		public var goldLabel:Label = null;
		public var closeBtn:Button = null;
		public var panel:Panel = null;
		protected static var uiXML:XML =
			<View width="750" height="1400">
			  <Image skin="png.main.alert_bg" x="63" y="202" sizeGrid="200,200,200,200" height="995"/>
			  <Image skin="png.main.window_gold_bg" x="126" y="290" sizeGrid="50,50,50,50" width="358" height="68"/>
			  <Image skin="png.main.gold" x="163" y="303"/>
			  <Label x="202" y="299" width="276" height="51" size="40" bold="true" align="center" var="goldLabel"/>
			  <Image skin="png.main.shop_title" x="155" y="158"/>
			  <Button skin="png.main.btn_close" x="644" y="127" stateNum="1" var="closeBtn"/>
			  <Panel x="112" y="384" width="486" height="712" var="panel" vScrollBarSkin="null"/>
			</View>;
		public function ShopUI(){}
		override protected function createChildren():void {
			super.createChildren();
			createView(uiXML);
		}
	}
}