/**
 * Created by sungwoo on 14. 3. 19.
 */

///<reference path='../def/node.d.ts' />

import http = require('http');

var sHttpOptions = {
    host: '127.0.0.1',
    port: 3000
};

function post(aPath: string, aData: any, aCb: (aData) => void) {
    var json = JSON.stringify(aData);
    var postHeaders = {
        'Content-Type': 'application/json'
    }
    var options = {
        host: sHttpOptions.host,
        port: sHttpOptions.port,
        path: aPath,
        method: 'POST',
        headers: postHeaders
    };
    var req = http.request(options, (res: http.ClientResponse) => {
        res.setEncoding('utf8');
        res.on('data', (data) => {
            console.log(data);
            aCb(JSON.parse(data));
        });
    });
    req.write(json);
    req.end();
    req.on('error', (e) => {
        console.error(e);
    })
};

export interface TOss {
    name: string;
    projectUrl: string;
    package_ids: string[];
}

export interface TPackage {
    name: string;
    oss_id: string;
    license_id: string;
    project_ids: string;
}

export interface TLicense {
    name: string;
    type: string;
}

export interface TProject {
    projectId: string;
    package_ids: string;
}

export interface TSetProjectWithPackagesParam {
    projectId: string;
    packageNames: string[];
}

export interface TSetProjectWithPackagesResp {
    ok: boolean;
    projectAdded: boolean;
    projectUpdated: boolean;
    packageNamesAdded: string[];
    packageNamesRemoved: string[];
}

export function SetProjectWithPackages(aParam: TSetProjectWithPackagesParam, aCb: (aResp: TSetProjectWithPackagesResp) => void) {
    post('/api/SetProjectWithPackages', aParam, aCb);
}
