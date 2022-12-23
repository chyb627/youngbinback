-- 새 파일을 만드는 이유는 기록을 하기 위해서이다.
-- source schema.sql

CREATE TABLE users (
  email VARCHAR(255) PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW()
);