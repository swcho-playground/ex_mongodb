/**
* Created by sungwoo on 14. 3. 19.
*/
var async = require("async");

var projects = require("./projects");
var packages = require("./packages");

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
