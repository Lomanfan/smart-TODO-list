// const todolist = require('./db/seeds/03_todolist.sql');
// const users = require('./db/seeds/01_users.sql');
const { __esModule } = require("node-fetch");
const { Pool } = require("pg");
const pool = new Pool({
  user: "labber",
  password: "labber",
  host: "localhost",
  database: "midterm",
});

pool.connect();
//get all todolist in the database
const getToDo = (user) => {
  const queryParams = [];
  queryParams.push(`${user.user_id}`);
  let queryString = `SELECT todolist.id as todolist_id, users.id as user_id, category_id, category.type, user_input, users.name
  FROM todolist
  join users on user_id = users.id
  join category on category_id = category.id
  where users.id = $${queryParams.length}
  order by todolist.id DESC;`;
  return pool.query(queryString, queryParams).then((data) => {
    return data.rows;
  });
};
exports.getTodo = getToDo;

//delete one todo list by its id
const deleteToDoById = (id) => {
  const queryParams = [];
  queryParams.push(`${id}`);
  let queryString = `DELETE
  FROM todolist
  where id = $${queryParams.length}
  RETURNING *;`;
  return pool.query(queryString, queryParams).then((res) => {
    return getToDo(res.rows[0]);
  });
};

exports.deleteToDoById = deleteToDoById;

//to change a category type of a todo list by its id
const changeCateById = (userId, todoId, cateId) => {
  const queryParams = [];
  queryParams.push(`${userId}`, `${todoId}`, `${cateId}`);

  let queryString = `UPDATE todolist SET category_id = $3
  WHERE user_id = $1 AND todolist.id = $2 RETURNING *;`;

  return pool.query(queryString, queryParams).then((res) => {
    return getToDo(res.rows[0]);
  });
};
exports.changeCateById = changeCateById;

//get the category id by category type
const getIdByName = (cateName) => {
  const queryParams = [];
  queryParams.push(`${cateName}`);
  let queryString = `SELECT category.id
  FROM category
  where category.type = $${queryParams.length};`;
  return pool.query(queryString, queryParams).then((data) => {
    return data.rows;
  });
};
exports.getIdByName = getIdByName;

//get all type in category table
const getAllCategories = () => {
  return pool
    .query(`SELECT * FROM category;`)
    .then((data) => data.rows)
    .catch((err) => {
      console.log("getAllCategories", err.message);
    });
};
exports.getAllCategories = getAllCategories;
