/**Created by the Morn,do not modify.*/
package game.ui.main {
	import morn.core.components.*;
	public class SpeedUpUI extends View {
		public var add60Btn:Button = null;
		public var add200Btn:Button = null;
		public var closeBtn:Button = null;
		protected static var uiXML:XML =
			<View width="750" height="1400">
			  <Image skin="png.main.alert_bg" x="63" y="358"/>
			  <Button skin="png.main.btn_addSpeed_apcc" x="172" y="472" stateNum="1" var="add60Btn"/>
			  <Button skin="png.main.btn_addSpeed_video" x="172" y="657" stateNum="1" var="add200Btn"/>
			  <Image skin="png.main.title_speedup" x="155" y="315"/>
			  <Button skin="png.main.btn_close" x="645" y="281" stateNum="1" var="closeBtn"/>
			</View>;
		public function SpeedUpUI(){}
		override protected function createChildren():void {
			super.createChildren();
			createView(uiXML);
		}
	}
}