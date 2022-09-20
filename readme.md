2022년도 2학기 졸업프로젝트
==============================
### Version 0.1

## 디렉토리 설명
1. ~~/build~~ : React.js에서 빌드된 파일들이 존재하는 곳입니다. 본 디렉토리에서는 다루지 않습니다.
2. /models : DB에서 사용하는 Table의 정의가 저장되는 곳입니다. 
   - /index.js : Sequelize ORM을 사용하여 기본 설정 및 Table을 만들어줍니다.
3. ~~/public~~ : 현재 없음
4. /routes : 현재 없음
5. /setting : .env를 **제외한** 다른 기본 설정 파일들이 존재합니다.
   - /database : mysql2 모듈을 위한 설정 파일입니다. (미사용)
   - /sequelize : sequelize 설정값이 저장되어 있습니다.
6. /utils : 자주 사용하는 함수들이 저장되어 있습니다.


## 개발 스택
* Framework : Expressjs
* Database : MariaDB

