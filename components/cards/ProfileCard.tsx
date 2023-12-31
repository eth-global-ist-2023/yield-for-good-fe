'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';

export default function ProfileCard() {
  return (
    <div className='m-auto flex w-1/2 flex-col rounded-xl p-4'>
      <UserAvatar />
      <UserHoldings />
      <UserActivityDetail />
    </div>
  );
}

function UserAvatar() {
  const { address: _address } = useAccount();

  const [address, setAddress] = useState('');

  useEffect(() => {
    if (!_address) {
      return;
    }

    setAddress(_address);
  }, [_address]);

  return (
    <div className='flex w-full flex-col items-start justify-center gap-4'>
      <Label className='text-xl font-bold'>Your profile picture</Label>
      <div className='relative right-6 flex h-[175px] w-1/3'>
        <Image src='/913.svg' alt='user-avatar' fill />
      </div>
      <Label className='text-center text-green-400'>{address}</Label>
    </div>
  );
}

function UserHoldings() {
  return (
    <div className='my-6 flex justify-between'>
      <HoldingDetail label='TOTAL HOLDINGS' value='$3,526' />
      <HoldingDetail label='TOTAL AMOUNT EARNED' value='1.9 ETH' />
      <HoldingDetail label='POINTS' value='145 XP' />
    </div>
  );
}

function HoldingDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className='flex flex-col gap-4'>
      <Label className='text-end text-base font-medium uppercase leading-none text-black'>
        {label}
      </Label>
      <Label className='text-2xl font-semibold leading-10 text-green-400'>
        {value}
      </Label>
    </div>
  );
}

function UserActivityDetail() {
  return (
    <div className='flex flex-1 flex-col'>
      <Label className='text-md font-bold text-blue-500'>
        Campaign Participant
      </Label>
      <Separator className='my-4 h-[1px] w-full bg-green-400' />
      <div className='flex flex-1 flex-col justify-between gap-4'>
        <ActivityDetail label='Charity #1' value='0.56ETH' />
        <ActivityDetail label='Charity #2' value='0.20ETH' />
        <ActivityDetail label='Charity #3' value='0.87ETH' />
        <ActivityDetail label='Charity #4' value='1.23ETH' />
        <ActivityDetail label='Charity #5' value='99.33ETH' />
      </div>
    </div>
  );
}

function ActivityDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className='flex justify-between'>
      <Label className='text-xl font-medium leading-tight text-black'>
        {label}
      </Label>
      <Label className='text-xl font-medium leading-tight text-green-400'>
        {value}
      </Label>
    </div>
  );
}
