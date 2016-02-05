(function() {
    'use strict';

    var request = require('request');
    var querystring = require('querystring');
    var util = require('util');

    var options = {};

    function configure(opt) {
        options.user = opt.user;
        options.pass = opt.pass;
        options.instance = "https://"+opt.instance+".service-now.com";
    }

    function getResource(query, table, displayvalue, callback) {

        if (!options.user || !options.pass || !options.instance) {
            return callback('You must call configure() before making a request.');
        }

        var params = querystring.stringify({
            sysparm_query: query.objType === 'SNQuery' ? query.string : query,
        });

        var url = util.format('%s/api/now/table/%s?%s',options.instance, table, params);

        request.post({
            uri: url,
            auth: {
                user: options.user,
                pass: options.pass,
                sendImmediately: false
            },
            json: true
        }, callback);
    }

    function postResource(table, data, callback) {
        if (!options.user || !options.pass || !options.instance) {
            return callback('You must call configure() before making a request.');
        }

        var url = util.format('%s/api/now/table/%s?sysparm_action=insert',options.instance, table);

        request.post({
            uri: url,
            auth: {
                user: options.user,
                pass: options.pass,
                sendImmediately: false
            },
            json: data
        }, callback);
    }

    function updateResource(number, table, data, callback) {
        if (!options.user || !options.pass || !options.instance) {
            return callback('You must call configure() before making a request.');
        }

        var params = querystring.stringify({
            sysparm_action: 'update',
            sysparm_query: 'number='+number
        });
        var url = util.format('%s/api/now/table/%s?%s',options.instance, table, params);

        request.post({
            uri: url,
            auth: {
                user: options.user,
                pass: options.pass,
                sendImmediately: false
            },
            json: data
        }, callback);
    }

    module.exports = {
        configure: configure,
        getResource: getResource,
        postResource: postResource,
        updateResource: updateResource
    };
})();
