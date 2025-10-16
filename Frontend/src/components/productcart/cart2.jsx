import React, { useState, useEffect } from "react";
import Skeleton from "../skeleton/Skeleton";

const Category = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500); // 2.5 seconds
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
  const VisibleProduct = [
    categories[currentIndex],
    categories[(currentIndex + 1) % total],
    categories[(currentIndex + 2) % total],
    categories[(currentIndex + 3) % total],
    categories[(currentIndex + 4) % total],
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % categories.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? categories.length - 1 : prev - 1
    );
  };

  return (
    <div className="w-full max-w-[1170px] mx-auto bg-white mt-6 mb-10 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="border-l-[10px] border-red-500 pl-4 h-[25px]">
            <p className="text-red-500 font-medium mt-[-4.5px]">Categories</p>
            <h2 className="text-2xl font-bold">Browse By Category</h2>
          </div>
        </div>

        {/* Arrows */}
        <div className="flex gap-2">
          <img
            src="/Icons/Fill With Left Arrow.png"
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-gray-200 cursor-pointer"
          />
          <img
            src="/Icons/Right Arrow.png"
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-gray-200 cursor-pointer"
          />
        </div>
      </div>

      {/* Category Boxes */}
      <div className="flex flex-row gap-6 items-center justify-center mt-[50px]">
        {loading
          ? Array(5)
              .fill(0)
              .map((_, idx) => (
                <Skeleton key={idx} width={135} height={135} />
              ))
          : VisibleProduct.map((cat, index) => (
              <div
                key={index}
                className={`w-[135px] h-[135px] border rounded-lg p-4 flex flex-col items-center justify-center transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-white border-gray-300"
                }`}
              >
                <img
                  src={cat.icon}
                  className="w-[50px] h-[50px] mb-2"
                  alt={cat.name}
                />
                <span>{cat.name}</span>
              </div>
            ))}
      </div>
      <div className=" border-gray-300 border-t w-full mt-10"></div>
    </div>
  );
};

export default Category;
