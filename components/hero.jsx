'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HeroSelection = () => {
  return (
    <div className='pb-20 px-4 min-w-screen'>
      <div className='w-full mx-auto text-center min-h-screen'>
        <h1 className='text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title '>
          Smarter Finance. <br /> Better Future
        </h1>
        <p className='text-lg text-gray-600 mb-6'>
          Simplify financial management. Track, analyze, and optimize your spending with real-time AI insights—for a smarter, better future.
        </p>

        <div className='flex justify-center gap-4 mb-8'>
          <Link href='/dashboard'>
            <button className='px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'>
              Get Started
            </button>
          </Link>

          <Link href='/dashboard'>
            <button className='px-8 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition'>
              Watch Demo
            </button>
          </Link>
        </div>

        {/* Image Section */}
        <div className='w-full flex justify-center'>
          <Image 
            src="/banner.jpeg"
            alt="Dashboard preview"
            width={1800}               // ✅ Bigger for better clarity
            height={900}
            className='max-w-[1400px] w-full h-auto rounded-lg shadow-2xl'
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSelection;
