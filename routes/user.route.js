const express = require("express");
const router = express.Router();

const controller = require("../controllers/user.controller");
const validate = require("../validates/user.validate");

router.get("/register", controller.register);

router.post("/register", validate.registerPost, controller.registerPost);

module.exports = router;
