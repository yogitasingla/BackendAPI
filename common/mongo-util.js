var Db = require('mongodb').Db;

const mongoClient = require('mongodb').MongoClient;

class MongoUtil {
    
    constructor(url ) {
        
        this.url = url;
        console.log("----------------------------",this.url)
    }

    createCollection (collection) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(this.url, {useUnifiedTopology:true},function (error, client) {
                if (error) {
                    reject(error);
                } else {
                   const db = client.db('gallery')
                    db.createCollection(collection, function (err, res) {
                        if (err) {
                            reject(err);
                        } else {
                            client.close();
                            resolve(res);
                        }
                    });
                }
            });
        });
    };
    createRecord (collection, document) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(this.url, {useUnifiedTopology:true},function (error, client) {
                if (error) {
                    reject(error);
                } else {
                   // document = JSON.parse(document);
                 const  db = client.db('gallery')
                    db.collection(collection).insertOne(document, function (err, res) {
                        if (err) {
                            reject(err);
                        } else {
                            client.close();
                            resolve(res);
                        }
                    });
                }
            });
        });
    };
    findRecord (collection, query, fields) {
        console.log(this.url);
        return new Promise((resolve, reject) => {
            mongoClient.connect(this.url, {useUnifiedTopology:true},function (error, client) {
                if (error) {
                    reject(error);
                } else {
                   
                    
                    if (!fields) {
                        fields = {};
                    }
                     const db = client.db('gallery')
                    db.collection(collection).find(query, fields).toArray(function (err, res) {
                        if (err) {
                            reject(err);
                        } else {
                            client.close();
                            resolve(res);
                        }
                    });
                }
            });
        });
    };
    emptyCollection (collection) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(this.url,{useUnifiedTopology:true}, function (error, client) {
                if (error) {
                    reject(error);
                } else {
                  const  db = client.db('gallery')
                    db.collection(collection).deleteOne({},{}, function (err, res) {
                        if (err) {
                            reject(err);
                        } else {
                        client.close();
                            resolve(res);
                        }
                    });
                }
            });
        });
    };
}
    module.exports = MongoUtil;