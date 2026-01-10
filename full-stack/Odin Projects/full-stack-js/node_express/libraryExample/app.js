const express = require("express");
const app = express();
const authorRouter = require("./routes/authorsRouter");
const bookRouter = require("./routes/booksRouter");
const indexRouter = require("./routes/indexRouter");

app.use("/authors", authorRouter);
app.use("/books", bookRouter);
app.use("/", indexRouter);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err.message);
});

const PORT = 8080;
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server running and listening at port ${PORT}`);
});
