import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import LogReaderConstants from '../actions/ActionTypes';

class ConfigStore extends Store {

  constructor(dispatcher){
    super(dispatcher);

    this.configdata = { environments: [{"name": "Loading...", "url": "configNotLoadedYet"}]};
    this.selectedEnv = {};
    this.selectedApp = "";
    this.selectedMachine = "";
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

  getSelectedApplication(){
      return this.selectedApp;
  }

  getSelectedMachine(){
      return this.selectedMachine;
  }

  __onDispatch(action) {
    
    switch(action.actionType) {
      case LogReaderConstants.RECEIVE_CONFIG:
        this.configdata = action.config;
        this.selectedEnv = action.config.environments[0];
        console.log("Config data: " + this.configdata);
        this.__emitChange();
        break;
      case LogReaderConstants.SET_SELECTED_ENVIRONMENT:
        this.selectedEnv = action.env;
        this.__emitChange();
        break;
      case LogReaderConstants.SET_SEARCH_APPLICATION:
        this.selectedApp = action.application;
        this.__emitChange();
        break;
      case LogReaderConstants.SET_SEARCH_MACHINE:
        this.selectedMachine = action.machine;
        this.__emitChange();
        break;

      default:
        // no op
    }
  }

}

export default new ConfigStore(AppDispatcher);