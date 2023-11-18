import { VAULT_REGISTRY } from '@/lib/constants/web3';
import { useAccount, useContractRead, useNetwork } from 'wagmi';
import ERC20ABI from '../../../abis/erc20-abi';

export const useGetAllowance = (asset: string) => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const vaultAddress =
    VAULT_REGISTRY[chain?.id as keyof typeof VAULT_REGISTRY] ??
    VAULT_REGISTRY[5];

  // NOTE [CHAIN ADDRESS]: use correct address
  const { data, isLoading, isSuccess } = useContractRead({
    address: asset as any,
    abi: ERC20ABI,
    functionName: 'allowance',
    args: [address, vaultAddress],
    enabled: Boolean(address),
  });

  return ((data as any) ?? '').toString();
};
