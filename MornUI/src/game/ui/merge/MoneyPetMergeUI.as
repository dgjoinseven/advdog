/**Created by the Morn,do not modify.*/
package game.ui.merge {
	import morn.core.components.*;
	public class MoneyPetMergeUI extends View {
		public var img39:Image = null;
		public var img41:Image = null;
		public var img40:Image = null;
		public var img38:Image = null;
		public var img42:Image = null;
		public var mergeBtn:Button = null;
		public var closeBtn:Button = null;
		protected static var uiXML:XML =
			<View width="750" height="1400">
			  <Image skin="png.main.bg.money_bg" x="109" y="344"/>
			  <Image skin="png.main.money_zhong" x="120" y="437" var="img39"/>
			  <Image skin="png.main.money_yong" x="169" y="710" var="img41"/>
			  <Image skin="png.main.money_zhi" x="538" y="463" var="img40"/>
			  <Image skin="png.main.money_meng" x="321" y="323" var="img38"/>
			  <Image skin="png.main.money_fu" x="472" y="714" var="img42"/>
			  <Button skin="png.main.btn_money" x="316" y="548" stateNum="1" var="mergeBtn"/>
			  <Button skin="png.main.btn_close" x="600" y="289" stateNum="1" var="closeBtn"/>
			  <Image skin="png.main.title_money" x="155" y="223"/>
			</View>;
		public function MoneyPetMergeUI(){}
		override protected function createChildren():void {
			super.createChildren();
			createView(uiXML);
		}
	}
}