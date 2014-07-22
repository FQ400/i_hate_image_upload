'use strict';

var express = require('express'),
    Busboy = require('busboy'),
    path = require('path'),
    fs = require('fs'),
    util = require('util');

var app = express();

// all environments
app.configure(function () {
    app.use(express.static(__dirname + '/public'));
});

app.get('/', function (req, res) {
    res.send('works');
});


app.post('/upload_file_multipart', function (req, res) {

    var busboy = new Busboy({ headers: req.headers });

    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        console.log('receiving ...', fieldname, filename);

        var saveTo = path.join(__dirname, '/public/upload', path.basename(filename));

        var fstream = fs.createWriteStream(saveTo);
        file.pipe(fstream);

        fstream.on('close', function () {
            var path = fstream.path.split('/server/public/')[1];

            res.writeHead(200, { 'Connection': 'close' });
            var link = util.format('<a href="%s">Works. Your file: %s<a/>', path, filename)
            res.end(link);
        })
    });

    return req.pipe(busboy);
});

var server = app.listen(3000, function () {
    console.log('Listening on port %d', server.address().port);
});
