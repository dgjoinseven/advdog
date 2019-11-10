/**
 * @{name}.as
 *
 * @author {author}
 * @version 1.0
 * <br>Program Name:DragonBall
 * <br>Date:2016-12-13
 */
package com.linlongyx.dragonball.module.{packageName}
{
	import com.asframe.doeasy.DoEasyConst;
	import com.linlongyx.dragonball.mvc.CloseWinView;
	
	import game.ui.{import};
	///[Res("mornui/kulin.swf")]
	public class {name} extends CloseWinView
	{
		[Ref] 
		public var {varmodule}:{moduleClass};
		private var _ui:{ui};
		public function {name}()
		{
			super();
			mLayer = DoEasyConst.VIEW_LAYER;
		}
		
		public override function init():void
		{
			_ui = new {ui}();
			_ui.onShowCompleteHandler = onShowComplete;
			addChild(_ui);
			
			mCloseBtn = _ui.closeBtn;
			this.setDrag(_ui.titleDrag);
		}
		
		protected override function onOpen():void
		{
			super.onOpen();
		}
		
		protected override function onClose():void
		{
			super.onClose();
		}
		
		public override function destroy(o:* =null):void
		{
			_ui.destroy();
			_ui = null;
			super.destroy(o);
		}
	}
}