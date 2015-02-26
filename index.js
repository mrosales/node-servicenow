(function() {
    'use strict';
    var config = require('./lib/config');
    var query = require('./lib/query');
    module.exports = function(options) {
        if (!options.user ||
            !options.pass ||
            !options.instance) {
            console.log('\x1b[31m%s\x1b[0m', 'ServiceNow configuration options invalid.');
            return undefined;
        }
        config.configure(options);
        var incident = require('./lib/incident')(config);
        return {
            Query: query,
            Incident: incident
        };
    };    
})();