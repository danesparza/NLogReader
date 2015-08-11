# NLogReader
NLog dashboard for centralized loggging, searching and filtering

[![Build status](https://ci.appveyor.com/api/projects/status/6wrcxho3c6rssgsc?svg=true)](https://ci.appveyor.com/project/danesparza/nlogreader)

### What is it?
NLogReader is: 
* a JSON based API service to access your log data
* a single-page application to filter and display your log data.  

It's designed to be fast, pretty, and easy-to-use.

This service assumes you are already using [NLog](http://nlog-project.org/) for logging.  If you're not -- it's super easy to [get started with NLog](http://nlog-project.org/download/).  

Also, this service assumes you are logging to a database.  If you're not, just [run the included SQL script](https://github.com/danesparza/NLogReader/blob/master/sql/NLogReader.sql) in its own database and adjust your NLog configuration.

### Quick start
* Download, build and install [the service](https://github.com/danesparza/NLogReader/tree/master/NLogReader.Service)
* Adjust the service configs to [point to your database](https://github.com/danesparza/NLogReader/blob/master/NLogReader.Service/App.config#L28) 
* Adjust your app config to [point to the service](https://github.com/danesparza/NLogReader/blob/master/NLogReader.SPA/config.js#L5)
* Run [the app](https://github.com/danesparza/NLogReader/tree/master/NLogReader.SPA) and search your log data!

### Making changes to the code

#### The web app
Prerequisites to work on the single page app: 
* Make sure you have [node](https://nodejs.org/) installed (for npm). Installation is simple, and there are installers for every major platform.  
* On windows, it helps to have the [Msysgit (Git for windows)](https://msysgit.github.io/) client installed -- mostly because of the awesome bash-like command line prompt that it gives you.
* [Fork the repo](https://help.github.com/articles/fork-a-repo/) and [clone to your local dev box](https://help.github.com/articles/fetching-a-remote/).  
* Navigate to the directory of the web application and run `npm install` from the command line.  (Use msysgit if you have it installed).  If you don't see any errors (and instead see a stream of stuff that got downloaded) you should be ready to go!


