import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopHeader from "../header/TopHeader";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import RelatedProduct from "./RelatedProduct";
import { useCart } from "../../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState("white");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");

  // ✅ Fetch product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
        setMainImage(data.image); // ✅ set main image
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  if (loading) return <h2 className="text-center mt-10">Loading...</h2>;
  if (!product) return <h2 className="text-center mt-10">Product Not Found</h2>;

  const productImages = [product.image, product.image, product.image, product.image];

  const handleQtyChange = (type) => {
    if (type === "inc") setQuantity((prev) => prev + 1);
    if (type === "dec" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleBuyNow = () => {
    addToCart({
      ...product,
      quantity,
      color: selectedColor,
      size: selectedSize,
    });
    navigate("/cart");
  };

  return (
    <>
      <TopHeader />
      <Header />

      <div className="flex flex-col lg:flex-row gap-10 px-8 py-10 justify-center items-center">
        {/* Left - Images */}
        <div className="flex gap-6 w-full lg:w-1/2">
          {/* Thumbnails */}
          <div className="flex flex-col gap-8 pl-[135px]">
            {productImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="thumbnail"
                className={`w-20 h-20 object-contain cursor-pointer border rounded-lg bg-gray-300 ${
                  mainImage === img ? "gray-red-500" : "border-gray-300"
                }`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 flex items-center justify-center border rounded-lg bg-gray-300">
            <img
              src={mainImage}
              alt={product.title}
              className="w-[400px] h-[400px] object-contain"
            />
          </div>
        </div>

        {/* Right - Product Info */}
        <div className="space-y-2 w-[500px] h-[600px] pt-[88px]">
          <h2 className="text-2xl font-semibold">{product.title}</h2>
          <p className="text-yellow-500">
            ⭐⭐⭐⭐ {product.rating?.rate || 4.5} ({product.rating?.count || 100} Reviews){" "}
            <span className="text-green-600">In Stock</span>
          </p>
          <p className="text-2xl font-bold">${product.price}</p>

          <p className="text-gray-600">{product.description}</p>

          {/* Colors */}
          <div className="flex items-center gap-3">
            <span className="font-medium">Colours:</span>
            {["white", "black", "red"].map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-6 h-6 rounded-full border-2 ${
                  selectedColor === color ? "border-red-600" : "border-gray-300"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          {/* Sizes */}
          <div className="flex items-center gap-3">
            <span className="font-medium">Size:</span>
            {["XS", "S", "M", "L", "XL"].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 border rounded-md ${
                  selectedSize === size
                    ? "bg-red-600 text-white"
                    : "bg-white text-gray-700 border-gray-300"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Quantity + Buy Now */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border">
              <button
                onClick={() => handleQtyChange("dec")}
                className="px-3 py-2 text-lg font-bold hover:bg-gray-200 border"
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => handleQtyChange("inc")}
                className="px-3 py-2 text-lg font-bold hover:bg-red-500 border"
              >
                +
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
            >
              Buy Now
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setWishlist(!wishlist)}
              className="border w-[40px] h-[40px]"
            >
              {wishlist ? (
                <span className="text-red-600 text-2xl">♥</span>
              ) : (
                <span className="text-gray-400 text-2xl">♡</span>
              )}
            </button>
          </div>

          {/* Delivery & Return */}
          <div className="border rounded-md p-4 space-y-1 w-[399px]">
            <div className="flex items-center gap-2">
              <img src="/Icons/icon-delivery.png" alt="delivery" />
              <span className="text-gray-500">
                Enter your postal code for{" "}
                <a href="/availability" className="text-blue-600 hover:underline">
                  availability
                </a>
              </span>
            </div>
            <div className="border"></div>
            <div className="flex items-center gap-2">
              <img src="/Icons/Icon-return.png" alt="return" />
              <span className="text-gray-500">
                Free 30 Days Delivery Returns,{" "}
                <a href="/Details" className=" text-blue-500 hover:underline">
                  Details
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>

      <RelatedProduct />
      <Footer />
    </>
  );
};

export default ProductDetail;
