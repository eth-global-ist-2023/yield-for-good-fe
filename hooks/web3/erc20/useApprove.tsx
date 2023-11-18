import { useContractWrite } from 'wagmi';
import ERC20ABI from '../../../abis/erc20-abi';

export const useApprove = (asset: any) => {
  const {
    data: approveData,
    isLoading: approveLoading,
    isSuccess: approveIsSuccess,
    writeAsync: writeApproveAsync,
  } = useContractWrite({
    address: asset,
    abi: ERC20ABI,
    functionName: 'approve',
  });

  return { writeApproveAsync };
};
