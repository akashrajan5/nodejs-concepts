const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '../.env' });

const uri = 'mongodb+srv://akash:PMl04cq268FoJ6hY@cluster.zejyhfr.mongodb.net/test?retryWrites=true&w=majority';
const client = new MongoClient(uri);

const connectDB = async () => {
    await client.connect();
    console.log("DB connected");
}; // issues

module.exports = { client, connectDB };