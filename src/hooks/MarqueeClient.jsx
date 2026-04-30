"use client";

import Marquee from "react-fast-marquee";

const MarqueeClient = ({ books }) => {
  return (
    <div className="bg-[#1A1A1B] py-4 md:py-6 border-y border-[#2A2A2B] overflow-hidden">
      <Marquee pauseOnHover speed={40} gradient={false}>
        <div className="flex items-center">
          {books.map((book, index) => (
            <div
              key={index}
              className="flex items-center px-8 md:px-12 whitespace-nowrap group"
            >
              {/* Status Tag - Professional Minimalist Style */}
              <span className="font-[family:var(--font-inter)] text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-[#8B8B8B] mr-4">
                New Arrival
              </span>

              {/* Book Title - Classy Serif Style */}
              <span className="font-[family:var(--font-playfair)] text-sm md:text-xl text-[#F9F8F6] hover:text-[#8B8B8B] transition-colors duration-500 cursor-pointer italic tracking-tight">
                {book.title}
              </span>

              {/* Minimalist Divider */}
              <span className="mx-8 md:mx-12 text-[#2A2A2B] font-light text-2xl">
                /
              </span>
              
              {/* Offer Text - Clean Sans Style */}
              <span className="font-[family:var(--font-inter)] text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#F9F8F6] opacity-60">
                Special Discount on Memberships
              </span>

              {/* Decorative Dot to separate loops */}
              <span className="ml-8 md:ml-12 w-1.5 h-1.5 rounded-full bg-[#8B8B8B] opacity-20"></span>
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default MarqueeClient;