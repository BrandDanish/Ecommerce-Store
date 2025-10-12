const FeaturedSection = () => {
  return (
    <div className="w-full max-w-[1100px] mx-auto px-6 py-10 mt-[-150px]">
      {/* Section Heading */}
      <div className="flex items-center gap-4 mt-[100px] mb-8">
        <div className="border-l-[10px] border-red-500 pl-4 h-[25px]">
          <p className="text-red-500 font-medium">Feature</p>
          <h2 className="text-2xl font-bold -ml-7">New Arrival</h2>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Big Banner */}
        <div className="relative  overflow-hidden bg-black text-white flex items-end p-6">
          <img
            src="/Icons/Shave.png"
            alt="PlayStation 5"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-10 max-w-[70%]">
            <h2 className="text-2xl font-bold">PlayStation 5</h2>
            <p className="text-sm text-gray-200 mt-1">
              Black and White version of the PS5 <br/> coming out on sale.
            </p>
            <button className="mt-3  py-2  text-white font-medium underline">
              Shop Now
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="grid grid-rows-2 gap-6">
          {/* Top Large Banner */}
          <div className="relative  overflow-hidden bg-black text-white flex items-end p-6 h-[284px]">
            <img
              src="/Icons/women.png"
              alt="Women's Collections"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative z-10 max-w-[80%]">
              <h2 className="text-xl font-bold">Women’s Collections</h2>
              <p className="text-sm text-gray-200 mt-1">
                Featured woman collections that give you another vibe.
              </p>
              <button className="mt-3  py-2  text-white font-medium underline">
              Shop Now
            </button>
            </div>
          </div>

          {/* Bottom Two Banners */}
          <div className="grid grid-cols-2 gap-6 h-[284px]">
            {/* Speakers */}
            <div className="relative  overflow-hidden bg-black text-white flex items-end p-6">
              <img
                src="/Icons/Frame 707.png"
                alt="Speakers"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="relative z-10">
                <h2 className="text-lg font-bold">Speakers</h2>
                <p className="text-sm text-gray-200">Amazon wireless speakers</p>
                <button className="mt-3  py-2  text-white font-medium underline">
              Shop Now
            </button>
              </div>
            </div>

            {/* Perfume */}
            <div className="relative overflow-hidden bg-black text-white flex items-end p-6">
              <img
                src="/Icons/Perfume.png"
                alt="Perfume"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="relative z-10">
                <h2 className="text-lg font-bold">Perfume</h2>
                <p className="text-sm text-gray-200">GUCCI INTENSE OUD EDP</p>
                <button className="mt-3  py-2  text-white font-medium underline">
              Shop Now
            </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;
