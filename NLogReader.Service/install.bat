C:\Windows\Microsoft.NET\Framework\v4.0.30319\installutil.exe NLogReader.Service.exe
netsh http add urlacl url=http://+:9000/ user="Local Service"
pause