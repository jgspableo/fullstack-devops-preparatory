const pool = require("./pool");

async function getAllUsernames() {
  const { rows } = await pool.query("SELECT * FROM usernames");
  return rows;
}

async function insertUsername(username) {
  await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
}

async function searchUsername(username) {
  const trimmed = username.trim();
  const { rows } = await pool.query(
    "SELECT * FROM usernames WHERE username ILIKE $1",
    [trimmed]
  );
  return rows;
}

async function deleteAllUsers() {
  await pool.query("DELETE FROM usernames");
}

module.exports = {
  getAllUsernames,
  insertUsername,
  searchUsername,
  deleteAllUsers,
};
