import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useWishlist } from "../../context/Whishlist";
import { useCart } from "../../context/CartContext";
const SellingProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProductId, setSelectedProductId] = useState(null); // ✅ only one open

  // ✅ Fetch products from FakeStore API
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

  if (loading) {
    return <p className="text-center py-10">Loading products...</p>;
  }

  return (
    <div className="w-full max-w-[1170px] mx-auto bg-white mt-6 mb-10 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="border-l-[10px] border-red-500 pl-4 h-[25px]">
            <p className="text-red-500 font-medium">This Month</p>
            <h2 className="text-2xl font-bold">Best Selling Product</h2>
          </div>
        </div>
        <div className="flex gap-2 mt-6">
          <Link to='/shop'>
          <button className="bg-red-500 text-white px-6 py-3 rounded-md font-medium">
            View All
          </button>
          </Link>
        </div>
      </div>

      {/* Products */}
      <div className="flex justify-center items-center mt-6 gap-6 flex-wrap py-8">
        {products.slice(0, 4).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            selectedProductId={selectedProductId}
            setSelectedProductId={setSelectedProductId}
          />
        ))}
      </div>
    </div>
  );
};

// ✅ Subcomponent
function ProductCard({ product, selectedProductId, setSelectedProductId }) {
  const { addToWishlist } = useWishlist();
  const { addToCart } = useCart();

  // FakeStore doesn’t have discount/oldPrice directly → we fake it
  const discount = 20;
  const oldPrice = (product.price * (100 + discount)) / 100;
  const rating = Math.round(product.rating?.rate || 4);
  const reviews = product.rating?.count || 50;

  return (
    <div
      onClick={() => setSelectedProductId(product.id)} 
      className={`relative w-[250px] p-4 transition-transform duration-500 flex flex-col items-center cursor-pointer`}
    >
      <Link to={`/product/${product.id}`}>
      <div className="relative bg-gray-300 w-[190px] h-[220px] flex items-center justify-center">
        {/* Discount Badge */}
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          -{discount}%
        </span>

        {/* Wishlist + Eye Icons */}
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <img
            src="/Icons/Fill Heart.png"
            alt="Wishlist"
            className="w-6 h-6 cursor-pointer hover:scale-110 transition"
            onClick={(e) => {
              e.stopPropagation();
              addToWishlist(product);
            }}
          />
          <Link to={`/product/${product.id}`} onClick={(e) => e.stopPropagation()}>
            <img
              src="/Icons/Fill Eye.png"
              alt="View"
              className="w-6 h-6 cursor-pointer hover:scale-110 transition"
            />
          </Link>
        </div>

        {/* Product Image */}
        <img
          src={product.image}
          alt="Product"
          className="w-[140px] h-[140px] object-contain"
        />
      </div>
   </Link>
      {/* ✅ Add To Cart only for clicked product */}
      {selectedProductId === product.id && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          className="bg-black text-white py-2 w-[190px] cursor-pointer hover:bg-green-600"
        >
          Add To Cart
        </button>
      )}

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

export default SellingProduct;
