require("dotenv").config();

const express = require("express");
const app = express();
const userRouter = require("./routes/userRouter");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.urlencoded({ extended: true }));
app.use("/", userRouter);

const PORT = 9090;
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Listening at port ${PORT}`);
});
