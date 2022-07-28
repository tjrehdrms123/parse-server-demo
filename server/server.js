const express = require("express");
const { default: ParseServer, ParseGraphQLServer } = require("parse-server");
const config = require("./config");

const app = express();

const parseServer = new ParseServer({
  databaseURI: config.databaseURI,
  appId: config.parseAppId,
  masterKey: config.parseMasterKey,
  clientKey: config.parseClientKey,
  restAPIKey: config.parseRestAPIKey,
  javascriptKey: config.parseJavascriptKey,
  port: config.port,
});

const ParseDashboard = require("parse-dashboard");
const dashboard = new ParseDashboard(
  {
    // 배열로 해야 함.
    apps: [
      {
        appId: config.parseAppId,
        appName: config.parseAppName,
        serverURL: config.parseServerURL,
        masterKey: config.parseMasterKey,
        javascriptKey: config.parseJavascriptKey,
      },
    ],
    users: [config.parseDashboardAdmin],
  },
  { allowInsecureHTTP: true }
);

app.use("/parse", parseServer.app);
app.use("/dashboard", dashboard);

app.listen(config.port, () => {
  console.log("server is running");
});
