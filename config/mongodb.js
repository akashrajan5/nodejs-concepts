const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);