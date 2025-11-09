import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import Skeleton from "../skeleton/Skeleton";
import { useDispatch } from "react-redux";

import { addToCart as addToCartAction } from "../../redux/cartSlice";
import { addToWishlist as addToWishlistAction } from "../../redux/wishlistSlice";
import ProductCard from "../product_card/ProductCard";

const ExploreProduct = () => {

  return (
    <div className="container mx-auto bg-white mt-6 mb-10 p-6 relative">
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
      <ProductCard />
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
export default ExploreProduct;
