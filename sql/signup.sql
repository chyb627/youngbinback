CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  email varchar(30) NOT NULL,
  name varchar(30) NOT NULL,
  password varchar(100) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY(id)
) charset=utf8;


INSERT INTO users (id, email, name, password) VALUES (1, 'chyb627@naver.com', '영빈', 'password');
