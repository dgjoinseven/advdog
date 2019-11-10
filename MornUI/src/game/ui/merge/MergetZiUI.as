/**Created by the Morn,do not modify.*/
package game.ui.merge {
	import morn.core.components.*;
	public class MergetZiUI extends View {
		public var effectImg:Image = null;
		public var ziImg:Image = null;
		protected static var uiXML:XML =
			<View width="120" height="106">
			  <Image skin="png.main.perfect_effect" x="0" y="0" var="effectImg"/>
			  <Image skin="png.main.perfect_zhong" x="14" y="10" var="ziImg"/>
			</View>;
		public function MergetZiUI(){}
		override protected function createChildren():void {
			super.createChildren();
			createView(uiXML);
		}
	}
}