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

export function add_packages() {

}