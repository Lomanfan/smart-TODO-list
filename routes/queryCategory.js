const { Pool } = require("pg");
const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "midterm",
});
// to insert new todolist to database
const queryCategory = function (user_id, category_id, user_input) {
  return pool
    .query(
      `INSERT INTO todolist (
    user_id,
    category_id,
    user_input
  )
  VALUES (
    $1,
    $2,
    $3
  )
  RETURNING *;`,
      [user_id, category_id, user_input]
    )

    .then((res) => {
      return res.rows[0];
    })
    .catch((err) => {
      return console.log("queryCategory error:", err);
    });
};
exports.queryCategory = queryCategory;
