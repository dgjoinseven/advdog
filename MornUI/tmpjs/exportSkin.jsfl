var images = [];
var swfName = "";
var doc  
var lib 
var styleStr
var stylesDic

function init()
{
	//fl.outputPanel.clear();   
	var dom = fl.getDocumentDOM(); 
	if(dom)
	{
		fl.trace("有swf正在打开中，请关闭所有的SWF后再压缩资源。")
		return;
	}
	if(!styleStr)
	{
		stylesDic = {};
		styleStr = FLfile.read( styleFile ); 
		parseStyleXML(new XML(styleStr.toString()));
	}
	
	if(sparentpath != "")
	{
		FLfile.remove(publishSWFPath + "/" + sparentpath);
		//只打包某个文件资源
			swfName = sparentpath ;
			doc = fl.createDocument();
			lib = doc.library;
			sparentpath = sourceFolder + "/" + sparentpath
			var mfiles2 = FLfile.listFolder(sparentpath);
			findImage(sparentpath,mfiles2);
			issue();
			images = [];
	}else{
		FLfile.remove(publishSWFPath);
		FLfile.createFolder(publishSWFPath);
		var files = FLfile.listFolder(sourceFolder);
		for (var i = 0; i < files.length; i++)
		{
			swfName = files[i] ;
			doc = fl.createDocument();
			lib = doc.library;
			sparentpath = sourceFolder + "/" + swfName
			var mfiles = FLfile.listFolder(sparentpath);
			findImage(sparentpath,mfiles);
			issue();
			images = [];
		}
	}
	
	fl.trace("全部UI资源打包完成")
}

function findImage(parentPath,files)
{
	var fname = parentPath.replace(sparentpath,"")
	if(fname != "")
	{
		lib.newFolder(fname)
	}
	for (var i = 0; i < files.length; i++)
	{

		if(String(files[i]).indexOf(".") == -1)
		{
			//文件夹
			var mfiles = FLfile.listFolder(parentPath+"/"+files[i]);
			findImage(parentPath+"/"+String(files[i]),mfiles);
		}
		else
		{
			//文件
			if(/\.png$/i.test(String(files[i]))|| /\.jpg$/i.test(String(files[i])))
			{
				if(String(files[i]).indexOf("referbg") == -1)
				{
					images.push(parentPath+"/"+String(files[i]));
				}
			}
			
		}
	}
		
}
function issue()
{
	
	var tline = doc.getTimeline();
	var className ;
	var indexf 
	var moto;
	var itemName ;
	var q = 0;
	for(var i = 0;i<images.length;i++)
	{
		doc.importFile(images[i], true);
		className = String(images[i]).replace(sparentpath,"");
		indexf = className.lastIndexOf("/");
		itemName = String(className).slice(indexf+1,className.length);
		moto = className.slice(1, indexf);
		//doc.selectAll();
		lib.selectItem(itemName);
		var item = lib.getSelectedItems()[0];
		
		
		if(item)
		{
			item.linkageExportForAS = true;
			item.linkageExportInFirstFrame = true;
			item.linkageBaseClass = "flash.display.BitmapData";

			if(/\.png$/i.test(className))
			{
				var ext = className.replace(/.+(\.png)$/i, "$1");
				//fl.trace(ext);
				className = className.replace(/\.png$/i,"");
				className = className.replace(/\//g,".");
				item.linkageClassName = ext.replace(".", "")+"." + swfName + className;
				item.compressionType = "lossless";
			}else if(/\.jpg$/i.test(className))
			{
				var ext = className.replace(/.+(\.jpg)$/i, "$1");
				className = className.replace(/\.jpg$/i,"");
				className = className.replace(/\//g,".");
				item.linkageClassName = ext.replace(".", "")+"." + swfName + className;
				item.compressionType = "photo";
				item.quality = 80;
			}
		}
		if(moto != "")
		{
			lib.moveToFolder(moto,itemName)
		}
		//doc.deleteSelection();

	}
	if (FLfile.exists(publishSWFPath))
		{
			fl.saveDocument(doc,publishSWFPath+"/"+swfName.toLowerCase()+".fla");
			doc.exportSWF(publishSWFPath+"/"+swfName.toLowerCase()+".swf", true); 
			fl.getDocumentDOM().libraryPath = publishSWFPath
				
				var profileXML = fl.getDocumentDOM().exportPublishProfileString('Default');  

			 
                //profileXML = profileXML.replace("<swc>0</swc>", "<swc>1</swc>");  
                profileXML = profileXML.replace("<html>1</html>", "<html>0</html>");  
				profileXML = profileXML.replace("<defaultNames>1</defaultNames>", "<defaultNames>0</defaultNames>");  
				profileXML = profileXML.replace("<flashDefaultName>1</flashDefaultName>", "<flashDefaultName>0</flashDefaultName>");  
                //profileXML = profileXML.replace("<swcDefaultName>1</swcDefaultName>", "<swcDefaultName>0</swcDefaultName>");  
				profileXML = profileXML.replace("<LoopCount></LoopCount>", "<LoopCount>0</LoopCount>");  
	   			profileXML = profileXML.replace("<Version>15</Version>", "<Version>9</Version>");  
	  			profileXML = profileXML.replace("<ExternalPlayer>FlashPlayer11.2</ExternalPlayer>", "<ExternalPlayer></ExternalPlayer>");  
	  			//profileXML = profileXML.replace("<ExportSwc>0</ExportSwc>","<ExportSwc>1</ExportSwc>");
			  
		
                fl.getDocumentDOM().importPublishProfileString(profileXML);  
				
			  doc.save();
              doc.publish();  
              doc.close();  
		}	
}
function parseStyleXML(xml)
{
	var numOfChilds = xml.children().length();
	for(var i = 0; i<numOfChilds; i++) 
	{
		var childNode = xml.children()[i];
		var compress = String(childNode.@compress);
		if(compress == 1)
		{
			stylesDic[childNode.@name] = childNode.@quality
		}
	}
}

init();