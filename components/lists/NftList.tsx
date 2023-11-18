'use client';

import { useGetNfts } from '@/hooks/web3/vault/useGetNfts';
import { useGetTokenUris } from '@/hooks/web3/vault/useGetTokenUris';
import NFTCard from '../cards/NftCard';

export default function NftList() {
  const { data } = useGetNfts();
  const { nfts } = useGetTokenUris(data as any);

  return (
    <div className='flex w-full flex-wrap items-center justify-center gap-4 px-4'>
      <div className='flex flex-wrap items-center gap-4'>
        {nfts
          ? nfts.map((nft: any, idx: number) => <NFTCard nft={nft} key={idx} />)
          : null}
      </div>
    </div>
  );
}
