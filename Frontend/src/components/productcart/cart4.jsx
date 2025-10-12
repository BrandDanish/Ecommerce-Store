import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const MusicSection = () => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Product object for this section
  const musicProduct = {
    id: 101, // unique ID
    name: "Music Speaker",
    price: 299,
    image: "/Icons/BomBox.png",
  };

  const initialTime = {
    days: 4,
    hours: 23,
    minutes: 59,
    seconds: 59,
  };

  const [timeLeft, setTimeLeft] = useState(initialTime);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
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

  // Handle Buy Now
  const handleBuyNow = () => {
    addToCart(musicProduct); 
    navigate("/cart");       
  };

  return (
    <div className="w-full max-w-[800px] mx-auto mt-6 mb-10 p-6 bg-black">
      <div className="flex items-center justify-between">
        {/* Left Side (Text + Countdown + Button) */}
        <div>
          <h3 className="text-2xl text-green-500">Categories</h3>
          <h1 className="text-3xl text-white font-bold">
            Enhance Your <br /> Music Experience
          </h1>

          {/* Countdown */}
          <div className="flex items-center gap-4 font-bold text-lg text-white mt-4">
            <TimeItem label="Days" value={timeLeft.days} />
            <TimeItem label="Hours" value={timeLeft.hours} />
            <TimeItem label="Minutes" value={timeLeft.minutes} />
            <TimeItem label="Seconds" value={timeLeft.seconds} />
          </div>
          <button
            onClick={handleBuyNow}
            className="bg-[#00FF66] text-white px-6 py-3 rounded font-medium mt-6 hover:bg-green-600 transition"
          >
            Buy Now
          </button>
        </div>

        {/* Right Side (Image) */}
        <div className="flex-shrink-0">
          <img
            src="/Icons/BomBox.png"
            alt="Music Speaker"
            className="w-[300px] h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};
const TimeItem = ({ label, value }) => (
  <div className="flex flex-col items-center justify-center w-16 h-16 bg-white text-black rounded-full">
    <span className="text-xl font-bold">
      {value.toString().padStart(2, "0")}
    </span>
    <span className="text-xs">{label}</span>
  </div>
);

export default MusicSection;
