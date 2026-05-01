import { Button } from '@heroui/react';
import Link from 'next/link';
import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const Banner = () => {
    return (
        <section className='min-h-[50vh] md:min-h-[70vh] w-full flex items-center justify-center bg-[#F9F8F6] px-4'>
            <div className='container mx-auto flex flex-col items-center text-center space-y-6 md:space-y-10'>
                
                {/* Responsive Playfair Display Heading */}
                <h2 className='font-[family:var(--font-playfair)] 
                               text-4xl sm:text-5xl md:text-7xl lg:text-8xl 
                               text-[#1A1A1B] tracking-tighter leading-[1.1] 
                               max-w-4xl mx-auto'>
                    Find Your Next Read
                </h2>

                {/* Styled Responsive Button with Inter Font */}
                <Link href={"/all-books"}><button className='font-[family:var(--font-inter)] 
                                   text-[10px] sm:text-xs md:text-sm 
                                   uppercase tracking-[0.2em] font-bold 
                                   text-white bg-[#1A1A1B] 
                                   py-3 px-6 md:py-5 md:px-10 
                                   flex gap-3 items-center 
                                   hover:bg-[#121217] transition-all duration-300
                                   active:scale-95 shadow-sm'>
                    Browse Now 
                    <FaArrowRight className="text-[10px] md:text-xs" /></button></Link>
            </div>
        </section>
    );
};

export default Banner;