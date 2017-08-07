import React, { Component } from 'react';
import moment from 'moment';

//  Grid component
import DataGrid from 'react-datagrid';

//  Components
import LogReaderResultItem from './LogReaderResultItem.react';
import LogReaderResultsHeader from './LogReaderResultsHeader.react';

//  The stores
import LogStore from '../stores/LogStore';

/*
  Get the current state
 */
function getAppState()
{
  return{
      logitems: LogStore.getLogData(),
      itemcount: LogStore.getItemCount(),
      totalcount: LogStore.getTotalCount()
  };
}

class LogReaderResults extends Component {

  constructor(props) {
    super(props);

    this.state = {
      columns : [
        { name: 'entered_date', title: 'Date / time', width: 200, render: function(v){return moment(v).format('MMM-D h:mm a (s.S)');} },
        { name: 'log_application', title: 'Application', width: 150 },
        { name: 'log_machine_name', title: 'Machine', width: 150  },
        { name: 'log_level', title: 'Log Level', width: 150  },
        { name: 'log_user_name', title: 'User', width: 150, visible: false},
        { name: 'aspnet_sessionid', title: 'ASP.NET session Id', width: 200, visible: false},
        { name: 'log_call_site', title: 'Call site', width: 150, visible: false},
        { name: 'log_stacktrace', title: 'Stack trace', width: 200, visible: false},
        { name: 'log_exception', title: 'Exception', width: 200, visible: false},
        { name: 'log_message', title: 'Message' },
      ],
      logitems: [],
      selectedItem: {},
      SELECTED_ID: '',
      itemcount: 0,
      totalcount: 0
    };

    //  Bind our event handlers:
    this.onColumnResize = this.onColumnResize.bind(this);
    this.onColumnOrderChange = this.onColumnOrderChange.bind(this);
    this.onSelectionChange = this.onSelectionChange.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.onColumnVisibilityChange = this.onColumnVisibilityChange.bind(this);
    this.handleRowStyle = this.handleRowStyle.bind(this);
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

  	return (
      <div>

        <LogReaderResultsHeader {...this.props} />

        <div>
            <DataGrid
            idProperty='system_logging_guid'
            dataSource={this.state.logitems}
            columns={this.state.columns}
            emptyText={'No log information'}
            onColumnResize={this.onColumnResize}
            onColumnVisibilityChange={this.onColumnVisibilityChange}
            onColumnOrderChange={this.onColumnOrderChange}
            selected={this.state.SELECTED_ID}
            onSelectionChange={this.onSelectionChange}
            onFilter={this.handleFilter}
            liveFilter={true} //to apply the filter while typing
            rowStyle={this.handleRowStyle}
            style={{height: 400}} />
          </div>
          <div>
            <LogReaderResultItem item={this.state.selectedItem} />
          </div>

        
          
      </div>
  	);
  }

  onColumnResize(firstCol, firstSize, secondCol, secondSize){
      firstCol.width = firstSize
      this.setState({})
  }

  onColumnOrderChange(index, dropIndex){
    var cols = this.state.columns;
    var col = cols[index];
    cols.splice(index, 1); //delete from index, 1 item
    cols.splice(dropIndex, 0, col);
    this.setState({columns: cols});
  }

  onSelectionChange(newSelectedId, data){
    this.setState({
      selectedItem: data,
      SELECTED_ID: newSelectedId
    })
  }

  handleFilter(column, value, allFilterValues){
    //  reset data to original data-array
    let filteredData = LogStore.getLogData();

    //  go over all filters and apply them
    Object.keys(allFilterValues).forEach(function(name){        
      var columnFilter = (allFilterValues[name] + '').toUpperCase()

      if (columnFilter === ''){
        return
      }

      filteredData = filteredData.filter(function(item){
          if ((item[name] + '').toUpperCase().indexOf(columnFilter) >= 0){
              return true;
          }
          return false;
      })
    })

    this.setState({
      logitems: filteredData
    });
  }

  onColumnVisibilityChange(col, visible) {
    col.visible = visible
    this.setState({})
  }

  handleRowStyle(data, props){
    var style = {}

    if (data.log_level === 'Error'){
      style.color = '#a94442';
      style.fontWeight = 'bold';
    }

    if (data.log_level === 'Warn'){
      style.color = '#8a6d3b';
    }

    if (data.log_level === 'Info'){
      style.color = '#31708f';
    }

    return style
  }

   _onChange() {
    this.setState(getAppState());
  }

}

export default LogReaderResults