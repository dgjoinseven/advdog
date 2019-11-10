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
	import com.asframe.doeasy.mvc;
	import com.linlongyx.dragonball.db.{DB};
	import com.linlongyx.dragonball.mvc.DragonModule;

	use namespace mvc;
	public class {name} extends DragonModule
	{
		mvc var {varview}:{view};
		mvc var {varhelper}:{helper};
		
		[Ref]
		public var {varDB}:{DB}

		public function {name}()
		{
			super();
		}
	}
}