const express = require("express");
const app = express();
const path = require("node:path");
const expressLayouts = require("express-ejs-layouts");
const aboutRouter = require("./routes/aboutRouter");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use(expressLayouts);

const links = [
  { href: "/", text: "Home" },
  { href: "about", text: "About" },
  { href: "contact-us", text: "Contact Us" },
];

const users = ["Rose", "Cake", "Biff"];

app.get("/", (req, res) => {
  res.render("index", { links: links, users: users });
});

app.use("/about", aboutRouter);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
