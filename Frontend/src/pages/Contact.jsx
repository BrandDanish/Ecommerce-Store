import { useState } from "react";
import TopHeader from "../components/header/TopHeader";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import axios from "axios";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/contact`, formData);
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" }); // reset form
    } catch (error) {
      console.error(error);
      alert("Failed to send message. Try again later!");
    }
  };

  return (
    <>
      <TopHeader />
      <Header />

      <div className="min-h-screen flex justify-center items-start">
        {/* Left Section */}
        <div className="w-[300px] h-[400px] bg-red-100 flex flex-col justify-center p-12 mt-[150px] shadow-sm">
          <div className="flex mt-4">
            <img src="Icons/icons-phone.png" className="w-[40px] h-[40px]" />
            <h3 className="px-3 mt-1 font-bold text-black">Call to us</h3>
          </div>
          <div className="text-black font-normal mt-4">
            <p className="whitespace-nowrap">
              We are available 24/7, days a week.
            </p>
            <p className="mt-2">Phone: +923019515989</p>
          </div>
          <div className="border-t bg-red-500 mt-4"></div>
          <div className="flex mt-4">
            <img src="Icons/icons-mail.png" className="w-[40px] h-[40px]" />
            <h3 className="px-3 mt-1 font-bold text-black">Write to us</h3>
          </div>
          <div className="text-black font-normal">
            <p className="mt-4">
              Fill out our form and we will contact you within 24 hours
            </p>
            <p className="mt-4">Email: customer@exclusive.com</p>
            <p className="mt-4">Email: support@exclusive.com</p>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="space-y-1 flex items-center justify-center w-[800px] h-[457px] mt-[150px]">
          <form
            onSubmit={handleSubmit}
            className="w-[700px] h-[400px] bg-red-100 shadow-lg top-[323px] left-[505px] mt-[-50px] p-10"
          >
            <div className="flex gap-8 justify-center items-center mt-12">
              <div className="mb-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  className="w-full border px-4 py-2 bg-gray-100 text-black"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email *"
                  className="w-full border px-4 py-2 bg-gray-100 text-black"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <input
                  type="number"
                  name="phone"
                  placeholder="Your Phone *"
                  className="w-full border px-4 py-2 bg-gray-100 text-black"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-4">
              <textarea
                rows="4"
                name="message"
                placeholder="Your Message"
                className="w-full border rounded-lg px-4 py-2 bg-gray-100"
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-red-500 text-white px-2 rounded w-[215px] h-[56px] ml-[400px]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
