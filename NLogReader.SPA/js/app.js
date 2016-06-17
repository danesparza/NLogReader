import React from 'react';
import ReactDOM from 'react-dom';

window.React = React; // export for http://fb.me/react-devtools

//  Cookie manager
import cookies from 'cookies-js';

//  The Actions
import ConfigActions from './actions/ConfigActions';

//	The API utils
import LogReaderAPIUtils from './utils/LogReaderAPIUtils';
import ConfigUtils from './utils/ConfigUtils';

//	The app component
import LogReaderApp from './components/LogReaderApp.react';

//  Application element
var appElement = document.getElementById("logreaderdapp");

//	Get the app config:
ConfigUtils.setConfig(appconfig);

//	Start the app
ReactDOM.render(<LogReaderApp />, appElement);	
