import React from "react";

const Feedback = () => {
  const categories = [
    { name: "10.5k", discription:'Seller active our site', icon: "/Icons/Services (3).png" },
    { name: "3.3k", discription:'Monthly Product Sale', icon: "/Icons/Services (7).png" },
    { name: "45.5k", discription:'Customer active in our site', icon: "/Icons/Services (5).png" },
    { name: "25k", discription:'Anual grass in our site', icon: "/Icons/Services (6).png" },
  ];
  return (
    <div className="w-full max-w-[1170px] mx-auto bg-white mt-6 mb-10 px-4 py-6 flex flex-col items-center">
      <div className="flex flex-wrap gap-6 items-center justify-center mt-12 w-full">
        {categories.map((cat, index) => (
          <div
            key={index}
            className='w-full sm:w-[270px] h-[230px] border rounded-lg p-4 flex flex-col items-center justify-center transition-all duration-300 mb-6 sm:mb-0 mx-auto'>
            <img
              src={cat.icon}
              className="w-[50px] h-[50px] mb-2"
              alt={cat.name}
            />
            <span className="font-bold text-center">{cat.name}</span>
            <span className="text-black font-normal text-center">{cat.discription}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
