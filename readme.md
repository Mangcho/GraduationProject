# 2022년도 2학기 졸업프로젝트

### Version 0.2

## 프로젝트 설명

아직 없습니다. 시간도 없구요.

## 디렉토리 설명

1. ~~/public~~ : React.js에서 빌드된 파일들이 존재하는 곳입니다. 본 디렉토리에서는 다루지 않습니다.
2. /models : DB에서 사용하는 Table의 정의가 저장되는 곳입니다.
   - /index.js : Sequelize ORM을 사용하여 기본 설정 및 Table을 만들어줍니다.
3. /routes : REST 요청에 따른 라우팅 처리를 진행합니다. 프론트와 axios로 통신합니다.
4. /services : 뭐라고 쓸지 모르겠지만, 아마도 곧 쓸 예정입니다.
5. /setting : .env를 **제외한** 다른 기본 설정 파일들이 존재합니다.
   - /database : mysql2 모듈을 위한 설정 파일입니다. (미사용)
   - /sequelize : sequelize 설정값이 저장되어 있습니다.
6. /utils : 자주 사용하는 함수들이 저장되어 있습니다.

## 개발 스택

- Framework : Expressjs
- Database : MariaDB, Sequelize(ORM)

## DB 테이블 설명

1. whitelist :
2. user :
3. data :
