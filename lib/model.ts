/**
 * Created by sungwoo on 14. 3. 20.
 */

///<reference path='../def/mongodb.d.ts' />

import mongodb = require('mongodb');

export interface TAttribute {
    uniqueId?: boolean;
}

export interface TSchema {
    [filedName: string]: TAttribute;
}

export interface FDefaultCb {
    (err: Error): void;
}

export class CModel<T> {

    private _db: mongodb.Db;
    private _collection: mongodb.Collection;
    private _schema: TSchema;

    constructor(aDb: mongodb.Db, aCollectionName: string, aSchema: TSchema, aCb: FDefaultCb) {
        this._db = aDb;
        this._schema = aSchema;
        aDb.collection(aCollectionName, (err: Error, collection: mongodb.Collection) => {
            this._collection = collection;
            var index = {};
            Object.keys(aSchema).forEach((key) => {
                var attr: TAttribute = aSchema[key];
                if (attr) {
                    if (attr.uniqueId) {
                        index[key] = 1;
                    }
                }
            });
            collection.ensureIndex(index, {
                unique : true,
                dropDups : true
            }, (err: Error, indexName: string) => {
                aCb(err);
            });
        });
    }

    add(aItem: T, aCb: FDefaultCb) {
        this._collection.insert(aItem, {
            safe: true
        }, (err: Error, result) => {
            aCb(err);
        });
    }

}