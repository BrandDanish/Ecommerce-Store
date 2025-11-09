import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../redux/wishlistSlice";
import { addToCart } from "../../redux/cartSlice";
import { Link } from "react-router-dom";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";

const ProductCard = ({currentIndex}) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const [products, setProducts] = useState([]);
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
        console.error(err.message);
      }
    };

    fetchProducts();
  }, []);
  
  const total = products.length;
  const VisibleProduct = currentIndex !== undefined
  ? products.slice(currentIndex, currentIndex + 4) // show 4 products for carousel
  : products;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 ">
      {VisibleProduct.filter(Boolean).map((product) => {
        const isInWishlist = wishlistItems.some((item) => item.id === product.id);

        return (
          <div key={product.id} className=" relative w-[250px] p-4 flex flex-col items-start justify-start">
            
            <Link to={`/product/${product.id}`}>
              <div className="group relative bg-gray-100 w-full h-[200px] sm:h-[220px] flex items-center justify-center rounded-lg overflow-hidden px-5">

                {/* Discount Badge */}
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  -{product.discount}%
                </span>

                {/* Wishlist & View */}
                <div className="absolute top-2 right-2 flex flex-col gap-2">
                  
                  {/* Wishlist Heart Toggle */}
                  {isInWishlist ? (
                    <FaHeart
                      className="w-6 h-6 text-red-500 cursor-pointer hover:scale-110 transition"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(removeFromWishlist(product.id));
                      }}
                    />
                  ) : (
                    <FaRegHeart
                      className="w-6 h-6 text-gray-700 cursor-pointer hover:scale-110 transition"
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(addToWishlist(product));
                      }}
                    />
                  )}

                  {/* Quick View */}
                  <Link to={`/product/${product.id}`}>
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
                  alt={product.name}
                  className="w-[120px] sm:w-[140px] h-[120px] sm:h-[140px] object-contain transition-transform duration-300 group-hover:scale-110"
                />

                {/* Add To Cart Button */}
                
                <button
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className="absolute bottom-0 left-0 w-full bg-black text-white py-2 opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0 transition-all duration-300"
                >
                  Add To Cart
                </button>
              </div>
            </Link>

            {/* Product Info */}
            <h3 className="mt-3 text-sm font-medium px-2">{product.name}</h3>
            <div className="flex items-start justify-start gap-2 mt-1 px-2">
              <span className="text-red-500 font-bold">${product.price}</span>
              <span className="line-through text-gray-500 text-sm">${product.oldPrice}</span>
            </div>

            {/* Rating */}
            <div className="flex gap-1 text-yellow-500 text-sm mt-1 px-2">
              {Array(product.rating)
                .fill(0)
                .map((_, i) => (
                  <FaStar key={i} />
                ))}
              <span className="text-gray-600 text-xs ml-1">({product.reviews})</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default ProductCard;
