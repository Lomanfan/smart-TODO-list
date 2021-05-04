/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const getCategory = require('./getCategory');
const queryCategory = require('./queryCategory');
const database = require('./database');

module.exports = (db) => {
  // 8080:users/user_id
  router.get("/:user_id", (req, res) => {

    // db.query(`SELECT *
    // FROM users
    // join todolist on user_id = users.id
    // join category on category_id = category.id
    // where users.id = ${req.params.user_id};`)
    // console.log(req.params)
    const user = req.params;
    console.log(user)
     db.getTodo(user)
      .then(data => {
        const userTodoLists = data;
        // console.log(userTodoLists)
        // res.json({ userTodoLists });
        //redirect to users todo list page
        res.render("show",{userTodoLists});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  //8080:users/user_id/:todolist_id
  router.delete("/:user_id/:todolist_id", (req, res) => {
    const id = req.params;
    // console.log(id);
    db.deleteToDoById(id.todolist_id)

    .then(data => {
      const userTodoLists = data;
      // console.log(userTodoLists)
      res.render("show",{userTodoLists});
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

 // 8080:users/user_id/new
  router.post('/:user_id/new', (req, res) => {
    console.log(req.params);
    const user_id = parseInt(req.params.user_id);
    const input = req.body.todolist;
    getCategory(input)
      .then(res => {
      return database.getIdByName(res)
      })
      .then(res =>{
      const cateId = res[0].id;
      queryCategory.queryCategory(user_id, cateId, input)
      })
      .catch(err => {
        console.error(err);
        res.send(err)
      });
  });
  return router;
};
