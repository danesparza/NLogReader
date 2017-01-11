import AppDispatcher from '../dispatcher/AppDispatcher';
import LogReaderConstants from '../constants/LogReaderConstants';

class LogReaderActions {

  recieveLogData(logData, totalCount, url, pagesize, pagenumber, startdate, enddate) {
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
  }

  mergeLogData(logData, totalCount, url, pagesize, pagenumber, startdate, enddate) {
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

}

module.exports = new LogReaderActions(AppDispatcher);