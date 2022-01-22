'use strict';

var geoservice,
    _deepDefaults = require('merge-defaults'),
    express = require('express'),
    geocoder = require('node-geocoder'),
    app = express();

module.exports = function (config) {
    config = _deepDefaults(config, {
        geocoder: {
            provider: null,
            protocol: 'http',
            options: {}
        },
        response: function (res, locations){
            res.json({
                locations: locations
            });
        }
    });

    geoservice = geocoder.getGeocoder(config.geocoder.provider, config.geocoder.protocol, config.geocoder.options);

    app.get('/geocode/location', function (req, res) {
        var address = req.query.address;

        geoservice.geocode(address, function (err, gres) {
            config.response(res, gres);
        });
    });

    return app;
};