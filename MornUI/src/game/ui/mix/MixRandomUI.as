/**Created by the Morn,do not modify.*/
package game.ui.mix {
	import morn.core.components.*;
	public class MixRandomUI extends View {
		protected static var uiXML:XML =
			<View width="345" height="400"/>;
		public function MixRandomUI(){}
		override protected function createChildren():void {
			super.createChildren();
			createView(uiXML);
		}
	}
}