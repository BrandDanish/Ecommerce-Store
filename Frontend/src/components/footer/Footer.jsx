import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full bg-black text-white flex justify-center items-center py-12 px-4">
      <div className="w-full max-w-[1170px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

        {/* Exclusive */}
        <div className="flex flex-col items-start gap-4">
          <span className="font-bold text-2xl mb-2">Exclusive</span>
          <span>Subscribe</span>
          <span>Get 10% off your first order</span>

          <div className="flex items-center gap-2 border border-[#FAFAFA] rounded mt-2 px-[10px] py-2 w-full max-w-[240px]">
            <input
              type="email"
              placeholder="Enter Your Email"
              className="flex-1 bg-transparent outline-none text-white placeholder-gray-400 text-sm"
            />
            <img
              src="/Icons/icon-send.png"
              alt="Send Icon"
              className="w-[24px] h-[24px] cursor-pointer"
            />
          </div>
        </div>

        {/* Support */}
        <div className="flex flex-col items-start gap-2">
          <span className="font-bold text-2xl mb-2">Support</span>
          <span>
            111 Bijoy sarani, Dhaka,
            <span className="block">DH1515, Bangladesh</span>
          </span>
          <span>exclusive@gmail.com</span>
          <span>+923019515989</span>
        </div>

        {/* Account */}
        <div className="flex flex-col items-start gap-2">
          <span className="font-bold text-2xl mb-2">Account</span>
          <Link to="/profile"><span>My Account</span></Link>
          <Link to="/signup"><span>Login / Register</span></Link>
          <Link to="/cart"><span>Cart</span></Link>
          <Link to="/whishlist"><span>Wishlist</span></Link>
          <Link to="/shop"><span>Shop</span></Link>
        </div>

        {/* Quick Link */}
        <div className="flex flex-col items-start gap-2">
          <span className="font-bold text-2xl mb-2">Quick Link</span>
          <span>Privacy Policy</span>
          <span>Terms of Use</span>
          <span>FAQ</span>
          <Link to="/contact"><span>Contact</span></Link>
        </div>

        {/* Download App */}
        <div className="flex flex-col items-start gap-4">
          <span className="font-bold text-2xl mb-2">Download App</span>
          <p className="text-[#908e8e] font-bold whitespace-nowrap">
            Save $3 With App New User Only
          </p>

          <div className="flex flex-row items-center gap-4">
            <img
              src="/Icons/Qr Code.png"
              alt="QR Code"
              className="w-[80px] h-[80px]"
            />
            <div className="flex flex-col gap-2">
              <img
                src="/Icons/play_store.png"
                alt="Google Play"
                className="w-[104px] h-[30px] border border-white rounded-sm object-cover"
              />
              <img
                src="/Icons/AppStore.png"
                alt="App Store"
                className="w-[104px] h-[30px] border border-white rounded-sm object-cover mt-2"
              />
            </div>
          </div>

          <div className="flex flex-row items-center gap-[24px] mt-4">
            <img src="/Icons/fb_icon.png" alt="Facebook" className="w-[24px] h-[26px]" />
            <img src="/Icons/Icon-Twitter.png" alt="Twitter" className="w-[24px] h-[24px]" />
            <img src="/Icons/Instagram.png" alt="Instagram" className="w-[24px] h-[24px]" />
            <img src="/Icons/Icon-Linkedin.png" alt="LinkedIn" className="w-[24px] h-[24px]" />
          </div>
        </div>

      </div>
    </div>
  );
};
export default Footer;
