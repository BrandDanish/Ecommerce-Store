import React, { useState } from "react";
import { useWishlist } from "../../context/Whishlist";

const products = [
  {
    id: 1,
    name: "Toom Cruise",
    description: "Founder & Chairmain",
    social: [
      "/Icons/Icon-Twitter.png",
      "/Icons/Instagram.png",
      "/Icons/Icon-Linkedin.png",
    ],
    image: "/Icons/Toom Cruise.png",
  },
  {
    id: 2,
    name: "Emma Watson",
    description: "Managing Director",
    social: [
      "/Icons/Icon-Twitter.png",
      "/Icons/Instagram.png",
      "/Icons/Icon-Linkedin.png",
    ],
    image: "/Icons/Emma Watson.png",
  },
  {
    id: 3,
    name: "Will Smith",
    description: "Product Designer",
    social: [
      "/Icons/Icon-Twitter.png",
      "/Icons/Instagram.png",
      "/Icons/Icon-Linkedin.png",
    ],
    image: "/Icons/Will Smith.png",
  },
  {
    id: 4,
    name: "Tom Hardy",
    description: "CTO",
    social: [
      "/Icons/Icon-Twitter.png",
      "/Icons/Instagram.png",
      "/Icons/Icon-Linkedin.png",
    ],
    image: "/Icons/Toom Cruise.png",
  },
  {
    id: 5,
    name: "Scarlett Johansson",
    description: "UI/UX Lead",
    social: [
      "/Icons/Icon-Twitter.png",
      "/Icons/Instagram.png",
      "/Icons/Icon-Linkedin.png",
    ],
    image: "/Icons/Emma Watson.png",
  },
];

const UserAbout = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = products.length
  const visibleProducts = [
    products[currentIndex],
    products[(currentIndex + 1) % total],
    products[(currentIndex + 2) % total],
  ];

  return (
    <div className="w-full max-w-[1170px] mx-auto bg-white mt-6 mb-10 p-6">
      {/* Carousel Items */}
      <div className="flex justify-center items-center mt-6 gap-6 rounded-lg py-8">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="flex justify-center gap-3 mt-4">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-red-500" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

function ProductCard({ product }) {
  const { addToWishlist } = useWishlist();
  return (
    <div className="w-[250px] p-4 transition-transform duration-500 flex flex-col items-center">
      <div className="relative bg-gray-300 w-[190px] h-[220px] flex items-center justify-center">
        <img
          src={product.image}
          alt="Product"
          className="w-[190px] h-[220px] object-contain"
        />
      </div>
      <h3 className="pr-[4px] mt-4 text-sm font-bold text-center">{product.name}</h3>
      <div className="flex gap-2 mt-2">
        <span className="text-black font-normal">{product.description}</span>
      </div>
      <div className="flex items-center gap-3 mt-3">
        {product.social?.map((icon, i) => (
          <img
            key={i}
            src={icon}
            alt={`social-${i}`}
            className="w-5 h-5 cursor-pointer hover:opacity-75 transition"
          />
        ))}
      </div>
    </div>
  );
}

export default UserAbout;
