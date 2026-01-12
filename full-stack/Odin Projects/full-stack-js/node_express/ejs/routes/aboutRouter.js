const { Router } = require("express");
const aboutRouter = Router();

aboutRouter.get("/", (req, res) => {
  res.render("about");
});

module.exports = aboutRouter;
