/**Created by the Morn,do not modify.*/
package game.ui.diagram {
	import morn.core.components.*;
	public class DiagramItemUI extends View {
		public var dogImg:Image = null;
		public var skillLabel:Label = null;
		public var desLabel:Label = null;
		public var nameLabel:Label = null;
		protected static var uiXML:XML =
			<View width="599" height="230">
			  <Image skin="png.main.deam_line" x="43" y="225"/>
			  <Image x="18" y="-10" var="dogImg" mouseEnabled="false" scale="0.75"/>
			  <Label text="技能" x="214" y="20" width="59" height="32" size="22" mouseEnabled="false" selectable="false" backgroundColor="0xbc9520" bold="true" color="0x532007"/>
			  <Label x="215" y="54" width="347" height="38" var="skillLabel" size="20" multiline="true" color="0x634d0b" mouseEnabled="false" selectable="false" backgroundColor="0x0"/>
			  <Label text="获取途径" x="214" y="91" width="105" height="29.6962890625" size="22" selectable="false" mouseEnabled="false" bold="true" color="0x532007"/>
			  <Label x="215" y="125" width="317" height="85" var="desLabel" size="20" multiline="true" color="0x634d0b" mouseEnabled="false" selectable="false" backgroundColor="0x0"/>
			  <Label text="分红狗" x="16" y="161" width="224" height="44" var="nameLabel" size="38" align="center" backgroundColor="0x0" color="0xffea88" mouseEnabled="false" selectable="false" bold="true"/>
			</View>;
		public function DiagramItemUI(){}
		override protected function createChildren():void {
			super.createChildren();
			createView(uiXML);
		}
	}
}