const { Router } = require("express");
const indexRouter = Router();
const db = require("../db/queries");

indexRouter.get("/", async (req, res) => {
  const messages = await db.getMessages();
  res.render("index", { messages: messages });
});

module.exports = indexRouter;
