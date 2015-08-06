var React = require('react');
var DateRangePicker = require('react-bootstrap-daterangepicker');
var moment = require('moment');

//  The API utils
var LogReaderAPIUtils = require('../utils/LogReaderAPIUtils');

//  The actions
var ConfigActions = require('../actions/ConfigActions');

//  The stores
var ConfigStore = require('../stores/ConfigStore');

function getAppState()
{
  return{
      selectedEnvironment: ConfigStore.getEnvironment()
  };
}

var LogReaderToolbar = React.createClass({

  getInitialState: function() {
    return {
      startDate: moment().startOf('day'),
      endDate: moment(),
      selectedEnvironment: ConfigStore.getEnvironment()
    };
  },

  componentDidMount: function() {
    //  Add store listeners ... and notify ME of changes
    ConfigStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    //  Remove store listeners
    ConfigStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {

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
            <a className="navbar-brand" href="/">NLogReader</a>
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
                <button className="btn btn-primary toolbar-control" onClick={this._searchClick}>Search</button>
              </div>

            </form>

          </div>
        </div>
      </nav>
  	);
  },

  _dateRangeChange: function (event, picker) {
    this.setState({
      startDate: picker.startDate,
      endDate: picker.endDate
    });
  },

  _envChange: function(e) {
    
    //  Create the environment:
    var env = {};
    env.name = e.target.selectedOptions[0].text;
    env.url = e.target.selectedOptions[0].value;

    //  Set the current environment:
    ConfigActions.setCurrentEnvironment(env)
  },

  _searchClick: function(e) {
    e.preventDefault();

    //  Get the log items:
    var params = {};
    params.StartDate = this.state.startDate.format('YYYY-MM-DD h:mma')
    params.EndDate = this.state.endDate.format('YYYY-MM-DD h:mma');
    params.PageSize = 1000;
    params.Page = 0;
    params.baseurl = this.state.selectedEnvironment.url;
    LogReaderAPIUtils.getLogItems(params);
  },

  _onChange: function() {
    this.setState(getAppState());
  }

});

module.exports = LogReaderToolbar;