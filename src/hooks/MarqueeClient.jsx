"use client";

import Marquee from "react-fast-marquee";

const MarqueeClient = ({ books }) => {
  return (
    <div className="bg-[#f8f5f0] py-2 md:py-3 border-y border-gray-300">
      <Marquee pauseOnHover speed={30} gradient={false}>
        <div className="flex items-center gap-6 md:gap-10">
          {books.slice(0, 8).map((book, index) => (
            <div
              key={index}
              className="flex items-center gap-2 md:gap-3 
                         px-3 md:px-5 py-1.5 md:py-2 
                         rounded-md bg-white border border-gray-200 
                         shadow-sm hover:shadow-md transition whitespace-nowrap"
            >
              <span className="text-sm md:text-lg">📖</span>

              <span className="font-medium text-gray-800 
                               text-xs sm:text-sm md:text-base">
                {book.title}
              </span>

              <span className="hidden sm:inline text-gray-500 
                               text-[10px] sm:text-xs md:text-sm">
                | Special Discount
              </span>
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default MarqueeClient;