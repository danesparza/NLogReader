var React = require('react');
var moment = require('moment');

//  Grid component
var DataGrid = require('react-datagrid');

//  Components
var LogReaderResultItem = require('./LogReaderResultItem.react');
var LogReaderResultsHeader = require('./LogReaderResultsHeader.react');

//  The stores
var LogStore = require('../stores/LogStore');

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

var LogReaderResults = React.createClass({

  componentDidMount: function() {
    //  Add store listeners ... and notify ME of changes
    LogStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    //  Remove store listeners
    LogStore.removeChangeListener(this._onChange);
  },

  getInitialState: function() {
    return{
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
  },

  /**
   * @return {object}
   */
  render: function() {

  	return (
      <div>
        <LogReaderResultsHeader />

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
          style={{height: 500}} />

        <LogReaderResultItem item={this.state.selectedItem} />
          
      </div>
  	);
  },

  onColumnResize: function(firstCol, firstSize, secondCol, secondSize){
      firstCol.width = firstSize
      this.setState({})
  },

  onColumnOrderChange: function (index, dropIndex){
    var cols = this.state.columns;
    var col = cols[index];
    cols.splice(index, 1); //delete from index, 1 item
    cols.splice(dropIndex, 0, col);
    this.setState({columns: cols});
  },

  onSelectionChange: function(newSelectedId, data){
    this.setState({
      selectedItem: data,
      SELECTED_ID: newSelectedId
    })
  },

  handleFilter: function(column, value, allFilterValues){
    //  reset data to original data-array
    filteredData = LogStore.getLogData();

    //  go over all filters and apply them
    Object.keys(allFilterValues).forEach(function(name){        
      var columnFilter = (allFilterValues[name] + '').toUpperCase()

      if (columnFilter == ''){
        return
      }

      filteredData = filteredData.filter(function(item){
          if ((item[name] + '').toUpperCase().indexOf(columnFilter) >= 0){
              return true
          }
      })
    })

    this.setState({
      logitems: filteredData
    });
  },

  onColumnVisibilityChange: function(col, visible) {
    col.visible = visible
    this.setState({})
  },

  handleRowStyle: function(data, props){
    var style = {}

    if (data.log_level == 'Error'){
      style.color = '#a94442';
      style.fontWeight = 'bold';
    }

    if (data.log_level == 'Warn'){
      style.color = '#8a6d3b';
    }

    if (data.log_level == 'Info'){
      style.color = '#31708f';
    }

    return style
  },

   _onChange: function() {
    this.setState(getAppState());
  }

});

module.exports = LogReaderResults;