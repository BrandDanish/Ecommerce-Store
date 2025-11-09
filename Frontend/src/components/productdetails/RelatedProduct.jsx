import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// adjust these import paths to match your project structure
import { addToWishlist } from "../../redux/wishlistSlice";
import { addToCart } from "../../redux/cartSlice";
import ProductCard from "../product_card/ProductCard";

const RelatedProduct = () => {
  
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
      <ProductCard />
    </div>
  );
};
export default RelatedProduct;
