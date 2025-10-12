const ContactModel=require('../model/ContactModel')
const SendMessage = async ({ name, email, phone, message }) => {
  try {
    const { name, email, phone, message } = req.body;

    const newMessage = new ContactModel(name, email, phone, message);
    await newMessage.save();
    return { success: true, msg: "Message saved successfully!" };
  } catch (error) {
    return { success: false, msg: "Message Not saved successfully!" };
  }
};
module.exports = {SendMessage};