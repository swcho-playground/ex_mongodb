/**
* Created by sungwoo on 14. 3. 19.
*/
var sDb;

function set_db(aDb) {
    sDb = aDb;
}
exports.set_db = set_db;

function add_project(aNewProject, aCb) {
    sDb.collection('projects', function (err, collection) {
        collection.insert(aNewProject, {
            safe: true
        }, function (err, result) {
            console.log(result);
        });
    });
}
exports.add_project = add_project;
//# sourceMappingURL=projects.js.map
