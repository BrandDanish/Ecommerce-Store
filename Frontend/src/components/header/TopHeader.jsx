import { FaHome, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
const TopHeader = () => {
    return (
        <div className="bg-black text-white p-2 text-center relative  h-[48px]">
            Summer Sale for All Swim Suits and Free Express Delivery - OFF 50%!
           <Link to='/shop'> <button className="ml-4 bg-black text-white px-2 py-1 underline">Shop Now</button></Link>
            <span className="absolute right-6 top-2">English</span>
            <span className="ml-4 inline-flex items-center">
                <img
                    src="public/Icons/vector.png"
                    alt="Icon"
                    className="w-7.78px h-12.73px absolute right-2 top-4"
                />
            </span>
        </div>
    );
}
export default TopHeader;