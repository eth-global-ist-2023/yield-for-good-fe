'use client';

import Image from 'next/image';
import { Label } from '../ui/label';

export default function NFTCard({ nft }: { nft: any }) {
  return (
    <div className='h-[300px] rounded-xl border bg-white shadow-xl transition duration-300 hover:scale-105'>
      <div className='relative h-[200px] w-[200px]'>
        <Image
          src={nft?.image}
          alt='NFT'
          fill
          className='rounded-t-xl'
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className='flex w-full items-center justify-center'>
        <Label className='text-md mt-4 w-[150px] text-center font-bold text-green-400'>
          {nft.name}
        </Label>
      </div>
    </div>
  );
}
