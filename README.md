# Parse Server Demo
> Parse Server Demo : server-demo

## Parse 구조
```bash
├── server.js
│   └── parse 초기화 파일
├── .env
│   └── 설정 파일
├── res_code
│   └── HTTP 응답 코드
├── files
│   └── S3로 업로드 되는 파일
├── logs
│   └── parse 로그
├── middleware
│   └── utill 함수
├── model
│   └── 모델
├── routes
│   └── 라우팅
├── swagger_modules
│   └── 스웨거
``` 

> 모델 : DB와 직접 통신하는 코드가 있어야되고, 비지니스 로직이 들어가면 안된다

> 라우팅 : 라우팅과 비지니스 로직이 있어야되고, DB와 직접 통신하는 코드가 있으면 안된다
