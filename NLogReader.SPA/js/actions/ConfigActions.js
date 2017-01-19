import AppDispatcher from '../dispatcher/AppDispatcher';
import LogReaderConstants from '../constants/LogReaderConstants';

class ConfigActions {

  recieveConfigData(config) {
    AppDispatcher.dispatch({
        actionType: LogReaderConstants.RECEIVE_CONFIG,
        config: config
    });
  }

  setCurrentEnvironment(env) {
    AppDispatcher.dispatch({
        actionType: LogReaderConstants.SET_SELECTED_ENVIRONMENT,
        env: env
    });
  }

  setSearchApplication(application) {
    AppDispatcher.dispatch({
        actionType: LogReaderConstants.SET_SEARCH_APPLICATION,
        application: application
    });
  }

  setSearchMachine(machine) {
    AppDispatcher.dispatch({
        actionType: LogReaderConstants.SET_SEARCH_MACHINE,
        machine: machine
    });
  }
    
}

module.exports = new ConfigActions(AppDispatcher);