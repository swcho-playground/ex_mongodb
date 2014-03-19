
/**
 * Module dependencies.
 */

///<reference path='defs/node.d.ts' />
///<reference path='defs/express.d.ts' />
///<reference path='defs/node-sqlite3.d.ts' />

import http = require('http');
import path = require('path');
import express = require('express');

var index = require('./routes/index');
var user = require('./routes/user');

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

app.get('/', index.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
