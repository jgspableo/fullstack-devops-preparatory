const { Router } = require("express");

const newRouter = Router();

newRouter.get("/", (req, res) => {
  res.send("OK");
});

module.exports = newRouter;