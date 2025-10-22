import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToWishlist as addToWishlistAction } from "../../redux/wishlistSlice";

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
  const total = products.length;
  const visibleProducts = [
    products[currentIndex],
    products[(currentIndex + 1) % total],
    products[(currentIndex + 2) % total],
  ];

  return (
    <div className="w-full max-w-[1170px] mx-auto bg-white my-12 p-8 rounded-lg shadow-sm">
      {/* Carousel Items */}
      <div className="flex justify-center items-center gap-6 py-8">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-3 mt-4">
        {products.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition ${
              currentIndex === index ? "bg-red-500" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

function ProductCard({ product }) {
  const dispatch = useDispatch();
  const addToWishlist = (item) => dispatch(addToWishlistAction(item));

  return (
    <div className="w-[250px] p-4 flex flex-col items-center transition-transform duration-500">
      <div className="relative bg-gray-100 w-[190px] h-[220px] flex items-center justify-center rounded-md shadow">
        <img
          src={product.image}
          alt="Product"
          className="w-[190px] h-[220px] object-contain rounded-md"
        />
      </div>
      <h3 className="mt-4 text-base font-semibold text-center text-gray-800">
        {product.name}
      </h3>
      <p className="text-sm text-gray-600 mt-1">{product.description}</p>

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
