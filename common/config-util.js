let nconf = require('nconf');

function Config() {
    nconf.argv().env();
    const environment = nconf.get('NODE_ENV') || 'development';
    nconf.file(environment, './config/' + environment.toLowerCase() + '.json');
    nconf.file('default', './config/default.json');
}

Config.prototype.get = function(key) {
    return nconf.get(key);
};

//Export Modules
module.exports = new Config();
