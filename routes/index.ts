
/*
 * GET home page.
 */

///<reference path='../def/express.d.ts' />

import express = require("express");
//import db = require("../db");

export function index(aReq: express.Request, res: express.Response){
    res.render('index', { title: 'Express' });
};
