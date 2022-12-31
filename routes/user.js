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
    const q = 'INSERT INTO users (email, name, password, birthday) VALUES (?, ?, ?, ?)';
    const { email, name, password, birthday } = req.body;

    // 필수 데이터 체크
    if (!email || !name || !password || !birthday) {
      res.statusCode = 400;
      return res.send("필수 데이터가 없습니다.");
    }

    // 기존 가입여부 체크
    // const userExist = ;
    // if (userExist) {
    //   res.statusCode = 409;
    //   res.send("이미 가입된 이메일 입니다.");
    // }

    const hashedPassword = await bcrypt.hash(password, 12);
    const params = [email, name, hashedPassword, birthday];

    connection.query(q, params, (err, results) => {
      res.status(201).send('ok');
    })
  } catch (error) {
    console.error(error);
    // next(error); // status 500
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const q = `SELECT * FROM users WHERE email="${email}"`

  connection.query(q, async (error, results) => {
    if (results.length) {

      // 비밀번호 체크.
      await bcrypt.compare(password, results[0].password, (err, same) => {
        console.log(same);  //=> true
        if (same) {
          console.log("------로그인 성공------");
        } else {
          console.log("로그인 실패 :: 비밀번호 틀림.");
        }
      });
    } else {
      console.log('로그인 실패 :: 회원 정보 없음.');
    }
  })

})

module.exports = router;