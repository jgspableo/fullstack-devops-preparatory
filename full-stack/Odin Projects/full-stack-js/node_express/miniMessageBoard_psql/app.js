require("dotenv").config();
const express = require("express");
const app = express();
const path = require("node:path");

const indexRouter = require("./routes/indexRouter");
const newRouter = require("./routes/newRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/new", newRouter);

app.use((err, req, res, next) => {
  if (err) console.error(err);
});

const PORT = 6767;
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
