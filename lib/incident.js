(function() {
    'use strict';

    var Query = require('./query');

    module.exports = function(backend) {
        return {
            find: function(number, callback) {
                backend.getResource(new Query('number', number), 
                                    'incident', 
                                    false, 
                                    function(err, response, body) {

                    if (callback) {
                        if (!err && body.records && body.records[0]) {
                            process.nextTick(function() { callback(err, body.records[0]); });
                        } else {
                            process.nextTick(function() { callback(err, null); });
                        }
                    }
                });
            },
            query: function(query, callback) {
                backend.getResource(query, 
                                    'incident', 
                                    false, 
                                    function(err, response, body) {

                    if (callback) {
                        if (!err && body.records) {
                            process.nextTick(function() { callback(err, body.records); });
                        } else {
                            process.nextTick(function() { callback(err, null); });
                        }
                    }
                });
            }
        };
    };
})();