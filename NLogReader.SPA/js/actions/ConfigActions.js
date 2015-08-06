var AppDispatcher = require('../dispatcher/AppDispatcher');
var LogReaderConstants = require('../constants/LogReaderConstants');

var ConfigActions = {

  recieveConfigData: function(config) {
    AppDispatcher.dispatch({
        actionType: LogReaderConstants.RECEIVE_CONFIG,
        config: config
    });
  },

  setCurrentEnvironment: function(env) {
    AppDispatcher.dispatch({
        actionType: LogReaderConstants.SET_SELECTED_ENVIRONMENT,
        env: env
    });
  }
    
};

module.exports = ConfigActions;