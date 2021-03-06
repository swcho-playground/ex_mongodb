
/**
 * Module dependencies.
 */

///<reference path='def/node.d.ts' />
///<reference path='def/express.d.ts' />
///<reference path='def/node-sqlite3.d.ts' />
///<reference path='def/mongodb.d.ts' />
///<reference path='def/async.d.ts' />

import http = require('http');
import path = require('path');
import express = require('express');
import mongodb = require('mongodb');
import async = require('async');

import index = require('./routes/index');
import licenses = require('./routes/licenses');
import oss = require('./routes/oss');
import packages = require('./routes/packages');
import projects = require('./routes/projects');
import api = require('./routes/api');

var server = new mongodb.Server('localhost', 27017, {
    auto_reconnect: true
});
var db = new mongodb.Db('ossdb', server);

var series = [];

series.push((cb) => {
    db.open((error, db) => {
        if (error) {
            console.error('Connecting to "ossdb" database failed');
            process.exit(1);
        }
        cb();
    });
});

series.push((cb) => {
    licenses.init(db, cb);
});
series.push((cb) => {
    oss.init(db, cb);
});
series.push((cb) => {
    packages.init(db, cb);
});
series.push((cb) => {
    projects.init(db, cb);
});
series.push((cb => {
    var app: express.Express = express();
    // all environments
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));

    // development only
    if ('development' == <any>app.get('env')) {
        app.use(express.errorHandler());
    }



    // route
    app.get('/', index.index);

    app.post('/api/SetProjectWithPackages', api.SetProjectWithPackages);

    http.createServer(app).listen(app.get('port'), function(){
        console.log('Express server listening on port ' + app.get('port'));
    });
}));
async.series(series);