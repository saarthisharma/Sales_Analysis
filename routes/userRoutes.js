const express = require("express");
const router = express.Router();

// requiring middleware
const {userAuthorization} = require("../middleware/UserAuthorization")

// requiring user registration controller
const userController = require("../controllers/userRegister")

// routes
router.post("/registration",userController.userRegister)
router.post("/login",userController.userLogin)
router.post("/logout",userController.userLogout)
router.post("/updateProfile", userAuthorization, userController.updateProfile)
router.get("/emailVerification",userController.emailVerificationApi)

module.exports = router