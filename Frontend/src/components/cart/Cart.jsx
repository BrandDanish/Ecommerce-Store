import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import TopHeader from "../header/TopHeader";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  // Subtotal calculation
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <>
      <TopHeader />
      <Header />

      <div className="p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Cart Table & Coupon */}
            <div className="lg:col-span-2">
              <table className="w-full border-collapse bg-white shadow-md rounded-lg">
                <thead>
                  <tr className="border-b text-left bg-gray-100">
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Quantity</th>
                    <th className="py-3 px-4">Subtotal</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={`${item.id}-${item.size}-${item.color}`} className="border-b">
                      <td className="py-4 px-4 flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-contain"
                        />
                        <div>
                          {/* ✅ Product name with inline color & size */}
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="font-semibold">{item.name}</span>

                            {/* Inline size */}
                            {item.size && (
                              <span className="text-sm text-gray-600">
                                <strong>Size:</strong> {item.size}
                              </span>
                            )}

                            {/* Inline color */}
                            {item.color && (
                              <span className="text-sm text-gray-600 flex items-center gap-1">
                                <strong>Color:</strong>
                                <span
                                  className="inline-block w-4 h-4 rounded-full border border-gray-300"
                                  style={{ backgroundColor: item.color }}
                                ></span>
                                ({item.color})
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4">${item.price}</td>

                      <td className="py-4 px-4">
                        <select
                          value={item.qty}
                          onChange={(e) =>
                            updateQuantity(item.id, parseInt(e.target.value),  item.color, item.size,)
                          }
                          className="border rounded px-2 py-1"
                        >
                          {[...Array(10)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="py-4 px-4 font-semibold">
                        ${(item.price * item.qty).toFixed(2)}
                      </td>

                      <td className="py-4 px-4 text-right">
                        <button
                          onClick={() => removeFromCart(item.id, item.color, item.size)}
                          className="text-red-500 hover:text-red-700 font-semibold"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-between mt-6">
                <Link to="/shop">
                  <button className="border px-4 py-2 rounded">
                    Return To Shop
                  </button>
                </Link>
              </div>

              {/* Coupon Left Side */}
              <div className="flex gap-4 mt-6">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  className="border px-4 py-2 w-1/2 rounded"
                />
                <button className="bg-red-500 text-white px-6 py-2 rounded">
                  Apply Coupon
                </button>
              </div>
            </div>

            {/* Right: Cart Totals */}
            <div className="border p-6 rounded-lg shadow-md h-fit">
              <h2 className="text-xl font-bold mb-4">Cart Total</h2>
              <div className="flex justify-between py-2 border-b">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>Shipping:</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between py-2 font-bold">
                <span>Total:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <Link to="/checkout">
                <button className="w-full bg-red-500 text-white py-3 mt-4 rounded hover:bg-red-600">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Cart;
