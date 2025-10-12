const { signup, Login,logout, forgetPassword,resetPassword ,getUserProfile,updateUserProfile} = require("../service/UserService");

const signupController = async (req, res) => {
  try {
    const result = await signup(req.body);
    if (!result.success) {
      return res.status(400).json(result);
    }
    return res.status(201).json(result); // 201 = Created
  } catch (error) {
    console.error("Signup Controller Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const LoginController = async (req, res) => {
  try {
    const result = await Login(req.body);
    if (!result.success) {
      return res.status(400).json(result);
    }
    return res.status(200).json(result); // ✅ 200 = OK
  } catch (error) {
    console.error("Login Controller Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
const LogoutController=async (req,res) => {
   try {
      const result=await logout();
      if(!result.success)
       return res.status(400).json(result)
      else
       return res.status(200).json(result)
   }catch(error){

   }
}
const ResetPasswordController=async (req,res) => {
   try {
      const {token,email,newPassword}=req.body;
      const result=await resetPassword(token,email,newPassword);
      if(!result.success)
       return res.status(400).json(result)
      else
       return res.status(200).json(result)
    }catch(error){
      console.error("Reset Password Controller Error:", error);
      return res.status(500).json({ success: false, message: "Server error" });
   }  
}
const ForgetPasswordController=async (req,res) => {
   try {
      const {email}=req.body;
      const result=await forgetPassword(email);   
      if(!result.success)
       return res.status(400).json(result)
      else
       return res.status(200).json(result)
    }catch(error){
      console.error("Forget Password Controller Error:", error);
      return res.status(500).json({ success: false, message: "Server error" });
   }
  }
const getUserProfileController=async (req,res) => {
    try {
      const token=req.headers.authorization?.split(" ")[1];
      const result=await getUserProfile(token);   
      if(!result.success)
       return res.status(400).json(result)    
      else
       return res.status(200).json(result)
    }catch(error){
      console.error("Get User Profile Controller Error:", error);
      return res.status(500).json({ success: false, message: "Server error" });
   }
}
const updateUserProfileController = async (req, res) => {
  try {
    const {
      id,
      name,
      email,
      address,
      currentPassword,
      newPassword,
      confirmNewPassword,
    } = req.body;
    const result = await updateUserProfile(id, {
      name,
      email,
      address,
      currentPassword,
      newPassword,
      confirmNewPassword,
    });
    if (!result.success) {
      return res.status(400).json(result);
    } else {
      return res.status(200).json(result);
    }
  } catch (error) {
    console.error("Update User Profile Controller Error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
module.exports = {
  signupController,
  LoginController,
  LogoutController,
  ResetPasswordController,
  ForgetPasswordController,
  getUserProfileController,
  updateUserProfileController,
};
