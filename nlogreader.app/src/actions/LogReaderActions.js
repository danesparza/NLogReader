import AppDispatcher from '../dispatcher/AppDispatcher';
import LogReaderConstants from './ActionTypes';

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

  receiveLogCounts(logCountData){
    AppDispatcher.dispatch({
        actionType: LogReaderConstants.RECEIVE_RAW_HOURLY_LOG_COUNTS,
        logCountData: logCountData
    });
  }

  resetLogCounts(){
    AppDispatcher.dispatch({
        actionType: LogReaderConstants.RECEIVE_RAW_HOURLY_LOG_COUNTS,
        logCountData: null
    });
  }

}

export default new LogReaderActions(AppDispatcher);