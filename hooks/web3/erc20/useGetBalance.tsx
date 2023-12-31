import { useAccount, useContractRead } from 'wagmi';
import ERC20ABI from '../../../abis/erc20-abi';

export const useGetBalance = (asset: string) => {
  const { address } = useAccount();

  const { data, refetch } = useContractRead({
    address: asset as any,
    abi: ERC20ABI,
    functionName: 'balanceOf',
    args: [address],
    enabled: Boolean(address),
  });

  return {
    data: ((data as any) ?? '').toString(),
    refetch,
  };
};
