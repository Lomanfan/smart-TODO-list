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
const { getAllCategories } = require('../routes/database');
// const database = require('./database');
//TODO:route to sort the todolists by category name
module.exports = (db) => {
  // 8080:users/user_id


  //delete a exist todolist
  router.delete("/:user_id/todolist/:todolist_id", (req, res) => {
    const id = req.params;
    // console.log(id);
    db.deleteToDoById(id.todolist_id)

    .then(data => {
      const userTodoLists = data;
      res.redirect("back");
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  router.put("/:user_id/:todolist_id", (req,res) => {
    const userId = req.params.user_id;
    const todoId = req.params.todolist_id;
    const cateId = req.body.categoryDropdown;
    db.changeCateById(userId, todoId, cateId)
    .then(data => {
      res.redirect("back");
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

    db.getAllCategories()
    .then((result) => {
      const types = result;
      console.log(types);

    getCategory(input)
      .then(res => {
      return db.getIdByName(res)
      })
      .then(res =>{
      const cateId = res[0].id;
      return queryCategory.queryCategory(user_id, cateId, input);
      })
      .then(res => {
        // console.log("user res: ",res);
       return db.getTodo(res);
      })
      .then(() => {
        // const userTodoLists = data;
        res.redirect("/");
      })
      .catch(err => {
        console.error(err);
        res.send(err)
      });

    });
  });
  return router;

};
