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
    (err: any): void;
}

export class CModel<T> {

    private _db: mongodb.Db;
    private _collection: mongodb.Collection;
    private _schema: TSchema;
    private _uniqueIdKey: string;

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
                        this._uniqueIdKey = key;
                    }
                }
            });
            collection.ensureIndex(index, {
                unique : true,
                dropDups : true
            }, (err: Error, indexName: string) => {
                if (err) {
                    console.error('Model: ' + aCollectionName + ' created: ' + err);
                }
                aCb(err);
            });
        });
    }
    add(aItem: T, aCb: FDefaultCb) {
        this._collection.insert(aItem, {
            safe: true
        }, (err: Error, result) => {
            if (err) {
                console.log('Model: added: ' + err);
            }
            aCb(err);
        });
    }
    getById(aId: string, aCb: (err: any, result: T) => void) {
        this._collection.find({ _id: aId }, (err: Error, result: mongodb.Cursor) => {
            result.toArray((err: Error, results: any[]) => {
                aCb(err, results ? results[0]: null);
            });
        });
    }
    getByUniqueId(aUniqueId: string, aCb: (err: any, result: T) => void) {
        var query = {};
        query[this._uniqueIdKey] = aUniqueId;
        this._collection.find(query, (err: Error, result: mongodb.Cursor) => {
            result.toArray((err: Error, results: any[]) => {
                aCb(err, results ? results[0]: null);
            });
        });
    }

}