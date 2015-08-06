# NLogReader
NLog dashboard for centralized loggging, searching and filtering

[![Build status](https://ci.appveyor.com/api/projects/status/6wrcxho3c6rssgsc?svg=true)](https://ci.appveyor.com/project/danesparza/nlogreader)

### What is it?
NLogReader is: 
* a JSON based API service to access your log data
* a single-page application to filter and display your log data.  

It's designed to be fast, pretty, and easy-to-use.

This service assumes you are already using [NLog](http://nlog-project.org/) for logging.  If you're not -- it's super easy to get started with NLog.  

Also, this service assumes you are logging to a database.  If you're not, just [run the included SQL script](https://github.com/danesparza/NLogReader/blob/master/sql/NLogReader.sql) in its own database and adjust your NLog configuration.

### Quick start
Download, build and install the service
Adjust the service configs to point to your database
Adjust your app config to point to the service
Run the app and search your log data!
