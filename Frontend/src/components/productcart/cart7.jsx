const Guaranttee = () => {
  return (
    <div className="w-full bg-white mt-6 mb-10">
      <div className="max-w-[1170px] mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">

          {/* Item 1 */}
          <div className="flex flex-col items-center">
            <img src="/Icons/Services.png" className="w-14 h-14" alt="delivery" />
            <h1 className="font-bold text-lg mt-3">Free & Fast Delivery</h1>
            <p className="text-gray-600 text-sm">Free delivery for all orders over $140</p>
          </div>

          {/* Item 2 */}
          <div className="flex flex-col items-center">
            <img src="/Icons/Services (1).png" className="w-14 h-14" alt="support" />
            <h1 className="font-bold text-lg mt-3">24/7 Customer Service</h1>
            <p className="text-gray-600 text-sm">Friendly 24/7 customer support</p>
          </div>

          {/* Item 3 */}
          <div className="flex flex-col items-center">
            <img src="/Icons/Services (2).png" className="w-14 h-14" alt="refund" />
            <h1 className="font-bold text-lg mt-3">Money Back Guarantee</h1>
            <p className="text-gray-600 text-sm">We return money within 30 days</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Guaranttee;
