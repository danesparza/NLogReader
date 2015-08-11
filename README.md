# NLogReader
NLog dashboard for centralized loggging, searching and filtering

Screenshot: 

![Dashboard screenshot](NLogReader.png?raw=true)

[![Build status](https://ci.appveyor.com/api/projects/status/6wrcxho3c6rssgsc?svg=true)](https://ci.appveyor.com/project/danesparza/nlogreader)

### What is it?
NLogReader is: 
* a single-page application to filter and display your log data.  
* a JSON based API service to access your log data

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
The web app is a React/Flux single page app.  Configuration is in config.js

Watching for changes and automatically rebuilding bundle.js:
```
npm start
```

Building a release version of the bundle.js
```
npm run build
```

