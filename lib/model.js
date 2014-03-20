/**
* Created by sungwoo on 14. 3. 20.
*/
var CModel = (function () {
    function CModel(aDb, aCollectionName, aSchema, aCb) {
        var _this = this;
        this._db = aDb;
        this._schema = aSchema;
        aDb.collection(aCollectionName, function (err, collection) {
            _this._collection = collection;
            var index = {};
            Object.keys(aSchema).forEach(function (key) {
                var attr = aSchema[key];
                if (attr) {
                    if (attr.uniqueId) {
                        index[key] = 1;
                        _this._uniqueIdKey = key;
                    }
                }
            });
            collection.ensureIndex(index, {
                unique: true,
                dropDups: true
            }, function (err, indexName) {
                if (err) {
                    console.error('Model: ' + aCollectionName + ' created: ' + err);
                }
                aCb(err);
            });
        });
    }
    CModel.prototype.add = function (aItem, aCb) {
        this._collection.insert(aItem, {
            safe: true
        }, function (err, result) {
            if (err) {
                console.log('Model: added: ' + err);
            }
            aCb(err);
        });
    };
    CModel.prototype.getById = function (aId, aCb) {
        this._collection.find({ _id: aId }, function (err, result) {
            result.toArray(function (err, results) {
                aCb(err, results ? results[0] : null);
            });
        });
    };
    CModel.prototype.getByUniqueId = function (aUniqueId, aCb) {
        var query = {};
        query[this._uniqueIdKey] = aUniqueId;
        this._collection.find(query, function (err, result) {
            result.toArray(function (err, results) {
                aCb(err, results ? results[0] : null);
            });
        });
    };
    return CModel;
})();
exports.CModel = CModel;
//# sourceMappingURL=model.js.map
