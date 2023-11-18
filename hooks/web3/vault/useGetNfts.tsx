import { useAccount, useContractRead } from 'wagmi';
import { NFT_ABI } from '../../../abis/nft-abi';
import { useGetNftAddress } from './useGetNftAddress';

export const useGetNfts = () => {
  const { address } = useAccount();
  const { yfgSoulbound } = useGetNftAddress();

  const { data } = useContractRead({
    address: yfgSoulbound as any,
    abi: NFT_ABI,
    functionName: 'ownedTokens',
    args: [address],
    enabled: Boolean(address),
  });

  return {
    data: data ?? [],
    refetch: null,
  };
};
