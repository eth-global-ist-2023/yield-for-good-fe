'use client';

import { useGetNfts } from '@/hooks/web3/vault/useGetNfts';
import { useGetTokenUris } from '@/hooks/web3/vault/useGetTokenUris';
import NFTCard from '../cards/NftCard';
import { Label } from '../ui/label';

export default function NftList() {
  const { data } = useGetNfts();
  const { nfts } = useGetTokenUris(data as any);

  return (
    <div className='m-auto flex w-1/2 rounded-xl p-4'>
      <div className='flex flex-col  gap-4'>
        <Label className='text-xl font-bold'>Your nfts</Label>
        <div className='flex max-w-[300px]  gap-7'>
          {nfts
            ? nfts.map((nft: any, idx: number) => (
                <NFTCard nft={nft} key={idx} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
