require("dotenv").config();

const express = require("express");
const { engine } = require("express-handlebars");
const path = require("path");
const methodOverride = require("method-override");
const route = require("./routes");

const app = express();
const port = process.env.PORT;

app.engine("handlebars", engine({
    helpers: {
      addOne: (value) => ++value,
      formatDate: (value) => new Date(value).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    },
}));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({extended: true}));
app.use(express.json()); 

route(app)

app.listen(port, () => console.log(`listening on port ${port}\n`));
