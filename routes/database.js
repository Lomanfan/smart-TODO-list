// const todolist = require('./db/seeds/03_todolist.sql');
// const users = require('./db/seeds/01_users.sql');
const { Pool } = require('pg');
const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

pool.connect();

const getToDo = (user) => {
  const queryParams = [];
  console.log(user)
  queryParams.push(`${user.user_id}`);
  let queryString = `SELECT *
  FROM users
  join todolist on user_id = users.id
  join category on category_id = category.id
  where users.id = $${queryParams.length};`
  return pool.query(queryString, queryParams).then((res) => res.rows);
}
exports.getTodo = getToDo;
