/*
* GET home page.
*/
///<reference path='../defs/express.d.ts' />
var express = require("express");

//import db = require("../db");
function index(aReq, res) {
    res.render('index', { title: 'Express' });
}
exports.index = index;
;
//# sourceMappingURL=index.js.map
