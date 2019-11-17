/**Created by the Morn,do not modify.*/
package game.ui.merge {
	import morn.core.components.*;
	public class MoneyPetMergeUI extends View {
		public var imgBg:Image = null;
		public var dog38:Image = null;
		public var dog41:Image = null;
		public var dog42:Image = null;
		public var dog39:Image = null;
		public var dog40:Image = null;
		public var img41:Image = null;
		public var mergeBtn:Button = null;
		public var closeBtn:Button = null;
		protected static var uiXML:XML =
			<View width="750" height="1400">
			  <Image skin="png.main.bg.money_bg" x="370" y="604" anchorX="0.5" anchorY="0.5" var="imgBg"/>
			  <Image skin="png.main.shop38" x="415" y="349" width="323" height="323" var="dog38"/>
			  <Image skin="png.main.shop41" x="48" y="576" width="323" height="323" var="dog41"/>
			  <Image skin="png.main.shop42" x="327" y="602" width="323" height="323" var="dog42"/>
			  <Image skin="png.main.shop39" x="-4" y="336" width="323" height="323" var="dog39"/>
			  <Image skin="png.main.shop40" x="212" y="216" width="323" height="323" var="dog40"/>
			  <Image skin="png.main.money_zhong" x="213" y="503" width="92" height="95"/>
			  <Image skin="png.main.money_yong" x="250" y="651" var="img41" width="88" height="88"/>
			  <Image skin="png.main.money_zhi" x="446" y="506" width="91" height="94"/>
			  <Image skin="png.main.money_meng" x="324" y="428" width="90" height="89"/>
			  <Image skin="png.main.money_fu" x="400" y="650" width="97" height="92"/>
			  <Button skin="png.main.btn_money" x="313" y="547" stateNum="1" var="mergeBtn"/>
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