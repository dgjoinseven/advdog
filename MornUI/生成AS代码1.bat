@echo off


set basePath=%1
set targetFile=%2
if exist %basePath%\c.jsfl del %basePath%\c.jsfl
::set /p targetFile=�������ĳ����Դ

echo //����AS�ļ�·��	>>%basePath%\c.jsfl
echo var tmpAsFile = "file:///E|/qlz/svn/Product/default/MornUI/tmp.as";	>>%basePath%\c.jsfl
echo //���뷢��Ŀ¼	>>%basePath%\c.jsfl
echo var uiCodePath = "file:///E|/qlz/code/client/DragonBall/src/"	>>%basePath%\c.jsfl
echo //Ŀ��ԴĿ¼	>>%basePath%\c.jsfl
echo var rootFolder = "file:///E|/qlz/svn/Product/default/MornUI/morn/pages"	>>%basePath%\c.jsfl
echo var styleFile = "file:///E|/qlz/svn/Product/default/MornUI/morn/styles.xml">>%basePath%\c.jsfl
echo var targetFile = "%targetFile%";>>%basePath%\c.jsfl

type %basePath%\tmpjs\createAs.jsfl>>%basePath%\c.jsfl
start %basePath%\c.jsfl

