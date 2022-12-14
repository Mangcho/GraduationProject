# 2022년도 2학기 졸업프로젝트

### Version 0.5

## 프로젝트 설명

![프로젝트 메인 구성](https://user-images.githubusercontent.com/46319374/192773251-5bc993ba-b498-42ce-a3b3-899dcba3efc3.jpg)

본 프로젝트의 목표는 척추 부근에 센서를 달아 얻는 데이터를 통해 사용자의 현재 허리 상태를 측정하고 이를 처리하여 사용자가 현재 자신의 허리 자세를 인지하고 올바른 자세를 취할 수 있게 하는 것입니다.
본 레포지토리에서는 **백엔드 서버인 ExpressJS** 만 다룹니다.

### 라즈베리파이

라즈베리파이는 센서로부터 데이터를 수신받아 자체적으로 처리한 뒤 이를 웹서버로 전송합니다.
데이터는 사용자의 척추에 붙어있는 세개의 9축 센서의 고유 측정값과 한번 정제 과정을 거쳐 얻은 정보들입니다.
여러가지 한계로 인해 라즈베리파이는 고유IP를 가지고 있지 않습니다. 따라서 라즈베리파이는 웹서버의 응답을 제외하면 웹서버에게 단방향으로만 송신합니다.
웹서버가 수신하는 데이터는 REST 기반의 JSON 타입의 객체입니다.

### 웹서버

고유한 IP를 가지고 있으며, 사용자의 REST 기반의 요청을 받아주는 ReactJS와 요청을 받아 처리하는 ExpressJS가 존재합니다.
웹 페이지에 대한 Routing은 React가 담당하며, 필요한 처리를 Axios를 통해 백엔드 서버와 통신하여 처리를 하게 됩니다.

## 디렉토리 설명

1. ~~/public~~ : React.js에서 빌드된 파일들이 존재하는 곳입니다. 본 디렉토리에서는 다루지 않습니다.
2. /loaders : 서버가 시작됨과 동시에 특정 설정들을 가져오는 파일이 저장되어 있습니다.
3. /models : DB에서 사용하는 Table의 정의가 저장되는 곳입니다.
   - /index.js : Sequelize ORM을 사용하여 기본 설정 및 Table을 만들어줍니다.
4. /routes : REST 요청에 따른 라우팅 처리를 진행합니다. 프론트와 axios로 통신합니다.
5. /services : routes에 의해 호출되어 비지니스 로직에 따라 데이터를 처리하고 이를 routes에 반환합니다.
6. /setting : .env를 **제외한** 다른 기본 설정 파일들이 존재합니다.
   - /database : mysql2 모듈을 위한 설정 파일입니다. (미사용)
   - /sequelize : sequelize 설정값이 저장되어 있습니다.
   - /env : dotenv 설정을 가장 먼저 로딩하기 위해 사용합니다.
7. /utils : 자주 사용하는 함수들이 저장되어 있습니다.

## 개발 스택

- Framework : Expressjs
- Database : MariaDB, Sequelize(ORM)

## DB 테이블 설명

### ERD

![ERD](https://user-images.githubusercontent.com/46319374/197136999-bff55ff6-5208-4f9b-a78a-68d7e3643c46.jpg)

1. whitelists : 서버에 라즈베리파이를 IMEI값을 바탕으로 등록하기 위한 테이블입니다.
2. users : 어떤 계정의 소유자가 어떤 라즈베리파이를 사용하는지, 또한 동시에 어떤 정보를 가지고 있는지를 확인할 수 있는 테이블입니다.
3. rasbpies : IMEI 값으로 라즈베리파이를 구분하며, 매 초마다 라즈베리파이에서의 센서 데이터와 처리된 정보 데이터를 수신합니다.


## 다른 팀원들의 코드
* [Frontend](https://github.com/ekg1229/GraduationProject)
* [IoT-RasberyPi](https://github.com/yukwanwoo/2022-project-pi)
