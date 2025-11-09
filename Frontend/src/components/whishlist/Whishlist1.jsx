import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import ProductCard from "../product_card/ProductCard";
const Whishlist1 = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
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
         <ProductCard/>
         </div> 
      </main>
    </div>
  );
};
export default Whishlist1;
