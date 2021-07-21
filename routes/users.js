/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const getCategory = require("./getCategory");
const queryCategory = require("./queryCategory");

module.exports = (db) => {
  //delete a exist todo list
  router.delete("/:userId/todolist/:todolist_id", (req, res) => {
    const id = req.params;
    db.deleteToDoById(id.todolist_id)

      .then((data) => {
        const userTodoLists = data;
        res.redirect("back");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //change the category type of a todo list
  router.put("/:userId/:todolist_id", (req, res) => {
    const userId = req.params.userId;
    const todoId = req.params.todolist_id;
    const cateId = req.body.categoryDropdown;
    db.changeCateById(userId, todoId, cateId)
      .then((data) => {
        res.redirect("back");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //creat a new todo list
  router.post("/:userId/new", (req, res) => {
    const userId = parseInt(req.params.userId);
    const input = req.body.todolist;

    db.getAllCategories().then((result) => {
      const types = result;

      getCategory(input)
        .then((res) => {
          return db.getIdByName(res);
        })
        .then((res) => {
          const cateId = res[0].id;
          return queryCategory.queryCategory(userId, cateId, input);
        })
        .then((res) => {
          return db.getTodo(res);
        })
        .then(() => {
          res.redirect("/");
        })
        .catch((err) => {
          console.error(err);
          res.send(err);
        });
    });
  });

  return router;
};
