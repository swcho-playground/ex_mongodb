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

export var model: libModel.CModel<api.TProject>;

export function init(aDb: mongodb.Db, aCb: (err: Error) => void) {
    model = new libModel.CModel<api.TProject>(aDb, 'projects', {
        projectId: { uniqueID: true },
        package_ids: null
    }, aCb);
}
