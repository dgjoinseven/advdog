@echo off


set basePath=%1
set targetFile=%2
if exist %basePath%\c.jsfl del %basePath%\c.jsfl
::set /p targetFile=单独打包某个资源

echo //样板AS文件路径	>>%basePath%\c.jsfl
echo var tmpAsFile = "file:///E|/qlz/svn/Product/default/MornUI/tmp.as";	>>%basePath%\c.jsfl
echo //代码发布目录	>>%basePath%\c.jsfl
echo var uiCodePath = "file:///E|/qlz/code/client/DragonBall/src/"	>>%basePath%\c.jsfl
echo //目标源目录	>>%basePath%\c.jsfl
echo var rootFolder = "file:///E|/qlz/svn/Product/default/MornUI/morn/pages"	>>%basePath%\c.jsfl
echo var styleFile = "file:///E|/qlz/svn/Product/default/MornUI/morn/styles.xml">>%basePath%\c.jsfl
echo var targetFile = "%targetFile%";>>%basePath%\c.jsfl

type %basePath%\tmpjs\createAs.jsfl>>%basePath%\c.jsfl
start %basePath%\c.jsfl

