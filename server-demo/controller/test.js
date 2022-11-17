const { testQuery } = require("../model/test");
const { errorCode } = require("../res_code/code");

// 테스트 컨트롤러
async function testController(req, res, next) {
  try {
    const result = await testQuery(
      req
    );
    next(result);
  } catch (error) {
    errorCode.data.message = error.message;
    return errorCode;
  }
}
module.exports = {
  testController,
};