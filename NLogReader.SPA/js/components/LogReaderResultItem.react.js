var React = require('react');
var moment = require('moment');

var LogReaderResultItem = React.createClass({
    
  /**
   * @return {object}
   */
  render: function() {

    var log_message = this.props.item.log_message || "The selected log message will be displayed here";

  	return (
        <div id='selected-item'>
          <div id='selected-item-body'>
            <pre id='raw_log_message'>{log_message}</pre>
          </div>
        </div>
  	);
  }

});

module.exports = LogReaderResultItem;