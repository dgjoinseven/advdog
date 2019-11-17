/**Created by the Morn,do not modify.*/
package game.ui.shop {
	import morn.core.components.*;
	public class ShopItemUI extends View {
		public var dogImg:Image = null;
		public var bugBtn:Button = null;
		public var nameLabel:Label = null;
		public var starLabel:Label = null;
		public var indexLabel:Label = null;
		protected static var uiXML:XML =
			<View width="453" height="165">
			  <Image skin="png.main.bg.item_bg" x="0" y="0" sizeGrid="20,20,20,20" width="453" height="165"/>
			  <Image x="-56" y="-59" var="dogImg" mouseEnabled="false"/>
			  <Image skin="png.main.shop_point" x="-27" y="61" width="56" height="56"/>
			  <Button skin="png.main.btn_shop_close" x="243" y="97" stateNum="1" var="bugBtn" pointX="0" pointY="0" labelSize="30" labelColors="0x000000"/>
			  <Label text="小土狗" x="162" y="31" width="271" height="44" align="left" size="40" var="nameLabel" mouseEnabled="false" selectable="false"/>
			  <Label text="1星" x="168" y="96" width="56" height="44" align="left" size="35" var="starLabel" mouseEnabled="false" selectable="false"/>
			  <Label text="1" x="-18" y="71" width="40" height="37" align="center" size="32" var="indexLabel" mouseEnabled="false" selectable="false"/>
			</View>;
		public function ShopItemUI(){}
		override protected function createChildren():void {
			super.createChildren();
			createView(uiXML);
		}
	}
}