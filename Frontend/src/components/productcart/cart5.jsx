import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Skeleton from "../skeleton/Skeleton";
import { useDispatch } from "react-redux";

import { addToCart as addToCartAction } from "../../redux/cartSlice";
import { addToWishlist as addToWishlistAction } from "../../redux/wishlistSlice";

const ExploreProduct = () => {
  const [products, setProducts] = useState([]);
  const [popup, setPopup] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Auto close popup after 3 seconds
  useEffect(() => {
    if (popup) {
      const timer = setTimeout(() => setPopup(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [popup]);

  if (loading) {
    return (
      <p className="text-center py-10">
        <Skeleton />
      </p>
    );
  }

  return (
    <div className="w-full max-w-[1170px] mx-auto bg-white mt-6 mb-10 p-6 relative">
      {/* Popup */}
      {popup && (
        <div className="fixed top-5 right-5 bg-black text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
          ✅ {popup} added to cart!
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-10 px-3">
        <div className="flex items-center gap-4">
          <div className="border-l-[10px] border-red-500 pl-4 h-[25px]">
            <p className="text-red-500 font-medium sm:font-sans">Our Product</p>
            <h2 className="text-2xl font-bold ml-[-30px]">
              Explore Our Product
            </h2>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex flex-col sm:flex-row gap-6 mt-6 rounded-lg" >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} setPopup={setPopup} />
        ))}
      </div>
      <div className="flex justify-center mt-5">
        <Link to="/shop">
          <button className="bg-red-500 text-white px-6 py-3 rounded-md font-medium hover:bg-red-300 transition">
            View All Products
          </button>
        </Link>
      </div>
    </div>
  );
};

function ProductCard({ product, setPopup }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCartAction(product));
    setPopup(product.title);
  };
  const discount = 20;
  const oldPrice = (product.price * (100 + discount)) / 100;
  const rating = Math.round(product.rating?.rate || 4);
  const reviews = product.rating?.count || 50;

  return (
    <div className="relative w-[250px] p-4 flex flex-col items-center transition-transform duration-300 group hover:shadow-lg">
      <Link to={`/product/${product.id}`}>
        <div className="relative bg-gray-300 w-[190px] h-[220px] flex items-center justify-center rounded-lg overflow-hidden">
          {/* Discount */}
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            -{discount}%
          </span>
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            <img
              src="/Icons/Fill Heart.png"
              alt="Wishlist"
              className="w-6 h-6 cursor-pointer hover:scale-110 transition"
              onClick={(e) => {
                e.preventDefault();
                dispatch(addToWishlistAction(product));
              }}
            />
            <Link to={`/product/${product.id}`}>
              <img
                src="/Icons/Fill Eye.png"
                alt="View"
                className="w-6 h-6 cursor-pointer hover:scale-110 transition"
                onClick={(e) => e.stopPropagation()}
              />
            </Link>
          </div>

          {/* Product Image */}
          <img
            src={product.image}
            alt={product.title}
            className="w-[140px] h-[140px] object-contain"
          />
          <button
            
            className="
              absolute bottom-0 left-0 w-full py-2
              bg-black text-white text-sm font-medium
              opacity-0 translate-y-full
              group-hover:opacity-100 group-hover:translate-y-0
              transition-all duration-300
            "
          >
            Add To Cart
          </button>
        </div>
      </Link>

      {/* Info */}
      <h3 className="mt-4 text-sm font-medium text-center">{product.title}</h3>
      <div className="flex gap-2 mt-2">
        <span className="text-red-500 font-bold">${product.price}</span>
        <span className="block text-left line-through text-gray-500 text-sm">
          ${oldPrice.toFixed(2)}
        </span>
      </div>

      <div className="flex items-center gap-1 text-yellow-500 text-sm mt-2">
        {Array(rating)
          .fill(0)
          .map((_, i) => (
            <FaStar key={i} />
          ))}
        <span className="text-gray-600 text-xs ml-1">({reviews})</span>
      </div>
    </div>
  );
}

export default ExploreProduct;
