'use strict';

var gulp = require('gulp');
var shell = require('gulp-shell');

require('gulp-help')(gulp);

var express = require('express');
var server;

gulp.task('server', 'starts a webserver', shell.task([
    'node server/server.js'
]));

gulp.task('watch', 'watches all files and auto build them', ['server'], function () {
    // TODO :)
});
