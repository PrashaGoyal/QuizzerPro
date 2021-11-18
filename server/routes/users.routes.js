const express = require("express");
const usersController = require("../controllers/users.controller");

const router = express.Router();

// route for user sign-up
router.route("/signup").post(usersController.createUser);

// route for user sign-in
router.route("/signin").post(usersController.loginUser);

module.exports = router;
