import { VAULT_REGISTRY } from '@/lib/constants/web3';
import { useAccount, useContractRead, useNetwork } from 'wagmi';
import VaultABI from '../../../abis/vault-abi';

export const useGetNftAddress = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const vaultAddress =
    VAULT_REGISTRY[chain?.id as keyof typeof VAULT_REGISTRY] ??
    VAULT_REGISTRY[5];

  const { data, refetch } = useContractRead({
    address: vaultAddress as any,
    abi: VaultABI,
    functionName: 'yfgSoulbound',
    enabled: Boolean(address),
  });

  return {
    yfgSoulbound: ((data as any) ?? '').toString(),
    refetch,
  };
};
