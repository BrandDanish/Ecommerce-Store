import TopHeader from "../components/header/TopHeader";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Category from "../components/productcart/cart2";
import Feedback from "../components/about/Feedback";
import UserAbout from "../components/about/UserAbout";
import Guaranttee from "../components/productcart/cart7";
import Skeleton from "../components/skeleton/Skeleton";
import { useEffect, useState } from "react";

const OurStory = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <TopHeader />
      <Header />
      <section className="w-full max-w-[1170px] mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-10 min-h-[400px] overflow-hidden">
  {loading ? (
    <>
      {/* Left Skeleton: Text Block */}
      <div className="flex-1 flex flex-col gap-4 animate-pulse">
        <div className="h-8 w-40 bg-gray-300 rounded"></div>
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
        <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
      </div>

      {/* Right Skeleton: Image Area */}
      <div className="flex-1 w-1/2 flex justify-center animate-pulse">
        <div className="bg-gray-200 rounded-lg w-full max-w-md h-[300px]"></div>
      </div>
    </>
  ) : (
    <>
      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-6 ">Our Story</h2>
        <p className="text-black leading-relaxed mb-4">
          Launched in 2015, Exclusive is South Asia’s premier online shopping
          marketplace with an active presence in Bangladesh. Supported by wide
          range of tailored marketing, data and service solutions, Exclusive has
          10,500 sellers and 300 brands and serves 3 million customers across
          the region.
        </p>
        <p className="text-black leading-relaxed">
          Exclusive has more than 1 Million products to offer, growing at a very
          fast rate. Exclusive offers a diverse assortment in categories ranging
          from consumer.
        </p>
      </div>

      {/* Right Content (Image) */}
      <div className="flex-1 w-1/2 flex justify-center">
        <img
          src="/Icons/About.png"
          alt="Our Story"
          className="object-cover w-full max-w-md"
        />
      </div>
    </>
  )}
</section>


        <>
          <Feedback />
          <UserAbout />
          <Guaranttee />
        </>
     
      <Footer />
    </>
  );
};

export default OurStory;
