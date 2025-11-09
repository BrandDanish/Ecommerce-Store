import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const wishlist = useSelector(
    (state) => state.wishlist?.items ?? state.wishlist ?? []
  );
  const cart = useSelector((state) => state.cart?.items ?? state.cart ?? []);

  useEffect(() => {
    const loginStatus = localStorage.getItem("IsLoggedIn");
    setIsLoggedIn(loginStatus === "true");
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/logout`);
      console.log(res.data.message);
      localStorage.removeItem("token");
      localStorage.removeItem("IsLoggedIn");
      window.dispatchEvent(new Event("storage"));
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  return (
    <header className="container bg-white shadow-sm top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-gray-900 tracking-wide"
        >
          Exclusive
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 text-[16px] font-medium">
          {["/", "/contact", "/about", "/signup"].map((path, index) => {
            const labels = ["Home", "Contact", "About", "SignUp"];
            return (
              <Link
                key={path}
                to={path}
                className={`hover:text-gray-900 ${
                  location.pathname === path
                    ? "text-black underline"
                    : "text-gray-600"
                }`}
              >
                {labels[index]}
              </Link>
            );
          })}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Search Bar (hidden on small screens) */}
          <form className="hidden md:flex items-center bg-gray-100 px-3 py-2 rounded-lg text-gray-500 w-[250px]">
            <input
              className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500"
              type="text"
              placeholder="What are you looking for?"
            />
            <img src="/Icons/search.png" alt="Search Icon" className="w-5 h-5 ml-2" />
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

          {/* User Profile */}
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
                      onClick={handleLogout}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Icon */}
          <button
            className="md:hidden text-gray-800"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className={`md:hidden fixed right-0 h-full w-64 bg-white border-t shadow-lg transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
      }`}>          
      <nav className="flex flex-col items-center py-4 space-y-4 text-gray-700 font-medium">
            {["/", "/contact", "/about", "/signup"].map((path, index) => {
              const labels = ["Home", "Contact", "About", "SignUp"];
              return (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className={`${
                    location.pathname === path
                      ? "text-black underline"
                      : "text-gray-600"
                  }`}
                >
                  {labels[index]}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
