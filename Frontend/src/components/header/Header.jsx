import { useEffect, useState } from "react";
import { Link, Meta, useLocation } from "react-router-dom";
import { useWishlist } from "../../context/Whishlist";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation(); // ✅ you imported but didn’t define
  const { wishlist } = useWishlist();
  const { cart } = useCart();
  const navigate=useNavigate()
  useEffect(() => {
    const loginStatus = localStorage.getItem("IsLoggedIn");
    if (loginStatus === "true") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []); 
const handleLogout = async () => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/logout`);
    console.log(res.data.message);
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    window.dispatchEvent(new Event("storage"));
    navigate("login");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
  return (
    <header className="bg-white top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-900 pl-[75px]">
          Exclusive
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex space-x-8 text-[16px] font-medium">
          <Link
            to="/"
            className={`hover:text-gray-900 ${
              location.pathname === "/" ? "text-black underline" : "text-gray-600"
            }`}
          >
            Home
          </Link>
          <Link
            to="/contact"
            className={`hover:text-gray-900 ${
              location.pathname === "/contact" ? "text-black underline" : "text-gray-600"
            }`}
          >
            Contact
          </Link>
          <Link
            to="/about"
            className={`hover:text-gray-900 ${
              location.pathname === "/about" ? "text-black underline" : "text-gray-600"
            }`}
          >
            About
          </Link>
          <Link
            to="/signup"
            className={`hover:text-gray-900 ${
              location.pathname === "/signup" ? "text-black underline" : "text-gray-600"
            }`}
          >
            SignUp
          </Link>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {/* Search */}
          <form>
            <div className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-lg text-gray-500">
              <input
                className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500"
                type="text"
                placeholder="What are you looking for?"
              />
              <img src="/Icons/search.png" alt="Search Icon" className="w-5 h-5 ml-2" />
            </div>
          </form>

          {/* Wishlist */}
          <Link to="/whishlist" className="relative">
            <img src="/Icons/Wishlist.png" alt="Wishlist Icon" className="w-7 h-7" />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <img src="/Icons/Cartbuy.png" alt="Cart Icon" className="w-7 h-7" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
                {cart.length}
              </span>
            )}
          </Link>
          {isLoggedIn && (
            <div className="relative">
              <img
                src="/Icons/user.png"
                alt="User Profile"
                className="w-8 h-8 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              />
              {isOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg z-50">
                  <ul className="py-2 text-sm text-gray-700">
                    <Link to="/profile">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Profile
                    </li>
                    </Link>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Settings
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        localStorage.removeItem("IsLoggedIn");
                        setIsLoggedIn(false);
                        setIsOpen(false);
                        {handleLogout}
                        navigate("/login")
                      }}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
export default Header;
