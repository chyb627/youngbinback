-- 새 파일을 만드는 이유는 기록을 하기 위해서이다.
-- source schema.sql

CREATE TABLE users (
  email VARCHAR(255) PRIMARY KEY,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 사용자 2명 넣어보기

INSERT INTO users (email) VALUES
('chyb627@naver.com'), ('dddff89@naver.com');

--  select * from users; 로 적용되었는지 확인해보기.