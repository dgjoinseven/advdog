/**Created by the Morn,do not modify.*/
package game.ui.diagram {
	import morn.core.components.*;
	public class DiagramItemUI extends View {
		public var skillLabel:Label = null;
		public var desLabel:Label = null;
		public var nameLabel:Label = null;
		public var dogImg:Image = null;
		protected static var uiXML:XML =
			<View width="599" height="300">
			  <Image skin="png.main.dogimg_line" x="71" y="291"/>
			  <Label text="技能" x="295" y="33" width="59" height="32" size="25" mouseEnabled="false" selectable="false"/>
			  <Label text="XXXXXXX看看" x="291" y="69" width="197" height="48" var="skillLabel" size="20" multiline="true" color="0xd8d5d4" mouseEnabled="false" selectable="false"/>
			  <Label text="获取途径" x="296" y="121" width="105" height="29.6962890625" size="25" selectable="false"/>
			  <Label text="获取途径" x="294" y="158" width="192" height="116" multiline="true" var="desLabel" size="20" color="0xd8d5d4" mouseEnabled="false" selectable="false"/>
			  <Label text="分红狗" x="62" y="228" width="224" height="49" var="nameLabel" size="40" align="center" backgroundColor="0x0" color="0xffffff" mouseEnabled="false" selectable="false"/>
			  <Image x="169" y="213" var="dogImg" mouseEnabled="false"/>
			</View>;
		public function DiagramItemUI(){}
		override protected function createChildren():void {
			super.createChildren();
			createView(uiXML);
		}
	}
}