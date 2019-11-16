/**Created by the Morn,do not modify.*/
package game.ui.main {
	import morn.core.components.*;
	public class MainPetShowUI extends View {
		protected static var uiXML:XML =
			<View width="10" height="10">
			  <Image skin="png.main.dog_bom_effect" x="-87" y="-23" mouseEnabled="false"/>
			  <Image skin="png.main.lv_bg" x="94" y="-101"/>
			</View>;
		public function MainPetShowUI(){}
		override protected function createChildren():void {
			super.createChildren();
			createView(uiXML);
		}
	}
}