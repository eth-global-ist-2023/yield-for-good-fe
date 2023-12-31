import { VAULT_REGISTRY } from '@/lib/constants/web3';
import { PoolType } from '@/lib/types/web3';
import { useEffect, useRef, useState } from 'react';
import {
  useAccount,
  useContractRead,
  useContractReads,
  useNetwork,
} from 'wagmi';
import VaultABI from '../../../abis/vault-abi';

export const useGetPools = () => {
  const lastPoolIdRef = useRef(0);
  const [pools, setPools] = useState<PoolType[]>([]);
  const { address } = useAccount();
  const { chain } = useNetwork();

  const vaultAddress =
    VAULT_REGISTRY[chain?.id as keyof typeof VAULT_REGISTRY] ??
    VAULT_REGISTRY[5];

  const { data: lastPoolId, refetch: refetchLastPoolId } = useContractRead({
    address: vaultAddress as any,
    abi: VaultABI,
    functionName: 'lastPoolId',
    enabled: Boolean(address),
  });

  lastPoolIdRef.current = lastPoolId as number;
  const contracts = [];

  for (let i = 1; i <= lastPoolIdRef.current; i++) {
    contracts.push({
      address: vaultAddress,
      abi: VaultABI,
      functionName: 'pools',
      args: [i],
    });
  }

  const { data, refetch: refetchPools } = useContractReads({
    contracts: contracts as any,
    enabled: Boolean(lastPoolId),
  });

  useEffect(() => {
    if (!data) {
      setPools([]);
      return;
    }

    const vaults = [];

    for (let i = 0; i < data?.length; i++) {
      const element = data?.[i].result as any;
      const item = {
        title: element[0],
        description: element[1],
        imageURI: element[2],
        poolOwner: element[3],
        yieldSource: element[4],
        asset: element[5].toLowerCase(),
        totalSharesDelegated: element[6],
        totalAssetPrincipal: element[7],
        creationDate: element[8].toString(),
        totalParticipants: element[9].toString(),
        poolId: i + 1,
      };
      vaults.push(item);
    }

    setPools(vaults);
  }, [data]);

  useEffect(() => {
    const intervalRef = setInterval(async () => {
      await refetchLastPoolId();
      await refetchPools();
    }, 5000);

    return () => {
      clearInterval(intervalRef);
    };
  }, [refetchLastPoolId, refetchPools]);

  return { pools };
};
