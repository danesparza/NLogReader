var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var LogReaderConstants = require('../constants/LogReaderConstants');
var CHANGE_EVENT = 'config-change';

var _configdata = {
  environments: [{"name": "Loading...", "url": "configNotLoadedYet"}]
};
var _selectedEnv = {};

function setConfigData(config) {
    _configdata = config;
}

function setSelectedEnv(environment)
{
  _selectedEnv = environment;
}

var ConfigStore = assign({}, EventEmitter.prototype, {

  getConfig: function() {
      return _configdata;
  },

  getEnvironment: function(){
      return _selectedEnv;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  
  switch(action.actionType) {
      case LogReaderConstants.RECEIVE_CONFIG:
          setConfigData(action.config);
          setSelectedEnv(action.config.environments[0]);
          ConfigStore.emitChange();
        break;
      case LogReaderConstants.SET_SELECTED_ENVIRONMENT:
          setSelectedEnv(action.env);
          ConfigStore.emitChange();
        break;

    default:
      // no op
  }
});

module.exports = ConfigStore;