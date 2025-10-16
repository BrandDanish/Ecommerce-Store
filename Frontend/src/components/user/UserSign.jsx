import { useEffect, useState } from "react";
import UserLog from "./UserLog";
import Skeleton from "../skeleton/Skeleton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserSign = () => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    general: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // ✅ Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "", general: "" }); // clear error on change
  };

  // ✅ Client-side validation function
  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", email: "", password: "", general: "" };

    if (!form.name.trim()) {
      newErrors.name = "Please enter your name.";
      valid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required.";
      valid = false;
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ name: "", email: "", password: "", general: "" });

    if (!validateForm()) return;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/signup`,
        form
      );

      if (res.data.success) {
        setShowPopup(true);
        setForm({ name: "", email: "", password: "" });

        setTimeout(() => {
          setShowPopup(false);
          navigate("/login");
        }, 1500);
      } else {
        setErrors((prev) => ({
          ...prev,
          general: res.data.message || "Signup failed. Please try again.",
        }));
      }
    } catch (err) {
      console.error("Error during signup:", err);
      const serverError =
        err.response?.data?.message ||
        "An unexpected error occurred. Please try again later.";
      setErrors((prev) => ({ ...prev, general: serverError }));
    }
  };

  if (showLogin) return <UserLog />;
  return (
    <div className="flex min-h-screen mb-20">
      {/* Left Section */}
      <div className="w-1/2 flex items-center justify-center">
        {loading ? (
          <Skeleton />
        ) : (
          <img
            src="/Icons/mobilecart.png"
            alt="Shopping"
            className="h-full w-full object-cover"
          />
        )}
      </div>

      {/* Right Section */}
      <div className="w-1/2 flex items-center justify-center">
        {loading ? (
          <Skeleton />
        ) : (
          <div className="w-96">
            <h2 className="text-2xl font-bold mb-2">Create an account</h2>
            <p className="text-black mb-6">Enter your details below</p>

            {/* General error */}
            {errors.general && (
              <div className="bg-red-500 text-white px-3 py-2 rounded mb-4 text-center">
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className={`w-full border-b py-2 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email or Phone Number"
                  className={`w-full border-b py-2 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className={`w-full border-b py-2 ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-red-500 text-white py-2 rounded font-medium mb-3 hover:bg-red-600 transition"
              >
                Create Account
              </button>
            </form>

            {/* Google Signup hidden for now */}
            <p className="text-sm text-gray-600 mt-4 text-center">
              Already have an account?{" "}
              <button
                onClick={() => setShowLogin(true)}
                className="text-black font-medium hover:underline"
              >
                Log in
              </button>
            </p>

            {/* Success Popup */}
            {showPopup && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                <div className="bg-green-500 text-white px-6 py-4 rounded shadow-lg font-semibold text-center">
                  🎉 Account created successfully!
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserSign;
