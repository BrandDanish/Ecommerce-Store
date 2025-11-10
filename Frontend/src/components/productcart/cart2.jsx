import React, { useState, useEffect } from "react";
import Skeleton from "../skeleton/Skeleton";

const Category = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    { name: "iPhone", icon: "/Icons/Category-CellPhone.png" },
    { name: "Computers", icon: "/Icons/Laptop.png" },
    { name: "SmartWatch", icon: "/Icons/SmartWatch.png" },
    { name: "Camera", icon: "/Icons/SmartWatch.png" },
    { name: "Headphones", icon: "/Icons/Category-CellPhone.png" },
    { name: "Gaming", icon: "/Icons/Category-CellPhone.png" },
  ];

  const total = categories.length;
  const visibleCategories = [
    categories[currentIndex],
    categories[(currentIndex + 1) % total],
    categories[(currentIndex + 2) % total],
    categories[(currentIndex + 3) % total],
    categories[(currentIndex + 4) % total],
  ];

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % total);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));

  return (
    <div className="container  mx-auto bg-white mt-6 mb-10 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 sm:gap-0">
        <div className="flex items-start sm:items-center gap-4">
          <div className="border-l-[10px] border-red-500 pl-4">
            <p className="text-red-500 font-medium text-sm sm:text-base -mt-1">
              Categories
            </p>
            <h2 className="text-xl sm:text-2xl font-bold">Browse By Category</h2>
          </div>
        </div>

        {/* Arrows */}
        <div className="flex gap-2 self-center sm:self-auto">
          <img
            src="/Icons/Fill With Left Arrow.png"
            onClick={prevSlide}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 cursor-pointer hover:bg-gray-300 transition"
            alt="Previous"
          />
          <img
            src="/Icons/Right Arrow.png"
            onClick={nextSlide}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 cursor-pointer hover:bg-gray-300 transition"
            alt="Next"
          />
        </div>
      </div>

      {/* Category Boxes */}
      {/* Category Boxes */}
<div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 justify-items-center mt-6">
  {loading
    ? Array(5)
        .fill(0)
        .map((_, idx) => (
          <div
            key={idx}
            className="w-full max-w-[135px] h-[135px] border rounded-lg p-4 flex flex-col items-center justify-center text-center animate-pulse border-gray-200"
          >
            {/* Icon Skeleton */}
            <div className="w-[50px] h-[50px] bg-gray-200 rounded-md mb-3"></div>

            {/* Text Skeleton */}
            <div className="w-20 h-4 bg-gray-200 rounded"></div>
          </div>
        ))
    : visibleCategories.map((cat, index) => (
        <div
          key={index}
          className={`w-full max-w-[135px] h-[135px] border rounded-lg p-4 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer hover:bg-red-600 ${
            index === currentIndex
              ? "bg-red-500 text-white border-red-500"
              : "bg-white border-gray-300 hover:border-red-400 hover:shadow-md"
          }`}
        >
          <img
            src={cat.icon}
            className="w-[45px] h-[45px] sm:w-[50px] sm:h-[50px] mb-2 object-contain"
            alt={cat.name}
          />
          <span className="text-sm sm:text-base">{cat.name}</span>
        </div>
      ))}
</div>


      <div className="border-gray-300 border-t w-full mt-10"></div>
    </div>
  );
};
export default Category;
