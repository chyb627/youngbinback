# youngbinback

영차영차앱 백앤드 nodejs

### start a project

```sh
# 실행(개발)
$ npm run dev

# 실행(운영)
$ npm run start
```

### Docker

```bash
# 컨테이너 올리기
$ docker-compose up

# 컨테이너 확인
$ docker ps --all  //CONTAINER ID 확인 --> d1cc969208e1

# 로컬호스트에서 DB에 psql로 바로접속. 다른 클라이언트 툴을 이용해 접속하는 것도 가능
$ psql -U postgres -h localhost -p 5433

# 실행중인 도커 컨테이너에서 프로세스 실행. 셀을 실행해서 인터렉티브한 환경에서 컨테이너 환경을 탐색하는 것도 가능
# docker exec -it <CONTAINER_ID> <COMMAND>
# docker exec -it <CONTAINER_ID> psql -U postgres
$ docker exec -it 581f9c6915c4 psql -U postgres

# 컨테이너 내리기
$ docker-compose down
```

### TypeORM 마이그레이션

```bash
# src/migration 폴더를 생성하고, 기존의 테이블이 없는 상태에서 진행.
$ npm run typeorm migration:generate src/migration/Init

# 생성된 migration init 파일을 실행시켜 테이블 생성.
$ npm run typeorm migration:run
```
