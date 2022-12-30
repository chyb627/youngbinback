const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const router = express.Router();

// --------------mysql 설정--------------
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const connection = mysql.createConnection(config);

router.get("/", (req, res, next) => {
  const q = "SELECT * FROM users";
  connection.query(q, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

router.post("/signup", async (req, res, next) => {
  try {
    const q = 'INSERT INTO users (email, name, password) VALUES (?, ?, ?)';
    const { email, name, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const params = [email, name, hashedPassword]

    connection.query(q, params, (err, results) => {
      res.status(201).send('ok');
    })
  } catch (error) {
    console.error(error);
    // next(error); // status 500
  }
});

module.exports = router;