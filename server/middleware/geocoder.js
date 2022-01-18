var express_geocoding_api = require('express-geocoding-api'),
    app = require('express')();

app.use(express_geocoding_api({
    geocoder: {
        provider: 'google'
    }
}));

