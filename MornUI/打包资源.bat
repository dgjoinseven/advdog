@echo off



set basePath=%1
set sparentpath=%2
if exist %basePath%\c.jsfl del %basePath%\c.jsfl

echo //��Դ��Ŀ¼	>>%basePath%\c.jsfl
echo var sourceFolder = "file:///E|/qlz/svn/Product/default/MornUI/morn/assets";	>>%basePath%\c.jsfl
echo //���SWF��Ŀ¼	>>%basePath%\c.jsfl
echo var publishSWFPath = "file:///E|/qlz/svn/Product/default/assets/mornui";	>>%basePath%\c.jsfl
echo //���ļ��У���������ָ����ָ��Ҫ���ĳ����Դ	>>%basePath%\c.jsfl
echo var sparentpath = "%sparentpath%";	>>%basePath%\c.jsfl
echo var styleFile = "file:///E|/qlz/svn/Product/default/MornUI/morn/styles.xml">>%basePath%\c.jsfl

type %basePath%\tmpjs\exportSkin.jsfl>>%basePath%\c.jsfl
start %basePath%\c.jsfl

