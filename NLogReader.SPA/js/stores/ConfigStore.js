import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import LogReaderConstants from '../constants/LogReaderConstants';

class ConfigStore extends Store {

  constructor(dispatcher){
    super(dispatcher);

    this.configdata = { environments: [{"name": "Loading...", "url": "configNotLoadedYet"}]};
    this.selectedEnv = {};
  }

  getPageSize() {
      //  Return the page size, but default to 1500:
      return this.configdata.pagesize || 1500;
  }

  getConfig() {
      return this.configdata;
  }

  getEnvironment(){
      return this.selectedEnv;
  }

  __onDispatch(action) {
    
    switch(action.actionType) {
      case LogReaderConstants.RECEIVE_CONFIG:
        this.configdata = action.config;
        this.selectedEnv = action.config.environments[0];
        this.__emitChange();
        break;
      case LogReaderConstants.SET_SELECTED_ENVIRONMENT:
        this.selectedEnv = action.env;
        this.__emitChange();
        break;

      default:
        // no op
    }
  }

}

module.exports = new ConfigStore(AppDispatcher);