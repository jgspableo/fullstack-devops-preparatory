const db = require("../db/queries");

async function userListGet(req, res) {
  const usernames = await db.getAllUsernames();
  console.log("Usernames: ", usernames);
  res.render("index", {
    title: "User List",
    usernames: usernames,
  });
}

async function userCreateGet(req, res) {
  res.render("createUser", {
    title: "Create New User",
  });
}

async function userCreatePost(req, res) {
  const { username } = req.body;
  await db.insertUsername(username);
  res.redirect("/");
}

module.exports = {
  userListGet,
  userCreateGet,
  userCreatePost,
};
