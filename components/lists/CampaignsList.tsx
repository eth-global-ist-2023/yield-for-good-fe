'use client';

import { useGetPools } from '@/hooks/web3/vault/useGetPools';
import CampaignCard from '../cards/PoolCard';

const CampaignsList = () => {
  const { pools } = useGetPools();

  return (
    <div className='flex w-full flex-wrap justify-center gap-6'>
      {pools.map((pool, idx) => (
        <CampaignCard key={idx} pool={pool} />
      ))}
    </div>
  );
};

export default CampaignsList;
