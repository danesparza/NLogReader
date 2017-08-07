import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//	The API utils
import ConfigUtils from './utils/ConfigUtils';

//	Get the app config:
ConfigUtils.getConfig();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
