const Guaranttee = () => {
    return (
        <div>
            <div className="w-full max-w-[1170px] mx-auto bg-white mt-6 mb-10  flex flex-col items-center justify-center overflow-x-hidden">
               <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3  gap-[88px]">
                <div>
                <img
                    src="/Icons/Services.png"
                />
                <h1 className="font-bold ml-[-50px]">Free and Fast Delievery</h1>
                <p className="ml-[-50px]">Free Delievery for all orders over $140</p>
                </div>
                <div>
                <img
                    src="/Icons/Services (1).png"
                />
                <h1 className="font-bold ml-[-50px]">24/7 Customer Service</h1>
                <p className="ml-[-50px]">Friendly 24/7 customer support</p>
                </div>
                <div>
                <img
                    src="/Icons/Services (2).png"
                />
                <h1 className="font-bold ml-[-50px]">Money Back Guarantee</h1>
                <p className="ml-[-50px]">We return money within 30 days</p>
                </div>
            </div>
            </div> 

        </div>
    );
}
export default Guaranttee;