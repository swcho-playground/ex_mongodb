/**
* Created by sungwoo on 14. 3. 19.
*/
var ossdb = require("../api/ossdb.api");

function test_SetProjectWithPackages(aTest) {
    ossdb.SetProjectWithPackages({
        projectId: 'example',
        packageNames: [
            'oss_01_with_GPL.00.01.so'
        ]
    }, function (aResp) {
        console.log(aResp);
        aTest.done();
    });
}
exports.test_SetProjectWithPackages = test_SetProjectWithPackages;
//# sourceMappingURL=test_api.js.map
