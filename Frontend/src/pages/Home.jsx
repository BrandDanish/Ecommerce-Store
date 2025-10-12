import TopHeader from "../components/header/TopHeader";
import Header from "../components/header/Header";
import SideBanner from "../components/sidebanner/sidebanner";
import Footer from "../components/footer/Footer";
import FlashSales from "../components/productcart/cart1";
import Category from "../components/productcart/cart2";
import SellingProduct from "../components/productcart/cart3";
import MusicSection from "../components/productcart/cart4";
import ExploreProducts from "../components/productcart/cart5";
import NewFeature from "../components/productcart/cart6";
import FeaturedSection from "../components/productcart/cart6";
import Guaranttee from "../components/productcart/cart7";
const Home = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <TopHeader />
            <Header />
            <main className="flex flex-1 justify-center items-center">
                <SideBanner />
            </main>
            <FlashSales />
            <Category />
            <SellingProduct />
            <MusicSection />
            <ExploreProducts />
            <FeaturedSection/>
            <Guaranttee />
            <Footer />
        </div>
    );
};

export default Home;
