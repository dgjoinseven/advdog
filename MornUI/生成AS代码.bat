@echo off



del c.jsfl
set /p targetFile=�������ĳ����Դ

echo //����AS�ļ�·��	>>c.jsfl
echo var tmpAsFile = "file:///E|/works/blackhole/UI/BlackHoleUI/tmp.as";	>>c.jsfl
echo //���뷢��Ŀ¼	>>c.jsfl
echo var uiCodePath = "file:///E|/works/blackhole/BlackHoleClient/src/ss"	>>c.jsfl
echo //Ŀ��ԴĿ¼	>>c.jsfl
echo var rootFolder = "file:///E|/works/blackhole/UI/BlackHoleUI/morn/pages"	>>c.jsfl
echo var styleFile = "file:///E|/works/blackhole/UI/BlackHoleUI/morn/styles.xml">>c.jsfl
echo var targetFile = "%targetFile%";>>c.jsfl

type tmpjs\createAs.jsfl>>c.jsfl
call c.jsfl

