const{SendMessage}=require('../service/ContactService')

const MessageController=async(req,res)=>{
    try {
      const { name, email, phone, message } = req.body;
      if (!name || !email || !phone || !message) {
        return res.status(400).json({
          success: false,
          msg: "All fields (name, email, message) are required!",
        });
      }
      const result = await SendMessage({ name, email, phone, message });
      return res.status(200).json({
        success: true,
        msg: "Message sent successfully!",
        data: result,
      });
    } catch (error) {
      console.error("Error in contact controller:", error);
      return res.status(500).json({
        success: false,
        msg: "Server error while sending message",
      });
    }
}
module.exports = { MessageController };
