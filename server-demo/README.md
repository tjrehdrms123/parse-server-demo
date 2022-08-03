# parse-server-demo

## parser-server, parse-dashboard, postgreSQL를 사용하는 서버
아래의 명령어로 패키지 설치 후 사용가능
```js
npm install or yarn
```

## config.js 파일 구성
해당 데모에서는 Database config설정을 config.js파일에서 구성한다
아래를 참고해서 구성하면된다
```js
const PORT = 3601;
const config = {
  databaseURI: "postgres://id:password@url/dbname",
  parseAppId: "id",
  parseAppName: "name",
  parseMasterKey: "key",
  parseClientKey: "key",
  parseRestAPIKey: "key",
  parseJavascriptKey: "key",
  parseServerURL: `URL/parse`,
  serverURL: `URL`,
  port: PORT,
  parseDashboardAdmin: { user: "admin", pass: "1" },
};
module.exports = config;
```

## 접속 정보
해당 데모로 실행 시켰을시에 접속 정보
```
URL : http://localhost:3601/dashboard
ID : admin
PW : 1
```