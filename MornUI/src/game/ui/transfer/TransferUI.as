/**Created by the Morn,do not modify.*/
package game.ui.transfer {
	import morn.core.components.*;
	public class TransferUI extends View {
		public var pecksLabel:View = null;
		public var closeBtn:Button = null;
		public var pecksLabel:Label = null;
		public var tipLabel:Label = null;
		public var startBtn:Button = null;
		public var pointerImg:Image = null;
		public var videoBtn:Button = null;
		protected static var uiXML:XML =
			<View width="750" height="1400" var="pecksLabel">
			  <Image skin="png.main.bg.tan_bg" x="101" y="318"/>
			  <Button skin="png.main.btn_close" x="598" y="292" stateNum="1" var="closeBtn"/>
			  <Label text="转盘卷 x 5" x="240" y="892" width="266" height="56" size="50" color="0x331e00" var="pecksLabel"/>
			  <Label text="消耗完每天凌晨赠送5张转盘卷" x="233" y="975" width="289" height="22" size="20" color="0xffffff" var="tipLabel"/>
			  <Button skin="png.main.btn_start" x="256" y="1099" stateNum="1" var="startBtn"/>
			  <Image skin="png.main.tan_pointer" x="372" y="590" var="pointerImg" anchorX="0.5" anchorY="0.652" rotation="0"/>
			  <Image skin="png.main.tan_titile" x="153" y="227"/>
			  <Button skin="png.main.btn_video" x="504" y="898" stateNum="1" var="videoBtn"/>
			</View>;
		public function TransferUI(){}
		override protected function createChildren():void {
			super.createChildren();
			createView(uiXML);
		}
	}
}