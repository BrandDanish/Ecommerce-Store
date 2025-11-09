import { Link } from "react-router-dom";

const TopHeader = () => {
  return (
    <div className="container bg-black text-white text-center flex flex-col sm:flex-row items-center justify-between px-4 py-2 sm:px-4 sm:py-3">
      {/* Left Side (Sale Text + Shop Button) */}
      <div className=" flex flex-col sm:flex-row items-center sm:items-center gap-1 sm:gap-3 w-full sm:w-auto">
        {/* Sale Text */}
        <span className="text-xs sm:text-sm md:text-base font-light text-left w-full sm:w-auto">
          Summer Sale for All Swim Suits and Free Express Delivery - OFF 50%!
        </span>

        {/* Shop Button */}
        <Link to="/shop">
          <button className="underline text-xs sm:text-sm hover:text-gray-300 transition">
            Shop Now
          </button>
        </Link>
      </div>

      {/* Right Side - Language Selector */}
      <div className="flex items-center gap-1 mt-1 sm:mt-0 cursor-pointer">
        <span className="text-xs sm:text-sm hover:text-gray-300 transition">
          English
        </span>
        <span className="text-[10px] sm:text-xs">▼</span>
      </div>
    </div>
  );
};

export default TopHeader;
