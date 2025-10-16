import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopHeader from "../header/TopHeader";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import RelatedProduct from "./RelatedProduct";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";
const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, addToCart, updateQuantity } = useCart();

  const [selectedColor, setSelectedColor] = useState("white");
  const [selectedSize, setSelectedSize] = useState("M");
  const [qty, setQty] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
        setMainImage(data.image);
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
    setQty((prev) => (type === "inc" ? prev + 1 : prev > 1 ? prev - 1 : 1));
  };

  const handleBuyNow = () => {
    const existing = cart.find(
      (item) =>
        item.id === product.id &&
        item.color === selectedColor &&
        item.size === selectedSize
    );

    if (existing) {
      updateQuantity(product.id, selectedColor, selectedSize, existing.qty + qty);
      
    } else {
      addToCart({
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.image,
        qty: qty,
        color: selectedColor,
        size: selectedSize,
      });
    }
    toast.dismiss();
    toast(
    ({ closeToast }) => (
      <div
        className="relative flex flex-col items-center justify-center text-center
        bg-white text-gray-800 px-8 py-6 rounded-2xl shadow-2xl border border-gray-200
        w-[350px] mx-auto"
      >
        <h3 className="text-lg font-semibold mb-2">
          ✅ {product.title} added to cart!
        </h3>
        <p className="text-sm mb-4 text-gray-600">
          Your item has been successfully added.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => {
              closeToast();
              navigate("/cart");
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium"
          >
            View Cart
          </button>
          <button
            onClick={closeToast}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    ),
    {
      position: "top-center",
      autoClose: false,
      closeButton: false,
      className: "custom-toast-modal",
      style: { background: "transparent", boxShadow: "none" },
    }
  );
  };

  return (
    <>
      <TopHeader />
      <Header />

      <div className="flex flex-col lg:flex-row gap-10 px-8 py-10 justify-center items-center">
        {/* Left Section */}
        <div className="flex gap-6 w-full lg:w-1/2">
          <div className="flex flex-col gap-8 pl-[135px]">
            {productImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="thumbnail"
                className={`w-20 h-20 object-contain cursor-pointer border rounded-lg bg-gray-300 ${
                  mainImage === img ? "border-red-500" : "border-gray-300"
                }`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>

          <div className="flex-1 flex items-center justify-center border rounded-lg bg-gray-300">
            <img
              src={mainImage}
              alt={product.title}
              className="w-[400px] h-[400px] object-contain"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-2 w-[500px] h-[600px] pt-[88px]">
          <h2 className="text-2xl font-semibold">{product.title}</h2>
          <p className="text-yellow-500">
            ⭐⭐⭐⭐ {product.rating?.rate || 4.5} ({product.rating?.count || 100} Reviews){" "}
            <span className="text-green-600">In Stock</span>
          </p>
          <p className="text-2xl font-bold">${product.price}</p>
          <p className="text-gray-600">{product.description}</p>

          {/* Colors Inline with Sizes */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-medium">Colors:</span>
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

            <div className="flex items-center gap-2">
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
              <span className="px-4">{qty}</span>
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
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <RelatedProduct />
      <Footer />
    </>
  );
};

export default ProductDetail;
