const mysql = require('mysql2');
const dotenv = require('dotenv');

// dotenv는 최대한 위에 올려 주면 좋은게 밑에있으면 process.env.COOKIE_SECRET등이 적용되지 않음
dotenv.config();

// mysql 설정
const connection = mysql.createConnection({
  user: "root",
  host: "127.0.0.1",
  password: process.env.DB_PASSWORD,
  database: "youngbin",
});

// mysql 쿼리문 써보기

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

const q = 'SELECT * FROM users';

connection.query(q, function(error, results, fields) {
  if(error) throw error;
  console.log('The solution is: ', results);
  console.log(results.length); 
  // 좋은방법 X, 단순히 개수를 세기 위해 모든 데이터를 선택해서 결과로 출력하기 때문. 효율적이지 않음.
  // SELECT COUNT(*) AS total FROM users를 사용하자.
  // MySQL에 총계를 계산해서 달라고 하면 되지 모든 데이터가 필요한건 X. 만개라고 예를들면, 결과를 모두 회신하는 대신 개수만 세서 알려주는 작업이 효율적이다.
});