
import LogReaderActions from '../actions/LogReaderActions';
import nprogress from 'nprogress';

class LogReaderAPIUtils {
    
    //    Get log items based on params
    getLogItems(params) {

        let url = `${params.baseurl}/api/v1/logs/get`;
        console.log("Log data params: %O", params)
        console.time("Fetched log data");
        nprogress.start();

        fetch(url, 
        {
            mode: 'cors',
            method: 'post',
            body: JSON.stringify(params)
        })
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                // Examine the text in the response  
                response.json().then(function (data) {
                    LogReaderActions.recieveLogData(data.Data, data.TotalCount, params.baseurl, params.PageSize, params.Page, params.StartDate, params.EndDate);
                });
            }
        )
        .catch(function (err) {
            //  Something bad happened
            LogReaderActions.recieveLogData([], 0, 0, "");
            console.warn("There was a problem getting log data");
        })
        .then(function(){
            console.timeEnd("Fetched log data");
            nprogress.done();
        });
    }

    //  Get more log items based on params
    getMoreLogItems(params) {

        /*
        let url = `${params.baseurl}/api/v1/logs/get`;
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
        */
    }

    //  Get the hourly counts based on params
    getHourlyCounts(params) {
        /*
        let url = `${params.baseurl}/api/v1/logs/logcountsbyhour`;
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
        */
    }
}

export default new LogReaderAPIUtils();