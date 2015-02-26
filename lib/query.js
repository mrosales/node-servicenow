(function() {
    'use strict';

    /* like uses LIKE operator instead of equals */
    module.exports = function(key, val, like) {
        var op = like === undefined || like === false ? '=' : 'LIKE';
        this.string = key+op+val;
        this.objType = 'SNQuery';
        this.and = function(key,val, like) {
            var op = like === undefined || like === false ? '=' : 'LIKE';
            this.string += '^' + key+op+val;
        };

        this.or = function(key, val, like) {
            var op = like === undefined || like === false ? '=' : 'LIKE';
            this.string += '^OR'+key+op+val;
        };

        this.order = function(key) {
            this.string += '^ORDERBY'+key;
        };

        this.orderDesc = function(key) {
            this.string += '^ORDERBYDESC'+key;
        };
    };
})();