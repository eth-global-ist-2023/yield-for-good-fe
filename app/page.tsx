'use client';

import CampaignsList from '@/components/lists/CampaignsList';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';

export default function Home() {
  return (
    <Suspense fallback={<CardLoadingSkeleton />}>
      <CampaignsList />
    </Suspense>
  );
}

function CardLoadingSkeleton() {
  return (
    <div className='flex flex-wrap justify-center gap-4'>
      {Array(10)
        .fill(0)
        .map((_, idx) => (
          <div
            key={idx}
            className='m-4 flex h-[200px] w-[240px] flex-col items-center gap-4 rounded-lg border border-gray-100 p-2'
          >
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
          </div>
        ))}
      ;
    </div>
  );
}
