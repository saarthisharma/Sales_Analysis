const express = require("express");
const router = express.Router();

// requiring middleware
const {adminAuthorization} = require("../middleware/adminAuthorization")

// requiring admin controller
const adminController = require("../controllers/adminController")

router.get("/listOrders",adminAuthorization,adminController.adminGettingData)
router.post("/userActivation",adminAuthorization,adminController.adminManageUsers)
router.get("/listUsers",adminAuthorization,adminController.adminListUsers)

module.exports = router