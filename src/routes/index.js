const { postsCollection } = require("../db");
const MongoClient = require("mongodb");

const route = (app) => {
  const controller = (cb) => {
    return async (req, res) => {
      try {
        await cb(req, res);
      } catch (error) {
        console.log(error);
        res.status(404).json({ error: "please try again" });
      }
    };
  };

  // CREATE POST
  app.get(
    "/create",
    controller((req, res) => {
      res.render("create");
    })
  );

  app.post(
    "/create",
    controller(async (req, res) => {
      const post = req.body;
      const now = new Date();
      post.createdAt = now;
      post.updatedAt = now;
      await postsCollection.insertOne(post);
      res.redirect("/")
    })
  );

  // GET POST DETAIL
  app.get(
    "/posts",
    controller(async (req, res) => {
      const postId = req.query.p;
      const post = await postsCollection.findOne({
        _id: new MongoClient.ObjectId(postId),
      });
      res.render("postDetail", { post });
    })
  );

  // UPDATE, DELETE POSTS
  app.get(
    "/manage/edit",
    controller(async (req, res) => {
      const post = await postsCollection.findOne({
        _id: new MongoClient.ObjectId(req.query.p),
      });
      res.render("manage-edit", { post });
    })
  );

  app.get(
    "/manage",
    controller(async (req, res) => {
      const posts = await postsCollection.find().toArray();
      res.render("manage", { posts });
    })
  );

  app.delete(
    "/manage",
    controller(async (req, res) => {
      const postId = req.query.p;
      await postsCollection.deleteOne({
        _id: new MongoClient.ObjectId(postId),
      });
      res.redirect("back");
    })
  );

  app.patch(
    "/manage",
    controller(async (req, res) => {
      const postId = req.query.p;
      const post = req.body;
      post.updatedAt = new Date();
      await postsCollection.updateOne(
        { _id: new MongoClient.ObjectId(postId) },
        { $set: post }
      );
      res.redirect('manage')
    })
  );

  // GET POSTS
  app.get(
    "/",
    controller(async (req, res) => {
      const posts = await postsCollection.find().toArray();
      res.render("home", { posts });
    })
  );
};

module.exports = route;
