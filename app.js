/**
* Module dependencies.
*/
///<reference path='def/node.d.ts' />
///<reference path='def/express.d.ts' />
///<reference path='def/node-sqlite3.d.ts' />
///<reference path='def/mongodb.d.ts' />
var http = require('http');
var path = require('path');
var express = require('express');
var mongodb = require('mongodb');

var index = require('./routes/index');
var oss = require('./routes/oss');
var packages = require('./routes/packages');
var projects = require('./routes/projects');
var api = require('./routes/api');

var server = new mongodb.Server('localhost', 27017, {
    auto_reconnect: true
});

var db = new mongodb.Db('ossdb', server);
db.open(function (error, db) {
    if (error) {
        console.error('Connecting to "ossdb" database failed');
        process.exit(1);
    }
    var app = express();

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
    if ('development' == app.get('env')) {
        app.use(express.errorHandler());
    }

    oss.set_db(db);
    packages.set_db(db);
    projects.set_db(db);
    api.set_db(db);

    // route
    app.get('/', index.index);

    app.post('/api/SetProjectWithPackages', api.SetProjectWithPackages);

    http.createServer(app).listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
    });
});
//# sourceMappingURL=app.js.map
