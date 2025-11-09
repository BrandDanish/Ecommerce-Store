import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import TopHeader from "../components/header/TopHeader";
import Footer from "../components/footer/Footer";
import ProductCard from "../components/product_card/ProductCard";

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
      <ProductCard />
    </div>
    <Footer/>
    </>
  );
};
export default AllProducts;
