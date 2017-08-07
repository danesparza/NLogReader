
import ConfigActions from '../actions/ConfigActions';

class ConfigUtils {

  //  Get config data
  getConfig() {

    //	Set the REST url
		let url = "/config.json";

		fetch(url)
			.then(
				function (response) {
					if (response.status !== 200) {
						console.log('Looks like there was a problem loading config. Status Code: ' + response.status);
						return;
					}

					// Receive system state
					response.json().then(function (data) {
            ConfigActions.recieveConfigData(data);
					});
				}
			)
			.catch(function (err) {
				console.log('Fetch Error :-S', err);
			});
  }
  
}

export default new ConfigUtils();