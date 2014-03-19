/**
 * Created by sungwoo on 14. 3. 19.
 */

///<reference path='../def/mongodb.d.ts' />
///<reference path='../def/express.d.ts' />

import mongodb = require('mongodb');
import express = require("express");
import api = require("../api/ossdb.api");

var sDb: mongodb.Db;

export function set_db(aDb: mongodb.Db) {
    sDb = aDb;
}

export function add_project(aNewProject: api.TProject, aCb: (err: Error) => void) {
    sDb.collection('projects', (err: Error, collection: mongodb.Collection) => {
        collection.insert(aNewProject, {
            safe: true
        }, (err: Error, result) => {
            console.log(result);
        });
    });
}
