const express = require("express");
const router = express.Router();

const controller = require("../controllers/users.controller");

router.get("/not-friend", controller.notFriend);

module.exports = router;
