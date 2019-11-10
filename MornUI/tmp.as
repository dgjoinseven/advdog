package {pack} {
	import morn.core.components.*;
	import morn.editor.core.IRender;
	import com.asframe.mgr.PoolMgr;
	import morn.core.events.UIEvent;
	{import}
	public class {name}UI extends View{
		
		{var}
		public function {name}UI()
		{
			this.initVisible = false;
			App.stage.addEventListener(UIEvent.RENDER_COMPLETED,onRenderComplete);
		}

		override protected function createChildren():void {
			
			//initObject();
			initNewObject();
			{runtime}
			{viewControl}
			super.createChildren();
			//createView(uiXML);
			//createViewByObject(_obj);
		}

		private function initNewObject():void
		{
{objectNewStr}

			//App.timer.doFrameOnce(1,nextFrame);
			//nextFrame();
		}

		private function nextFrame():void
		{
{nextFrame}
		}

		private var _obj:Object = {};
		private function initObject():void
		{
{objectstr}

		}

		override public function destroy():void
		{
{destroy}
{destroyassets}
			super.destroy();
		}
		public static var uiXML:XML =
{xml};
	}
}