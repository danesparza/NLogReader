import {Component} from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import moment from 'moment';

//  The API utils
import LogReaderAPIUtils from '../utils/LogReaderAPIUtils';

//  The actions
import ConfigActions from '../actions/ConfigActions';

//  The stores
import ConfigStore from '../stores/ConfigStore';

class LogReaderToolbar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      startDate: moment().startOf('day'),
      endDate: moment(),
      pageSize: ConfigStore.getPageSize(),
      selectedEnvironment: ConfigStore.getEnvironment(),
      selectedApplication: ConfigStore.getSelectedApplication(),
      selectedMachine: ConfigStore.getSelectedMachine()
    };

    //  Bind our event handlers:
    this._dateRangeChange = this._dateRangeChange.bind(this);
    this._envChange = this._envChange.bind(this);
    this._searchClick = this._searchClick.bind(this);    
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    //  Add store listeners ... and notify ME of changes
    this.configListener = ConfigStore.addListener(this._onChange);
  }

  componentWillUnmount() {
    //  Remove store listeners
    this.configListener.remove();
  }

  /**
   * @return {object}
   */
  render() {

    //  Date range
    var start = this.state.startDate.format('MM-DD-YYYY');
    var end = this.state.endDate.format('MM-DD-YYYY');
    var label = start + ' to ' + end;
    if (start === end) {
      label = start;
    }

    //  Our date range picker presets:
    var rangePresets = {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 2 Weeks': [moment().subtract(14, 'days'), moment()],
      };

    //  Our config environments:
    var envs = this.props.environments;

  	return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="/">{this.props.appname}</a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            
            <form className="navbar-form navbar-left" role="search">
              
              <div className="form-group">
                <select className="form-control toolbar-control" value={this.state.selectedEnvironment.url} onChange={this._envChange}>
                  {envs.map(function(env) {
                    return (<option value={env.url} key={env.name}>{env.name}</option>);
                  })}
                </select>
              </div>
              
              <div className="form-group">
                <DateRangePicker startDate={this.state.startDate} endDate={this.state.endDate} ranges={rangePresets} onEvent={this._dateRangeChange}>
                  <button className="btn btn-default toolbar-control" type="button">From {label}</button>
                </DateRangePicker>
              </div>

              <div className="form-group">
                &nbsp;
                <div className="btn-group">
                  <button className="btn btn-primary toolbar-control" onClick={this._searchClick}>Search</button>
                  <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                    <span className="caret"></span>
                    <span className="sr-only">Toggle search options</span>
                  </button>
                </div>
              </div>

            </form>

          </div>
        </div>

      </nav>
  	);
  }

  _dateRangeChange(event, picker) {
    this.setState({
      startDate: picker.startDate,
      endDate: picker.endDate
    });
  }

  _envChange(e) {
    
    //  Create the environment:
    var env = {};
    env.name = e.target.selectedOptions[0].text;
    env.url = e.target.selectedOptions[0].value;

    //  Set the current environment:
    ConfigActions.setCurrentEnvironment(env)
  }

  _searchClick(e) {
    e.preventDefault();

    //  Get the log items:
    var params = {};
    params.StartDate = this.state.startDate.format('YYYY-MM-DD h:mma')
    params.EndDate = this.state.endDate.format('YYYY-MM-DD h:mma');
    params.PageSize = this.state.pageSize;
    params.Page = 0;
    params.baseurl = this.state.selectedEnvironment.url;

    //  See if we have an application or machine name filter:
    params.ApplicationName = this.state.selectedApplication;
    params.MachineName = this.state.selectedMachine;

    LogReaderAPIUtils.getLogItems(params);
    LogReaderAPIUtils.getHourlyCounts(params);
  }

  _onChange() {
    this.setState({
      selectedEnvironment: ConfigStore.getEnvironment(),
      selectedApplication: ConfigStore.getSelectedApplication(),
      selectedMachine: ConfigStore.getSelectedMachine()
    });
  }

}

export default LogReaderToolbar;