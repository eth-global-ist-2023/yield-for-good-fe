import { VAULT_REGISTRY } from '@/lib/constants/web3';
import { useContractWrite, useNetwork } from 'wagmi';
import VaultABI from '../../../abis/vault-abi';

export const useEnter = () => {
  const { chain } = useNetwork();
  const vaultAddress =
    VAULT_REGISTRY[chain?.id as keyof typeof VAULT_REGISTRY] ??
    VAULT_REGISTRY[5];

  const {
    data: enterData,
    isLoading: enterLoading,
    isSuccess: enterIsSuccess,
    writeAsync: writeEnterAsync,
  } = useContractWrite({
    address: vaultAddress as any,
    abi: VaultABI,
    functionName: 'enter',
  });

  return { writeEnterAsync };
};
