var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var Immutable = require('immutable');

var LogReaderConstants = require('../constants/LogReaderConstants');
var CHANGE_EVENT = 'logitem-change';

var _logdata = Immutable.List();
var _envurl = "";
var _itemCount = 0;
var _totalCount = 0;

var _pageSize = 0;
var _lastPageAdded = 0;

var _startdate = {};
var _enddate = {};

function setLogData(logdata, totalcount, pagesize, lastpageadded, startdate, enddate, envurl) {
    _logdata = Immutable.List(logdata);
    _itemCount = _logdata.size;
    _totalCount = totalcount;
    
    _pageSize = pagesize;
    _lastPageAdded = lastpageadded;

    _startdate = startdate;
    _enddate = enddate;

    _envurl = envurl;
}

function mergeLogData(logdata, totalcount, pagesize, lastpageadded, startdate, enddate) {
    _logdata = _logdata.concat(logdata);
    _itemCount = _logdata.size;
    _totalCount = totalcount;
    
    _pageSize = pagesize;
    _lastPageAdded = lastpageadded;

    _startdate = startdate;
    _enddate = enddate;
}

var LogStore = assign({}, EventEmitter.prototype, {

  getLogData: function() {
      return _logdata.toJS();
  },

  getItemCount: function() {
      return _itemCount;
  },

  getTotalCount: function() {
      return _totalCount;
  },

  getNextPageNumber: function() {
      return _lastPageAdded + 1;
  },

  getPageSize: function() {
      return _pageSize;
  },

  getMoreUrl: function() {
      return _envurl;
  },

  getStartDate: function() {
      return _startdate;
  },

  getEndDate: function() {
      return _enddate;
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
      case LogReaderConstants.RECEIVE_RAW_LOG_ITEMS:
          setLogData(action.logData, action.totalCount, action.pagesize, action.pagenumber, action.startdate, action.enddate, action.envurl);
          LogStore.emitChange();
        break;
      
      case LogReaderConstants.MERGE_RAW_LOG_ITEMS:
          mergeLogData(action.logData, action.totalCount, action.pagesize, action.pagenumber, action.startdate, action.enddate);
          LogStore.emitChange();
        break;


    default:
      // no op
  }
});

module.exports = LogStore;