import Footer from "../footer/Footer";
import Header from "../header/Header";
import TopHeader from "../header/TopHeader";
import Whishlist1 from "./Whishlist1";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist, clearWishlist } from "../../redux/wishlistSlice";
import { addToCart } from "../../redux/cartSlice";
import { useState } from "react";

const Wishlist = () => {
  // read wishlist from redux store (adjust selector if your state shape differs)
  const wishlist = useSelector((state) => state.wishlist.items ?? state.wishlist);
  const dispatch = useDispatch();

  // ✅ Popup state
  const [popup, setPopup] = useState({ show: false, message: "", color: "" });

  const showPopup = (msg, color) => {
    setPopup({ show: true, message: msg, color });
    setTimeout(() => setPopup({ show: false, message: "", color: "" }), 3000);
  };

  const handleAddToCart = (product) => {
    // dispatch redux action to add to cart
    dispatch(addToCart(product));
    showPopup("Added to Cart 🛒", "green");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <>
        <TopHeader />
        <Header />

        {/* Page Content */}
        <main className="flex-grow">
          <div className="w-full max-w-[1170px] mx-auto bg-white mt-6 mb-10 p-6 relative">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="pl-4 h-[25px]">
                <p className="text-black font-medium">
                  Wishlist ({wishlist.length})
                </p>
              </div>
              <div>
                <button
                  className="border rounded w-[120px] h-[40px] text-sm hover:bg-gray-200"
                  onClick={() => dispatch(clearWishlist())}
                >
                  Move all Bag
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex flex-wrap gap-6">
              {wishlist.length > 0 ? (
                wishlist.map((product) => (
                  <div
                    key={product.id}
                    className="relative w-[250px] p-4 flex flex-col items-center"
                  >
                    <div className="relative bg-gray-100 w-[190px] h-[220px] flex items-center justify-center rounded-lg">
                      {/* Remove from wishlist */}
                      <div className="absolute top-2 right-2">
                        <img
                          src="/Icons/Fill Eye (1).png"
                          alt="Remove"
                          className="w-6 h-6 cursor-pointer hover:scale-110 transition"
                          onClick={() => dispatch(removeFromWishlist(product.id))}
                        />
                      </div>

                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-[140px] h-[140px] object-contain"
                      />

                      {/* ✅ Add to Cart Button */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="absolute bottom-0 left-0 right-0 bg-black text-white py-2 flex items-center justify-center gap-2 hover:bg-green-600 transition"
                      >
                        <img
                          src="/Icons/Cartbuy.png"
                          alt="Cart"
                          className="w-5 h-5 filter invert"
                        />
                        Add to Cart
                      </button>
                    </div>

                    <h3 className="mt-4 text-sm font-medium text-center">
                      {product.name}
                    </h3>
                    <div className="flex gap-2 mt-2">
                      <span className="text-red-500 font-bold">
                        ${product.price}
                      </span>
                      <span className="line-through text-gray-500 text-sm">
                        ${product.oldPrice}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No items in wishlist.</p>
              )}
            </div>

            {/* ✅ Popup */}
            {popup.show && (
              <div
                className="fixed top-6 right-6 px-6 py-3 rounded-lg shadow-lg text-white font-medium transition"
                style={{ backgroundColor: popup.color }}
              >
                {popup.message}
              </div>
            )}
          </div>
        </main>
        <Whishlist1 />
        <Footer />
      </>
    </div>
  );
};

export default Wishlist;
