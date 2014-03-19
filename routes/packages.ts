/**
 * Created by sungwoo on 14. 3. 19.
 */

///<reference path='../def/mongodb.d.ts' />
///<reference path='../def/express.d.ts' />
///<reference path='../def/async.d.ts' />

import mongodb = require('mongodb');
import express = require('express');
import api = require("../api/ossdb.api");
import libModel = require("../lib/model");

export var model: libModel.CModel<api.TPackage>;

export function init(aDb: mongodb.Db, aCb: (err: Error) => void) {
    model = new libModel.CModel<api.TPackage>(aDb, 'packages', {
        name: {uniqueID: true},
        oss_id: null,
        license_id: null,
        project_ids: null
    }, aCb);
}
