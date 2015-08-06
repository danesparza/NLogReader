var AppDispatcher = require('../dispatcher/AppDispatcher');
var LogReaderConstants = require('../constants/LogReaderConstants');

var LogReaderActions = {

  recieveLogData: function(logData, totalCount, url, pagesize, pagenumber, startdate, enddate) {
    AppDispatcher.dispatch({
        actionType: LogReaderConstants.RECEIVE_RAW_LOG_ITEMS,
        logData: logData,
        totalCount: totalCount,
        envurl: url,
        pagesize: pagesize,
        pagenumber: pagenumber,
        startdate: startdate,
        enddate: enddate
    });
  },

  mergeLogData: function(logData, totalCount, url, pagesize, pagenumber, startdate, enddate) {
    AppDispatcher.dispatch({
        actionType: LogReaderConstants.MERGE_RAW_LOG_ITEMS,
        logData: logData,
        totalCount: totalCount,
        envurl: url,
        pagesize: pagesize,
        pagenumber: pagenumber,
        startdate: startdate,
        enddate: enddate
    });
  }

};

module.exports = LogReaderActions;