/**Created by the Morn,do not modify.*/
package game.ui.loading {
	import morn.core.components.*;
	public class LoadingUI extends View {
		public var dogImg:Image = null;
		public var loadingLabel:Label = null;
		public var blackDogImg:Image = null;
		protected static var uiXML:XML =
			<View width="750" height="1400">
			  <Image skin="jpg.loading.loading" x="0" y="0"/>
			  <Image skin="png.loading.dog" x="142" y="300" var="dogImg"/>
			  <Label text="60%" x="266" y="951" width="224" height="86" size="70" color="0xffffff" var="loadingLabel" align="center"/>
			  <Image skin="png.loading.black_dog" x="142" y="300" var="blackDogImg"/>
			</View>;
		public function LoadingUI(){}
		override protected function createChildren():void {
			super.createChildren();
			createView(uiXML);
		}
	}
}