const OrderModel = require('../model/OrderModel');

// Create a new order
 const placeOrder= async (orderData) => {
    try{
    const{userId, items, shippingAddress, totalAmount, paymentMethod}=orderData;
    if (!userId) return { success: false, message: "User ID required" };
    if (!items || !Array.isArray(items) || items.length === 0) {
      return { success: false, message: "Order items are required" };
    }
    if (!totalAmount)
      return { success: false, message: "Total amount required" };
    const newOrder=new OrderModel({
        userId,
        items,
        shippingAddress,
        totalAmount,
        paymentMethod,
    });
    await newOrder.save();
    return { success: true, message: "Order placed successfully", order: newOrder };
  } catch (error) {
    console.error("Place Order Service Error:", error);
    return { success: false, message: "Error placing order" };
  }
}
module.exports={placeOrder};