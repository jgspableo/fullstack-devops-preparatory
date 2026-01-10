const { Router } = require("express");

const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.send("This is the main page");
});

module.exports = indexRouter;
