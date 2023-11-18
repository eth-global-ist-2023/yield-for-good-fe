import { VAULT_REGISTRY } from '@/lib/constants/web3';
import { useContractWrite, useNetwork } from 'wagmi';
import VaultABI from '../../../abis/vault-abi';

export const useExit = () => {
  const { chain } = useNetwork();
  const vaultAddress =
    VAULT_REGISTRY[chain?.id as keyof typeof VAULT_REGISTRY] ??
    VAULT_REGISTRY[5];

  const {
    data: exitData,
    isLoading: exitLoading,
    isSuccess: exitIsSuccess,
    writeAsync: writeExitAsync,
  } = useContractWrite({
    address: vaultAddress as any,
    abi: VaultABI,
    functionName: 'exit',
  });

  return { writeExitAsync };
};
