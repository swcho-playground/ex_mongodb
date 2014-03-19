/**
 * Created by sungwoo on 14. 3. 19.
 */

///<reference path='../def/mongodb.d.ts' />
///<reference path='../def/express.d.ts' />

import mongodb = require('mongodb');
import express = require("express");

var sDb: mongodb.Db;

export function set_db(aDb: mongodb.Db) {
    sDb = aDb;
}

export function SetProjectWithPackages(aReq: express.Request, aRes: express.Response) {
    var param = aReq.body;
    console.log(param);
    aRes.send('ok');
}