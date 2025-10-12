const {placeOrder}=require('../service/OrderService')
const placedOrderController=async (req,res) => {
    try {   
         const result=await placeOrder(req.body);
            if(!result.success)
                return res.status(400).json(result)
            else    
                return res.status(201).json(result)
    } catch (error) {
        console.error("Place Order Controller Error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
}

module.exports={placedOrderController};