import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import TopHeader from "../components/header/TopHeader";
import Footer from "../components/footer/Footer";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (loading) return <div className="text-center p-6">Loading...</div>;

  return (
    <>
    <TopHeader/>
    <Header/>
    
    <div className="max-w-[1170px] mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">All Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="border p-4 rounded-lg hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-32 h-32 object-contain mx-auto"
            />
            <h3 className="mt-2 text-sm font-medium line-clamp-2">
              {product.title}
            </h3>
            <p className="text-red-500 font-bold">${product.price}</p>
            <button className="bg-black text-white w-full mt-100 py-2 rounded transition opacity-0 hover:opacity-100">
             Add to Cart
             </button>
          </Link>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};
export default AllProducts;
