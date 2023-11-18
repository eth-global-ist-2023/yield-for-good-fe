'use client';

import ProfileCard from '@/components/cards/ProfileCard';
import { useGetNfts } from '@/hooks/web3/vault/useGetNfts';
import { useGetTokenUris } from '@/hooks/web3/vault/useGetTokenUris';
import Image from 'next/image';

export default function Profile() {
  const { data } = useGetNfts();
  const { nfts } = useGetTokenUris(data);

  return (
    <>
      <Image src={nfts?.[0]?.image} alt='NFT' width={500} height={500} />
      <ProfileCard />
    </>
  );
}
