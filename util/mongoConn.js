const MongoClient = require('mongodb').MongoClient;

module.exports = (dbName, cb) => {
    const MONGODB_ADDRESS = `localhost:27017/${dbName}`;
    try {
        MongoClient.connect(`mongodb://${MONGODB_ADDRESS}`, (err, db) => {
            if (err) throw Error('Não foi possível conectar ao banco de dados Mongo');
            console.log('Conectado ao banco do MongoDB com sucesso');
            cb(db, arguments);
        });
    } catch (err) {
        console.log(err.stack || err);
        process.exit(1);
    }
};