/**
 * Created by sungwoo on 14. 3. 19.
 */

///<reference path='../def/mongodb.d.ts' />
///<reference path='../def/express.d.ts' />
///<reference path='../def/async.d.ts' />

import mongodb = require('mongodb');
import express = require('express');
import api = require("../api/ossdb.api");

var sDb: mongodb.Db;

export function set_db(aDb: mongodb.Db) {
    sDb = aDb;
}

export function add_package(aNewPackage: api.TPackage, aCb: (err: Error) => void) {
    sDb.collection('packages', (err: Error, collection: mongodb.Collection) => {
        collection.insert(aNewPackage, {
            safe: true
        }, (err: Error, result) => {
            console.log('package inserting for ' + aNewPackage.name);
            console.log(result);
            aCb(err);
        });
    });
}
