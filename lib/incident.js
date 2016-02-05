(function() {
    'use strict';

    var Query = require('./query');

    module.exports = function(backend) {
        return {
            find: function(number, callback) {
                console.log('Trying to find resource');
                backend.getResource(new Query('number', number), 
                                    'incident', 
                                    false, 
                                    function(err, response, body) {
                    if (callback) {
                        if (!err && body.result) {
                            process.nextTick(function() { 
                                console.log('Record found');
                                callback(err, body.result); 
                            });
                        } else {
                            process.nextTick(function() { 
                                console.log('No record found');
                                callback(err, null); 
                            });
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
            },
            create: function(data, callback){
                backend.postResource('incident',
                                        data, 
                                        function(err, response, body){
                    if(callback){
                        if(!err && body){
                            process.nextTick(function(){ callback(err, body); });
                        }
                        else{
                            process.nextTick(function(){ callback(err, null); });
                        }
                    }
                });
            }
        };
    };
})();
