import React, { useState, useEffect } from "react";
import TopHeader from "../header/TopHeader";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useCart } from "../../context/CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("🧑 User Loaded:", parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing stored user:", error);
      }
    }
  }, []);

  // ✅ Billing form state
  const [billing, setBilling] = useState({
    firstName: "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    city: "",
    phone: "",
    email: "",
    paymentMethod: "Cash on Delivery",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Calculate subtotal
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  // ✅ Handle input
  const handleChange = (e) => {
    setBilling({ ...billing, [e.target.name]: e.target.value });
  };

  // ✅ Validate Billing Details
  const validateBilling = () => {
    if (
      !billing.firstName ||
      !billing.streetAddress ||
      !billing.city ||
      !billing.phone ||
      !billing.email
    ) {
      setMessage("⚠️ Please fill in all required billing details!");
      return false;
    }
    return true;
  };

  // ✅ Handle order placement
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      setMessage("🛒 Your cart is empty!");
      return;
    }

    // 🔹 Check Billing
    if (!validateBilling()) return;

    // 🔹 Check if user is logged in
    if (!user?.id) {
      setMessage("⚠️ Please log in before placing an order.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const orderData = {
        userId: user.id, // ✅ dynamic userId
        items: cart.map((item) => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.qty,
          image: item.image,
          subtotal: item.price * item.qty,
        })),
        shippingAddress: {
          fullName: billing.firstName,
          phone: billing.phone,
          address: billing.streetAddress,
          city: billing.city,
          country: "Pakistan",
        },
        totalAmount: subtotal,
        paymentMethod: billing.paymentMethod,
      };

      console.log("🛍 Sending Order Data:", orderData);

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/order/placeorder`,
        orderData
      );

      if (res.data.success) {
        setMessage("Order placed successfully!");
        clearCart();
        setTimeout(() => navigate("/"), 2000);
      } else {
        setMessage("Failed to place order. Try again.");
      }
    } catch (error) {
      console.error("Place order error:", error);
      setMessage("⚠️ Error placing order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (user === null) {
    return (
      <div className="text-center py-10 text-gray-700">
        Loading user information...
      </div>
    );
  }

  return (
    <>
      <TopHeader />
      <Header />

      <div className="flex justify-center items-start gap-10 px-10 py-10">
        {/* Left Side - Billing Details */}
        <div className="w-1/2">
          <h2 className="text-xl font-semibold mb-6">Billing Details</h2>
          <form className="flex flex-col gap-5" onSubmit={handlePlaceOrder}>
            <div className="flex flex-col w-[470px]">
              <label className="mb-1 text-gray-700">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={billing.firstName}
                onChange={handleChange}
                className="bg-gray-100 p-3"
                required
              />
            </div>

            <div className="flex flex-col w-[470px]">
              <label className="mb-1 text-gray-700">Company Name</label>
              <input
                type="text"
                name="companyName"
                value={billing.companyName}
                onChange={handleChange}
                className="bg-gray-100 p-3 w-full"
              />
            </div>

            <div className="flex flex-col w-[470px]">
              <label className="mb-1 text-gray-700">
                Street Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="streetAddress"
                value={billing.streetAddress}
                onChange={handleChange}
                className="bg-gray-100 p-3 w-full"
                required
              />
            </div>

            <div className="flex flex-col w-[470px]">
              <label className="mb-1 text-gray-700">
                Apartment, floor, etc. (optional)
              </label>
              <input
                type="text"
                name="apartment"
                value={billing.apartment}
                onChange={handleChange}
                className="bg-gray-100 p-3 w-full"
              />
            </div>

            <div className="flex flex-col w-[470px]">
              <label className="mb-1 text-gray-700">
                Town/City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={billing.city}
                onChange={handleChange}
                className="bg-gray-100 p-3 w-full"
                required
              />
            </div>

            <div className="flex flex-col w-[470px]">
              <label className="mb-1 text-gray-700">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="phone"
                value={billing.phone}
                onChange={handleChange}
                className="bg-gray-100 p-3 w-full"
                required
              />
            </div>

            <div className="flex flex-col w-[470px]">
              <label className="mb-1 text-gray-700">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={billing.email}
                onChange={handleChange}
                className="bg-gray-100 p-3 w-full"
                required
              />
            </div>
          </form>
        </div>

        {/* Right Side - Order Summary */}
        <div className="w-1/3 border p-6 rounded-md mt-[200px]">
          {cart.length === 0 ? (
            <p className="text-gray-500">No products in cart.</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-contain"
                  />
                  <span>
                    {item.name} × {item.qty}
                  </span>
                </div>
                <span>${item.price * item.qty}</span>
              </div>
            ))
          )}

          <div className="flex justify-between text-gray-600 mb-2">
            <span>Subtotal:</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between text-gray-600 mb-2">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-semibold text-lg mb-4">
            <span>Total:</span>
            <span>${subtotal}</span>
          </div>

          <div className="mb-4 space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="Cash on Delivery"
                checked={billing.paymentMethod === "Cash on Delivery"}
                onChange={handleChange}
              />
              <span>Cash on Delivery</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value="Bank"
                checked={billing.paymentMethod === "Bank"}
                onChange={handleChange}
              />
              <span>Bank Transfer</span>
            </label>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="bg-red-500 text-white w-full py-3 mt-2 rounded-md"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>

          {message && (
            <p className="text-center mt-4 text-gray-700 font-semibold">
              {message}
            </p>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Checkout;
