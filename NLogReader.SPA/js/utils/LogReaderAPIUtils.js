
import LogReaderActions from '../actions/LogReaderActions';
import nprogress from 'nprogress';

module.exports = {

  //    Get log items based on params
  getLogItems: function(params) {
    
    var url = params.baseurl + "/api/v1/logs/get";
    console.log("Log data params: %O", params)
    console.time("Fetched log data");
    nprogress.start();

    $.ajax( {
      type: "POST",
      url: url,
      data: params} 
    )
    .done(function(response) {
        //  Call the action to receive the data:
        LogReaderActions.recieveLogData(response.Data, response.TotalCount, params.baseurl, params.PageSize, params.Page, params.StartDate, params.EndDate);
    }.bind(this))
    .fail(function() {
        //  Something bad happened
        LogReaderActions.recieveLogData([], 0, 0, "");
        console.warn("There was a problem getting log data");
    })
    .always(function(){
        console.timeEnd("Fetched log data");
        nprogress.done();
    });
  }, 

  getMoreLogItems: function(params) {
    
    var url = params.baseurl + "/api/v1/logs/get";
    console.log("Log data params: %O", params)
    console.time("Fetched more log data");
    nprogress.start();

    $.ajax( {
      type: "POST",
      url: url,
      data: params} 
    )
    .done(function(response) {
        //  Call the action to receive the data:
        LogReaderActions.mergeLogData(response.Data, response.TotalCount, params.baseurl, params.PageSize, params.Page, params.StartDate, params.EndDate);
    }.bind(this))
    .fail(function() {
        //  Something bad happened
        console.warn("There was a problem getting more log data");
    })
    .always(function(){
        console.timeEnd("Fetched more log data");
        nprogress.done();
    });
  },

  getHourlyCounts: function(params) {

    var url = params.baseurl + "/api/v1/logs/logcountsbyhour";
    console.time("Fetched log counts");

    $.ajax( {
      type: "GET",
      url: url} 
    )
    .done(function(response) {
        //  Call the action to receive the data:
        LogReaderActions.receiveLogCounts(response);
    }.bind(this))
    .fail(function() {
        //  Something bad happened
        console.warn("There was a problem getting log counts");
        LogReaderActions.resetLogCounts();
    })
    .always(function(){
        console.timeEnd("Fetched log counts");
    });

  }

};