const pool = require("./pool");

async function getMessages() {
  const { rows } = await pool.query('SELECT * FROM "top_miniMessageBoard"');
  return rows;
}

async function addMessages(message, user) {
  const trimmedMessage = message.trim();
  const trimmedUser = user.trim();
  await pool.query(
    'INSERT INTO "top_miniMessageBoard" (text, "user") VALUES ($1, $2)',
    [trimmedMessage, trimmedUser]
  );
}

module.exports = {
  getMessages,
  addMessages,
};
