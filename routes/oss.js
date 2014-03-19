/**
* Created by sungwoo on 14. 3. 19.
*/
var libModel = require("../lib/model");

exports.model;

function init(aDb, aCb) {
    exports.model = new libModel.CModel(aDb, 'oss', {
        name: { uniqueID: true },
        projectUrl: null,
        package_ids: null
    }, aCb);
}
exports.init = init;
//# sourceMappingURL=oss.js.map
