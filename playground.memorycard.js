(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'PLAYGROUND'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(exports, require('PLAYGROUND'));
    } else {
        // Browser globals
        factory((root.commonJsStrict = {}), root.PLAYGROUND);
    }
}(this, function (exports, PLAYGROUND) {
    // Polyfill
    (function (isStorage) {
          'use strict';
          if (!isStorage) {
                var data = {},
                    undef;
                window.localStorage = {
                    key         : function(id) { return Object.keys(data)[id]; },
                    setItem     : function(id, val) { return data[id] = String(val); },
                    getItem     : function(id) { return data.hasOwnProperty(id) ? data[id] : undef; },
                    removeItem  : function(id) { return delete data[id]; },
                    clear       : function() { return data = {}; }
                };
          }
    })((function () {
        'use strict';
        try {
            return 'localStorage' in window && window.localStorage !== null;
        } catch (e) {
            return false;
        }
    })());
    var MemoryCard = function (app) {
        this.app = app;
        this.ls = window.localStorage;
        this.app.on('ready', handleDefaults.bind(this));
        return this;
    };
    PLAYGROUND.MemoryCard = MemoryCard;
    var plugin = PLAYGROUND.MemoryCard;
    var handleDefaults = function () {
        var self = this;
        self.app.loader.on('load', function (id) {
            self.save(self.app.data.defaults);
        });
        self.app.loadData('defaults');
    };
    plugin.plugin = true;
    plugin.prototype = {
        getAll: function () {
            var self = this;
            var index = 0;
            var key = this.ls.key(index);
            var obj = this.ls.getItem(key);
            var data = {};
            while (obj) {
                data[key] = obj;
                index += 1;
                key = self.ls.key(index);
                obj = self.ls.getItem(key);
            }
            return data;
        },
        get: function (key) {
            return this.ls.getItem(key);
        },
        save: function (key, value, overwrite) {
            if (typeof key === 'object') {
                overwrite = value;
                value = undefined;
                for (var i in key) {
                    this.save(i, key[i], overwrite);
                }
                return;
            }
            var previous = this.get(key);
            if (typeof value !== 'string') {
                value = JSON.stringify(value);
            }
            if (overwrite || !previous) {
                return this.ls.setItem(key, value);
            }
        },
        load: function (key) {
            if (key) {
                return this.ls.getItem(key);
            }
            return this.getAll();
        },
        wipe: function (key) {
            if (key) {
                return this.ls.removeItem(key);
            }
            return this.ls.clear();
        }
    };
    return MemoryCard;
}));
