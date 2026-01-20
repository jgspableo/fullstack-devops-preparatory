const { Router } = require("express");
const db = require("../db/queries");

const newRouter = Router();

newRouter.get("/", (req, res) => {
  res.render("form");
});

newRouter.post("/", (req, res) => {
  const { text, user } = req.body;
  db.addMessages(text, user);
  res.redirect("/");
});

module.exports = newRouter;
