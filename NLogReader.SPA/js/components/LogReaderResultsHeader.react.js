import {Component} from 'react';

//  The API utils
import LogReaderAPIUtils from '../utils/LogReaderAPIUtils';

//  The stores
import LogStore from '../stores/LogStore';

class LogReaderResultsHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nextpagenumber: LogStore.getNextPageNumber(),
      pagesize: LogStore.getPageSize(),
      moreurl: LogStore.getMoreUrl(),
      startDate: LogStore.getStartDate(),
      endDate: LogStore.getEndDate(),
      itemcount: LogStore.getItemCount(),
      totalcount: LogStore.getTotalCount()
    };

    //  Bind our event handlers:
    this._moreClick = this._moreClick.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    //  Add store listeners ... and notify ME of changes
    this.logListener = LogStore.addListener(this._onChange);
  }

  componentWillUnmount() {
    //  Remove store listeners
    this.logListener.remove();
  }

  /**
   * @return {object}
   */
  render() {

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
  	
  }

  _moreClick(e) {
    e.preventDefault();

    //  Get the log items:
    var params = {};
    params.StartDate = this.state.startDate;
    params.EndDate = this.state.endDate;
    params.PageSize = this.state.pagesize;
    params.Page = this.state.nextpagenumber;
    params.baseurl = this.state.moreurl;
    LogReaderAPIUtils.getMoreLogItems(params);
  }

   _onChange() {
    this.setState({
      nextpagenumber: LogStore.getNextPageNumber(),
      pagesize: LogStore.getPageSize(),
      moreurl: LogStore.getMoreUrl(),
      startDate: LogStore.getStartDate(),
      endDate: LogStore.getEndDate(),
      itemcount: LogStore.getItemCount(),
      totalcount: LogStore.getTotalCount()
    });
  }

}

export default LogReaderResultsHeader