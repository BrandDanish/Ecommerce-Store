import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import TopHeader from "../components/header/TopHeader";
import UserSign from "../components/user/UserSign";

const SignUp = () => {
    return (
    <div className="flex flex-col min-h-screen">
        <>
        <TopHeader />
        <Header />
        <main className="flex flex-1 justify-center items-center">
             <UserSign/>
        </main>
       
        <Footer />
        </>
    </div>
    );
};
export default SignUp;