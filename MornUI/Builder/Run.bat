echo ����UI���߱���
%~dp0"e:\qlz\Svn\Tools\SVN1.8\svn.exe" up  ..
echo ���¸��²߻�����
%~dp0"e:\qlz\Svn\Tools\SVN1.8\svn.exe" up  e:\qlz\Svn\Product\1.0.0.0\data\
echo ����MornUI����
%~dp0"e:\qlz\Svn\Tools\SVN1.8\svn.exe" up  e:\qlz\Svn\Product\1.0.0.0\MornUI\
echo ����morn�Ĵ��swf��Դ
%~dp0"e:\qlz\Svn\Tools\SVN1.8\svn.exe" up  e:\qlz\Svn\Product\1.0.0.0\assets\mornui\
echo �����ļ��������

echo ���������ļ�
%~dp0"svn1.8\svn.exe" up %assets_path%

echo ��MornUI����
start %~dp0"MornBuilder.exe"

exit