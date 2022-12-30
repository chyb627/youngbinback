CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  email varchar(30) NOT NULL,
  name varchar(30) NOT NULL,
  password varchar(100) NOT NULL,
  birthday varchar(40) NOT NULL,
  created_at DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY(id)
) charset=utf8;


INSERT INTO users (email, name, password, birthday) VALUES ('chyb627@naver.com', '영빈', 'password', '1990-06-27');
