import {Component} from 'react';
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';

//  The API utils
import LogReaderAPIUtils from '../utils/LogReaderAPIUtils';

//  The stores
import LogStore from '../stores/LogStore';
import ConfigStore from '../stores/ConfigStore';

const data = [
      {name: 'Page A', error: 4000, warn: 2400, debug: 2400},
      {name: 'Page B', error: 3000, warn: 1398, debug: 2210},
      {name: 'Page C', error: 2000, warn: 9800, debug: 2290},
      {name: 'Page D', error: 2780, warn: 3908, debug: 2000},
      {name: 'Page E', error: 1890, warn: 4800, debug: 2181},
      {name: 'Page F', error: 2390, warn: 3800, debug: 2500},
      {name: 'Page G', error: 3490, warn: 4300, debug: 2100},
];

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
          <div>
            Showing <b>{this.state.itemcount}</b> log items out of <b>{this.state.totalcount}</b> <button type='button' className='btn btn-success btn-xs' onClick={this._moreClick}>Show more</button>
          </div>
          <AreaChart width={600} height={100} data={data}
                margin={{top: 10, right: 30, left: 0, bottom: 0}}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Area type='monotone' dataKey='error' stackId="1" stroke='#C70039' fill='#C70039' />
            <Area type='monotone' dataKey='warn' stackId="1" stroke='#FF5733' fill='#FF5733' />
            <Area type='monotone' dataKey='debug' stackId="1" stroke='#FFC300' fill='#FFC300' />
          </AreaChart>
        </div>
      );  
    }
    else
    {
       return (
        <div id='results-header'>
          <div>
            Showing <b>{this.state.itemcount}</b> log items
          </div>
          <AreaChart width={600} height={100} data={data}
                margin={{top: 10, right: 30, left: 0, bottom: 0}}>
            <XAxis dataKey="name"/>
            <YAxis/>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Area type='monotone' dataKey='error' stackId="1" stroke='#C70039' fill='#C70039' />
            <Area type='monotone' dataKey='warn' stackId="1" stroke='#FF5733' fill='#FF5733' />
            <Area type='monotone' dataKey='debug' stackId="1" stroke='#FFC300' fill='#FFC300' />
          </AreaChart>
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

    //  See if we have an application or machine name filter:
    params.ApplicationName = ConfigStore.getSelectedApplication();
    params.MachineName = ConfigStore.getSelectedMachine();

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