require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(
  cors({
    origin: "http://localhost:5173", // Vite dev origin
    methods: ["GET", "POST"],
  })
);
app.use(express.json());

//async wrapper for error handling
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// ---- PH DATE HELPER (replaces all UTC mistakes) ----
function todayPH() {
  const now = new Date();
  now.setHours(now.getHours() + 8);
  return now.toISOString().slice(0, 10);
}
function toPH(date) {
  const d = new Date(date);
  d.setHours(d.getHours() + 8);
  return d.toISOString().slice(0, 10);
}

//get all db data
app.get(
  "/",
  asyncHandler(async (req, res) => {
    const today = todayPH();
    const { rows } = await pool.query(
      'SELECT * FROM "poopapp-db".counter WHERE "date"::date = $1;',
      [today]
    );
    res.json(rows);
  })
);

//get all users
app.get(
  "/users",
  asyncHandler(async (req, res) => {
    const { rows } = await pool.query(
      'SELECT DISTINCT username FROM "poopapp-db".counter'
    );
    res.json(rows);
  })
);

//get user daily count
app.get(
  "/:user/daily",
  asyncHandler(async (req, res) => {
    const { user } = req.params;
    const today = todayPH();
    const { rows } = await pool.query(
      ` SELECT poop_count 
        FROM "poopapp-db".counter 
        WHERE username = $1 
        AND "date"::date = $2;`,
      [user, today]
    );
    res.json(rows[0] || { poop_count: 0 });
  })
);

//get user weekly count
app.get(
  "/:user/weekly",
  asyncHandler(async (req, res) => {
    const { user } = req.params;

    //get today's date
    const today = new Date();
    today.setHours(today.getHours() + 8);

    //compute monday
    const dayOfWeek = today.getDay();
    const diffToMonday = (dayOfWeek + 6) % 7;
    const monday = new Date(today);
    monday.setDate(today.getDate() - diffToMonday);

    //compute sunday
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    //make same format as sql
    const mondayStr = toPH(monday);
    const sundayStr = toPH(sunday);

    //build week list
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      weekDays.push(toPH(d));
    }

    //query
    const { rows } = await pool.query(
      ` SELECT "date"::date AS d, poop_count
        FROM "poopapp-db".counter
        WHERE username = $1
        AND "date"::date BETWEEN $2::date AND $3::date`,
      [user, mondayStr, sundayStr]
    );

    //convert rows to map
    const map = {};
    rows.forEach((r) => {
      const dateStr = toPH(r.d);
      map[dateStr] = r.poop_count;
    });

    //replace missing with 0
    const week = {};
    weekDays.forEach((day) => {
      week[day] = map[day] || 0;
    });

    //return week as json
    res.json({ week });
  })
);

//add user poop count
app.post(
  "/:user/add",
  asyncHandler(async (req, res) => {
    const { user } = req.params;
    const today = todayPH();

    //check if there is already an entry for today
    const { rows } = await pool.query(
      `SELECT poop_count
      FROM "poopapp-db".counter
      WHERE username = $1
      AND "date"::date = $2`,
      [user, today]
    );

    //if empty, make a new entry
    if (rows.length === 0) {
      const insert = await pool.query(
        `INSERT INTO "poopapp-db".counter (username, "date", poop_count)
         VALUES ($1, $2, 1)
         RETURNING *`,
        [user, today]
      );

      return res.json({
        message: "Created new poop count for today.",
        data: insert.rows[0],
      });
    }

    //if already exists then just update
    const update = await pool.query(
      `UPDATE "poopapp-db".counter
      SET poop_count = poop_count + 1
      WHERE username = $1
      AND "date"::date = $2
      RETURNING *`,
      [user, today]
    );
    res.json({
      message: "Poop count incremented.",
      data: update.rows[0],
    });
  })
);

//global error handler
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);
  res.status(500).json({
    error: err.message || "Internal Server Error",
  });
});

app.listen(5001, () => {
  console.log("server running at port 5001");
});
