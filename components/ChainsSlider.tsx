'use client';

import Image from 'next/image';
import { useEffect } from 'react';

export default function ChainsSlider2() {
  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      addAnimation();
    }
  }, []);

  return (
    <div className='scroller w-full' data-direction='right' data-speed='fast'>
      <div className='scroller__inner'>
        <Image src='/base_logo.png' alt='base_logo' width={40} height={40} />
        <Image src='/celo_logo.png' alt='celo_logo' width={40} height={40} />
        <Image
          src='/scroll_logo.jpeg'
          alt='scroll_logo'
          width={40}
          height={40}
        />
        <Image src='/linea_logo.png' alt='linea_logo' width={40} height={40} />
        <Image src='/eth_logo.png' alt='eth_logo' width={40} height={40} />
        <Image
          src='/mantle_logo.webp'
          alt='mantle_logo'
          width={40}
          height={40}
        />
        <Image src='/neon_logo.png' alt='neon_logo' width={40} height={40} />
        <Image
          src='/polygon_logo.svg'
          alt='polygon_logo'
          width={40}
          height={40}
        />
      </div>
    </div>
  );
}

function addAnimation() {
  const scrollers = document.querySelectorAll('.scroller');

  scrollers.forEach((scroller) => {
    // add data-animated="true" to every `.scroller` on the page
    scroller.setAttribute('data-animated', true as any);

    // Make an array from the elements within `.scroller-inner`
    const scrollerInner = scroller.querySelector('.scroller__inner');
    const scrollerContent = Array.from(scrollerInner!.children);

    // For each item in the array, clone it
    // add aria-hidden to it
    // add it into the `.scroller-inner`
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true) as Element;
      duplicatedItem.setAttribute('aria-hidden', true as any);
      scrollerInner!.appendChild(duplicatedItem);
    });
  });
}
