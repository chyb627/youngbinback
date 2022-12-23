# youngbinback
영차영차앱 백앤드 node + mysql

## MySQL

- mysql -u root -p
- MySQL로 이동. -h는 호스트, -u는 사용자, -p는 비밀번호

- show databases;
- database 확인

- DESC users;
- users란 테이블 확인.

- DROP TABLE users;
- 테이블 삭제 명령어

- SHOW TABLES;
- 테이블 목록 확인.

### 데이터베이스 생성

- CREATE SCHEMA youngbin DEFAULT CHARACTER SET utf8;
- :::::: 위와 같이 입력하면 youngbin이라는 스키마가 생김. mysql에서는 SCHEMA 와 database가 같은 단어라고 보면 된다.
- use youngbin;
- :::::: youngbin데이터베이스가 생겼다면 use youngbin;를 입력해야 한다.  --> Database changed가된다.

### 테이블 생성

```sql
CREATE TABLE youngbin.users(                    -- users 테이블 생성
  id INT NOT NULL AUTO_INCREMENT,               -- id 컬럼 생성
  name VARCHAR(20) NOT NULL,                    -- name 컬럼 생성
  age INT UNSIGNED NOT NULL,                    -- age 컬럼 생성
  married TINYINT NOT NULL,                     -- married 컬럼 생성
  comment TEXT NULL,                            -- comment 컬럼 생성 (자기소개. comment table의 comment와 다름.)
  created_at DATETIME NOT NULL DEFAULT now(),   -- created_at 컬럼 생성
  PRIMARY KEY(id),  
  UNIQUE INDEX name_UNIQUE (name ASC))          -- UNIQUE를 하면 무조건 INDEX를 붙일 수 밖에없음. UNIQUE는 검색을 자주하기 때문.
  COMMENT = '사용자 정보'                          -- COMMENT는 users테이블에 대한 설명.
  DEFAULT CHARACTER SET=utf8
  ENGINE=InnoDB;
```

```sql
CREATE TABLE youngbin.comment(                 -- comment 테이블 생성
  id INT NOT NULL AUTO_INCREMENT,              -- id컬럼 생성
  commenter INT NOT NULL,                      -- commenter컬럼 생성
  comment VARCHAR(100) NOT NULL,               -- comment 컬럼 생성
  created_at DATETIME NOT NULL DEFAULT now(),  -- created_at 컬럼 셍상
  PRIMARY KEY(id),                             -- id를 기본키로 설정, 겹치지않는값으로 설정.
  INDEX commenter_idx (commenter ASC),         -- 자주 검색할만한 것들을 INDEX 해주면, 검색성능이 향상. commenter 컬럼을 오름차순으로 인덱싱 하겠다는 뜻
  CONSTRAINT commenter                         -- commenter컬럼에 제약을 두겠다. 
  FOREIGN KEY (commenter)                      -- 외래키. users테이블의 id로 commenter를 제약을 두는 것. users테이블의 id에서만 commenter가 나올 수 있도록함.
  REFERENCES youngbinbackend.users (id)        -- 참조. users 테이블의 id 참조.
  ON DELETE CASCADE                            -- 사용자가 탈퇴할 때 그사람이 단 댓글까지 같이 지울것인가? CASCADE는 같이 지운다는 뜻.
  ON UPDATE CASCADE)
  COMMENT = '댓글'                              -- COMMENT는 comment테이블에 대한 설명.
  DEFAULT CHARSET=utf8mb4                      -- 보통은 utf8로 많이하는데, mb4를 붙이면 이모티콘까지 같이 넣을 수 있도록 함.
  ENGINE=InnoDB;
```

- id, commenter, comment, created_at 4개의 컬럼을 만듦.
- id는 고유한 숫자이고, INT로 숫자설정, NOT NULL로 필수 설정, 1,2,3,4... 순으로 갈때는 AUTO_INCREMENT를 붙여준다.
- commenter는 댓글 단 사람의 id
- comment는 댓글. VARCHAR(100)로 100글자 이하로 설정. NOT NULL로 필수 설정.
- created_at는 생성일. DATE는 날짜 기록. DATETIME은 날짜에 시간까지 기록. DEFAULT는 기본값. now()로 기본값을 현재시간으로 설정.

- INT: 정수 자료형 (FLOAT, DOUBLE은 실수)
- VARCHAR: 문자열 자료형, 가변 길이(CHAR은 고정 길이)
- TEXT: 긴 문자열은 TEXT로 별도 저장, 소설, 일기등
- DATETIME: 날짜 자료형 저장
- TINYINT: -128에서 127까지 저장하지만 여기서는 1 또는 0만 저장해 불 값 표현.

- NOT NULL: 빈 값은 받지 않겠다는 뜻 (NULL은 빈 값 허용)
- AUTO_INCREMENT: 숫자 자료형인 경우 다음 로우가 저장될 때 자동으로 1 증가.
- UNSIGNED: 0과 양수만 허용.
- ZEROFILL: 숫자의 자리 수가 고정된 경우 빈 자리에 0을 넣음. 앞에 0이 붙어야하는 경우 유용함.
- DEFAULT now(): 날짜 컬럼의 기본값을 현재 시간으로.

## CRUD

- CREATE / READ / UPDATE / DELETE
- 데이터베이스에서 가장 많이하는 작업.

- INSERT INTO 테이블 (컬럼명들) VALUES (값들);
- INSERT INTO youngbinbackend.users (name, age, married, comment) VALUES ('cha', 30, 0, '자기소개 내용');
- INSERT INTO youngbinbackend.comments (commenter, comment) VALUES (1, '댓글 내용');

- SELECT * FROM youngbinbackend.users;

- SELECT id, name FROM youngbinbackend.users ORDER BY age DESC LIMIT 1;
- LIMIT으로 조회할 개수 제한을 할 수 있다. 조건을 만족하는 로우가 여러개일 때 처음오는 한개만 보여줄 때 LIMIT 1 사용.

- SELECT id, name FROM youngbinbackend.users ORDER BY age DESC LIMIT 1 OFFSET 1;
- OFFSET 1을 해주면 1등(1번째)를 건너뛰고, 다음것을 1개 출력해주겠다. (여기서 OFFSET2 로 바뀌면 3번째것이 출력)

- UPDATE 테이블명 SET 컬럼=값 WHERE 조건;
- UPDATE youngbinbackend.users comment='바꿀 자기소개' WHERE id = 2;

- DELETE FROM 테이블명 WHERE 조건;
- DELETE FROM youngbinbackend.users WHERE id = 2;

## MYSQL명령어

- SELECT CURDATE();  // 현재 날짜를 반환