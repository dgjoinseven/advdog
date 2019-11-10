/**Created by the Morn,do not modify.*/
package game.ui.mix {
	import morn.core.components.*;
	public class MixMaxUI extends View {
		protected static var uiXML:XML =
			<View width="345" height="400"/>;
		public function MixMaxUI(){}
		override protected function createChildren():void {
			super.createChildren();
			createView(uiXML);
		}
	}
}