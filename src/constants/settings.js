const localSettings = {
  API_END_POINT_URL: 'http://nar.lndo.site',
  APP_URL: 'http://localhost:3000'
};
  
const devSettings = {
  API_END_POINT_URL: 'https://naradmin.mybetasite.net',
  APP_URL: 'https://npr.mybetasite.net'
};

const prodSettings = {
  API_END_POINT_URL: 'https://webadmin.nationalparalegalregistry.com',
  APP_URL: 'https://nationalparalegalregistry.com'
};

const prepareSettings = () => {
	let settings;
	switch (document.location.hostname) {
		case 'nationalparalegalregistry.com':
			settings = prodSettings;
			break;
		case 'npr.mybetasite.net':
			settings = devSettings;
			break;
		case 'nar.lndo.site':
		default:
			settings = localSettings;
	}
	return settings;
};
  
export default prepareSettings();
