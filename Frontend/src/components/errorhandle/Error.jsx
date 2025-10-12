import React from "react";
import { Link } from "react-router-dom";
import TopHeader from "../header/TopHeader";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const ErrorHandle = () => {
  return (
    <>
      <TopHeader />
      <Header />
      <div className="flex flex-col min-h-screen">
        {/* Centered content */}
        <div className="flex flex-1 flex-col justify-center items-center text-center px-4">
          <h1 className="font-bold text-[50px]">404 Not Found</h1>
          <p className="text-[16px] leading-relaxed text-[#000000] mt-4">
            Your visited page was not found. You may go back to the home page.
          </p>
          <Link to="/" className="mt-8">
            <button className="bg-red-500 px-8 py-4 text-[16px] rounded-md hover:bg-red-600 transition">
              <span className="text-[#FAFAFA]">Back to Home Page</span>
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ErrorHandle;
