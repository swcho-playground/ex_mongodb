/**
 * Created by sungwoo on 14. 3. 19.
 */

///<reference path='../def/mongodb.d.ts' />
///<reference path='../def/express.d.ts' />
///<reference path='../def/async.d.ts' />

import mongodb = require('mongodb');
import express = require("express");
import async = require("async");
import api = require("../api/ossdb.api");
import projects = require("./projects");
import packages = require("./packages");

var sDb: mongodb.Db;

export function set_db(aDb: mongodb.Db) {
    sDb = aDb;
}

export function SetProjectWithPackages(aReq: express.Request, aRes: express.Response) {
    var param: api.TSetProjectWithPackagesParam = aReq.body;
    var resp: api.TSetProjectWithPackagesResp = {
        ok: false,
        projectAdded: false,
        projectUpdated: false,
        packageNamesAdded: [],
        packageNamesRemoved: []
    };

    var series = [];
    param.packageNames.forEach((packageName: string) => {
        series.push((cb) => {
            packages.add_package({
                name: packageName,
                oss_id: null,
                license_id: null,
                project_ids: null
            }, (err: Error) => {
                cb();
            });
        });
    });
    series.push((cb) => {
        projects.add_project({
            projectId: param.projectId,
            package_ids: null
        }, (err: Error) => {
            cb();
        });
    });
    series.push((cb) => {
        aRes.send(resp);
    });
    async.series(series);
}
