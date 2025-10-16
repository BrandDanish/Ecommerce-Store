import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../skeleton/Skeleton";
const SideBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("men's clothing");
  const [loading, setLoading] = useState(true);

  // Fetch all products once
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {setProducts(data);
       setLoading(false); // ✅ stop loading after data is fetched
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  // Filter products when category changes
  useEffect(() => {
    if (products.length > 0) {
      const filter = products.filter(
        (p) => p.category === selectedCategory
      );
      // Take only 3 items for carousel
      setFiltered(filter.slice(0, 3));
      setCurrentIndex(0);
    }
  }, [selectedCategory, products]);

  // Auto slide
  useEffect(() => {
    if (filtered.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === filtered.length - 1 ? 0 : prev + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [filtered]);

  return (
    <div className="bg-white border-t mt-2 w-[1440px]">
      <div className="flex pl-[135px] mt-[-4px]">
        {/* Sidebar */}
        <aside className="bg-white border-r w-[217px] h-[344px] mt-1">
          <ul className="mt-10 space-y-2 text-sm">
            <li
              onClick={() => setSelectedCategory("women's clothing")}
              className={`whitespace-nowrap flex items-center justify-between cursor-pointer hover:text-red-500 ${
                selectedCategory === "women's clothing"
                  ? "text-red-500 font-semibold"
                  : ""
              }`}
            >
              Women's Fashion
              <img src="/Icons/DropDown.png" alt="" className="ml-2" />
            </li>

            <li
              onClick={() => setSelectedCategory("men's clothing")}
              className={`whitespace-nowrap flex items-center justify-between cursor-pointer hover:text-red-500 ${
                selectedCategory === "men's clothing"
                  ? "text-red-500 font-semibold"
                  : ""
              }`}
            >
              Men's Fashion
              <img src="/Icons/DropDown.png" alt="" className="ml-2" />
            </li>

            <li>Electronics</li>
            <li>Home & LifeStyle</li>
            <li>Medicine</li>
            <li>Sports & Outdoor</li>
            <li>Babys & Toys</li>
            <li>Groceries & Pets</li>
            <li>Health & Beauty</li>
          </ul>
        </aside>

        {/* Banner Carousel */}
        <div className="flex-1 p-4 ml-4">
          <div className="relative overflow-hidden w-[892px] h-[344px] rounded-xl">
            {loading ? ( <Skeleton/>
            ) : filtered.length > 0 ? (
              <>
                {/* Slide Wrapper */}
                <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {filtered.map((product) => (
                    <div
                      key={product.id}
                      className="bg-black w-[892px] h-[344px] flex-shrink-0 flex items-center justify-between p-10 text-white rounded-xl"
                    >
                      {/* Left Side */}
                      <div className="max-w-[60%]">
                        <h2 className="text-2xl font-semibold mb-3">
                          {product.title}
                        </h2>
                        <p className="text-sm text-gray-300 line-clamp-3">
                          {product.description}
                        </p>
                        <Link to="/shop">
                          <button className="flex items-center gap-2 mt-6 text-sm font-medium group underline hover:text-red-400 transition">
                            Shop Now
                            <span className="transform group-hover:translate-x-1 transition">
                              →
                            </span>
                          </button>
                        </Link>
                      </div>

                      {/* Right Side */}
                      <div>
                        <img
                          src={product.image}
                          alt={product.title}
                          className="h-[280px] object-contain drop-shadow-lg"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Dots */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                  {filtered.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        currentIndex === index
                          ? "bg-red-500 scale-125"
                          : "bg-gray-400 hover:bg-gray-300"
                      }`}
                    ></button>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-center mt-24 text-gray-500">
                No products found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBanner;
