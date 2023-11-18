'use client';

import ProfileCard from '@/components/cards/ProfileCard';
import { useGetNfts } from '@/hooks/web3/vault/useGetNfts';
import { useGetTokenUris } from '@/hooks/web3/vault/useGetTokenUris';
import Image from 'next/image';

export default function Profile() {
  const { data } = useGetNfts();
  const { nfts } = useGetTokenUris(data as any);

  return (
    <>
      <div className='flex gap-4'>
        {nfts
          ? nfts.map((nft: any, idx: number) => (
              <div key={idx} className='relative h-[250px] w-[250px]'>
                <Image src={nft?.image} alt='NFT' fill />
              </div>
            ))
          : null}
      </div>
      <ProfileCard />
    </>
  );
}
