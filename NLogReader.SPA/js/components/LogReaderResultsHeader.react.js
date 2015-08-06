var React = require('react');

//  The API utils
var LogReaderAPIUtils = require('../utils/LogReaderAPIUtils');

//  The stores
var LogStore = require('../stores/LogStore');

/*
  Get the current state
 */
function getAppState()
{
  return{
      nextpagenumber: LogStore.getNextPageNumber(),
      pagesize: LogStore.getPageSize(),
      moreurl: LogStore.getMoreUrl(),
      startDate: LogStore.getStartDate(),
      endDate: LogStore.getEndDate(),
      itemcount: LogStore.getItemCount(),
      totalcount: LogStore.getTotalCount()
  };
}

var LogReaderResultsHeader = React.createClass({

  getInitialState: function() {
    return getAppState();
  },

  componentDidMount: function() {
    //  Add store listeners ... and notify ME of changes
    LogStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    //  Remove store listeners
    LogStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {

    //  If we have no items, don't display the header
    if(this.state.itemcount == 0)
      return null;

    //  If we have more data to display, clearly indicate that (and show the button)
    if(this.state.totalcount > this.state.itemcount)
    {
      return (
        <div id='results-header'>
          Showing <b>{this.state.itemcount}</b> log items out of <b>{this.state.totalcount}</b> <button type='button' className='btn btn-success btn-xs' onClick={this._moreClick}>Show more</button>
        </div>
      );  
    }
    else
    {
       return (
        <div id='results-header'>
          Showing <b>{this.state.itemcount}</b> log items
        </div>
      );   
    }
  	
  }, 

  _moreClick: function(e) {
    e.preventDefault();

    //  Get the log items:
    var params = {};
    params.StartDate = this.state.startDate;
    params.EndDate = this.state.endDate;
    params.PageSize = this.state.pagesize;
    params.Page = this.state.nextpagenumber;
    params.baseurl = this.state.moreurl;
    LogReaderAPIUtils.getMoreLogItems(params);
  },

   _onChange: function() {
    this.setState(getAppState());
  }

});

module.exports = LogReaderResultsHeader;