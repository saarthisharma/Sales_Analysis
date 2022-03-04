const express = require("express");
const router = express.Router();

// requiring middleware
const {userAuthorization} = require("../middleware/UserAuthorization")
const {adminAuthorization} = require("../middleware/adminAuthorization")

// requiring user registration controller
const userController = require("../controllers/userRegister")

// requiring sales crud controller
const salesCrudController = require("../controllers/salesCrud")

// routes for crud
router.post("/addsalesData",userAuthorization,salesCrudController.addOrders)
router.put("/updateOrder/:id",userAuthorization,salesCrudController.updateOrders)
router.put("/deleteOrder/:id",userAuthorization,salesCrudController.softDelete)
router.get("/listOrder",userAuthorization,salesCrudController.listOrders)
router.get("/admin",adminAuthorization,salesCrudController.adminGettingData)
router.post("/userActivation",adminAuthorization,salesCrudController.adminManageUsers)
router.get("/listUsers",adminAuthorization,salesCrudController.adminListUsers)

// routes for registration
router.post("/registration",userController.userRegister)
router.post("/login",userController.userLogin)
router.post("/logout",userController.userLogout)
router.post("/updateProfile", userAuthorization, userController.updateProfile)
router.get("/emailVerification",userController.emailVerificationApi)

module.exports = router