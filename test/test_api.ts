/**
 * Created by sungwoo on 14. 3. 19.
 */

/// <reference path="../def/nodeunit.d.ts"/>

import nodeunit = require('nodeunit');
import ossdb = require("../api/ossdb.api");

export function test_SetProjectWithPackages(aTest: nodeunit.Test) {
    ossdb.SetProjectWithPackages({
        projectId: 'example',
        packageNames: [
            'oss_01_with_GPL.00.01.so'
        ]
    }, (aResp: ossdb.TSetProjectWithPackagesResp) => {
        console.log(aResp);
        aTest.done();
    });
}
