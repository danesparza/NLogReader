import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import LogReaderConstants from '../constants/LogReaderConstants';

import Immutable from 'immutable';

class LogStore extends Store {

    constructor(dispatcher){
        super(dispatcher);

        this.logdata = Immutable.List();
        this.envurl = "";
        this.itemCount = 0;
        this.totalCount = 0;
        this.pageSize = 0;
        this.lastPageAdded = 0;
        this.logcountdata = Immutable.List();

        this.startDate = {};
        this.endDate = {};
    }

    setLogData(logdata, totalcount, pagesize, lastpageadded, startdate, enddate, envurl) {
        this.logdata = Immutable.List(logdata);
        this.itemCount = this.logdata.size;
        this.totalCount = totalcount;
        
        this.pageSize = pagesize;
        this.lastPageAdded = lastpageadded;

        this.startDate = startdate;
        this.endDate = enddate;

        this.envurl = envurl;
    }

    mergeLogData(logdata, totalcount, pagesize, lastpageadded, startdate, enddate) {
        this.logdata = this.logdata.concat(logdata);
        this.itemCount = this.logdata.size;
        this.totalCount = totalcount;

        this.pageSize = pagesize;
        this.lastPageAdded = lastpageadded;

        this.startDate = startdate;
        this.endDate = enddate;
    }

    setHourlyCountData(logcountdata){
        this.logcountdata = Immutable.List(logcountdata);
    }

    getLogData() {
        return this.logdata.toJS();
    }

    getHourlyLogData() {
        return this.logcountdata.toJS();
    }

    getItemCount() {
        return this.itemCount;
    }

    getTotalCount() {
        return this.totalCount;
    }

    getNextPageNumber() {
        return this.lastPageAdded + 1;
    }

    getPageSize() {
        return this.pageSize;
    }

    getMoreUrl() {
        return this.envurl;
    }

    getStartDate() {
        return this.startDate;
    }

    getEndDate() {
        return this.endDate;
    }

    __onDispatch(action) {

        switch(action.actionType) {
            case LogReaderConstants.RECEIVE_RAW_LOG_ITEMS:
                this.setLogData(action.logData, action.totalCount, action.pagesize, action.pagenumber, action.startdate, action.enddate, action.envurl);
                this.__emitChange();
                break;
            case LogReaderConstants.MERGE_RAW_LOG_ITEMS:
                this.mergeLogData(action.logData, action.totalCount, action.pagesize, action.pagenumber, action.startdate, action.enddate);
                this.__emitChange();
                break;
            case LogReaderConstants.RECEIVE_RAW_HOURLY_LOG_COUNTS:
                this.setHourlyCountData(action.logCountData);
                this.__emitChange();
                break;
            default:
            // no op
        }
    }

}


module.exports = new LogStore(AppDispatcher);