'use client';

import { ASSETS_MAPPING } from '@/lib/constants/web3';
import { GetPoolsType } from '@/lib/types/web3';
import Image from 'next/image';
import { formatEther } from 'viem';
import DepositDialog from '../dialogs/deposit';
import WithdrawDialog from '../dialogs/withdraw';
import { Label } from '../ui/label';

interface CampaignCardProps {
  pool: GetPoolsType;
}

export default function PoolCard({ pool }: CampaignCardProps) {
  const asset = ASSETS_MAPPING[pool.asset as keyof typeof ASSETS_MAPPING];

  return (
    <div className='border-green-400-500 flex h-[400px] w-1/5 min-w-[250px] flex-col rounded-xl border shadow-xl transition duration-300 hover:scale-105'>
      <ImageWrapper
        // imgUrl={data.imgUrl}
        assetIconUrl={asset.assetIconUrl}
        chainIconUrl={asset.chainIconUrl}
      />

      <div className='flex flex-wrap justify-evenly gap-4 p-4'>
        <DetailWrapper
          label='Deposited'
          value={`${formatEther(pool.totalAssetPrincipal).toString()} ${
            asset.symbol
          }`}
        />
        <DetailWrapper
          label='Generated'
          value={`[${formatEther(pool.totalAssetPrincipal).toString()} ${
            asset.symbol
          }]`}
        />

        <DetailWrapper label='Participants' value={'[5]'} />
        <DetailWrapper label='Created At' value={'[5]'} />
      </div>

      <ActionWrapper />
    </div>
  );
}

function ImageWrapper({
  // imgUrl,
  assetIconUrl,
  chainIconUrl,
}: {
  // imgUrl: string;
  assetIconUrl: string;
  chainIconUrl: string;
}) {
  const imgUrl =
    'https://static.vecteezy.com/system/resources/previews/006/902/005/non_2x/illustration-for-charity-welfare-assistance-concept-free-vector.jpg';

  return (
    <div className='relative h-[200px] w-[20] overflow-hidden rounded-t-xl'>
      <Image src={imgUrl} alt='campaign logo' fill />
      <div className='absolute left-2 top-4 text-green-500'>
        <Label>MakerDAO</Label>
      </div>
      <div className='absolute right-2 top-2 h-[35px] w-[35px] rounded-full bg-gray-100 p-2'>
        <Image
          src={assetIconUrl}
          alt='asset-icon'
          width={20}
          height={20}
          className='relative bottom-0'
        />
      </div>
      <div className='absolute right-[-5px] top-6 h-[30px] w-[30px] p-2'>
        <Image
          src={chainIconUrl}
          alt='chain-icon'
          width={10}
          height={10}
          className='relative bottom-1'
        />
      </div>
    </div>
  );
}

function DetailWrapper({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className='flex flex-col items-center gap-2'>
      <Label className=' text-black'>{label}</Label>
      <Label className=' text-green-400'>{value}</Label>
    </div>
  );
}

function ActionWrapper() {
  return (
    <div className='self flex flex-1 items-end justify-between px-4 pb-4'>
      <WithdrawDialog />
      <DepositDialog />
    </div>
  );
}
