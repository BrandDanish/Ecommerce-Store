import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TopHeader from "../header/TopHeader";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const UserLog = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errorMsg, setErrorMsg] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showForgotBox, setShowForgotBox] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Login Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!form.email || !form.password) {
      setErrorMsg("Please fill in all required fields!");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/login`,
        form
      );

      // ✅ Check if login was successful
      if (res.data.success) {
        // ✅ Save login state and user info
        localStorage.setItem("IsLoggedIn", "true");
        if (res.data.token) localStorage.setItem("token", res.data.token);
        if (res.data.user)
          localStorage.setItem("user", JSON.stringify(res.data.user)); // ✅ Save full user object

        // Trigger any component listening to login state
        window.dispatchEvent(new Event("storage"));

        // ✅ Show success popup
        setShowPopup(true);

        // ✅ Redirect after short delay
        setTimeout(() => {
          setShowPopup(false);
          navigate("/");
        }, 1000);

        // Clear form
        setForm({ email: "", password: "" });
      } else {
        setErrorMsg(res.data.message || "Login failed.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Invalid credentials or server error.");
    }
  };

  // Forgot Password Submit
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/forgot-password`,
        { email: forgotEmail }
      );
      if (res.data.success) {
        alert("Password reset link sent to your email!");
        setShowForgotBox(false);
        setForgotEmail("");
      } else {
        alert(res.data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      alert("Server error. Try again later.");
    }
  };

  return (
    <>
      <section className="flex flex-col lg:flex-row items-center justify-center min-h-[80vh] mt-20 mb-20">
        {/* Left Image Section */}
        <div className="w-1/2 flex items-center justify-center">
          <img
            src="/Icons/mobilecart.png"
            alt="Shopping"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Login Section */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold mb-2">Log in to Exclusive</h2>
            <p className="text-gray-600 mb-6">Enter your details below</p>

            {errorMsg && (
              <div className="bg-red-500 text-white text-center py-2 rounded mb-4">
                {errorMsg}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email or Phone Number"
                className="w-full border-b border-gray-300 py-3 mb-4 outline-none"
              />
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full border-b border-gray-300 py-3 mb-4 outline-none"
              />

              <div className="flex justify-between items-center mt-2">
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded transition"
                >
                  Log in
                </button>
                <p
                  className="text-red-500 cursor-pointer hover:underline"
                  onClick={() => setShowForgotBox(true)}
                >
                  Forgot Password?
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ✅ Popup for Success */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-green-500 text-white px-5 py-3 rounded shadow-lg text-center animate-fadeIn">
            Login successful!
          </div>
        </div>
      )}

      {/* ✅ Forgot Password Modal */}
      {showForgotBox && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-[90%] max-w-sm relative">
            <button
              className="absolute top-3 right-4 text-gray-500 hover:text-black"
              onClick={() => setShowForgotBox(false)}
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-3 text-center">
              Reset Password
            </h2>
            <form onSubmit={handleForgotSubmit}>
              <input
                type="email"
                placeholder="Enter your email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
                className="border border-gray-300 p-2 rounded w-full mb-4 outline-none"
              />
              <button
                type="submit"
                className="bg-red-500 hover:bg-red-600 text-white w-full py-2 rounded transition"
              >
                Send Reset Link
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UserLog;
