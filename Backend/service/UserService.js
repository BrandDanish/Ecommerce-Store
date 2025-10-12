const userModel = require("../model/UserModel");
const sendEmail = require("../utils/SendEmail");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const signup = async (userData) => {
  try {
    const { name, email, password } = userData;

    // 1. Validate input
    if (!name || !email || !password) {
      return { success: false, message: "Name, email, and password are required" };
    }

    // 2. Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return { success: false, message: "User already exists" };
    }

    // 3. Hash password (saltRounds = 10)
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 4. Create and save user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword, // ✅ store hashed password
    });

    await newUser.save();

     const secretKey = process.env.JWT_SECRET || "defaultDevSecret";
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      secretKey,
      { expiresIn: "1h" }
    );

    // 6. Return success response
    return {
      success: true,
      message: "User successfully signed up",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      token,
    };
  } catch (error) {
    console.error("Signup error:", error);
    return { success: false, message: "Error during signup", error };
  }
};
const Login = async (userData) => {
  try {
    const { email, password } = userData;

    // Make sure both fields exist
    if (!email || !password) {
      return { success: false, message: "Email and password are required" };
    }

    // Find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return { success: false, message: "Invalid email or password" };
    }

    // Debugging check (REMOVE in production)
    console.log("Plain password:", password);
    console.log("Hashed password from DB:", user.password);

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, message: "Invalid email or password" };
    }

    // Generate JWT
    const secretKey = process.env.JWT_SECRET || "defaultDevSecret";
   
    const token = jwt.sign(
      { id: user._id, email: user.email },
         secretKey,
      { expiresIn: "1h" }
    );

    return {
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        name: user.name, // include only safe fields
      },
      token,
    };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "Error during login", error };
  }
};
const logout = async () => {
  try {
    return { success: true, message: "Logout successful" };
  } catch (error) {
    return { success: false, message: "Error during logout", error };
  }
};

const forgetPassword = async (email) => {
  try {
    const user = await userModel.findOne({ email });
    if (!user) {      
      return { success: false, message: "User with this email does not exist" };
    }
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 15 * 60 * 1000; 
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    // Here, you would typically send the resetToken to the user's email.
    const resetLink = `http://yourfrontend.com/reset-password?token=${resetToken}&email=${email}`;
    const message = `Click the following link to reset your password: ${resetLink}. This link is valid for 15 minutes.`;
    await sendEmail( { to:user.email, subject:"Password Reset", text: message});
    return { success: true, message: "Password reset link sent to email" };
  } catch (error) {
    console.error("Forget Password error:", error);
    return { success: false, message: "Error during password reset", error };
  }
}
const resetPassword = async (token, newPassword) => {
  try {
    const user = await userModel.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } });
    if (!user) {
      return { success: false, message: "Invalid or expired reset token" };
    } 
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();
    return { success: true, message: "Password successfully reset" };
  } catch (error) {
    console.error("Reset Password error:", error);
    return { success: false, message: "Error during password reset", error };
  } 
}
const getUserProfile = async (token) => {
  try {
     if (!token) {
      return { success: false, message: "No token provided" };
    } 
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select("-password");
    if (!user) {
      return { success: false, message: "User not found" };
    }
    return { success: true, user };
  } catch (error) {
    console.error("Get User Profile error:", error);
    return { success: false, message: "Error fetching user profile", error };
  }
}
const updateUserProfile = async (userId, userData) => {
  try {
    const {
      name,
      email,
      address,
      currentPassword,
      newPassword,
      confirmNewPassword,
    } = userData;

    // 🔹 Find the user first
    const user = await userModel.findById(userId);
    if (!user) {
      return { success: false, message: "User not found" };
    }

    // 🔹 If password change fields are provided
    if (currentPassword || newPassword || confirmNewPassword) {
      if (!currentPassword || !newPassword || !confirmNewPassword) {
        return {
          success: false,
          message: "All password fields are required",
        };
      }

      // ✅ Check current password
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return {
          success: false,
          message: "Current password is incorrect",
        };
      }

      // ✅ Check new passwords match
      if (newPassword !== confirmNewPassword) {
        return {
          success: false,
          message: "New passwords do not match",
        };
      }

      // ✅ Hash and update password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    }

    // 🔹 Update other fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (address) user.address = address;

    await user.save();

    console.log("Updated User:", userId);

    return {
      success: true,
      user,
      message: "Profile updated successfully",
    };
  } catch (error) {
    console.error("Update User Profile Service Error:", error);
    return {
      success: false,
      message: "Error updating user profile",
    };
  }
};
module.exports = {
  Login,
  signup,
  logout,
  forgetPassword,
  resetPassword,
  getUserProfile,
  updateUserProfile,
}