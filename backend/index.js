require("dotenv").config();
const connectDb = require("./db/connectDb");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { notFound, errorHandler } = require("./middlewares/errorHandler");

const authRoutes = require("./routes/auth.routes");
const requestRoutes = require("./routes/request.routes");
const friendRoutes = require("./routes/friend.routes");
const suggestionRoutes = require("./routes/suggestion.routes");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const commentRoutes = require("./routes/comment.routes")

app.use("/public", express.static("public"))

app.use("/api/auth", authRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/suggestion", suggestionRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post",postRoutes);
app.use("/api/comment",commentRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.port || 4001;

connectDb().then(() => {
  app.listen(port, () => {
    console.log("App listening at port " + port);
  });
});
