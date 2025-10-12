import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useWishlist } from "../../context/Whishlist";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

const initialTime = {
  days: 3,
  hours: 23,
  minutes: 19,
  seconds: 56,
};

const FlashSales = () => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeProductId, setActiveProductId] = useState(null);

  // ✅ Products from API
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Popup State
  const [popup, setPopup] = useState({ show: false, message: "", color: "" });

  // Fetch products from FakeStore API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        const updatedData = data.slice(0, 10).map((item, idx) => ({
          id: item.id,
          name: item.title,
          price: item.price,
          oldPrice: (item.price * 1.2).toFixed(2), // +20% as old price
          discount: Math.floor(Math.random() * 50) + 10, // random 10–50%
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

  // Timer Countdown
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

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
    setActiveProductId(null);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
    setActiveProductId(null);
  };

  const showPopup = (msg, color) => {
    setPopup({ show: true, message: msg, color });
    setTimeout(() => setPopup({ show: false, message: "", color: "" }), 3000);
  };

  if (loading) return <div className="text-center p-6">Loading products...</div>;
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
    <div className="w-full max-w-[1170px] mx-auto bg-white mt-6 mb-10 p-6 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="border-l-[10px] border-red-500 pl-4 h-[25px]">
            <p className="text-red-500 font-medium">Today’s</p>
            <h2 className="text-2xl font-bold">Flash Sales</h2>
          </div>
        </div>
        <div className="flex items-center gap-4 font-bold text-lg">
          <TimeItem label="Days" value={timeLeft.days} />
          <span>:</span>
          <TimeItem label="Hours" value={timeLeft.hours} />
          <span>:</span>
          <TimeItem label="Minutes" value={timeLeft.minutes} />
          <span>:</span>
          <TimeItem label="Seconds" value={timeLeft.seconds} />
        </div>
        <div className="flex gap-2">
          <img
            src="/Icons/Fill With Left Arrow.png"
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
          />
          <img
            src="/Icons/Right Arrow.png"
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer"
          />
        </div>
      </div>

      {/* Products */}
      <div className="flex justify-center items-center mt-6 gap-6 rounded-lg py-8">
        {VisibleProduct.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            active={activeProductId === product.id}
            onClick={() => setActiveProductId(product.id)}
            showPopup={showPopup}
          />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Link to='/shop'>
        <button className="bg-red-500 text-white px-6 py-3 rounded-md font-medium">
          View All Products
        </button>
        </Link>
      </div>

      {/* Divider */}
      <div className=" border-gray-300 border-t w-full mt-10"></div>

      {/* ✅ Popup */}
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
    <div className="flex flex-col items-center">
      <p className="text-sm">{label}</p>
      {String(value).padStart(2, "0")}
    </div>
  );
}

function ProductCard({ product, active, onClick, showPopup }) {
  const { addToWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div
      onClick={onClick}
      className={`relative w-[250px] p-4 transition duration-300 flex flex-col items-center cursor-pointer ${
        active ? "opacity-100 scale-105" : "opacity-100"
      }`}
    > 
      <Link to={`/product/${product.id}`}>
      <div className="relative bg-gray-300 w-[190px] h-[220px] flex items-center justify-center rounded-lg">
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          -{product.discount}%
        </span>
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          {/* Wishlist */}
          <img
            src="/Icons/Fill Heart.png"
            alt="Wishlist"
            className="w-6 h-6 cursor-pointer hover:scale-110 transition"
            onClick={(e) => {
              e.stopPropagation();
              addToWishlist(product);
              showPopup("Added to Wishlist ❤️", "purple");
            }}
          />
          {/* View Button */}
          <Link to={`/product/${product.id}`} onClick={(e) => e.stopPropagation()}>
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
          className="w-[140px] h-[140px] object-contain"
        />
     
      </div>
 </Link>
      {/* Add to Cart */}
      {active && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
            showPopup("Added to Cart 🛒", "green");
          }}
          className="bg-black text-white py-2 w-[190px] hover:bg-green-600 transition"
        >
          Add To Cart
        </button>
      )}

      {/* Info */}
      <h3 className="mt-4 text-sm font-medium text-center">{product.name}</h3>
      <div className="flex gap-2 mt-2">
        <span className="text-red-500 font-bold">${product.price}</span>
        <span className="line-through text-gray-500 text-sm">
          ${product.oldPrice}
        </span>
      </div>
      <div className="flex items-center gap-1 text-yellow-500 text-sm mt-2">
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
