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
  queryParams.push(`${user.user_id}`);
  let queryString = `SELECT todolist.id as todolist_id, users.id as user_id, category_id, category.type, user_input, users.name
  FROM todolist
  join users on user_id = users.id
  join category on category_id = category.id
  where users.id = $${queryParams.length}
  order by todolist.id DESC;`
  return pool.query(queryString, queryParams).then((data) => {
    // console.dir((data.rows))
  return  data.rows;
});
}
exports.getTodo = getToDo;

const deleteToDoById = (id) => {
  const queryParams = [];
  // console.log(id);
  queryParams.push(`${id}`);
//   DELETE FROM links
// WHERE id = 10;
  let queryString = `DELETE
  FROM todolist
  where id = $${queryParams.length}
  RETURNING *;`
  return pool.query(queryString, queryParams)
  .then((res) => {
    console.log('results after delete',res.rows[0])
    return getToDo(res.rows[0])
  });
}

exports.deleteToDoById = deleteToDoById;

const getIdByName = (cateName) => {
  const queryParams = [];
  queryParams.push(`${cateName}`);
  let queryString = `SELECT category.id
  FROM category
  where category.type = $${queryParams.length};`
  return pool.query(queryString, queryParams).then((data) => {
    // console.log('hi');
    // console.dir((data.rows))
  return  data.rows;
});
}

exports.getIdByName = getIdByName;
