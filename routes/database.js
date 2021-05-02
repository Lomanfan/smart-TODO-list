const todolist = require('./db/seeds/03_todolist.sql');
const users = require('./db/seeds/01_users.sql');
const { Pool } = require('pg');
const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

pool.connect();

const getProperties
