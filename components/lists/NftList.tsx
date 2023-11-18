'use client';

import { useGetNfts } from '@/hooks/web3/vault/useGetNfts';
import { useGetTokenUris } from '@/hooks/web3/vault/useGetTokenUris';
import NFTCard from '../cards/NftCard';
import { Label } from '../ui/label';

export default function NftList() {
  const { data } = useGetNfts();
  const { nfts } = useGetTokenUris(data as any);

  return (
    <div className='flex flex-col flex-wrap items-center justify-center px-4'>
      <div className='w-max-[720px] flex flex-col gap-4'>
        <Label className='text-xl font-bold'>Your nfts</Label>
        <div className='w-max-[620px] flex flex-wrap items-center gap-7'>
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
