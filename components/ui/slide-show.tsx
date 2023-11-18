'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

// Define a type for logo object
type Logo = {
  url: string;
};

// Define props type
type InfiniteSlideshowProps = {
  logos?: Record<string, any>;
  logosPerSlide?: number;
};

const LOGOS = {
  eth: <Image src='./chains/eth.png' alt='eth' />,
  celo: <Image src='./chains/eth.png' alt='eth' />,
  linea: <Image src='./chains/eth.png' alt='eth' />,
};

const InfiniteSlideshow: React.FC<InfiniteSlideshowProps> = ({
  logos = LOGOS,
  logosPerSlide = 3,
}) => {
  const slideWrapperRef = useRef<HTMLDivElement>(null);
  const [scrollAmount, setScrollAmount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollAmount((prev) => {
        if (!slideWrapperRef.current) return prev;
        const newScrollAmount = prev + 5;
        return newScrollAmount >= slideWrapperRef.current.offsetWidth
          ? 0
          : newScrollAmount;
      });
    }, 100); // Adjust interval for speed

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className='w-full overflow-hidden'
      style={{ height: '50px', width: '100%' }}
    >
      <div
        ref={slideWrapperRef}
        className='flex whitespace-nowrap transition-transform duration-1000'
        style={{
          transform: `translateX(-${scrollAmount}px)`,
        }}
      >
        {Object.values(logos).map((logo, index) => (
          <div
            key={index}
            className={`flex-none w-1/${logosPerSlide} flex h-64 items-center justify-center bg-transparent`}
          >
            <Image src={logo} alt={`Logo ${index + 1}`} />
          </div>
        ))}
        {/* Repeat slides for infinite effect */}
        {Object.values(logos).map((logo, index) => (
          <div
            key={`repeat-${index}`}
            className={`flex-none w-1/${logosPerSlide} flex h-64 items-center justify-center bg-transparent`}
          >
            <Image src={logo} alt={`Logo ${index + 1}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteSlideshow;
