import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Skeleton from "../skeleton/Skeleton";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../../redux/wishlistSlice";
import ProductCard from "../product_card/ProductCard";

const SellingProduct = () => {
  // ✅ only one ope
  return (
    <div className="container mx-auto bg-white mt-6 mb-10 p-6">
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
          <button className="bg-red-500 text-white px-6 py-3 rounded-md font-medium hover:bg-red-400 transition">
            View All
          </button>
          </Link>
        </div>
      </div>
      <ProductCard 
      />
    </div>
  );
};
export default SellingProduct;
