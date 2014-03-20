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

function get_project_info(aProjectId: string): {project: api.TProject, packages: api.TPackage[]} {

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
    var originalProjectInfo: api.TProject;
    var originalProjectPackageInfoList: {
        [id: string]: api.TPackage;
    } = {};
    var originalPackageInfoList: {
        [packageName: string]: api.TPackage;
    } = {};
    series.push((cb) => {
        projects.model.getByUniqueId(param.projectId, (err, result: api.TProject) => {
            originalProjectInfo = result;
        });
    });
    series.push((cb) => {
        originalProjectInfo.package_ids.forEach((id) => {
            packages.model.getById(id, (err, result: api.TPackage) => {
                originalProjectPackageInfoList[id] = result;
            });
        });
    });
    param.packageNames.forEach((packageName: string) => {
        series.push((cb) => {
            packages.model.getByUniqueId(packageName, (err, result: api.TPackage) => {
                originalPackageInfoList[packageName] = result;
            });
        });
    });

    param.packageNames.forEach((packageName: string) => {
        series.push((cb) => {
            packages.model.add({
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
        projects.model.add({
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
