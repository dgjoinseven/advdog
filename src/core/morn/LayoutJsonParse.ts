namespace morn
{
	/**解析moenui发布后的UI布局json文件
	 * wangning
	 */
	export class LayoutJsonParse
	{
		public constructor()
		{
		}
		public static parse(json, thisObj): void
		{
			var funcs = {};

			for (var variable in json)
			{
				if (variable == "addChild")
				{
					continue;
				}

				//构造函数
				if (variable != "this")
				{
					var classType = json[variable]["new"];
					if (classType)
					{
						switch (classType)
						{
							case "Box":
								thisObj[variable] = new morn.Box;
								break;
							case "Image":
								thisObj[variable] = new morn.Image;
								break;
							case "Button":
								thisObj[variable] = new morn.Button;
								break;
							case "Label":
								thisObj[variable] = new morn.Label;
								break;
							case "ViewStack":
								thisObj[variable] = new morn.ViewStack;
								break;
							case "NumberLine":
								thisObj[variable] = new morn.NumberLine;
								break;
							case "TreeList":
								thisObj[variable] = new morn.TreeList;
								break;
							case "CheckBox":
								thisObj[variable] = new morn.CheckBox;
								break;
							case "ListBox":
								thisObj[variable] = new morn.ListBox;
								break;
							case "Panel":
								thisObj[variable] = new morn.Panel;
								break;
							case "RadioButton":
								thisObj[variable] = new morn.RadioButton;
								break;
							case "RadioGroup":
								thisObj[variable] = new morn.RadioGroup;
								break;
							case "ShapeMc":
								thisObj[variable] = new morn.ShapeMc;
								break;
							case "Tab":
								thisObj[variable] = new morn.Tab;
								break;
							case "TextInput":
								thisObj[variable] = new morn.TextInput;
								break;
							default:
								throw new Error("LayoutJsonParse里面没有关于" + classType + "类型的解析");
						}
					}

				}

				var prop = json[variable]["prop"];

				for (var propStr in prop)
				{
					if (asf.TypeofUtils.isString(prop[propStr]) && prop[propStr].indexOf("@morn.Morn.ResUrl@") != -1)
					{
						var t_path: string = morn.Morn.ResUrl + prop[propStr].replace("@morn.Morn.ResUrl@", "");
						if (variable == "this")
						{
							// this[propStr] = t_path;
							thisObj[propStr] = t_path;
						}
						else
						{
							// this[variable][propStr] = t_path;
							thisObj[variable][propStr] = t_path;
						}
					}
					else
					{
						if (variable == "this")
						{
							// this[propStr] = prop[propStr];
							thisObj[propStr] = prop[propStr];
						}
						else
						{
							// this[variable][propStr] = prop[propStr];
							thisObj[variable][propStr] = prop[propStr];
						}
					}
				}
				var funcArr = json[variable]["func"];
				if (funcArr)
				{
					for (var func of funcArr)
					{
						if (variable == "this")
						{
							thisObj[func]();
						}
						else
						{
							// thisObj[variable][func]();
							if (!funcs[variable])
							{
								funcs[variable] = [];
							}
							funcs[variable].push(func);
						}
					}
				}
			}

			var parentArr: any[] = json["addChild"];
			if (parentArr)
			{
				for (var index in parentArr)
				{
					var t_item: any[] = parentArr[index];
					var parent = t_item[0];
					var child = t_item[1];

					if (parent == "this")
					{
						thisObj["addChild"](thisObj[child]);
					}
					else
					{
						thisObj[parent]["addChild"](thisObj[child]);
					}

				}
			}



			for (var variableName in funcs)
			{
				var func = funcs[variableName];
				thisObj[variableName][func]();
			}

		}
	}
}