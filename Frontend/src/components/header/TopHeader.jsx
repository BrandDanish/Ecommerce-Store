import { FaHome, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const TopHeader = () => {
  return (
    <div className="bg-black text-white text-center relative flex flex-col sm:flex-row justify-center sm:justify-between items-center px-3 sm:px-6 py-2 sm:py-3">
      {/* Text and Button */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm sm:text-base">
        <span className="pl-[135px]">
          Summer Sale for All Swim Suits and Free Express Delivery - OFF 50%!
        </span>
        <Link to="/shop">
          <button className="bg-black text-white underline hover:text-gray-300 transition">
            Shop Now
          </button>
        </Link>
      </div>

      {/* Language Selector */}
      <div className="flex items-center gap-2 mt-2 sm:mt-0 absolute sm:static right-4 top-2 sm:top-auto">
        <span className="cursor-pointer text-sm sm:text-base hover:text-gray-300">
          English
        </span>
        <img
          src="public/Icons/vector.png"
          alt="Icon"
          className="w-4 h-4 sm:w-[7.78px] sm:h-[12.73px] object-contain"
        />
      </div>
    </div>
  );
};
export default TopHeader;
