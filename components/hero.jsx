'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HeroSelection = () => {
  const imageRef = useRef();

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add('scrolled');
      } else {
        imageElement.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className='pb-20 px-4 min-w-screen'>
      <div className='w-full mx-auto text-center min-h-screen'>
        <h1 className='text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title '>
          Smarter Finance. <br /> Better Future
        </h1>
        <p className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto'>
          Simplify financial management. Track, analyze, and optimize your spending with real-time AI insights—for a smarter, better future.
        </p>

        <div className='flex justify-center space-x-4'>
          <Link href='/dashboard'>
            <button size="lg" className='px-8'>
              Get Started
            </button>
          </Link>

          <Link href='/dashboard'>
            <button size="lg" variant="outline" className='px-8  '>
              Watch Demo
            </button>
          </Link>
        </div>

        {/* Image Section */}
        <div className='Hero-image-wrapper'>
          <div ref={imageRef} className='Hero-image w-full flex justify-center'>
            <Image
              src="/banner.jpeg"
              alt="Dashboard preview"
              width={1800}
              height={900}
              className='max-w-[1400px] w-full h-auto rounded-lg shadow-2xl'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSelection;
