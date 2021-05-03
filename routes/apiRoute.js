require('dotenv').config()
const { render } = require('ejs');
const express = require('express');
const router = express.Router();
const getCategory = require('./getCategory');
const queryCategory = require('./queryCategory');


// Use fetch() to POST JSON-encoded data.
router.post('/users/user_id', (req, res) => {
  const userId = req.session.userId;
  database.queryCategory({...req.body, user_id: userId })
    .then(todolist => {
      res.send(todolist);
    })
    .catch(err => {
      console.error(err);
      res.send(err)
    })

    return router;
})
