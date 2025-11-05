import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// adjust these import paths to match your project structure
import { addToWishlist } from "../../redux/wishlistSlice";
import { addToCart } from "../../redux/cartSlice";

const RelatedProduct = () => {
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
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
  const total = product.length;
  const VisibleProduct = [
    product[currentIndex],
    product[(currentIndex + 1) % total],
    product[(currentIndex + 2) % total],
    product[(currentIndex + 3) % total],
  ];
  if (loading) return <div className="text-center p-6">Loading products...</div>;
  if (error) return <div className="text-center text-red-500 p-6">{error}</div>;
  if (product.length === 0) return <div>No products available</div>;

  return (
    <div className="w-full max-w-[1170px] mx-auto bg-white mt-6 mb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center mt-8">
          <div className="border-l-[10px] border-red-500 pl-4 h-[25px]">
            <p className="text-red-500 font-medium">Related items</p>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:flex lg:justify-center sm:gap-6 py-6">
        {VisibleProduct.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            active={index === currentIndex}
            selected={selectedId === product.id}
            onSelect={() => setSelectedId(product.id)} // ✅ pass click handler
          />
        ))}
      </div>
    </div>
  );
};

// ✅ Subcomponent
function ProductCard({ product, active, selected, onSelect }) {
  const dispatch = useDispatch();

  return (
    <div
      className={`relative w-full max-w-[230px] p-4 transition-transform duration-500 flex flex-col items-center cursor-pointer ${
        active ? "opacity-100" : "opacity-100"
      }`}
      onClick={onSelect} // ✅ Select this product when clicked
    >
      <div className="relative bg-gray-300 w-full max-w-[190px] h-[200px] flex items-center justify-center mx-auto">
        {/* Discount Badge */}
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          -{product.discount}%
        </span>

        {/* Wishlist + Eye Icons */}
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <img
            src="/Icons/Fill Heart.png"
            alt="Wishlist"
            className="w-6 h-6 cursor-pointer hover:scale-110 transition"
            onClick={(e) => {
              e.stopPropagation(); // prevent selecting card
              dispatch(addToWishlist(product));
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
          alt="Product"
          className="w-[140px] h-[140px] object-contain"
        />
      </div>
      {selected && (
        <button
          className="mt-1 w-full max-w-[190px] bg-black text-white py-2 hover:bg-gray-800 transition"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(addToCart(product));
          }}
        >
          Add to Cart
        </button>
      )}
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
        <span className="text-gray-600 text-xs ml-1">({product.reviews})</span>
      </div>
    </div>
  );
}
export default RelatedProduct;
