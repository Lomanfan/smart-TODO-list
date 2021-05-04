const { Pool } = require('pg');
const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

const queryCategory = function(user_id, category_id, user_input) {
  return pool.query(
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
  RETURNING *;`,[
    user_id, category_id, user_input
  ])
  // INSERT INTO todolist (user_id, category_id, user_input, remind_me_at, is_completed)
  // VALUES (1, 4, 'sandles', '2021-05-21', FALSE),
  // INSERT INTO category (type) VALUES ('to shop');

  .then(res => {
    // console.log("res:", res.rows[0]);
    return res.rows[0];
  })
  .catch(err => {
    return console.log('queryCategory error:', err);
  });
};
exports.queryCategory = queryCategory;
console.log(queryCategory(1, 1, 'steak'));




