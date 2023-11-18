'use client';

import { ASSETS_MAPPING, ASSET_POOLS } from '@/lib/constants/web3';
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
    <div className='border-green-400-500 flex h-[450px] w-1/4 min-w-[300px] flex-col gap-2 rounded-xl border shadow-xl transition duration-300 hover:scale-105'>
      <ImageWrapper
        imageURI={pool.imageURI}
        assetIconUrl={asset.assetIconUrl}
        chainIconUrl={asset.chainIconUrl}
      />

      <DetailHeader title={pool.title} />

      <PoolAsset assetIconUrl={asset.assetIconUrl} assetSymbol={asset.symbol} />

      <div className='mt-6 flex flex-wrap justify-between gap-4 px-11'>
        <DetailWrapper
          label='TVL'
          value={`${formatEther(pool.totalAssetPrincipal).toString()} ${
            asset.symbol
          }`}
        />
        <DetailWrapper
          label='Reward'
          value={`${formatEther(pool.totalAssetPrincipal).toString()} ${
            asset.symbol
          }`}
        />

        <DetailWrapper label='Participants' value={pool.totalParticipants} />
      </div>

      <ActionWrapper pool={pool} />
    </div>
  );
}

function ImageWrapper({
  imageURI,
}: {
  imageURI: string;
  assetIconUrl: string;
  chainIconUrl: string;
}) {
  return (
    <div className='relative h-[200px] min-h-[200px] w-[20] overflow-hidden rounded-t-xl'>
      <Image src={imageURI} alt='campaign logo' fill />
    </div>
  );
}

function DetailHeader({ title }: { title: string }) {
  return (
    <div className='mt-4 flex h-[50px] justify-center px-11'>
      <Label className='text-md text-center uppercase'>{title}</Label>
    </div>
  );
}

function PoolAsset({
  assetIconUrl,
  assetSymbol,
}: {
  assetIconUrl: string;
  assetSymbol: string;
}) {
  return (
    <div className='relative flex items-center justify-between gap-2 px-11'>
      <Label className='text-green-400'>
        {ASSET_POOLS[assetSymbol as keyof typeof ASSET_POOLS]}
      </Label>
      <div className='relative h-[30px] w-[30px]'>
        <Image src={assetIconUrl} alt='asset-icon' fill />
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
      <Label className='text-black'>{label}</Label>
      <Label className='text-green-400'>{value}</Label>
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
