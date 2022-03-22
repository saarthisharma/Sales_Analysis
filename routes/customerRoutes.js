const express = require("express");
const router = express.Router();

// requiring middleware
const{customerAuthorization} = require("../middleware/customerAuthorization")

// requiring customer controller
const customerController = require("../controllers/customerController")

router.post("/registration/customer",customerController.CustomerRegisteration)
router.post("/login/customer",customerController.CustomerLogin)
router.post("/logout/customer",customerController.CustomerLogout)
router.post("/profile-update/customer",customerAuthorization,customerController.CustomerUpdateProfile)
router.get("/customer/emailVerification",customerController.emailVerificationApi)

module.exports = router