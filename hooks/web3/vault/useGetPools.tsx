import { VAULT_REGISTRY } from '@/lib/constants/web3';
import { PoolType } from '@/lib/types/web3';
import { useEffect, useState } from 'react';
import {
  useAccount,
  useContractRead,
  useContractReads,
  useNetwork,
} from 'wagmi';
import VaultABI from '../../../abis/vault-abi';

export const useGetPools = () => {
  const [pools, setPools] = useState<PoolType[]>([]);
  const { address } = useAccount();
  const { chain } = useNetwork();

  const vaultAddress =
    VAULT_REGISTRY[chain?.id as keyof typeof VAULT_REGISTRY] ??
    VAULT_REGISTRY[5];

  const { data: lastPoolId, error } = useContractRead({
    address: vaultAddress as any,
    abi: VaultABI,
    functionName: 'lastPoolId',
    enabled: Boolean(address),
  });

  const _lastPoolId = lastPoolId as number;
  const contracts = [];

  for (let i = 1; i <= _lastPoolId; i++) {
    contracts.push({
      address: vaultAddress,
      abi: VaultABI,
      functionName: 'pools',
      args: [i],
    });
  }

  const { data } = useContractReads({
    contracts: contracts as any,
    enabled: Boolean(lastPoolId),
  });

  useEffect(() => {
    if (!data) {
      setPools([]);
    }

    const vaults = [];

    for (let i = 0; i < data?.length; i++) {
      const element = data[i].result as any;
      const item = {
        poolOwner: element[0],
        yieldSource: element[1],
        asset: element[2],
        totalSharesDelegated: element[3],
        totalAssetPrincipal: element[4],
      };
      vaults.push({ ...item, poolId: i + 1 });
    }

    setPools(vaults);
  }, [data]);

  return { pools };
};
