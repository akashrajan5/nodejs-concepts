const { query } = require('express');
const { MongoClient } = require('mongodb');


class MongoDB {
    constructor(connectionString = null) {
        this.connectionString = connectionString;
        this.client = new MongoClient(connectionString);
    }

    verifyConnection(database = null) {
        const result = new Promise(async (resolve, reject) => {
            try {
                await this.client.connect();
                await this.client.db(database).command({ ping: 1 });
                resolve("Connected");
            } catch (err) {
                reject(err);
            } finally {
                await this.client.close();
            }
        });
        return result;
    }

    select(database = null, collection = null, query = {}) {
        const result = new Promise(async (resolve, reject) => {
            try {
                await this.client.connect();
                const db = this.client.db(database).collection(collection);
                const data = await db.find(query).toArray();
                resolve(data);
            } catch (err) {
                reject(err);
            } finally {
                await this.client.close();
            }
        });
        return result;
    }

    selectAll(database = null, collection = null) {
        const result = new Promise(async (resolve, reject) => {
            try {
                await this.client.connect();
                const db = this.client.db(database).collection(collection);
                const data = await db.find().toArray();
                resolve(data);
            } catch (err) {
                reject(err);
            } finally {
                await this.client.close();
            }
        });
        return result;
    }


    /**
     * Insert's a single record or multiple records to database.
     * 
     * @param {string} database - Name of database.
     * @param {string} collection - Name of collection.
     * @param {Array} payload - Array of object or objects containing data.
    */
    insert(database, collection, payload) {
        const result = new Promise(async (resolve, reject) => {
            try {
                await this.client.connect();
                const db = this.client.db(database).collection(collection);
                const options = { ordered: true };
                const result = await db.insertMany(payload, options);
                resolve(result.insertedCount == 1 ? "1 row inserted" : `${result.insertedCount} rows inserted`);
            } catch (err) {
                reject(err);
            } finally {
                await this.client.close();
            }
        });
        return result;
    }

    update() {

    }

    /**
     * Delete a single record from database.
     * 
     * @param {string} database - Name of database.
     * @param {string} collection - Name of collection.
     * @param {object} query - A key/value to delete the selected.
    */
    delete(database, collection, query) {
        const result = new Promise(async (resolve, reject) => {
            try {
                await this.client.connect();
                const db = this.client.db(database).collection(collection);
                const result = await db.deleteOne(query);
                resolve(result.deletedCount === 1 ? "1 row deleted" : `No documents matched the query. ${result.deletedCount} rows deleted.`);
            } catch (err) {
                reject(err);
            } finally {
                await this.client.close();
            }
        });
        return result;
    }

    /**
     * Delete multiple records from database.
     * 
     * @param {string} database - Name of database.
     * @param {string} collection - Name of collection.
     * @param {object} query - A key/value to delete the selected, deletes all the keys containing the value provided. eg : {name: "Santa"} deletes all the name containing Santa in any position from db. Mysql example : using wildcards like %Santa%
    */
    deleteAll(database, collection, query) {
        const result = new Promise(async (resolve, reject) => {
            try {
                await this.client.connect();
                const db = this.client.db(database).collection(collection);
                const finalQuery = { [Object.keys(query)[0]]: { $regex: query[Object.keys(query)[0]] } };
                const result = await db.deleteMany(finalQuery);
                resolve(result.deletedCount > 0 ? `${result.deletedCount} ${result.deletedCount === 1 ? "row" : "rows"} deleted` : `No documents matched the query. ${result.deletedCount} rows deleted.`);
            } catch (err) {
                reject(err);
            } finally {
                await this.client.close();
            }
        });
        return result;
    }
}

let userDatas = [{ email: 'aka1@gmail.com', password: "1234" }];



let c = new MongoDB(url);
// c.verifyConnection("app").then(data => console.log(data));
// c.select("app", "users", { email: "aka@gmail.com" }).then(data => console.log(data)).catch(err => console.log("then catch ", err));
c.insert("app", "users", userDatas).then(data => console.log(data)).catch(err => console.log(err));
// c.delete("app", "users", { email: 'aka6@gmail.com' }).then(res => console.log(res)).catch(err => console.log(err));
// c.deleteAll("app", "users", { email: '@g' }).then(res => console.log(res)).catch(err => console.log(err));
