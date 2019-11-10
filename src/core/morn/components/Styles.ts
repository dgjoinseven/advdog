namespace morn
{
	export class Styles
	{
		/**默认九宫格信息[左边距,上边距,右边距,下边距,是否重复填充]*/
		public static defaultSizeGrid: string[] = ["4", "4", "4", "4", "0"];

		//-----------------文本-----------------
		/**字体名称*/
		public static fontName: string = "微软雅黑";
		/**字体大小*/
		public static fontSize: number = 12;
		/**是否是嵌入字体*/
		public static embedFonts: boolean = false;

		//-----------------Label-----------------
		/**标签颜色*/
		public static labelColor: number = 0x000000;
		/**标签描边[color,alpha,blurX,blurY,strength,quality]*/
		// public static labelStroke: Array = [0x170702, 0.8, 2, 2, 10, 1];
		/**按钮标签边缘[左距离,上距离,又距离,下距离]*/
		public static labelMargin: string[] = ["0", "0", "0", "0"];

		//-----------------Button-----------------
		/**按钮皮肤的状态数，支持1,2,3三种状态值*/
		public static buttonStateNum: number = 3;
		/**按钮标签颜色[upColor,overColor,downColor,disableColor]*/
		public static buttonLabelColors: number[] = [0x32556b, 0x32556b, 0x32556b, 0xC0C0C0];
		/**按钮标签边缘[左距离,上距离,又距离,下距离]*/
		public static buttonLabelMargin: number[] = [0, 0, 0, 0];
		/** 按钮文本的描边像素[0，1，2] 3态的**/
		public static buttonLabelStrokes: number[] = [0, 0, 0];
		/** 按钮文本的描边颜色[0，1，2] **/
		public static buttonLabelStrokeColors: number[] = [0, 0, 0];

		//-----------------LinkButton-----------------
		/**连接标签颜色[upColor,overColor,downColor,disableColor]*/
		public static linkLabelColors: number[] = [0x0080C0, 0xFF8000, 0x800000, 0xC0C0C0];

		//-----------------ComboBox-----------------
		/**下拉框项颜色[overBgColor,overLabelColor,outLabelColor,borderColor,bgColor]*/
		public static comboBoxItemColors: number[] = [0x5e95b6, 0xffffff, 0x000000, 0x8fa4b1, 0xffffff];
		/**单元格大小*/
		public static comboBoxItemHeight: number = 22;

		//-----------------ScrollBar-----------------
		/**滚动条最小值*/
		public static scrollBarMinNum: number = 15;
		/**长按按钮，等待时间，使其可激活连续滚动*/
		public static scrollBarDelayTime: number = 500;

		//-----------------DefaultToolTip-----------------
		/**默认鼠标提示文本颜色*/
		public static tipTextColor: number = 0x000000;
		/**默认鼠标提示边框颜色*/
		public static tipBorderColor: number = 0xC0C0C0;
		/**默认鼠标提示背景颜色*/
		public static tipBgColor: number = 0xFFFFFF;

		/**默认图片是否平滑处理*/
		public static smoothing: boolean = false;
		public constructor()
		{
		}
	}
}