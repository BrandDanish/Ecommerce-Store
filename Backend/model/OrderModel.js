const mongoose = require('mongoose');
const orderItemSchema = new mongoose.Schema({
  product: {
    id: { type: mongoose.Schema.Types.Mixed }, // product id from 3rd-party API (number/string)
    title: String,
    image: String,
    price: Number,
  },
  quantity: { type: Number, required: true },
  subtotal: { type: Number, required: true },
});
const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [orderItemSchema],
  shippingAddress: {
    fullName: String,
    phone: String,
    address: String,
    city: String,
    postalCode: String,
    country: String,
  },
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, default: "COD" },
  orderStatus: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});
const Order = mongoose.model("Order", orderSchema);
module.exports = Order;