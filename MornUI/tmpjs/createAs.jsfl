var basePack = "game.ui"

var styleStr
var stylesDic


var tmpStr = null;

var runtimestr = "";
var importstr = "";
var varstr = "";
var viewControlStr = "";
var destroyStr = "";
var destroyassetsStr = "";
var compTo3dStr = "";
var nameIndexid = 0;
var xmlStr = "";
function init()
{
	fl.outputPanel.clear();   
	needMeasureFileName = ""
	if(!tmpStr)
	{
		tmpStr = FLfile.read( tmpAsFile ); 
	}
	if(!styleStr)
	{
		stylesDic = {};
		styleStr = FLfile.read( styleFile ); 
	}
	parseStyleXML(new XML(styleStr.toString()));
	doc = fl.createDocument();
	var arr = basePack.split(".");
	var tmproot = "";
	
	for (var i = 0; i < arr.length; i++)
	{
		tmproot += "/" + arr[i];
		if(i == arr.length - 1)
		{
			if(targetFile.length <= 0)
			{
				FLfile.remove(uiCodePath + tmproot);
			}
		}
		FLfile.createFolder(uiCodePath + tmproot);
		
	}
	uiCodePath += tmproot;
	if(rootFolder != "")
	{
		getXml(rootFolder);
	}else{
		var folder = fl.browseForFolderURL("选择root文件夹");
		if (folder != null)
		{
			rootFolder = folder;
			getXml(folder);
		}
	}
	fl.trace("UI发布完成");
	if(needMeasureFileName != "")
	{
		alert(needMeasureFileName + "没有设置宽度和高度");
		fl.trace(needMeasureFileName);
	}
	
	doc.close();
}
function parseStyleXML(xml)
{
	var numOfChilds = xml.children().length();
	for(var i = 0; i<numOfChilds; i++) 
	{
		var childNode = xml.children()[i];
		var ts = String(childNode.@props);
		if(ts.length > 0)
		{
			var tsarr = ts.split("\n");
			var tsarr2 = [];
			for(var j = 0; j<tsarr.length; j++) 
			{
				var tastr = tsarr[j];
				
				if(tastr != "" && tastr.length >0 && tastr.indexOf("=") != -1)
				{
					//tastr = tastr.replace("=","=\"") + "\"";
					tsarr2.push(tastr);
				}
				
			}
			if(tsarr2.length > 0)
			{
				stylesDic[childNode.@name] = tsarr2
			}
		}
	}
}

