/**Created by the Morn,do not modify.*/
package game.ui.common {
	import morn.core.components.*;
	public class GemItemUI extends View {
		public var effectImg:Image = null;
		public var numLabel:Label = null;
		protected static var uiXML:XML =
			<View width="85" height="85">
			  <Image skin="png.main.apcc_effect" x="42.5" y="42.5" var="effectImg" anchorX="0.5" anchorY="0.5"/>
			  <Image skin="png.main.gem_small" x="27" y="21"/>
			  <Label text="0.3999" x="1" y="63" var="numLabel" color="0xffffff" size="20" width="85" height="22" align="center"/>
			</View>;
		public function GemItemUI(){}
		override protected function createChildren():void {
			super.createChildren();
			createView(uiXML);
		}
	}
}