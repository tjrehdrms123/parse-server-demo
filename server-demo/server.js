const express = require("express");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { default: ParseServer, ParseGraphQLServer } = require("parse-server");
var FSFilesAdapter = require("@parse/fs-files-adapter");
var fsAdapter = new FSFilesAdapter();
const { swaggerUi, specs } = require("./swagger_modules/swagger");

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(
  morgan(":method :url | :status | :response-time ms | :date[iso] | ", {
    skip: (req, res) => {
      return req.originalUrl.startsWith("/parse");
    },
  })
);
app.use(morgan(":method :url | :status | :response-time ms | :date[iso] | "));

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
    maxAge: 3600,
  })
);
app.use(cookieParser());

const parseServer = new ParseServer({
  publicServerURL: process.env.PARSESERVERURL,
  filesAdapter: fsAdapter,
  databaseURI: process.env.DATABASEURI,
  appId: process.env.PARSEAPPID,
  masterKey: process.env.PARSEMASTERKEY,
  clientKey: process.env.PARSECLIENTKEY,
  restAPIKey: process.env.PARSERESTAPIKEY,
  javascriptKey: process.env.PARSEJAVASCRIPTKEY,
  port: process.env.PORT,
});

const ParseDashboard = require("parse-dashboard");
const dashboard = new ParseDashboard(
  {
    // 배열로 해야 함.
    apps: [
      {
        appId: process.env.PARSEAPPID,
        appName: process.env.PARSEAPPNAME,
        serverURL: process.env.PARSESERVERURL,
        masterKey: process.env.PARSEMASTERKEY,
        javascriptKey: process.env.PARSEJAVASCRIPTKEY,
      },
    ],
    users: [{ user: process.env.PARSEADMINID, pass: process.env.PARSEADMINPW }],
  },
  { allowInsecureHTTP: true }
);

// Route
app.use("/parse", parseServer.app);
app.use("/dashboard", dashboard);

app.use("/", routes);
app.get("/", (req, res) => {
  return res.send("Welcome to DEMO Server");
});

app.use((req, res) => {
  return res.status(404).send({ content: "API를 확인해주세요." });
});

// 응답 미들웨어
app.use((result, req, res, next) => {
  if (result?.data?.type === "cookie") {
    return res.status(200).send(result);
  } else if (result.status === 200) {
    return res.status(200).send(result);
  }
  if (result.status === 400 && 500) {
    return res.status(200).send(result);
  } else {
    return res.send(result);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`server is running ${process.env.PORT}`);
});
