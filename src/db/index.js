const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017/blog_3";
const database = new MongoClient(url).db();
const postsCollection = database.collection("posts");

module.exports = { postsCollection };
