@echo off
set svnBin=C:\Program Files\TortoiseSVN\bin\TortoiseProc.exe

svn update "C:\wamp\www\blackhole\res\skins"
del "bin\assets\comp.swf"
Xcopy "bin\assets\*.swf" "C:\wamp\www\blackhole\res\skins" /s /e /y 
call "%svnBin%" /command:commit /path:"C:\wamp\www\blackhole\res\skins" /closeoned:0
