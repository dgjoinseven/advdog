@echo off



del c.jsfl
set /p targetFile=单独打包某个资源

echo //样板AS文件路径	>>c.jsfl
echo var tmpAsFile = "file:///E|/works/blackhole/UI/BlackHoleUI/tmp.as";	>>c.jsfl
echo //代码发布目录	>>c.jsfl
echo var uiCodePath = "file:///E|/works/blackhole/BlackHoleClient/src/ss"	>>c.jsfl
echo //目标源目录	>>c.jsfl
echo var rootFolder = "file:///E|/works/blackhole/UI/BlackHoleUI/morn/pages"	>>c.jsfl
echo var styleFile = "file:///E|/works/blackhole/UI/BlackHoleUI/morn/styles.xml">>c.jsfl
echo var targetFile = "%targetFile%";>>c.jsfl

type tmpjs\createAs.jsfl>>c.jsfl
call c.jsfl

