/**Created by the Morn,do not modify.*/
package game.ui.merge {
	import morn.core.components.*;
	public class RamdomMergePetUI extends View {
		public var startBtn:Button = null;
		public var closeBtn:Button = null;
		public var zhong1Effect:Image = null;
		public var zhong2Effect:Image = null;
		public var meng1Effect:Image = null;
		public var meng2Effect:Image = null;
		public var fuEffect:Image = null;
		public var zhiEffect:Image = null;
		public var yongEffect:Image = null;
		public var img43:Image = null;
		public var img44:Image = null;
		protected static var uiXML:XML =
			<View width="750" height="1400">
			  <Image skin="png.main.bg.radomMergeBg" x="64" y="277"/>
			  <Image skin="png.main.perfect_fuzi" x="155" y="517"/>
			  <Image skin="png.main.perfect_meng" x="401" y="724"/>
			  <Image skin="png.main.perfect_meng" x="220" y="410"/>
			  <Image skin="png.main.perfect_zhong" x="174" y="646"/>
			  <Image skin="png.main.perfect_zhong" x="451" y="412"/>
			  <Image skin="png.main.perfect_yong" x="498" y="644"/>
			  <Image skin="png.main.perfect_zhi" x="517" y="516"/>
			  <Button skin="png.main.btn_start" x="256" y="941" stateNum="1" var="startBtn"/>
			  <Button skin="png.main.btn_close" x="601" y="291" stateNum="1" var="closeBtn"/>
			  <Image skin="png.main.perfect_effect" x="439" y="391" var="zhong1Effect"/>
			  <Image skin="png.main.perfect_effect" x="164" y="628" var="zhong2Effect"/>
			  <Image skin="png.main.perfect_effect" x="388" y="707" var="meng1Effect"/>
			  <Image skin="png.main.perfect_effect" x="201" y="392" var="meng2Effect"/>
			  <Image skin="png.main.perfect_effect" x="138" y="502" var="fuEffect"/>
			  <Image skin="png.main.perfect_effect" x="505" y="500" var="zhiEffect"/>
			  <Image skin="png.main.perfect_effect" x="483" y="624" var="yongEffect"/>
			  <Image skin="png.main.head_hongbao" x="274" y="717" scale="0.85" guide="hongbaoImg" var="img43"/>
			  <Image skin="png.main.hean_fenhong" x="331" y="356" scale="0.85" var="img44"/>
			  <Image skin="png.main.title_perfect" x="152" y="224"/>
			</View>;
		public function RamdomMergePetUI(){}
		override protected function createChildren():void {
			super.createChildren();
			createView(uiXML);
		}
	}
}