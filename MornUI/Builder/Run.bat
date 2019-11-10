echo 更新UI工具本身
%~dp0"e:\qlz\Svn\Tools\SVN1.8\svn.exe" up  ..
echo 更新更新策划数据
%~dp0"e:\qlz\Svn\Tools\SVN1.8\svn.exe" up  e:\qlz\Svn\Product\1.0.0.0\data\
echo 更新MornUI配置
%~dp0"e:\qlz\Svn\Tools\SVN1.8\svn.exe" up  e:\qlz\Svn\Product\1.0.0.0\MornUI\
echo 更新morn的打包swf资源
%~dp0"e:\qlz\Svn\Tools\SVN1.8\svn.exe" up  e:\qlz\Svn\Product\1.0.0.0\assets\mornui\
echo 配置文件更新完毕

echo 更新配置文件
%~dp0"svn1.8\svn.exe" up %assets_path%

echo 打开MornUI工具
start %~dp0"MornBuilder.exe"

exit