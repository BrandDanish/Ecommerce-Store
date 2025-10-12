import TopHeader from "../components/header/TopHeader";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Category from "../components/productcart/cart2";
import Feedback from "../components/about/Feedback";
import UserAbout from "../components/about/UserAbout";
import Guaranttee from "../components/productcart/cart7";
const OurStory = () => {
  return (
      <>
      <TopHeader/>
      <Header/>
    <section className="w-full max-w-[1170px] mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-10">
      {/* Left Content */}
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
          className=" object-cover w-full max-w-md"
        />
      </div>
    </section>
    <Feedback/>
    <UserAbout/>
    <Guaranttee/>
    <Footer/>
    </>
  );
};

export default OurStory;
