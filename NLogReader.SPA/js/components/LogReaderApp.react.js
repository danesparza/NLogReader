var React = require('react');

//  Grid component
var Griddle = require('griddle-react');

//  The components
var LogReaderToolbar = require('./LogReaderToolbar.react');
var LogReaderResults = require('./LogReaderResults.react');

//  The stores
var LogStore = require('../stores/LogStore');
var ConfigStore = require('../stores/ConfigStore');

/*
  Get the current state
 */
function getAppState()
{
  return{
      logitems: LogStore.getLogData(),
      config: ConfigStore.getConfig(),
      itemcount: LogStore.getItemCount(),
      totalcount: LogStore.getTotalCount()
  };
}

var LogReaderApp = React.createClass({
    
  getInitialState: function() {
    return getAppState();
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
  	return (
      <div>

        <LogReaderToolbar environments={this.state.config.environments} />

        <div className="container-fluid">

          <div className="row">
              <div className="col-md-12">
                <LogReaderResults />
              </div>
          </div>

        </div>

      </div>
  	);
  },

  _onChange: function() {
    this.setState(getAppState());
  }

});

module.exports = LogReaderApp;