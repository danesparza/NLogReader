import {Component} from 'react';
import Dimensions from 'react-dimensions';

//  The components
import LogReaderToolbar from './LogReaderToolbar.react';
import LogReaderResults from './LogReaderResults.react';

//  The actions
import ConfigActions from '../actions/ConfigActions';

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
      totalcount: LogStore.getTotalCount(),
      selectedApplication: ConfigStore.getSelectedApplication(),
      selectedMachine: ConfigStore.getSelectedMachine()
    };
    
    //  Bind our event handlers:
    this._onChange = this._onChange.bind(this);
    this._appChange = this._appChange.bind(this);
    this._machineChange = this._machineChange.bind(this);
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
                
                <div className="panel panel-default collapse" id="collapseExample">
                  <div className="panel-heading">
                    <b className="panel-title">Search options</b>
                    <button type="button" className="close" aria-label="Close" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"><span aria-hidden="true">&times;</span></button>
                  </div>
                  <div className="panel-body">
                    <form>
                      <div className="form-group">
                        <label htmlFor="txtApplication">Only search for this Application</label>
                        <input value={this.state.selectedApplication} onChange={this._appChange} type="text" className="form-control" id="txtApplication" placeholder="Application"/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="txtMessage">Only search for this Machine</label>
                        <input value={this.state.selectedMachine} onChange={this._machineChange} type="text" className="form-control" id="txtMessage" placeholder="Machine"/>
                      </div>
                    </form>
                  </div>
                </div>

                <LogReaderResults {...this.props} />
              </div>
          </div>

        </div>

      </div>
  	);
  }

  _appChange(e){
    //  Set the selected application filter:
    ConfigActions.setSearchApplication(e.target.value);
  }

  _machineChange(e){
    //  Set the selected message filter:
    ConfigActions.setSearchMachine(e.target.value);
  }

  _onChange() {
    this.setState({
      logitems: LogStore.getLogData(),
      config: ConfigStore.getConfig(),
      itemcount: LogStore.getItemCount(),
      totalcount: LogStore.getTotalCount(),
      selectedApplication: ConfigStore.getSelectedApplication(),
      selectedMachine: ConfigStore.getSelectedMachine()
    });
  }

}

export default Dimensions()(LogReaderApp) // Enhanced component