import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
const Whishlist1 = () => {
  const [currentIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");

  // Product From Api
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   const total=products.length
  const VisibleProduct=[
    products[currentIndex],
    products[(currentIndex+1)%total],
    products[(currentIndex+2)%total],
    products[(currentIndex+3)%total],
  ]

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error("Failed to fetch Product");
        const data = await res.json();

        // ✅ Map FakeStore API fields to your UI fields
        const updatedData = data.slice(0, 4).map((item) => ({
          id: item.id,
          name: item.title,
          price: item.price,
          oldPrice: item.price + 20, // fake old price
          discount: 20, // fake discount
          image: item.image,
          rating: Math.round(item.rating.rate),
          reviews: item.rating.count,
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

  const triggerPopup = (message) => {
    setPopupMsg(message);
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, 1500); // popup hides after 1.5 sec
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* ✅ Toast Notification */}
      {showPopup && (
        <div className="absolute top-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow-lg">
          {popupMsg}
        </div>
      )}

      <main className="flex-grow">
        <div className="w-full max-w-[1170px] mx-auto bg-white mt-6 mb-10 p-6">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="border-l-[10px] pl-4 h-[25px] border-red-500">
                <p className="text-black font-medium">Just For You</p>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <Link to="/shop">
                <button className="bg-white text-black px-6 py-3 border font-medium">
                  See All
                </button>
              </Link>
            </div>
          </div>

          {loading && <p className="text-center">Loading products...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}

          <div className="flex justify-center items-center mt-6 gap-6 rounded-lg py-8 flex-wrap">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                triggerPopup={triggerPopup}
                active={index === currentIndex}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

function ProductCard({product }) {
  return (
    <div className="relative w-[250px] p-4 flex flex-col items-center transition-transform duration-300 group hover:shadow-lg">
       <Link to={`/product/${product.id}`}>
      <div className="relative bg-gray-100 w-[190px] h-[220px] flex items-center justify-center rounded-lg shadow">
        {/* Discount Badge */}
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          -{product.discount}%
        </span>

        {/* Wishlist + Eye Icons */}
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          
          <img
            src="/Icons/Fill Eye.png"
            alt="Wishlist"
            className="w-6 h-6 cursor-pointer hover:scale-110 transition"
          />
        </div>
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-[140px] h-[140px] object-contain"
        />
        <button className="
        absolute bottom-0 left-0 w-full bg-black text-white py-2 opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 
        transition-all duration-300 flex items-center justify-center gap-2">
          <img
            src="/Icons/Cartbuy.png"
            alt="Cart"
            className="w-5 h-5 filter invert"
          />
          Add to Cart
        </button>
       
      </div>
      </Link>
      {/* Product Info */}
      <h3 className="mt-4 text-sm font-medium text-center">{product.name}</h3>
      <div className="flex gap-2 mt-2">
        <span className="text-red-500 font-bold">${product.price}</span>
        <span className="block text-left line-through text-gray-500 text-sm">
          ${product.oldPrice}
        </span>
      </div>
      <div className="flex items-center gap-1 text-yellow-500 text-sm mt-2">
        {Array(product.rating)
          .fill(0)
          .map((_, i) => (
            <FaStar key={i} />
          ))}
        <span className="text-gray-600 text-xs ml-1">
          ({product.reviews})
        </span>
      </div>
    </div>
  );
}
export default Whishlist1;
