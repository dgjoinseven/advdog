/**Created by the Morn,do not modify.*/
package game.ui.common {
	import morn.core.components.*;
	public class SliderComUI extends View {
		protected static var uiXML:XML =
			<View width="149" height="45">
			  <Image skin="png.main.sliderbg" x="0" y="0"/>
			  <Image skin="png.main.sliderband" x="8" y="5"/>
			  <Image skin="png.main.shop_point" x="78" y="-12"/>
			</View>;
		public function SliderComUI(){}
		override protected function createChildren():void {
			super.createChildren();
			createView(uiXML);
		}
	}
}