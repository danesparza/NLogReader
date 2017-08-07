import {Store} from 'flux/utils';
import AppDispatcher from '../dispatcher/AppDispatcher';
import LogReaderConstants from '../actions/ActionTypes';

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
        var countItems = this.logcountdata.toJS();
        
        countItems = countItems.map(function(v) {
            var countItem = {
                time: new Date(v.Year,v.Month-1,v.Day, v.Hour, v.Minute, 0).getTime(),
                Year: v.Year,
                Month: v.Month,
                Day: v.Day,
                Hour: v.Hour,
                Minute: v.Minute,
                TraceCount: v.TraceCount,
                DebugCount: v.DebugCount,
                InfoCount: v.InfoCount,
                WarnCount: v.WarnCount,
                ErrorCount: v.ErrorCount,
                FatalCount: v.FatalCount
            };
            return countItem;
        });

        return countItems;
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


export default new LogStore(AppDispatcher);