const express = require("express");
const router = express.Router();

// requiring user registration controller
const userController = require("../controllers/userRegister")

// routes
router.post("/registration",userController.userRegister)
router.post("/login",userController.userLogin)

module.exports = router