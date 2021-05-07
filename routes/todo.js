/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { Pool } = require('pg');
const router  = express.Router();


// module.exports = (db) => {

//   router.get("/todo", (req, res) => {
//     let query = `SELECT * FROM todo`;
//     db.query(query)
//       .then(data => {
//         const todo = data.rows;
//         res.json({ todo });
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .json({ error: err.message });
//       });
//   });
//   return router;
// };


