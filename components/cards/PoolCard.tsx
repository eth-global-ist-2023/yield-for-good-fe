'use client';

import { ASSETS_MAPPING } from '@/lib/constants/web3';
import { PoolType } from '@/lib/types/web3';
import Image from 'next/image';
import { formatEther } from 'viem';
import DepositDialog from '../dialogs/deposit';
import WithdrawDialog from '../dialogs/withdraw';
import { Label } from '../ui/label';

interface CampaignCardProps {
  pool: PoolType;
}

export default function PoolCard({ pool }: CampaignCardProps) {
  const asset = ASSETS_MAPPING[pool.asset as keyof typeof ASSETS_MAPPING];

  return (
    <div className='border-green-400-500 flex h-[450px] w-1/5 min-w-[250px] flex-col rounded-xl border shadow-xl transition duration-300 hover:scale-105'>
      <ImageWrapper
        imageURI={pool.imageURI}
        assetIconUrl={asset.assetIconUrl}
        chainIconUrl={asset.chainIconUrl}
      />

      <DetailHeader title={pool.title} description={pool.description} />

      <div className='flex flex-wrap justify-evenly gap-4 px-4'>
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

        <DetailWrapper label='Participants' value={pool.totalParticipants} />
        <DetailWrapper label='Created At' value={pool.creationDate} />
      </div>

      <ActionWrapper pool={pool} />
    </div>
  );
}

function ImageWrapper({
  imageURI,
  assetIconUrl,
  chainIconUrl,
}: {
  imageURI: string;
  assetIconUrl: string;
  chainIconUrl: string;
}) {
  return (
    <div className='relative h-[200px] min-h-[200px] w-[20] overflow-hidden rounded-t-xl'>
      <Image src={imageURI} alt='campaign logo' fill />
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

function DetailHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className='my-4 flex h-[50px] justify-center'>
      <Label className='text-md text-center'>{title}</Label>
      {/* <Label>{description}</Label> */}
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

function ActionWrapper({ pool }: { pool: PoolType }) {
  return (
    <div className='self flex flex-1 items-end justify-between px-4 pb-4'>
      <WithdrawDialog pool={pool} />
      <DepositDialog pool={pool} />
    </div>
  );
}
