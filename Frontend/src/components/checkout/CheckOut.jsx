import React, { useState, useEffect } from "react";
import TopHeader from "../header/TopHeader";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import { clearCart as clearCartAction } from "../../redux/cartSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const cart = useSelector((state) => state.cart?.items || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
      }
    }
  }, []);

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

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleChange = (e) => {
    setBilling({ ...billing, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateBilling = () => {
    const newErrors = {};
    if (!billing.firstName.trim()) newErrors.firstName = "First name is required.";
    if (!billing.streetAddress.trim()) newErrors.streetAddress = "Street address is required.";
    if (!billing.city.trim()) newErrors.city = "City is required.";
    if (!billing.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!billing.email.trim()) newErrors.email = "Email address is required.";
    else if (!/\S+@\S+\.\S+/.test(billing.email)) newErrors.email = "Enter a valid email.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cart.length === 0) return setMessage("🛒 Your cart is empty!");
    if (!validateBilling()) return setMessage("⚠️ Please fix the highlighted errors.");
    if (!user?.id) return setMessage("⚠️ Please log in before placing an order.");

    setLoading(true);
    setMessage("");

    try {
      const orderData = {
        userId: user.id,
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

      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/order/placeorder`,
        orderData
      );

      if (res.data.success) {
        setMessage("✅ Order placed successfully!");
        dispatch(clearCartAction());
        setTimeout(() => navigate("/"), 2000);
      } else {
        setMessage("❌ Failed to place order. Try again.");
      }
    } catch (error) {
      console.error("Place order error:", error);
      setMessage("⚠️ Error placing order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (user === null)
    return <div className="text-center py-10 text-gray-700">Loading user information...</div>;

  return (
    <>
      <TopHeader />
      <Header />

      <div className="flex flex-col lg:flex-row justify-center items-start gap-10 px-4 md:px-10 py-10">
        {/* Left Side - Billing Details */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-xl font-semibold mb-6">Billing Details</h2>
          <form className="flex flex-col gap-5" onSubmit={handlePlaceOrder}>
            {[
              { label: "First Name", name: "firstName", required: true },
              { label: "Company Name", name: "companyName" },
              { label: "Street Address", name: "streetAddress", required: true },
              { label: "Apartment, floor, etc. (optional)", name: "apartment" },
              { label: "Town/City", name: "city", required: true },
              { label: "Phone Number", name: "phone", required: true },
              { label: "Email Address", name: "email", required: true, type: "email" },
            ].map(({ label, name, required, type = "text" }) => (
              <div key={name} className="flex flex-col w-full max-w-md">
                <label className="mb-1 text-gray-700">
                  {label} {required && <span className="text-red-500">*</span>}
                </label>
                <input
                  type={type}
                  name={name}
                  value={billing[name]}
                  onChange={handleChange}
                  className={`bg-gray-100 p-3 border rounded-md ${
                    errors[name] ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors[name] && (
                  <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
                )}
              </div>
            ))}
          </form>
        </div>

        {/* Right Side - Order Summary */}
        <div className="w-full lg:w-1/3 border p-6 rounded-md mt-10 lg:mt-[200px]">
          {cart.length === 0 ? (
            <p className="text-gray-500">No products in cart.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-4">
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
            {["Cash on Delivery", "Bank"].map((method) => (
              <label key={method} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  checked={billing.paymentMethod === method}
                  onChange={handleChange}
                />
                <span>{method}</span>
              </label>
            ))}
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="bg-red-500 text-white w-full py-3 mt-2 rounded-md hover:bg-red-600 transition"
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
