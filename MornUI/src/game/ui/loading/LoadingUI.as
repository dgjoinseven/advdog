/**Created by the Morn,do not modify.*/
package game.ui.loading {
	import morn.core.components.*;
	public class LoadingUI extends View {
		public var dogImg:Image = null;
		public var loadingLabel:Label = null;
		public var blackDogImg:Image = null;
		public var configLabel:Label = null;
		protected static var uiXML:XML =
			<View width="750" height="1400">
			  <Image skin="jpg.loading.loading" x="0" y="0"/>
			  <Label text="label" x="162" y="937"/>
			  <Image skin="png.loading.dog" x="236" y="492" var="dogImg"/>
			  <Label text="0%" x="266" y="951" align="center" backgroundColor="0xffffff" var="loadingLabel" color="0xffffff" size="70" width="224" height="86"/>
			  <Image skin="png.loading.black_dog" x="236" y="492" var="blackDogImg"/>
			  <Label x="263" y="897" width="351" height="50" color="0xffffff" align="left" size="30" var="configLabel"/>
			</View>;
		public function LoadingUI(){}
		override protected function createChildren():void {
			super.createChildren();
			createView(uiXML);
		}
	}
}