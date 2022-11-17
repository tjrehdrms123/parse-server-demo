const { Router } = require("express");
const router = Router();
const { testController } = require("../controller/test");

router.get("/", testController);

module.exports = router;