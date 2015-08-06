
var ConfigActions = require('../actions/ConfigActions');

module.exports = {

  //    Set the config items
  setConfig: function(configvar) {
  	
    //  Call the action to receive the data:
    ConfigActions.recieveConfigData(configvar);
  }

};