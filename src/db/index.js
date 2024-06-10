const { MongoClient } = require("mongodb");

const url = process.env.MONGODB_URI;
// console.log(url)
const database = new MongoClient(url).db('blog');
const postsCollection = database.collection("posts");

module.exports = { postsCollection };
