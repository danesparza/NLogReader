var React = require('react');
window.React = React; // export for http://fb.me/react-devtools

//  Flat iron director
var director = require('director');

//  Cookie manager
var cookies = require('cookies-js');

//  The Actions
var ConfigActions = require('./actions/ConfigActions');

//	The API utils
var LogReaderAPIUtils = require('./utils/LogReaderAPIUtils');
var ConfigUtils = require('./utils/ConfigUtils');

//	The app component
var LogReaderApp = require('./components/LogReaderApp.react');

/*
//  The actions
var PageActions = require('./actions/PageActions');

//  Router setup
var router = director.Router({
  '/': function () { PageActions.showHome(); },
  '/settings': function () { PageActions.showSettings(); }
});
router.init('/');
*/

//  Application element
var appElement = document.getElementById("logreaderdapp");

//	Get the app config:
ConfigUtils.setConfig(appconfig);

//	Start the app
React.render(<LogReaderApp />, appElement);	
