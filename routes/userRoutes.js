const express = require("express");
const {
  getAllUser,
  registerController,
  loginController,
} = require("../controllers/userController");

//router object
const router = express.Router();

//Get all users || (method = get)
router.get("/all-users", getAllUser);

//create user || Post
router.post("/register", registerController);

//login user || post
router.post("/login", loginController);

module.exports = router;
