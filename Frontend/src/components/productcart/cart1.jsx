import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Skeleton from "../skeleton/Skeleton";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { addToWishlist } from "../../redux/wishlistSlice";

const initialTime = {
  days: 3,
  hours: 23,
  minutes: 19,
  seconds: 56,
};

const FlashSales = () => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popup, setPopup] = useState({ show: false, message: "", color: "" });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        const updatedData = data.slice(0, 10).map((item) => ({
          id: item.id,
          name: item.title,
          price: item.price,
          oldPrice: (item.price * 1.2).toFixed(2),
          discount: Math.floor(Math.random() * 50) + 10,
          rating: Math.round(item.rating?.rate || 4),
          reviews: item.rating?.count || 50,
          image: item.image,
        }));
        setProducts(updatedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % products.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));

  const showPopup = (msg, color) => {
    setPopup({ show: true, message: msg, color });
    setTimeout(() => setPopup({ show: false, message: "", color: "" }), 3000);
  };

  if (loading) return <div className="text-center p-6"><Skeleton /></div>;
  if (error) return <div className="text-center text-red-500 p-6">{error}</div>;
  if (products.length === 0) return <div>No products available</div>;

  const total = products.length;
  const VisibleProduct = [
    products[currentIndex],
    products[(currentIndex + 1) % total],
    products[(currentIndex + 2) % total],
    products[(currentIndex + 3) % total],
  ];

  return (
    <div className="w-full max-w-[1200px] mx-auto bg-white mt-6 mb-10 p-4 sm:p-6 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 mb-6">
        {/* Title Section */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="border-l-[6px] border-red-500 pl-3 sm:pl-4">
            <p className="text-red-500 font-medium text-sm sm:text-base">Today’s</p>
            <h2 className="text-xl sm:text-2xl font-bold">Flash Sales</h2>
          </div>
        </div>

        {/* Countdown */}
        <div className="flex items-center gap-3 sm:gap-4 font-bold text-base sm:text-lg">
          <TimeItem label="Days" value={timeLeft.days} />
          <span>:</span>
          <TimeItem label="Hours" value={timeLeft.hours} />
          <span>:</span>
          <TimeItem label="Minutes" value={timeLeft.minutes} />
          <span>:</span>
          <TimeItem label="Seconds" value={timeLeft.seconds} />
        </div>

        {/* Arrows */}
        <div className="flex gap-2">
          <img
            src="/Icons/Fill With Left Arrow.png"
            onClick={prevSlide}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition"
          />
          <img
            src="/Icons/Right Arrow.png"
            onClick={nextSlide}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition"
          />
        </div>
      </div>

      {/* Products */}
      <div
        className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-6 justify-items-center"
      >
        {VisibleProduct.map((product) => (
          <ProductCard key={product.id} product={product} showPopup={showPopup} />
        ))}
      </div>

      {/* View All Button */}
      <div className="flex justify-center mt-8">
        <Link to="/shop">
          <button className="bg-red-500 text-white px-6 py-3 rounded-md font-medium hover:bg-red-600 transition">
            View All Products
          </button>
        </Link>
      </div>

      <div className="border-gray-300 border-t w-full mt-10"></div>

      {/* Popup Notification */}
      {popup.show && (
        <div
          className={`fixed top-6 right-6 px-6 py-3 rounded-lg shadow-lg text-white font-medium transition transform`}
          style={{ backgroundColor: popup.color }}
        >
          {popup.message}
        </div>
      )}
    </div>
  );
};

function TimeItem({ label, value }) {
  return (
    <div className="flex flex-col items-center text-center">
      <p className="text-xs sm:text-sm">{label}</p>
      <span className="text-base sm:text-lg font-semibold">
        {String(value).padStart(2, "0")}
      </span>
    </div>
  );
}

function ProductCard({ product, showPopup }) {
  const dispatch = useDispatch();

  return (
    <div className="relative group w-full max-w-[250px] p-3 sm:p-4 transition duration-300 flex flex-col items-center border rounded-lg hover:shadow-lg">
      <Link to={`/product/${product.id}`}>
        <div className="relative bg-gray-100 w-full h-[200px] sm:h-[220px] flex items-center justify-center rounded-lg overflow-hidden">
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            -{product.discount}%
          </span>

          <div className="absolute top-2 right-2 flex flex-col gap-2">
            <img
              src="/Icons/Fill Heart.png"
              alt="Wishlist"
              className="w-6 h-6 cursor-pointer hover:scale-110 transition"
              onClick={(e) => {
                e.preventDefault();
                dispatch(addToWishlist(product));
                showPopup("Added to Wishlist ❤️", "purple");
              }}
            />
            <Link to={`/product/${product.id}`}>
              <img
                src="/Icons/Fill Eye.png"
                alt="View"
                className="w-6 h-6 cursor-pointer hover:scale-110 transition"
              />
            </Link>
          </div>

          <img
            src={product.image}
            alt="Product"
            className="w-[120px] sm:w-[140px] h-[120px] sm:h-[140px] object-contain transition-transform duration-300 group-hover:scale-110"
          />

          <button
            onClick={(e) => {
              e.preventDefault();
              dispatch(addToCart(product));
              showPopup("Added to Cart 🛒", "green");
            }}
            className="absolute bottom-0 left-0 w-full bg-black text-white py-2 opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 transition-all duration-300"
          >
            Add To Cart
          </button>
        </div>
      </Link>

      {/* Info */}
      <h3 className="mt-3 sm:mt-4 text-sm font-medium text-center line-clamp-2">
        {product.name}
      </h3>
      <div className="flex gap-2 mt-2 text-center justify-center">
        <span className="text-red-500 font-bold">${product.price}</span>
        <span className="line-through text-gray-500 text-sm">${product.oldPrice}</span>
      </div>
      <div className="flex items-center justify-center gap-1 text-yellow-500 text-sm mt-1">
        {Array(product.rating)
          .fill(0)
          .map((_, i) => (
            <FaStar key={i} />
          ))}
        <span className="text-gray-600 text-xs ml-1">({product.reviews})</span>
      </div>
    </div>
  );
}

export default FlashSales;
