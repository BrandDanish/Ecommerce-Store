import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import ProductCard from "../product_card/ProductCard";

const initialTime = {
  days: 3,
  hours: 23,
  minutes: 19,
  seconds: 56,
};

const FlashSales = () => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className="container mx-auto bg-white mt-6 mb-10 p-4 sm:p-6 relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 mb-6">
        {/* Title Section */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="border-l-[6px] border-red-500 pl-3 sm:pl-4">
            <p className="text-red-500 font-medium text-sm sm:text-base">Today’s</p>
            <h2 className="text-xl sm:text-2xl font-bold">Flash Sales</h2>
          </div>
        </div>

        {/* Countdown */}
        <div className="flex items-center gap-3 sm:gap-4 font-bold text-base sm:text-lg">
          <TimeItem label="Days" value={timeLeft.days} />
          <span>:</span>
          <TimeItem label="Hours" value={timeLeft.hours} />
          <span>:</span>
          <TimeItem label="Minutes" value={timeLeft.minutes} />
          <span>:</span>
          <TimeItem label="Seconds" value={timeLeft.seconds} />
        </div>

        {/* Arrows */}
        <div className="flex gap-2">
          <img
            onClick={handlePrev}
            src="/Icons/Fill With Left Arrow.png"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition"
          />
          <img
            onClick={handleNext}
            src="/Icons/Right Arrow.png"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition"
          />
        </div>
      </div>

      {/* Products */}
      <ProductCard currentIndex={currentIndex} />

      {/* View All Button */}
      <div className="flex justify-center mt-8">
        <Link to="/shop">
          <button className="bg-red-500 text-white px-6 py-3 rounded-md font-medium hover:bg-red-300 transition">
            View All Products
          </button>
        </Link>
      </div>

      <div className="border-gray-300 border-t w-full mt-10"></div>
    </div>
  );
};

function TimeItem({ label, value }) {
  return (
    <div className="flex flex-col items-center text-center">
      <p className="text-xs sm:text-sm">{label}</p>
      <span className="text-base sm:text-lg font-semibold">
        {String(value).padStart(2, "0")}
      </span>
    </div>
  );
}

export default FlashSales;
