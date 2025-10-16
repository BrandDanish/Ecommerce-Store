import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import TopHeader from "../header/TopHeader";
import Footer from "../footer/Footer";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // 🔹 Handle input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMsg(""); // clear error when user types
  };

  // 🔹 Frontend validation
  const validateForm = () => {
    if (!form.name || !form.email || !form.address) {
      return "Please fill all required fields (name, email, address).";
    }

    if (
      form.newPassword ||
      form.confirmNewPassword ||
      form.currentPassword
    ) {
      if (!form.currentPassword)
        return "Please enter your current password to change the password.";

      if (form.newPassword.length < 6)
        return "New password must be at least 6 characters long.";

      if (form.newPassword !== form.confirmNewPassword)
        return "New passwords do not match.";
    }

    return null;
  };

  // 🔹 Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const validationError = validateForm();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    setLoading(true);

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/user/updateprofile`,
        {
          id: user?._id,
          name: form.name,
          email: form.email,
          address: form.address,
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
          confirmNewPassword: form.confirmNewPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data.success) {
        alert("✅ Profile updated successfully!");
        setUser(res.data.user);
        setForm({
          ...form,
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
      } else {
        setErrorMsg(res.data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error("Update error:", err);
      if (err.response) {
        // Backend returned an error
        setErrorMsg(
          err.response.data.message ||
            "Error updating profile. Please check your inputs."
        );
      } else if (err.request) {
        // No response from server
        setErrorMsg("Server not responding. Please try again later.");
      } else {
        setErrorMsg("Unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch user profile
  useEffect(() => {
    if (!token) return;

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
        setErrorMsg("Failed to load profile data.");
      });
  }, [token]);

  // 🔹 Populate form when user data arrives
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        address: user.address || "",
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    }
  }, [user]);

  if (!token) {
    return <div className="text-center mt-10">Please log in to view your profile.</div>;
  }

  return (
    <>
      <TopHeader />
      <Header />

      <div className="flex flex-col items-center bg-gray-100 py-12 min-h-screen">
        <div className="w-[90%] max-w-6xl flex justify-between items-center mb-10">
          <h1 className="text-2xl font-semibold text-gray-800">Manage Account</h1>
          <h2 className="text-lg font-medium text-red-500">
            Welcome, {user ? user.name : "Loading..."} 👋
          </h2>
        </div>

        <div className="flex w-[90%] max-w-6xl shadow-xl rounded-2xl overflow-hidden border border-gray-200 bg-white">
          {/* Sidebar */}
          <div className="w-1/4 bg-white p-6 border-r border-gray-200">
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Manage My Account</h2>
            <ul className="space-y-2 mb-6">
              <li className="text-red-500 font-medium cursor-pointer">My Profile</li>
              <li className="cursor-pointer hover:text-red-500">Address Book</li>
              <li className="cursor-pointer hover:text-red-500">Payment Options</li>
            </ul>

            <h2 className="text-lg font-semibold mb-4 text-gray-700">My Orders</h2>
            <ul className="space-y-2 mb-6">
              <li className="cursor-pointer hover:text-red-500">My Returns</li>
              <li className="cursor-pointer hover:text-red-500">My Cancellations</li>
            </ul>

            <h2 className="text-lg font-semibold mb-4 text-gray-700">My Wishlist</h2>
          </div>

          {/* Main Form */}
          <div className="flex-1 p-10 bg-white">
            <h2 className="text-xl font-semibold text-red-500 mb-8">Edit Your Profile</h2>

            {errorMsg && (
              <div className="mb-6 p-3 bg-red-100 text-red-600 border border-red-300 rounded">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-600 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    className="w-full border p-3 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-300"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full border p-3 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Enter Address"
                  className="w-full border p-3 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-300"
                />
              </div>

              <div>
                <h3 className="text-md font-semibold text-gray-700 mb-2">
                  Password Changes
                </h3>
                <div className="space-y-4">
                  <input
                    type="password"
                    name="currentPassword"
                    value={form.currentPassword}
                    onChange={handleChange}
                    placeholder="Current Password"
                    className="w-full border p-3 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-300"
                  />
                  <input
                    type="password"
                    name="newPassword"
                    value={form.newPassword}
                    onChange={handleChange}
                    placeholder="New Password"
                    className="w-full border p-3 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-300"
                  />
                  <input
                    type="password"
                    name="confirmNewPassword"
                    value={form.confirmNewPassword}
                    onChange={handleChange}
                    placeholder="Confirm New Password"
                    className="w-full border p-3 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-300"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`${
                    loading ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"
                  } text-white px-6 py-2 rounded transition`}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
