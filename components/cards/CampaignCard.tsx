'use client';

import Image from 'next/image';
import DepositDialog from '../dialogs/deposit';
import WithdrawDialog from '../dialogs/withdraw';
import { Label } from '../ui/label';

interface CampaignCardProps {
  data: {
    title: string;
    imgUrl: string;
    deposited: string;
    generated: string;
    participants: number;
    createdAt: number;
    chainLogoUrl: string;
    description: string;
    apy: number;
  };
}

export default function CampaignCard({ data }: CampaignCardProps) {
  return (
    <div className='border-green-400-500 flex h-[400px] w-1/5 min-w-[250px] flex-col rounded-xl border shadow-xl transition duration-300 hover:scale-105'>
      <ImageWrapper imgUrl={data.imgUrl} chainLogoUrl={data.chainLogoUrl} />

      <div className='flex flex-wrap justify-evenly gap-4 p-4'>
        <DetailWrapper label='Generated' value={data.generated} />
        <DetailWrapper label='Deposited' value={data.deposited} />
        <DetailWrapper label='Participants' value={data.participants} />
        <DetailWrapper label='Created At' value={data.createdAt} />
        <DetailWrapper label='APY' value={data.apy} />
      </div>

      <ActionWrapper />
    </div>
  );
}

function ImageWrapper({
  imgUrl,
  chainLogoUrl,
}: {
  imgUrl: string;
  chainLogoUrl: string;
}) {
  return (
    <div className='relative h-[200px] w-[20] overflow-hidden rounded-t-xl'>
      <Image src={imgUrl} alt='campaign logo' fill />
      <div className='absolute left-2 top-2 text-green-500'>
        <Label>MakerDAO</Label>
      </div>
      <div className='absolute right-2 top-2 h-[30px] w-[30px] rounded-full bg-gray-300 p-2'>
        <Image
          src={chainLogoUrl}
          alt='chain-logo'
          width={15}
          height={15}
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
