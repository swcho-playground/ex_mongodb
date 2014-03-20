/**
* Created by sungwoo on 14. 3. 19.
*/
var express = require("express");
var async = require("async");

var projects = require("./projects");
var packages = require("./packages");

function get_project_info() {
}

function SetProjectWithPackages(aReq, aRes) {
    var param = aReq.body;
    var resp = {
        ok: false,
        projectAdded: false,
        projectUpdated: false,
        packageNamesAdded: [],
        packageNamesRemoved: []
    };
    var series = [];
    var originalProjectInfo;
    var originalProjectPackageInfoList = {};
    var originalPackageInfoList = {};
    series.push(function (cb) {
        projects.model.getByUniqueId(param.projectId, function (err, result) {
            originalProjectInfo = result;
        });
    });
    series.push(function (cb) {
        originalProjectInfo.package_ids.forEach(function (id) {
            packages.model.getById(id, function (err, result) {
                originalProjectPackageInfoList[id] = result;
            });
        });
    });
    param.packageNames.forEach(function (packageName) {
        series.push(function (cb) {
            packages.model.getByUniqueId(packageName, function (err, result) {
                originalPackageInfoList[packageName] = result;
            });
        });
    });

    param.packageNames.forEach(function (packageName) {
        series.push(function (cb) {
            packages.model.add({
                name: packageName,
                oss_id: null,
                license_id: null,
                project_ids: null
            }, function (err) {
                cb();
            });
        });
    });
    series.push(function (cb) {
        projects.model.add({
            projectId: param.projectId,
            package_ids: null
        }, function (err) {
            cb();
        });
    });
    series.push(function (cb) {
        aRes.send(resp);
    });
    async.series(series);
}
exports.SetProjectWithPackages = SetProjectWithPackages;
//# sourceMappingURL=api.js.map
