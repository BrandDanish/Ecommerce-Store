const express=require('express')
const {
  signupController,
  LoginController,
  LogoutController,
  ResetPasswordController,
  ForgetPasswordController,
  getUserProfileController,
  updateUserProfileController,
} = require("../controller/userController");
const router=express.Router()
router.post("/signup", signupController);
router.post('/login',LoginController);
router.post('/logout', LogoutController);
router.post('/forget-password',ForgetPasswordController);
router.post('/reset-password',ResetPasswordController);
router.get("/profile", getUserProfileController);
router.put("/updateprofile", updateUserProfileController);
module.exports=router