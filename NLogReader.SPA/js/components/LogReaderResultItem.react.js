import {Component} from 'react';
import moment from 'moment';

class LogReaderResultItem extends Component {
    
  render() {

    let log_message = this.props.item.log_message || "The selected log message will be displayed here";
    let h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

    //  Debugging output:
    // console.log(h);

  	return (
        <div id='selected-item'>
          <div id='selected-item-body'>
            <pre id='raw_log_message'>{log_message}</pre>
          </div>
        </div>
  	);
  }

}

export default LogReaderResultItem