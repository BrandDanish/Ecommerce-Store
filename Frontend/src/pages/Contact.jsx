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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/contact`, formData);
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error(error);
      alert("Failed to send message. Try again later!");
    }
  };

  return (
    <>
      <TopHeader />
      <Header />

      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 py-20 px-6">
        <div className="flex flex-col lg:flex-row w-full max-w-6xl gap-10">
          {/* Left Section */}
          <div className="bg-red-100 rounded-2xl shadow-md p-10 flex-1">
            <div className="space-y-8">
              {/* Call */}
              <div>
                <div className="flex items-center gap-3">
                  <img
                    src="Icons/icons-phone.png"
                    className="w-[40px] h-[40px]"
                  />
                  <h3 className="font-bold text-lg text-black">Call to us</h3>
                </div>
                <p className="text-black mt-3">
                  We are available 24/7, 7 days a week.
                </p>
                <p className="mt-2 text-black">Phone: +92 301 9515989</p>
              </div>

              <hr className="border-red-300" />

              {/* Email */}
              <div>
                <div className="flex items-center gap-3">
                  <img
                    src="Icons/icons-mail.png"
                    className="w-[40px] h-[40px]"
                  />
                  <h3 className="font-bold text-lg text-black">Write to us</h3>
                </div>
                <p className="mt-3 text-black">
                  Fill out our form and we will contact you within 24 hours.
                </p>
                <p className="mt-2 text-black">Email: customer@exclusive.com</p>
                <p className="mt-2 text-black">Email: support@exclusive.com</p>
              </div>
            </div>
          </div>

          {/* Right Section - Form */}
          <div className="bg-red-100 rounded-2xl shadow-md p-10 flex-1">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name *"
                  className="border px-4 py-2 bg-gray-100 text-black rounded w-full"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email *"
                  className="border px-4 py-2 bg-gray-100 text-black rounded w-full"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  name="phone"
                  placeholder="Your Phone *"
                  className="border px-4 py-2 bg-gray-100 text-black rounded w-full"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <textarea
                rows="5"
                name="message"
                placeholder="Your Message"
                className="w-full border rounded-lg px-4 py-3 bg-gray-100 text-black resize-none"
                value={formData.message}
                onChange={handleChange}
              ></textarea>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg w-[215px] h-[56px] transition-all duration-200"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
