import {Component} from 'react';
import moment from 'moment';

//  Components
import LogReaderResultItemDetail from './LogReaderResultItemDetail.react';

class LogReaderResultItem extends Component {
    
  render() {

    let default_message = "The selected log message will be displayed here";
    let log_detail = this.props.item.log_message || default_message;

    //  If it's not the default message, show the log details
    if(log_detail != default_message)
    {
      log_detail = <LogReaderResultItemDetail item={this.props.item} />
    }

  	return (
        <div id='selected-item'>
          <div id='selected-item-body container'>
            {log_detail}
          </div>
        </div>
  	);
  }

}

export default LogReaderResultItem