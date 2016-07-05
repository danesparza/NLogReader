import {Component} from 'react';
import moment from 'moment';

class LogReaderResultItemDetail extends Component {
    
  render() {

    let log_datetime = moment(this.props.item.entered_date).format('MMM-D h:mm a (s.S)');

  	return (
        <div className='row'>
          <div className='col-md-3'><b>Date/time:</b> {log_datetime}</div>
          <div className='col-md-3'><b>Application:</b> {this.props.item.log_application}</div>
          <div className='col-md-3'><b>Machine:</b> {this.props.item.log_machine_name}</div>
          <div className='col-md-3'><b>Log level:</b> {this.props.item.log_level}</div>
          <div className='col-md-3'><b>User name:</b> {this.props.item.log_user_name}</div>
          <div className='col-md-3'><b>SessionID:</b> {this.props.item.aspnet_sessionid}</div>
          <div className='col-md-6 text-danger'><b>Exception:</b> {this.props.item.log_exception}</div>
          <div className='col-md-12 text-muted'><b>Call site:</b> {this.props.item.log_call_site}</div>
          <div className='col-md-12 text-muted'><b>Stack trace:</b> {this.props.item.log_stacktrace}</div>

          <div className='col-md-12'>
            <b>Message:</b>
            <pre>{this.props.item.log_message}</pre>
          </div>
          
        </div>
  	);
  }

}

export default LogReaderResultItemDetail