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
                    }
                }
            });
            console.log(index);
            collection.ensureIndex(index, {
                unique: true,
                dropDups: true
            }, function (err, indexName) {
                console.log('Model: ' + aCollectionName + ' created: ' + err);
                aCb(err);
            });
        });
    }
    CModel.prototype.add = function (aItem, aCb) {
        this._collection.insert(aItem, {
            safe: true
        }, function (err, result) {
            console.log('Model: added: ' + err);
            aCb(err);
        });
    };
    return CModel;
})();
exports.CModel = CModel;
//# sourceMappingURL=model.js.map
