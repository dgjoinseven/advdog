/**Created by the Morn,do not modify.*/
package game.ui.setup {
	import morn.core.components.*;
	import game.ui.common.SliderComUI;
	public class SetupViewUI extends View {
		public var closeBtn:View = null;
		public var closeBtn:Button = null;
		protected static var uiXML:XML =
			<View width="750" height="1400" var="closeBtn">
			  <Image skin="png.main.alert_bg" x="65" y="356"/>
			  <SliderCom x="445" y="559" runtime="game.ui.common.SliderComUI"/>
			  <Label text="音效" x="176" y="552" width="106" height="49" size="50"/>
			  <Button skin="png.main.btn_close" x="645" y="281" stateNum="1" var="closeBtn"/>
			  <Image skin="png.main.title_setup" x="153" y="314"/>
			</View>;
		public function SetupViewUI(){}
		override protected function createChildren():void {
			viewClassMap["game.ui.common.SliderComUI"] = SliderComUI;
			super.createChildren();
			createView(uiXML);
		}
	}
}