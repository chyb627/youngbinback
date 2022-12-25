const express = require('express');
const mysql = require('mysql2');
const app = express();

app.set("view engine", "ejs");

// express 서버로 POST 요청을 할 때 input 태그의 value를 전달하기 위해 사용.
// 요청의 본문에 있는 데이터를 해석해서 req.body 객체로 만들어주는 미들웨어.
// 예전에는 body-parser 패키지를 별도로 설치해야 했지만 express v4.16.0 부터 내장 라이브러리가 되었음.
app.use(express.urlencoded({ extended: false }));
// JSON 문자열로 넘어오는 경우 express.json() 미들웨어를 사용
app.use(express.json());

// --------------mysql 설정--------------
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
const connection = mysql.createConnection(config);

// --------------mysql 쿼리문 써보기--------------

// const q = 'SELECT CURDATE()';
// const q1 = 'SELECT 1 + 5 As answer';
// const q2 = 'SELECT CURDATE() as time, CURDATE() as date, NOW() as now';

// q라는 쿼리를 실행하도록 명력하는 부분.
// 이부분의 의미는 쿼리가 끝나면 (즉, 우리는 데이터베이스와 연결되면) SELECT CURDATE()를 실행할 것이라는 뜻.
// 만약 오류가 발생하면 error에 저장.
// 어떤 결과가 발생하면 results에 저장.

// connection.query(q, function(error, results, fields) {
//   if(error) throw error;
//   console.log(' q The solution is: ', results);
// });

// connection.query(q1, function(error, results, fields) {
//   if(error) throw error;
//   console.log(' q1 The solution is: ', results[0].answer);
// });

// connection.query(q2, function(error, results, fields) {
//   if(error) throw error;
//   console.log(' q2time The solution is: ', results[0].time);
//   console.log(' q2date The solution is: ', results[0].date);
//   console.log(' q2now The solution is: ', results[0].now);
// });

// --------------users 테이블 조회--------------
const q = 'SELECT * FROM users';

connection.query(q, function (error, results, fields) {
  if (error) throw error;
  // console.log('The solution is: ', results);
  // console.log(results.length);
  // 좋은방법 X, 단순히 개수를 세기 위해 모든 데이터를 선택해서 결과로 출력하기 때문. 효율적이지 않음.
  // SELECT COUNT(*) AS total FROM users를 사용하자.
  // MySQL에 총계를 계산해서 달라고 하면 되지 모든 데이터가 필요한건 X. 만개라고 예를들면, 결과를 모두 회신하는 대신 개수만 세서 알려주는 작업이 효율적이다.
});

// --------------users 테이블에 email 컬럼에 하드 코딩 하기--------------
// const q1 = 'INSERT INTO users (email) VALUES ("jungin@gmail.com");'

// connection.query(q1, function(error, results, fields) {
//   if(error) throw error;
//   console.log(results); 
// });

// --------------users 테이블에 email 컬럼에 동적인 코딩 하기--------------
// MySQL에서 person이란 변수를 보고 객체를 인식한다. 
// 그 후 'INSERT INTO users (email, name) VALUES ("jungin@gmail.com", "정인");' 으로 변형해준다.
// const person = { email: 'jungin@gmail.com', name: '정인' };
// connection.query('INSERT INTO users SET ?', person, function (error, results) {
//   if (error) throw error;
//   console.log(results);
// });

// --------------users 테이블에 컬럼 대량 삽입하기--------------
const data = [
  ['dahyun@gamil.com', '1989-11-30 11:51:33'],
  ['gallak@gamil.com', '1990-12-30 12:51:33'],
  ['eunbi@gamil.com', '1987-01-02 03:48:33'],
]
const q3 = 'INSERT INTO users (email, created_at) VALUES ?';

// connection.query(q3, [data], function (err, result) {
//   console.log(err);
//   console.log(result);
// })

// connection.end();

app.get("/", function (req, res) {
  const q = "SELECT COUNT(*) AS count FROM users";
  connection.query(q, function (err, results) {
    if (err) throw err;
    const count = results[0].count
    res.send(`<h1>users 테이블에 ${count}명이 등록되어있습니다.</h1>`)
  });
});

app.get('/home', (req, res) => {
  const q = "SELECT COUNT(*) AS count FROM users";
  connection.query(q, function (err, results) {
    if (err) throw err;
    const count = results[0].count
    res.render("home", { count });
  });
});

app.post('/register', function (req, res) {
  var person = { email: req.body.email };
  connection.query('INSERT INTO users SET ?', person, function (err, result) {
    console.log(err);
    console.log(result);
    res.redirect("/");
  });
});

app.listen(1130, function () {
  console.log("Server Running on 1130!")
})