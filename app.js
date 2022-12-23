const faker = require('faker');
const mysql = require('mysql2');
const dotenv = require('dotenv');

// dotenv는 최대한 위에 올려 주면 좋은게 밑에있으면 process.env.COOKIE_SECRET등이 적용되지 않음
dotenv.config();

//faker
// console.log(faker.internet.email());
// console.log(faker.address.streetAddress());
// console.log(faker.address.city());
// console.log(process.env.MYSQL_HOST);

// mysql 설정
const connection = mysql.createConnection({
  user: "root",
  host: "127.0.0.1",
  password: process.env.DB_PASSWORD,
  database: "youngbin",
});

// mysql 쿼리문 써보기
const q = 'SELECT CURDATE()';
const q1 = 'SELECT 1 + 5 As answer';
const q2 = 'SELECT CURDATE() as time, CURDATE() as date, NOW() as now';

// q라는 쿼리를 실행하도록 명력하는 부분.
// 이부분의 의미는 쿼리가 끝나면 (즉, 우리는 데이터베이스와 연결되면) SELECT CURDATE()를 실행할 것이라는 뜻.
// 만약 오류가 발생하면 error에 저장.
// 어떤 결과가 발생하면 results에 저장.
connection.query(q, function(error, results, fields) {
  if(error) throw error;
  console.log(' q The solution is: ', results);
});

connection.query(q1, function(error, results, fields) {
  if(error) throw error;
  console.log(' q1 The solution is: ', results[0].answer);
});

connection.query(q2, function(error, results, fields) {
  if(error) throw error;
  console.log(' q2time The solution is: ', results[0].time);
  console.log(' q2date The solution is: ', results[0].date);
  console.log(' q2now The solution is: ', results[0].now);
});