function getXml(folder)
{
	var files = FLfile.listFolder(folder + "/*.xml", "files");
	for (var i = 0; i < files.length; ++i)
	{
		loadXml(folder + "/" + files[i]);
	}
	var folders = FLfile.listFolder(folder, "directories");
	for (var j = 0; j < folders.length; ++j)
	{
		
		var otherpath = folder + "";
		otherpath = otherpath.replace(rootFolder,"");
		var npath = uiCodePath + "/" + otherpath + "/" +folders[j]
		FLfile.createFolder(npath);
		getXml(folder + "/" + folders[j]);
	}
}
var strData
var allAsset
function loadXml(uri)
{
	if(uri.indexOf("test") != -1)
	{
		return;
	}
	if (uri == null || uri == "")
	{
		fl.trace("需要选择XML文件");
		return;
	}
	strData = FLfile.read(uri);
	if (strData == null)
	{
		alert("读取XML文件失败");
		return;
	}
	xmlUri = FLfile.uriToPlatformPath(uri);

	var index = xmlUri.lastIndexOf("\\");
	var index2 = xmlUri.lastIndexOf(".");
	
	var fileName = xmlUri.slice(index + 1, index2);
	var otherpath = uri.replace(rootFolder,"");
	otherpath = otherpath.replace("/" + fileName + ".xml","");
	
	strData = changeXML(strData)
	var xmlData = new XML(strData.toString());
	
	dealXml(xmlData,fileName,otherpath);
	
}
function changeXML(str)
{
	var newStr = str.replace(/var=/g, "vname=")
	newStr = newStr.replace(/ layers="[^"]*"/g,"");
	newStr = newStr.replace(/ layer="[^"]*"/g,"");
	newStr = newStr.replace(/ sceneColor="[^"]*"/g,"");
	newStr = newStr.replace(/ sceneBg="[^"]*"/g,"");
	newStr = newStr.replace(/<Referbg (.+)\/>/g,"");
	//有Soure和runtime删除Soure
	newStr = newStr.replace(/([^"]+)\s(source="[^"]+")([^\n]+runtime="[^"]+")/g,"$1$3");
	//替换Soure成runtime
	newStr = newStr.replace(/<UIView source="([^"]+)\/(.+)\.xml"(.*)\/>/g,"<$2 runtime=\""+basePack+"/$1/$2UI\"$3/>");
	//UIview变成runtime里的XX
	newStr = newStr.replace(/<(UIView)(.*runtime="[^"]*\b([^"]+)\b".*\/>)/g,"<$3$2");
	//
	//newStr = newStr.replace(/([^\/]+)\/(?!>)/g, "$1.");
	//将text = "" 里面的 / 替换为 -_- 最后再替换来
	
	//先变成其它内容，再还原。
	while(/text="([^"]*)\/([^"]*)"/g.test(newStr))
	{
		newStr = newStr.replace(/(text=")([^"]*)\/([^"]*)(")/g, "$1$2@-_-@$3$4");
	}
	while(/toolTip="([^"]*)\/([^"]*)"/g.test(newStr))
	{
		newStr = newStr.replace(/(toolTip=")([^"]*)\/([^"]*)(")/g, "$1$2@-_-@$3$4");
	}
	newStr = newStr.replace(/([^\/]+)\/(?!>)/g, "$1.");
	//变回来
	while(/text="([^"]*)@-_-@([^"]*)"/g.test(newStr))
	{
		newStr = newStr.replace(/(text=")([^"]*)@-_-@([^"]*)(")/g, "$1$2/$3$4");
	}
	while(/toolTip="([^"]*)@-_-@([^"]*)"/g.test(newStr))
	{
		newStr = newStr.replace(/(toolTip=")([^"]*)@-_-@([^"]*)(")/g, "$1$2/$3$4");
	}


	newStr = newStr.replace(/<\.(.+)>/g, "</$1>");
	//把UIVIEW变成指定的类
	newStr = newStr.replace(/<(\S+)(.+)(viewControl="([^"]+)\b([^"]+)\b")\/>/g,"<$5$2$3/>");
	return newStr;
}
var assetswf
function dealXml(xmlData,fileName,path)
{
	
	
	if(targetFile.length > 0)
	{
		if(targetFile.indexOf(".") == -1)
		{
			if(path.indexOf(targetFile) == -1)
			{
				return;
			}
		}else{
			if(targetFile != (fileName+".as"))
			{
				return;
			}
		}
		
	}
	var asFileUri = uiCodePath + path + "/" +fileName + "UI.as";
	
	if (FLfile.exists(asFileUri))
	{
		if (!FLfile.remove(asFileUri))
		{
			alert("生成文件失败，请先删除该目录的as文件");
			return;
		}
	}

	
	runtimestr = "";
	mportstr = "";
	varstr = "";
	importstr = "";
	viewControlStr = "";
	destroyStr = "";
	destroyassetsStr = "";
	compTo3dStr = "";
	nameIndexid = 0;
	xmlStr = "";
	needMeasure = false;
	
	parseXML(xmlData,true);
	
	if(needMeasure)
	{
		needMeasureFileName += fileName + ".xml\r\n"
	}
	
	strData = String(xmlData);
	assetswf = xmlData.@assetswf;
	if(assetswf.length() > 0)
	{
		allAsset = "";
		var arr = strData.match(/skin="[^"]+"/g);
		if (arr && arr.length)
		{
			allAsset = arr.join("\n");
			allAsset = allAsset.replace(/skin="([^"]+)"/g, "$1");
			allAsset = allAsset.replace(/\n/g, ",");
		}
	}else{
		allAsset = "";
	}
	createDestroyassetsStr();
	
	strData = strData.replace(/vname=/g, "var=");
	strData = strData.replace(/ assetswf="[^"]*"/g,"");
	
	var txtStr = tmpStr.replace("{xml}",strData);
	txtStr = txtStr.replace(/{name}/g,fileName);
	txtStr = txtStr.replace("{import}",importstr);
	txtStr = txtStr.replace("{var}",varstr);
	txtStr = txtStr.replace("{runtime}",runtimestr);
	txtStr = txtStr.replace("{viewControl}",viewControlStr);
	txtStr = txtStr.replace("{destroy}",destroyStr);
	txtStr = txtStr.replace("{destroyassets}",destroyassetsStr);
	if(path.length > 0)
	{
		path = path.replace(/\//g,".");
	}
	txtStr = txtStr.replace("{pack}",basePack + path);
	strData = null;
	FLfile.write(asFileUri,txtStr);
}

var needMeasure = false;
var needMeasureFileName = ""
function parseXML(xml,isParent)
{
	var numOfChilds = xml.children().length();
	if(isParent)
	{
		if(xml.@needMeasure.length() == 0 || xml.@needMeasure == false)
		{
			if(xml.@width.length() == 0 || xml.@width == 0 || 
			xml.@height.length() == 0 || xml.@height == 0 )
			{
				needMeasure = true;
			}
		}
		delete xml.@needMeasure
	}
	for(var i = 0; i<numOfChilds; i++) 
	{
		var childNode = xml.children()[i];
		if(childNode.@runtime.length() > 0)
		{
			createUIview(childNode.@runtime,childNode.name(),childNode.@viewControl)
		}
		if(childNode.@drawTo3D.length() > 0)
		{
			if(childNode.@vname.length() > 0)
			{
				
			}else{
				nameIndexid ++;
				childNode["@vname"]="dynamic_" + nameIndexid;
			}
			if(compTo3dStr.length > 0)
			{
				compTo3dStr +=",";
			}
			compTo3dStr +=  childNode.@vname 
		}
		if(childNode.@vname.length() > 0)
		{
			createVarStr(childNode.@vname,childNode.name(),childNode.@runtime,childNode.@viewControl);
		}
		if(childNode.children().length() > 0)
		{
			parseXML(childNode,false)
		}else{
			
			if(childNode.@runtime.length() <= 0)
			{
				var tmpSkin = "";
				if(childNode.@skin.length() > 0)
				{
					tmpSkin = childNode.@skin;
				}else if(childNode.@styleSkin.length() > 0)
				{
					tmpSkin = childNode.@styleSkin;
				}
				var sARR = stylesDic[tmpSkin];
				if(sARR && sARR.length > 0)
				{
					for(var j = 0; j<sARR.length; j++) 
					{
						var parr = sARR[j].split("=");
						if(childNode.@[parr[0]].length() <= 0)
						{
							childNode.@[parr[0]] = parr[1];
						}
					}
				}
			}
			
			
			
		}
	}
}
function createDestroyassetsStr()
{
	if(assetswf.length() > 0)
	{
		var _assetarr = allAsset.split(",");
		for(var i = 0; i<_assetarr.length; i++) 
		{
			//if(_assetarr[i].indexOf("png." + assetswf) != -1 || _assetarr[i].indexOf("jpg." + assetswf) != -1)
			//{	
			//	destroyassetsStr += "			App.asset.disposeBitmapData(\"" +_assetarr[i]+ "\");\r\n";
			//}
		}
	}
}

function createVarStr(vname,bb,runstr,viewC)
{
	var tarr
	if(viewC.length() > 0)
	{
		tarr = viewC.split(".")
		varstr += "public var " + vname +":" + tarr[tarr.length - 1] + " = null;\r		";
	}else if(runstr.length() > 0)
	{
		if(runstr.indexOf(basePack) == -1)
		{
			varstr += "public var " + vname +":" + bb + " = null;\r		";
		}else{
			varstr += "public var " + vname +":" + bb + "UI = null;\r		";
		}
		
	}else{
		varstr += "public var " + vname +":" + bb + " = null;\r		";
	}
	createDestroyStr(vname);
}
function createDestroyStr(vname)
{
/*
	destroyStr += "			if("+vname+") {\r				"+vname+".remove();\r\n				"+vname+".destroy();\r\n				"+vname+" = null;\r			}\r";
*/
}
function createUIview(runtime,nodeName,viewC)
{
	if(viewC.length() <= 0)
	{
		if(runtime.indexOf(basePack) != -1)
		{
			nodeName = nodeName + "UI";
		}
		
		if(runtimestr.indexOf("viewClassMap[\"" + runtime + "\"]") == -1)
		{
			runtimestr += "viewClassMap[\"" + runtime + "\"] = " + nodeName + "\r			";
		}
		
		if(importstr.indexOf(runtime + ";") == -1)
		{
			importstr += "import " + runtime + ";\r	";
		}
	}else{
		if(runtimestr.indexOf("viewClassMap[\"" + runtime + "\"]") == -1)
		{
			runtimestr += "viewClassMap[\"" + runtime + "\"] = " + runtime + "\r			";
		}
		if(importstr.indexOf(runtime + ";") == -1)
		{
			importstr += "import " + runtime + ";\r	";
		}
		if(viewControlStr.indexOf("viewControlMap[\"" + viewC + "\"]") == -1)
		{
			viewControlStr += "viewControlMap[\"" + viewC + "\"] = " + viewC + "\r			";
		}
		runtime = viewC;
		if(importstr.indexOf(runtime + ";") == -1)
		{
			importstr += "import " + runtime + ";\r	";
		}
	}
}
init();

