const swaggerUi = require("swagger-ui-express");
const swaggereJsdoc = require("swagger-jsdoc");

const options = {
  swaggerDefinition: {
    info: {
      title: "API",
      version: "1.0.0",
      description: "",
    },
    host: "localhost:3061",
    basePath: "/",
    servers: [{ url: "http://localhost:3061" }],
  },
  apis: ["./routes/*.js", "./swagger_modules/*"],
};

const specs = swaggereJsdoc(options);

module.exports = {
  swaggerUi,
  specs,
};