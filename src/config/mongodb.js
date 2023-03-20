const { MongoClient } = require('mongodb');
// require('dotenv').config({ path: '../.env' });

const uri = 'mongodb+srv://akash:PMl04cq268FoJ6hY@cluster.zejyhfr.mongodb.net/test?retryWrites=true&w=majority';
const client = new MongoClient(uri);

module.exports = client;