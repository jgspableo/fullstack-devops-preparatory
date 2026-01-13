const { Router } = require("express");
const { messages, addMessage } = require("../db");

const newRouter = Router();

newRouter.get("/", (req, res) => {
  res.render("form");
});

newRouter.post("/", (req, res) => {
  const { text, user } = req.body;
  addMessage(text, user);
  res.redirect("/");
});

module.exports = newRouter;
