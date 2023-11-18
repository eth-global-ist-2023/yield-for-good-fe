'use client';

import Image from 'next/image';

export default function NFTCard({ nft }: { nft: any }) {
  return (
    <div>
      <Image src={nft?.image} alt='NFT' width={200} height={200} />
    </div>
  );
}
