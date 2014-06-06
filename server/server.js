'use strict';

var express = require('express');

var app = express();

app.get('/', function (req, res) {
    res.send('works');
});

var server = app.listen(3000, function () {
    console.log('Listening on port %d', server.address().port);
});