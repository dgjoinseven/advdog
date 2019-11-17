/**Created by the Morn,do not modify.*/
package game.ui.diagram {
	import morn.core.components.*;
	public class DiagramUI extends View {
		public var panel:Panel = null;
		public var closeBtn:Button = null;
		protected static var uiXML:XML =
			<View width="750" height="1400">
			  <Image skin="png.main.bg.0_狗狗图鉴" x="0" y="0"/>
			  <Image skin="png.main.bg.deam_bg" x="63" y="203" width="600" height="992" sizeGrid="200,200,200,200"/>
			  <Panel vScrollBarSkin="null" width="599" height="853" var="panel" x="74" y="269"/>
			  <Button skin="png.main.btn_close" x="645" y="125" stateNum="1" var="closeBtn"/>
			  <Image skin="png.main.title_dog_img" x="155" y="157"/>
			</View>;
		public function DiagramUI(){}
		override protected function createChildren():void {
			super.createChildren();
			createView(uiXML);
		}
	}
}