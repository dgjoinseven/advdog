/**Created by the Morn,do not modify.*/
package game.ui.main {
	import morn.core.components.*;
	public class MyDogUI extends View {
		public var closeBtn:View = null;
		public var dogPanel:Panel = null;
		public var dogContainer:Image = null;
		public var closeBtn:Button = null;
		protected static var uiXML:XML =
			<View width="750" height="1400" var="closeBtn">
			  <Image skin="png.main.alert_bg" x="63" y="202" sizeGrid="200,200,200,200" width="599" height="694"/>
			  <Image skin="png.main.my_dog_bg" x="124" y="295"/>
			  <Panel x="103" y="667" height="142" width="505" hScrollBarSkin="null" var="dogPanel"/>
			  <Image x="375" y="538" var="dogContainer"/>
			  <Button skin="png.main.btn_close" x="644" y="123" stateNum="1" var="closeBtn"/>
			  <Image skin="png.main.title_myDog" x="154" y="156"/>
			</View>;
		public function MyDogUI(){}
		override protected function createChildren():void {
			super.createChildren();
			createView(uiXML);
		}
	}
}