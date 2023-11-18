'use client';

import ProfileCard from '@/components/cards/ProfileCard';
import NftList from '@/components/lists/NftList';

export default function Profile() {
  return (
    <div className='flex flex-col gap-4'>
      <NftList />
      <ProfileCard />
    </div>
  );
}
