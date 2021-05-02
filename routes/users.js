/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require()

module.exports = (db) => {
  router.get("/:user_id", (req, res) => {

    // db.query(`SELECT *
    // FROM users
    // join todolist on user_id = users.id
    // join category on category_id = category.id
    // where users.id = ${req.params.user_id};`)
     getTodo
      .then(data => {
        const userTodoLists = data.rows;
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
  return router;
};
