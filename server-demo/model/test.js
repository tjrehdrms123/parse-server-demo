const Parse = require("parse/node");
require("dotenv").config();
const {
  successCode,
  errorCode,
} = require("../res_code/code");

Parse.initialize( 
  process.env.PARSEAPPID,
  process.env.PARSEJAVASCRIPTKEY,
  process.env.PARSEMASTERKEY
);
Parse.serverURL = process.env.PARSESERVERURL;
Parse.User.enableUnsafeCurrentUser();

const Test = Parse.Object.extend("test");

async function testQuery(req) {
  try {
    const test = new Test();
    test.set("test", "test");
    await test.save();
    successCode.data.message = "테스트가 완료되었습니다";
    return successCode;
  } catch (error) {
    errorCode.data.message = error.message;
    return errorCode;
  }
}

module.exports = {
  testQuery,
};