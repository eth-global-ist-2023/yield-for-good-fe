import Image from 'next/image';

export default function ChainsSlider() {
  return (
    <div className='relative my-10 h-[65px] overflow-hidden'>
      <div className='animate-slide flex items-center gap-4 whitespace-nowrap'>
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
