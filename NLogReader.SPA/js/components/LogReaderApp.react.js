import {Component} from 'react';

//  The components
import LogReaderToolbar from './LogReaderToolbar.react';
import LogReaderResults from './LogReaderResults.react';

//  The stores
import LogStore from '../stores/LogStore';
import ConfigStore from '../stores/ConfigStore';

class LogReaderApp extends Component {
    
  constructor(props) {
    super(props);
    
    this.state = {
      logitems: LogStore.getLogData(),
      config: ConfigStore.getConfig(),
      itemcount: LogStore.getItemCount(),
      totalcount: LogStore.getTotalCount()
    };
    
    //  Bind our event handlers:
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
  	return (
      <div>

        <LogReaderToolbar environments={this.state.config.environments} appname={this.state.config.appname} />

        <div className="container-fluid">

          <div className="row">
              <div className="col-md-12">
                <LogReaderResults />
              </div>
          </div>

        </div>

      </div>
  	);
  }

  _onChange() {
    this.setState({
      logitems: LogStore.getLogData(),
      config: ConfigStore.getConfig(),
      itemcount: LogStore.getItemCount(),
      totalcount: LogStore.getTotalCount()
    });
  }

}

export default LogReaderApp