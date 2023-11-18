import { VAULT_REGISTRY } from '@/lib/constants/web3';
import { useContractRead, useNetwork } from 'wagmi';
import VaultABI from '../../../abis/vault-abi';

export const useGetAccruedYield = (poolId: number) => {
  const { chain } = useNetwork();
  const vaultAddress =
    VAULT_REGISTRY[chain?.id as keyof typeof VAULT_REGISTRY] ??
    VAULT_REGISTRY[5];

  const { data, refetch } = useContractRead({
    address: vaultAddress as any,
    abi: VaultABI,
    functionName: 'getAccruedYieldForPool',
    args: [poolId],
  });

  return {
    data: ((data as any) ?? '').toString(),
    refetch,
  };
};
