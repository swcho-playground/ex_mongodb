
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var sqlite3 = require('sqlite3');

var db = new sqlite3.Database('./db/db.sqlite3', function() {
    db.run("CREATE TABLE IF NOT EXISTS TestModel (info TEXT, col1 TEXT)");
    db.close();

    var bookshelfLib = require('bookshelf');
    var bookshelf = bookshelfLib.initialize({
        client: 'sqlite3',
        connection: {
            filename : './db/db.sqlite3'
        }
    });

    var TestModel = bookshelf.Model.extend({
        tableName: 'TestModel',

        initialize: function() {
        },

        info: 'foo',
        col1: 'text'
    });

    var test = new TestModel({
        info: 'test',
        col1: 'col1'
    });
//    test.set("telephone", "555-555-1212");
    test.save();

});

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

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
