import {useEffect, useState} from "react";

const Feedback = () => {
  const [loading, setLoading] =useState(false);
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  const categories = [
    { name: "10.5k", discription:'Seller active our site', icon: "/Icons/Services (3).png" },
    { name: "3.3k", discription:'Monthly Product Sale', icon: "/Icons/Services (7).png" },
    { name: "45.5k", discription:'Customer active in our site', icon: "/Icons/Services (5).png" },
    { name: "25k", discription:'Anual grass in our site', icon: "/Icons/Services (6).png" },
  ];

  return (
    <div className="w-full max-w-[1170px] mx-auto bg-white mt-6 mb-10 px-4 py-6 flex flex-col items-center overflow-x-hidden">
      <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-6 mt-12">
        {loading ? (
          Array(4).fill(0).map((_, index) => (
            <div
              key={index}
                className="flex flex-col items-center gap-2 animate-pulse w-full">
                  <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                  <div className="w-16 h-4 bg-gray-300 rounded"></div>
                  <div className="w-24 h-3 bg-gray-200 rounded"></div>
            </div>
          ))
        ) : (
        categories.map((cat, index) => (
          <div
            key={index}
            className="w-full h-[230px] border rounded-lg p-4 flex flex-col items-center justify-center transition-all duration-300"
          >
            <img
              src={cat.icon}
              className="w-[50px] h-[50px] mb-2"
              alt={cat.name}
            />
            <span className="font-bold text-center text-lg">{cat.name}</span>
            <span className="text-black font-normal text-center text-sm">{cat.discription}</span>
              
          </div>
        )
        ))}   
      </div>    
    </div>
  );
};
export default Feedback;
